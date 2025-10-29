// index.js
import TelegramBot from 'node-telegram-bot-api';
import Database from 'better-sqlite3';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

// ----------------------------
// Configuração do Bot
// ----------------------------
const BOT_TOKEN = process.env.BOT_TOKEN;
const BOT_OWNER_ID = process.env.BOT_OWNER_ID;

if (!BOT_TOKEN) throw new Error('Coloque seu BOT_TOKEN no .env');

const bot = new TelegramBot(BOT_TOKEN, { polling: true });
const db = new Database('promo_store.db');

// Criar tabela de cupons, se não existir
db.prepare(`
  CREATE TABLE IF NOT EXISTS coupons (
    code TEXT PRIMARY KEY,
    type TEXT,
    value REAL,
    used_by TEXT
  )
`).run();

// ----------------------------
// Comandos do Bot
// ----------------------------

// /start
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, `Olá ${msg.from.first_name}! 🤖\nComandos disponíveis:\n/Amazon\n/Hotmart\n/MercadoLivre\n/Shopee\n/promo <CUPOM>`);
});

// /promo
bot.onText(/\/promo (.+)/, (msg, match) => {
  const code = match[1].toUpperCase();
  const user = msg.from.username || msg.from.first_name;
  const coupon = db.prepare('SELECT * FROM coupons WHERE code = ?').get(code);

  if (!coupon) return bot.sendMessage(msg.chat.id, '⚠️ Cupom não encontrado.');

  const usedByList = coupon.used_by ? coupon.used_by.split(',') : [];
  if (usedByList.includes(user)) {
    return bot.sendMessage(msg.chat.id, '⚠️ Você já usou este cupom.');
  }

  usedByList.push(user);
  db.prepare('UPDATE coupons SET used_by = ? WHERE code = ?').run(usedByList.join(','), code);
  bot.sendMessage(msg.chat.id, `✅ Cupom ${code} aplicado!`);
});

// /createpromo (admin)
bot.onText(/\/createpromo (\w+) (percent|fixed) (\d+)/, (msg, match) => {
  const userId = msg.from.id.toString();
  if (userId !== BOT_OWNER_ID) return bot.sendMessage(msg.chat.id, '⚠️ Apenas o admin pode criar cupons.');

  const [_, code, type, value] = match;
  try {
    db.prepare('INSERT INTO coupons (code, type, value, used_by) VALUES (?, ?, ?, ?)').run(code.toUpperCase(), type, parseFloat(value), '');
    bot.sendMessage(msg.chat.id, `✅ Cupom ${code.toUpperCase()} criado!`);
  } catch {
    bot.sendMessage(msg.chat.id, '⚠️ Erro ao criar cupom (já existe).');
  }
});

// ----------------------------
// Mock de Produtos
// ----------------------------
bot.onText(/\/Amazon/, (msg) => {
  bot.sendMessage(msg.chat.id, `Produtos mock Amazon:\n1. Fone Bluetooth - R$129,90\n2. Smartwatch - R$219,90`);
});

bot.onText(/\/Hotmart/, (msg) => {
  bot.sendMessage(msg.chat.id, `Cursos mock Hotmart:\n1. Curso JS - R$99,90\n2. Curso Python - R$149,90`);
});

bot.onText(/\/MercadoLivre/, (msg) => {
  bot.sendMessage(msg.chat.id, `Produtos mock ML:\n1. Notebook - R$2500\n2. Cadeira Gamer - R$1200`);
});

bot.onText(/\/Shopee/, (msg) => {
  bot.sendMessage(msg.chat.id, `Produtos mock Shopee:\n1. Mochila - R$89,90\n2. Fone - R$79,90`);
});

// ----------------------------
// Servidor Express para Painel
// ----------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// API listar cupons
app.get('/api/coupons', (req, res) => {
  const coupons = db.prepare('SELECT code, type, value, used_by FROM coupons').all();
  res.json(coupons);
});

// API criar cupom
app.post('/api/coupons', (req, res) => {
  const { code, type, value } = req.body;
  try {
    db.prepare('INSERT INTO coupons (code, type, value, used_by) VALUES (?, ?, ?, ?)').run(code.toUpperCase(), type, value, '');
    res.json({ success: true });
  } catch {
    res.json({ success: false, error: 'Cupom já existe' });
  }
});

// Start Express
app.listen(8080, () => console.log('🌐 Painel rodando em http://localhost:8080'));


