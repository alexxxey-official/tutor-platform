const { GoogleGenerativeAI } = require('@google/generative-ai');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);
const fs = require('fs/promises');
const path = require('path');

// Инициализация Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Выбор модели берем из .env, если нет - используем по умолчанию
const LLM_MODEL = process.env.GEMINI_MODEL || 'gemini-3.1-pro-preview'; 

const PROJECT_ROOT = process.env.PROJECT_ROOT_PATH || process.cwd();

// Системный промпт (Душа Агента)
const SYSTEM_PROMPT = `
You are Nikki, a senior software engineer agent. 
You are autonomous. You have access to the server's terminal and file system.
Your current working directory is: ${PROJECT_ROOT}

Follow these rules:
1. When asked to fix or implement something, USE YOUR TOOLS (functions) to explore the codebase, edit files, and run bash commands.
2. If you need to write or edit a file, use the 'run_bash' tool with commands like 'cat << 'EOF' > file.js' or 'echo "..." > file.js', or use 'sed'.
3. If you need to build the project, run 'npm run build'.
4. Always verify your changes before reporting back.
5. If an operation takes multiple steps, just keep going until the entire user request is completely fulfilled.
6. Keep your final response to the user concise and report what you did.
`;

// Определение инструментов (Tools) в формате Gemini
const runBashDeclaration = {
  name: "run_bash",
  description: "Run a shell command on the server.",
  parameters: {
    type: "OBJECT",
    properties: {
      command: {
        type: "STRING",
        description: "The bash command to run",
      },
      workdir: {
        type: "STRING",
        description: "Working directory (optional)",
      },
    },
    required: ["command"],
  },
};

const readFileDeclaration = {
  name: "read_file",
  description: "Read contents of a file.",
  parameters: {
    type: "OBJECT",
    properties: {
      filePath: {
        type: "STRING",
        description: "Absolute path to the file",
      },
    },
    required: ["filePath"],
  },
};

const write_file_declaration = {
  name: "write_file",
  description: "Write content to a file. Overwrites the file if it exists.",
  parameters: {
    type: "OBJECT",
    properties: {
      filePath: {
        type: "STRING",
        description: "Absolute path to the file",
      },
      content: {
        type: "STRING",
        description: "The content to write",
      },
    },
    required: ["filePath", "content"],
  },
};

const tools = {
  functionDeclarations: [runBashDeclaration, readFileDeclaration, write_file_declaration],
};

async function handleDevAgentRequest(task, bot, chatId) {
  // Настраиваем модель с системным промптом и инструментами
  const model = genAI.getGenerativeModel({
    model: LLM_MODEL,
    systemInstruction: SYSTEM_PROMPT,
    tools: [tools],
  });

  // Инициализируем сессию чата
  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: task }],
      },
    ],
  });

  let isTaskComplete = false;
  let loopCount = 0;
  // Убираем искусственный лимит, чтобы агент мог выполнять сверх-долгие задачи (рефакторинг/написание уроков).
  // Оставляем только технический хард-лимит (100) для предотвращения реального бесконечного зацикливания,
  // если LLM вдруг сойдет с ума и начнет вызывать одну и ту же команду вечно.
  const MAX_LOOPS = 100; 
  let currentInput = task;

  while (!isTaskComplete && loopCount < MAX_LOOPS) {
    loopCount++;
    console.log(`[Dev Agent] Loop ${loopCount}...`);

    try {
      // Отправляем сообщение в Gemini
      const result = await chat.sendMessage(currentInput);
      const response = result.response;
      
      // Проверяем, вызвала ли Gemini функцию
      const functionCalls = response.functionCalls();

      if (functionCalls && functionCalls.length > 0) {
        const call = functionCalls[0]; // Обрабатываем первый вызов
        
        // Сохраняем ID сообщения, чтобы потом его удалить или отредактировать
        let statusMessage = null;
        try {
          statusMessage = await bot.sendMessage(chatId, `🛠 Выполняю: ${call.name}...`);
        } catch (e) {
          console.error("Failed to send status message", e);
        }
        
        let toolResult = "";
        
        if (call.name === 'run_bash') {
          const cwd = call.args.workdir || PROJECT_ROOT;
          try {
            const { stdout, stderr } = await execPromise(call.args.command, { cwd });
            toolResult = stdout || stderr || "Command executed successfully (no output).";
          } catch (err) {
            toolResult = `Error: ${err.message}`;
          }
        } 
        else if (call.name === 'read_file') {
          try {
            toolResult = await fs.readFile(call.args.filePath, 'utf-8');
          } catch (err) {
            toolResult = `Error reading file: ${err.message}`;
          }
        }
        else if (call.name === 'write_file') {
          try {
            await fs.mkdir(path.dirname(call.args.filePath), { recursive: true });
            await fs.writeFile(call.args.filePath, call.args.content, 'utf-8');
            toolResult = `Successfully wrote to ${call.args.filePath}`;
          } catch (err) {
            toolResult = `Error writing file: ${err.message}`;
          }
        }

        // Подготавливаем результат выполнения функции для отправки обратно в Gemini
        currentInput = [{
          functionResponse: {
            name: call.name,
            response: {
              result: toolResult.substring(0, 8000) // Ограничиваем вывод
            }
          }
        }];

        // Удаляем статусное сообщение после выполнения инструмента, чтобы не засорять чат
        if (statusMessage) {
          try {
            await bot.deleteMessage(chatId, statusMessage.message_id);
          } catch (e) {
             // Игнорируем ошибку (например, сообщение уже было удалено или прошло слишком много времени)
             console.error("Failed to delete status message", e.message);
          }
        }

      } else {
        // Если функций нет, значит Gemini прислала текстовый ответ
        isTaskComplete = true;
        const replyText = `✅ Отчет:\n\n${response.text() || 'Задача выполнена.'}`;
        
        // Включаем поддержку MarkdownV2 или обычного Markdown для Telegram
        try {
          await bot.sendMessage(chatId, replyText, { parse_mode: 'Markdown' });
        } catch (markdownError) {
          console.warn("Markdown parsing failed, sending as plain text:", markdownError.message);
          // Fallback, если Telegram ругнется на кривой Markdown (такое бывает у ИИ)
          await bot.sendMessage(chatId, replyText);
        }
      }

    } catch (error) {
      console.error('[Dev Agent Error]:', error);
      bot.sendMessage(chatId, `❌ Ошибка Gemini API: ${error.message}`);
      isTaskComplete = true;
    }
  }

  if (loopCount >= MAX_LOOPS) {
    bot.sendMessage(chatId, '⚠️ Агент остановлен: превышен лимит шагов.');
  }
}

module.exports = { handleDevAgentRequest };