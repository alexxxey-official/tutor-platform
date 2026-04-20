const { GoogleGenerativeAI } = require('@google/generative-ai');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);
const fs = require('fs/promises');

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
2. If you need to build the project, run 'npm run build'.
3. Always verify your changes before reporting back.
4. Keep your final response to the user concise and report what you did.
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

const tools = {
  functionDeclarations: [runBashDeclaration, readFileDeclaration],
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
  const MAX_LOOPS = 8;
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
        bot.sendMessage(chatId, `🛠 Выполняю: ${call.name}...`);
        
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

        // Подготавливаем результат выполнения функции для отправки обратно в Gemini
        currentInput = [{
          functionResponse: {
            name: call.name,
            response: {
              result: toolResult.substring(0, 8000) // Ограничиваем вывод
            }
          }
        }];

      } else {
        // Если функций нет, значит Gemini прислала текстовый ответ
        isTaskComplete = true;
        bot.sendMessage(chatId, `✅ Отчет:\n\n${response.text() || 'Задача выполнена.'}`);
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