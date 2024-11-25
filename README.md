# jbl-web
 
---

# Application strucutre

This project is a boilerplate for building React applications. It includes a robust setup with TypeScript, React Router, Redux Toolkit, Ant Design, and several development tools like Husky, Biome, and TailwindCSS. Vite


## Getting Started

### Prerequisites

Before you begin, ensure you have installed the following:

- [Node.js](https://nodejs.org/) (>=18.x)
- [npm](https://www.npmjs.com/)

### Installation

Clone the repository:

```bash
git clone repo-link
cd folder
```

Install the dependencies:

```bash
npm install
# or
yarn install
```

### Running the Application

Start the development server:

```bash
npm start
# or
yarn start
```

The application will be available at `http://localhost:4200`.

## Libraries

- **React 18**: Modern React features including hooks and concurrent mode.
- **TypeScript**: Type-safe development with TypeScript.
- **React Router**: Declarative routing for React applications.
- **Redux Toolkit**: State management with simplified Redux development.
- **Ant Design**: A comprehensive UI framework with a set of high-quality React components.
- **TailwindCSS**: Utility-first CSS framework for rapid UI development.
- **BiomeJS**: Integrated tool for linting and formatting.
- **Husky**: Git hooks for enforcing pre-commit linting and formatting.


## Available Scripts

In the project directory, you can run the following scripts:

### Development

- `npm start`: Starts the development server on `http://localhost:4200`.
  
### Testing

- `npm test`: Runs the test suite with coverage reporting.

### Production Build

- `npm run build`: Builds the app for production.

### Environment-Specific Builds

- `npm run devBuild`: Builds the app for the development environment.
- `npm run testBuild`: Builds the app for the test environment.
- `npm run stageBuild`: Builds the app for the staging environment.

### Linting & Formatting

- `npm run lint:biome`: Runs Biome to check for linting issues.
- `npm run lint:fix`: Runs Biome to fix linting issues.

### Husky

Husky is used to run linting and formatting checks before commits. To ensure all checks pass, use:

```bash
npm run prepare
```

This sets up Husky and Git hooks.


## Building for Production

To create a production build of the app:

```bash
npm run build
```

The build will be output to the `build/` directory, optimized for best performance.

## Linting & Code Formatting

BiomeJS is used to ensure code quality and consistency. Biome checks are automatically run before each commit thanks to Husky. You can also manually run the checks:

- `npm run lint:biome`: Run lint checks.
- `npm run lint:fix`: Automatically fix linting issues.



---
