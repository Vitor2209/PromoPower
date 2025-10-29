 **como deixar o bot online 24 horas**, sem precisar deixar o computador ligado.

---

# 🟢 README — VERSÃO JAVASCRIPT (`/js`)

---

## 🧠 O que é?

Um **bot de loja para o Telegram**, feito em **Node.js (JavaScript)**, que mostra produtos da **Amazon, Mercado Livre, Shopee e Hotmart**, e permite aplicar **cupons de desconto**.

---

## ⚙️ Passo a passo para rodar

### 1️⃣ Instale o Node.js

Baixe e instale o **Node.js (LTS)** em:
👉 [https://nodejs.org/](https://nodejs.org/)

Depois de instalar, teste no terminal:

```bash
node -v
```

---

### 2️⃣ Vá para a pasta do projeto

```bash
cd promo-store-bot-v2/js
```

---

### 3️⃣ Instale as dependências

```bash
npm install
```

---

### 4️⃣ Configure o arquivo `.env`

Copie o arquivo de exemplo:

```bash
cp .env.example .env
```

Abra o `.env` e preencha:

```env
BOT_TOKEN=1234567890:ABCDEFGHIJKL_yoursecrettoken
BOT_OWNER_ID=123456789
AMAZON_API_KEY=sua_chave_amazon
HOTMART_API_KEY=sua_chave_hotmart
SHOPEE_API_KEY=sua_chave_shopee
MERCADOLIVRE_API_KEY=sua_chave_ml
```

---

### 5️⃣ Obtenha seu token do Telegram

1. No Telegram, procure o [@BotFather](https://t.me/BotFather)
2. Envie: `/newbot`
3. Ele dará um token, ex:

   ```
   1234567890:ABCDEFghijkLMNOPQrstuv
   ```
4. Cole esse token no `.env` → `BOT_TOKEN`

---

### 6️⃣ Descubra seu ID do Telegram

Use o bot [@userinfobot](https://t.me/userinfobot)
Ele dirá algo como:

```
Your ID: 987654321
```

Cole no `.env` → `BOT_OWNER_ID=987654321`

---

### 7️⃣ Rodar o bot 🚀

```bash
npm start
```

Se aparecer:

```
Bot rodando...
```

✅ Pronto! O bot está ativo.

Abra o Telegram e envie:

```
/start
```

---

### 8️⃣ Comandos do bot

| Comando                               | Descrição               |
| ------------------------------------- | ----------------------- |
| `/start`                              | Menu inicial            |
| `/Amazon`                             | Produtos mock da Amazon |
| `/Hotmart`                            | Cursos mock da Hotmart  |
| `/MercadoLivre`                       | Produtos mock da ML     |
| `/Shopee`                             | Produtos mock da Shopee |
| `/promo <CUPOM>`                      | Usa cupom               |
| `/createpromo <CUPOM> <tipo> <valor>` | Cria cupom (admin)      |

---

### 9️⃣ Criar cupom de teste

Como admin:

```
/createpromo BLACK10 percent 10
```

Depois teste:

```
/promo BLACK10
```

---

### 🔐 10️⃣ Dicas rápidas

* Não compartilhe o `.env`
* Backup do banco: `promo_store.db`
* Parar o bot: `Ctrl + C`

---

## ☁️ 11️⃣ Deixar o bot online 24h

### 🧰 Opção 1 — **Railway.app** (fácil e grátis)

1. Vá em [https://railway.app](https://railway.app)
2. Clique em **Start a New Project → Deploy from GitHub**
3. Conecte seu repositório (ou envie os arquivos ZIP)
4. Configure as variáveis do `.env` no painel (Settings → Variables)
5. Railway detecta `package.json` e roda `npm start` automaticamente

✅ Pronto! O bot ficará online 24h.

---

### ☁️ Opção 2 — **Render.com**

1. Vá em [https://render.com](https://render.com)
2. Clique em **New + → Web Service**
3. Suba o código do projeto
4. Configure o comando de inicialização:

   ```
   npm start
   ```
5. Adicione as variáveis de ambiente `.env` no painel

---

### 💻 Opção 3 — VPS ou PC com PM2

1. Instale PM2:

   ```bash
   npm install -g pm2
   ```
2. Inicie o bot:

   ```bash
   pm2 start index.js --name promo-bot
   ```
3. Para listar ou parar:

   ```bash
   pm2 list
   pm2 stop promo-bot
   ```

---

---

# 🔵 README — VERSÃO TYPESCRIPT (`/ts`)

---

## 🧠 O que é?

O mesmo bot, mas escrito em **TypeScript** — com tipagem e estrutura mais profissional.

---

## ⚙️ Passo a passo

### 1️⃣ Instale Node.js

👉 [https://nodejs.org/](https://nodejs.org/)
Teste:

```bash
node -v
```

---

### 2️⃣ Vá para a pasta TypeScript

```bash
cd promo-store-bot-v2/ts
```

---

### 3️⃣ Instale dependências

```bash
npm install
```

---

### 4️⃣ Configure o `.env`

Copie o exemplo:

```bash
cp .env.example .env
```

Edite:

```env
BOT_TOKEN=1234567890:ABCDEFGHIJKL_yoursecrettoken
BOT_OWNER_ID=123456789
AMAZON_API_KEY=sua_chave_amazon
HOTMART_API_KEY=sua_chave_hotmart
SHOPEE_API_KEY=sua_chave_shopee
MERCADOLIVRE_API_KEY=sua_chave_ml
```

---

### 5️⃣ Rodar o bot

#### Opção A — direto com ts-node

```bash
npm install -g ts-node typescript
ts-node src/index.ts
```

#### Opção B — compilar e rodar

```bash
npm run build
npm start
```

---

### 6️⃣ Testar o bot

Abra o Telegram e envie:

```
/start
```

---

### 7️⃣ Criar cupom de teste

```
/createpromo BLACK10 percent 10
```

Teste:

```
/promo BLACK10
```

---

### ☁️ 8️⃣ Deixar online 24h

#### 🚀 Railway

1. Acesse [https://railway.app](https://railway.app)
2. Crie um projeto e envie a pasta `/ts`
3. Configure as variáveis do `.env`
4. Railway vai detectar `npm run build` e `npm start`

---

#### ☁️ Render.com

1. Vá em [https://render.com](https://render.com)
2. Crie um novo **Web Service**
3. Configure:

   * **Build Command:** `npm run build`
   * **Start Command:** `npm start`
4. Adicione variáveis de ambiente `.env`

---

#### 💻 VPS com PM2

```bash
npm run build
pm2 start dist/index.js --name promo-bot-ts
```

---

✅ **Agora o bot fica ativo 24 horas!**
Você pode ver logs em:

```bash
pm2 logs promo-bot-ts
```

---

### 💾 Extras

* Banco de dados: `promo_store.db`
* Código principal: `src/index.ts`
* Logs e erros aparecem no console
* Você pode mudar nome, foto e descrição no [@BotFather](https://t.me/BotFather)

---

