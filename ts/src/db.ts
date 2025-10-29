import Database from 'better-sqlite3';
const db = new Database(process.env.DB_PATH || 'promo_store.db');

db.prepare(`CREATE TABLE IF NOT EXISTS coupons (
  code TEXT PRIMARY KEY,
  type TEXT,
  value REAL,
  used_by TEXT
)`).run();

export function createCoupon(code: string, type: string, value: number) {
  try {
    db.prepare('INSERT INTO coupons (code, type, value, used_by) VALUES (?, ?, ?, ?)').run(code, type, value, '');
    return true;
  } catch (e) {
    return false;
  }
}

export function validateCoupon(code: string, userId: string) {
  const row = db.prepare('SELECT * FROM coupons WHERE code = ?').get(code);
  if (!row) return { success: false, message: '❌ Código inválido.' };
  const usedBy = row.used_by || '';
  const usedList = usedBy ? usedBy.split(',') : [];
  if (usedList.includes(String(userId))) return { success: false, message: '⚠️ Você já usou este cupom.' };
  usedList.push(String(userId));
  db.prepare('UPDATE coupons SET used_by = ? WHERE code = ?').run(usedList.join(','), code);
  return { success: true, message: '✅ Cupom aplicado!' };
}
