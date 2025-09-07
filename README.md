# Node Express Store

### 📋 Prerequisites

- npm or yarn package manager
- Docker and Docker Compose

### 1. Clone the repository

```bash
git clone https://github.com/a-medeiros/node-express-store.git
cd node-express-store
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` and `.env.test` file in the root directory.

### 4. Start the database

```bash
docker-compose up -d
```

### 5. Run database migrations

```bash
npx prisma migrate deploy
```

### 6. Start the development server

```bash
npm run dev
```

### 7. Opens a GUI for your database where you can view, create, update, and delete data easily.
```
npx prisma studio
```

The API will be available at `http://localhost:3000`
