# Task Management Application

A modern task management application built with React, Typeript, and Redux Toolkit, featuring a responsive design and intuitive user interface.

## ✨ Features

### 📋 Dual View Modes
* List View: Traditional task list with filtering options
* Board View: Kanban-style board with drag-and-drop (Desktop only)

### 🎯 Task Management
* Create, edit, and delete tasks
* Status tracking: "To Do", "In Progress", "Done"
* Drag-and-drop task organization (Board view)

### 🔄 Status Management
* Visual status indicators
* Quick status updates
* Status-based filtering (List view)

### 🎨 Modern UI/UX
* Clean, intuitive interface
* Smooth animations and transitions
* Responsive design

### 🌓 Theme Support
* Light/Dark mode toggle
* Persistent theme preference

### ♿ Accessibility
* ARIA labels and roles
* Keyboard navigation
* Screen reader support

## 🛠 Tech Stack

### **Frontend**
* React 18
* TypeScript
* Redux Toolkit
* Tailwind CSS
* @hello-pangea/dnd (Drag and Drop)
* Heroicons

### **Form Management**
* Formik
* Yup validation

### **Development**
* Vite
* ESLint
* JSON Server (Mock API)

## 🚀 Getting Started

### Prerequisites
* Node.js (v16 or higher)
* npm or yarn

### Installation

1. Clone the repository
\```bash
git clone <repository-url>
cd task-management-app
\```

2. Install dependencies
\```bash
npm install
\```

### Running the Application

1. Start the mock API server
\```bash
npm run server
\```
This will start JSON Server on http://localhost:3001

2. In a new terminal, start the development server
\```bash
npm run dev
\```
The application will be available at http://localhost:5173

## 📱 Responsive Design

* Desktop: Full functionality with both List and Board views
* Mobile: Optimized List view only
* Automatic view switching based on screen size

## 🔒 Data Persistence

* Tasks are stored in a local JSON server