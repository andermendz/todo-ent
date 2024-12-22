
# Task Management Application

A modern application built with React, TypeScript, and JSON Server.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd task-management-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

### Local Development

1. Start the JSON Server (local database):
   ```bash
   npm run server
   ```
   This will start JSON Server on [http://localhost:3001](http://localhost:3001).

2. In a new terminal, start the development server:
   ```bash
   npm run dev
   ```
   The application will be available at [http://localhost:5173](http://localhost:5173).

## Deployment

The application is split into two parts for deployment:

### Backend (JSON Server)
- Deployed on Railway.
- Uses the same `json-server` as local development.
- Provides REST API endpoints for todos.

### Frontend
- Deployed on Vercel.
- Automatically connects to the Railway backend.
- Uses environment variables to manage API URLs.

## 📱 Responsive Design

- **Desktop:** Full functionality with both List and Board views.
- **Mobile:** Optimized List view only.
- Automatic view switching based on screen size.

## 🔒 Data Persistence

- **Development:** Data stored in local `db.json` using JSON Server.
- **Production:** Data stored in Railway's persistent storage.

## API Endpoints

The following endpoints are available in both local and production environments:

- `GET /todos` - Get all todos.
- `POST /todos` - Create a new todo.
- `PATCH /todos/:id` - Update a todo.
- `DELETE /todos/:id` - Delete a todo.

## Environment Variables

### Development
```env
VITE_API_URL=http://localhost:3001
```

### Production
```env
VITE_API_URL=https://your-railway-url.railway.app
```

## Local vs Production

### Local Development
- Uses local JSON Server (`npm run server`).
- Data stored in local `db.json`.
- API accessible at [http://localhost:3001](http://localhost:3001).

### Production
- JSON Server hosted on Railway.
- Data persisted in Railway's storage.
- API accessible at your Railway URL.
- Frontend hosted on Vercel.

## Troubleshooting

### Local Issues
1. Ensure port `3001` is available.
2. Check if `db.json` exists in the root directory.
3. Try restarting the server with:
   ```bash
   npm run server
   ```

### Production Issues
1. Verify Railway deployment is active.
2. Check Vercel environment variables.
3. Confirm CORS settings in server code.
``` 

Let me know if you need any further tweaks!
