import 'dotenv/config';
import { Telegraf, Markup } from 'telegraf';
import * as db from './db';
import { searchAmazonMock, generateAffiliateFromASIN } from './amazon';
import { getHotmartMock } from './hotmart';
import { getMLProducts } from './mercadolivre';
import { getShopeeMock } from './shopee';

const BOT_TOKEN = process.env.BOT_TOKEN as string;
const BOT_OWNER_ID = Number(process.env.BOT_OWNER_ID || 0);
if (!BOT_TOKEN) {
  console.error('Defina BOT_TOKEN em .env');
  process.exit(1);
}
const bot = new Telegraf(BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply('🛒 Bem-vindo! Use /Amazon /Hotmart /MercadoLivre /Shopee ou /promo <CÓDIGO>');
});

bot.command('Amazon', async (ctx) => {
  const products = await searchAmazonMock('promo');
  for (const p of products) {
    await ctx.replyWithPhoto(p.image, {
      caption: `*${p.title}*\nPreço: ${p.currency} ${Number(p.price).toFixed(2)}`,
      parse_mode: 'Markdown',
      ...Markup.inlineKeyboard([
        Markup.button.url('Comprar (Afiliado)', generateAffiliateFromASIN(p.asin)),
        Markup.button.callback('Aplicar Cupom', `APPLY_AMZ_${p.asin}`)
      ])
    });
  }
});

bot.command('Hotmart', async (ctx) => {
  const products = await getHotmartMock();
  for (const p of products) {
    await ctx.replyWithPhoto(p.image, {
      caption: `*${p.title}*\nPreço: ${p.currency} ${Number(p.price).toFixed(2)}`,
      parse_mode: 'Markdown',
      ...Markup.inlineKeyboard([
        Markup.button.url('Comprar (Afiliado)', p.affiliate_link),
        Markup.button.callback('Aplicar Cupom', `APPLY_HOT_${p.id}`)
      ])
    });
  }
});

bot.command('MercadoLivre', async (ctx) => {
  const products = await getMLProducts('smartwatch');
  let text = '🛒 Mercado Livre:\n';
  for (const p of products) {
    text += `\n• ${p.title}\n💰 ${p.price}\n🔗 ${p.link}\n`;
  }
  ctx.reply(text);
});

bot.command('Shopee', async (ctx) => {
  const products = await getShopeeMock();
  let text = '🛍️ Shopee:\n';
  for (const p of products) {
    text += `\n• ${p.title}\n💰 ${p.price}\n🔗 ${p.link}\n`;
  }
  ctx.reply(text);
});

bot.command('promo', (ctx) => {
  const parts = ctx.message.text.split(/\s+/);
  if (parts.length < 2) return ctx.reply('Use /promo <CÓDIGO>');
  const code = parts[1].toUpperCase();
  const res = db.validateCoupon(code, String(ctx.from.id));
  ctx.reply(res.message);
});

bot.launch().then(() => console.log('Bot rodando...'));
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
