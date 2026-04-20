require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const { handleDevAgentRequest } = require('./agents/devAgent');

// Настройка Telegram
const token = process.env.TELEGRAM_BOT_TOKEN;
const allowedChatId = process.env.TELEGRAM_ALLOWED_CHAT_ID;
const bot = new TelegramBot(token, { polling: true });

console.log('🤖 Agent Hub is running...');

// Обработка всех входящих сообщений
bot.on('message', async (msg) => {
  const chatId = msg.chat.id.toString();
  const text = msg.text;

  // Безопасность: общаемся только с тобой
  if (chatId !== allowedChatId) {
    console.log(`Unauthorized access attempt from chat ID: ${chatId}`);
    return;
  }

  if (!text) return;

  // Маршрутизация (Routing)
  try {
    if (text.startsWith('/dev ')) {
      // Отправляем задачу Dev-Агенту (Ники)
      const task = text.replace('/dev ', '');
      bot.sendMessage(chatId, '🦊 Dev-Агент (Ники) принял задачу. Думаю...');
      await handleDevAgentRequest(task, bot, chatId);
    } 
    else if (text.startsWith('/content ')) {
      // Заглушка для будущего контент-агента
      bot.sendMessage(chatId, '📝 Content-Агент пока в разработке!');
    }
    else if (text === '/start' || text === '/help') {
      bot.sendMessage(chatId, 
        '👋 Привет, Босс! Я твой Хаб Агентов.\n\n' +
        'Доступные команды:\n' +
        '/dev <задача> - Отправить задачу разработчику (код, git, bash)\n' +
        '/content <тема> - (Скоро) Написать урок\n'
      );
    }
    else {
      bot.sendMessage(chatId, 'Неизвестная команда. Напиши /help');
    }
  } catch (error) {
    console.error('Error handling message:', error);
    bot.sendMessage(chatId, `❌ Ошибка: ${error.message}`);
  }
});