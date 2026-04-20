const OpenAI = require('openai');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);
const fs = require('fs/promises');
const path = require('path');

// Инициализация API клиента (совместимо с OpenAI, OpenRouter, OpenClaw и др.)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1',
});

const PROJECT_ROOT = process.env.PROJECT_ROOT_PATH || process.cwd();

// Системный промпт (Душа Агента)
const SYSTEM_PROMPT = `
You are Nikki, a senior software engineer agent. 
You are autonomous. You have access to the server's terminal and file system.
Your current working directory is: ${PROJECT_ROOT}

Follow these rules:
1. When asked to fix or implement something, USE YOUR TOOLS (functions) to explore the codebase, edit files, and run commands.
2. If you need to build the project, run 'npm run build'.
3. Always verify your changes before reporting back.
4. Keep your final response to the user concise and report what you did.
`;

// Доступные инструменты (Functions)
const tools = [
  {
    type: 'function',
    function: {
      name: 'run_bash',
      description: 'Run a shell command on the server.',
      parameters: {
        type: 'object',
        properties: {
          command: { type: 'string', description: 'The bash command to run' },
          workdir: { type: 'string', description: 'Working directory (optional)' }
        },
        required: ['command']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'read_file',
      description: 'Read contents of a file.',
      parameters: {
        type: 'object',
        properties: {
          filePath: { type: 'string', description: 'Absolute path to the file' }
        },
        required: ['filePath']
      }
    }
  }
];

// Основной цикл Агента
async function handleDevAgentRequest(task, bot, chatId) {
  let messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    { role: 'user', content: task }
  ];

  let isTaskComplete = false;
  let loopCount = 0;
  const MAX_LOOPS = 10; // Защита от бесконечного цикла

  while (!isTaskComplete && loopCount < MAX_LOOPS) {
    loopCount++;
    console.log(`[Dev Agent] Loop ${loopCount}...`);

    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4-turbo-preview', // Замени на нужную модель твоего провайдера
        messages: messages,
        tools: tools,
        tool_choice: 'auto'
      });

      const message = response.choices[0].message;
      messages.push(message);

      // Если модель хочет использовать инструмент
      if (message.tool_calls) {
        bot.sendMessage(chatId, `🛠 Выполняю инструмент: ${message.tool_calls[0].function.name}...`);
        
        for (const toolCall of message.tool_calls) {
          const functionName = toolCall.function.name;
          const args = JSON.parse(toolCall.function.arguments);
          let toolResult = "";

          if (functionName === 'run_bash') {
            const cwd = args.workdir || PROJECT_ROOT;
            try {
              const { stdout, stderr } = await execPromise(args.command, { cwd });
              toolResult = stdout || stderr || "Command executed successfully (no output).";
            } catch (err) {
              toolResult = `Error: ${err.message}`;
            }
          } 
          else if (functionName === 'read_file') {
            try {
              toolResult = await fs.readFile(args.filePath, 'utf-8');
            } catch (err) {
              toolResult = `Error reading file: ${err.message}`;
            }
          }

          // Возвращаем результат инструмента обратно модели
          messages.push({
            tool_call_id: toolCall.id,
            role: 'tool',
            name: functionName,
            content: toolResult.substring(0, 4000) // Ограничиваем длину вывода
          });
        }
      } else {
        // Если инструментов нет, значит агент сформировал финальный текстовый ответ
        isTaskComplete = true;
        bot.sendMessage(chatId, `✅ Отчет Dev-Агента:\n\n${message.content}`);
      }

    } catch (error) {
      console.error('[Dev Agent Error]:', error);
      bot.sendMessage(chatId, `❌ Ошибка в цикле агента: ${error.message}`);
      isTaskComplete = true;
    }
  }

  if (loopCount >= MAX_LOOPS) {
    bot.sendMessage(chatId, '⚠️ Агент остановлен: превышен лимит шагов (предотвращение зацикливания).');
  }
}

module.exports = { handleDevAgentRequest };