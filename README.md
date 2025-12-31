# Gists React Query

A modern React + TypeScript application built from scratch demonstrating best practices for data fetching and state management using React Query.

## Overview

This project showcases a comprehensive implementation of a Gists management application using modern React development patterns with server-state management powered by React Query v3. The application is built entirely from scratch using Webpack and Babel, providing complete control over the build configuration.

## Tech Stack

### Core
- **React 18.2** - UI library
- **TypeScript 4.9** - Type safety
- **React Query 3.39** - Server state management and data fetching

### State Management
- **Redux Toolkit** - Global state management
- **React Query** - Server state and caching

### UI & Styling
- **Material-UI (MUI)** - Component library
- **Styled Components** - CSS-in-JS styling
- **Emotion** - CSS-in-JS foundation

### Forms
- **React Hook Form** - Performant form handling
- **Formik** - Alternative form management
- **Yup** - Schema validation

### Routing
- **React Router v6** - Client-side routing

### Build Tools
- **Webpack 5** - Module bundler
- **Babel** - JavaScript transpiler

### HTTP Client
- **Axios** - Promise-based HTTP client

## Features

- 🚀 Modern React 18 with TypeScript
- 📊 React Query for efficient data fetching and caching
- 🎨 Material-UI components with custom theming
- 📝 Multiple form handling solutions (React Hook Form & Formik)
- 🔄 Redux Toolkit for global state
- 🎯 Type-safe development with TypeScript
- ⚡ Fast development with Webpack Dev Server
- 🏗️ Custom Webpack configuration from scratch

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm start
```

The application will be available at `http://localhost:8080` (or the configured port).

### Production Build

```bash
# Create production build
npm run build
```

## Project Structure

```
src/
├── api/          # API services and endpoints
├── assets/       # Static assets (images, fonts, etc.)
├── components/   # Reusable UI components
├── constants/    # Application constants
├── layout/       # Layout components
├── screens/      # Screen/Page components
├── slices/       # Redux slices
├── store/        # Redux store configuration
├── styles/       # Global styles
├── types/        # TypeScript type definitions
├── utils/        # Utility functions
└── views/        # View components
```

## Key Concepts Demonstrated

1. **React Query Integration** - Efficient server state management with automatic caching, background refetching, and optimistic updates
2. **Custom Webpack Setup** - Complete control over build configuration without Create React App
3. **TypeScript Best Practices** - Type-safe React components and API interactions
4. **Form Management** - Multiple approaches to form handling and validation
5. **Modern State Management** - Combining Redux Toolkit for global state with React Query for server state

## Scripts

- `npm start` - Start development server
- `npm run build` - Create production build
- `npm test` - Run tests (to be configured)

## Contributing

Feel free to submit issues and enhancement requests!

## License

ISC
