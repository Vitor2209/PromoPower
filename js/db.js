const Database = require('better-sqlite3');
const dbFile = process.env.DB_PATH || 'promo_store.db';
const db = new Database(dbFile);

db.prepare(`CREATE TABLE IF NOT EXISTS coupons (
  code TEXT PRIMARY KEY,
  type TEXT,
  value REAL,
  used_by TEXT
)`).run();

function createCoupon(code, type, value) {
  try {
    db.prepare('INSERT INTO coupons (code, type, value, used_by) VALUES (?, ?, ?, ?)').run(code, type, value, '');
    return true;
  } catch (e) {
    return false;
  }
}

function validateCoupon(code, userId) {
  const row = db.prepare('SELECT * FROM coupons WHERE code = ?').get(code);
  if (!row) return { success: false, message: '❌ Código inválido.' };
  const usedBy = row.used_by || '';
  const usedList = usedBy ? usedBy.split(',') : [];
  if (usedList.includes(String(userId))) return { success: false, message: '⚠️ Você já usou este cupom.' };
  usedList.push(String(userId));
  db.prepare('UPDATE coupons SET used_by = ? WHERE code = ?').run(usedList.join(','), code);
  return { success: true, message: '✅ Cupom aplicado!' };
}

module.exports = { createCoupon, validateCoupon };
