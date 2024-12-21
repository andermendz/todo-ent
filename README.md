# Todo Application

A modernodo application built with React, TypeScript, and Redux Toolkit.

## Features

* ✨ Create, read, update, and delete todos
* 🔄 Status management (Todo, Doing, Done) 
* ✅ Approval workflow for completing todos
* 🌓 Dark/Light theme support
* 🎯 Status-based filtering
* 📱 Responsive design

## Architecture

* React 18 with TypeScript
* Redux Toolkit for state management
* Component-based architecture
* Tailwind CSS for styling
* JSON Server for mock API

## Tech Stack

* React 18
* TypeScript
* Redux Toolkit
* Formik & Yup for form management
* Axios for API calls
* Tailwind CSS
* ESLint for code quality

## Setup & Running the Application

### Prerequisites

* Node.js (v16 or higher)
* npm or yarn

### Installation

1. Clone the repository
\```bash
git clone <repository-url>
cd todo-application
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

### Available Scripts

* `npm run dev` - Start development server
* `npm run server` - Start JSON Server (mock API)
* `npm run build` - Build for production
* `npm run lint` - Run ESLint

## Features Implementation

### State Management

* Centralized state with Redux Toolkit
* Async operations handling with createAsyncThunk
* Loading and error states management

### API Integration

* Axios for API communication
* JSON Server for mock API
* Error handling and loading states

### User Experience

* Responsive design with Tailwind CSS
* Dark/Light theme support with persistent storage
* Form validation with Formik and Yup
* Loading and error states

## Project Structure

\```
src/
├── components/ # Reusable UI components
├── store/ # Redux store and slices
├── services/ # API services
├── hooks/ # Custom React hooks
└── types/ # TypeScript type definitions
\```