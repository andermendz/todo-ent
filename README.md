# Task Management Application

A modern task management application built with React, TypeScript, and Redux Toolkit, featuring a responsive design and intuitive user interface.

## ✨ Features

### 📋 Dual View Modes
- **List View:** Traditional task list with filtering options.
- **Board View:** Kanban-style board with drag-and-drop functionality (Desktop only).

### 🎯 Task Management
- Create, edit, and delete tasks.
- Status tracking: "To Do," "In Progress," "Done."
- Drag-and-drop task organization (Board view).

### 🔄 Status Management
- Visual status indicators.
- Quick status updates.
- Status-based filtering (List view).

### 🎨 Modern UI/UX
- Clean, intuitive interface.
- Smooth animations and transitions.
- Responsive design for all devices.

### 🌓 Theme Support
- Light/Dark mode toggle.
- Persistent theme preference storage.

### ♿ Accessibility
- ARIA labels and roles for enhanced usability.
- Keyboard navigation for non-mouse users.
- Screen reader support for visually impaired users.

### 🧪 Testing Coverage
- Component unit tests.
- Integration tests for workflows.
- API interaction tests.
- Accessibility testing.
- Mock service worker (MSW) for API simulation.

### 🏭 Task Factory
- Generate sample tasks dynamically.
- Randomized task combinations.
- Realistic task descriptions.
- Automatic status distribution.
- Quick data population for testing and demos.

## 🛠 Tech Stack

### **Frontend**
- React 18
- TypeScript
- Redux Toolkit
- Tailwind CSS
- @hello-pangea/dnd (Drag and Drop)
- Heroicons

### **Form Management**
- Formik for forms.
- Yup for validation.

### **Testing**
- Vitest for unit and integration testing.
- React Testing Library for component testing.
- MSW for API mocking.
- Jest DOM for DOM testing utilities.

### **Development Tools**
- Vite for fast builds and development.
- ESLint for code quality.
- JSON Server (Mock API) for development backend.
- Task Factory for generating sample data.

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher).
- npm or yarn.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd task-management-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

1. Start the mock API server:
   ```bash
   npm run server
   ```
   This will start JSON Server on [http://localhost:3001](http://localhost:3001).

2. In a new terminal, start the development server:
   ```bash
   npm run dev
   ```
   The application will be available at [http://localhost:5173](http://localhost:5173).

## 📱 Responsive Design

- **Desktop:** Full functionality with both List and Board views.
- **Mobile:** Optimized List view only.
- Automatic view switching based on screen size.

## 🔒 Data Persistence

- **Development:** Data stored in the local `db.json` file using JSON Server.
- **Production:** Data stored in Railway's persistent storage (if configured).

## 🌐 Local vs Production

### Local Development
- Uses local JSON Server (`npm run server`).
- Data stored in a local `db.json` file.
- API accessible at [http://localhost:3001](http://localhost:3001).
- Frontend runs on Vite's development server at [http://localhost:5173](http://localhost:5173).

### Production
- **Backend:** JSON Server hosted on Railway with persistent storage.
- **Frontend:** Deployed on Vercel.
- Automatically connects to the Railway backend via environment variables.
- API accessible at the Railway URL.

## Environment Variables

### Development
```env
VITE_API_URL=http://localhost:3001
```

### Production
```env
VITE_API_URL=https://your-railway-url.railway.app
```

## API Endpoints

The following endpoints are available in both local and production environments:

- `GET /todos` - Retrieve all tasks.
- `POST /todos` - Create a new task.
- `PATCH /todos/:id` - Update a specific task.
- `DELETE /todos/:id` - Delete a specific task.

## Troubleshooting

### Local Issues
1. Ensure port `3001` is available.
2. Verify that the `db.json` file exists in the root directory.
3. Restart the server with:
   ```bash
   npm run server
   ```

### Production Issues
1. Ensure Railway deployment is active.
2. Verify that Vercel's environment variables are correctly set.
3. Confirm CORS settings in the server configuration.
