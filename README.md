# idmontie.github.io

A personal website and blog built with Next.js, Nx, and Storybook.

## Project Structure

The project is organized as a monorepo using Nx, with the following main directories:

- `packages/main`: The main Next.js application
- `packages/main-e2e`: End-to-end tests for the main application
- `.storybook`: Storybook configuration for component development
- `dist`: Build output directory

## Prerequisites

- Node.js >= 20.0.0
- npm (comes with Node.js)

## Getting Started

1. Install dependencies:

```bash
npm ci
```

2. Start the development server:

```bash
npm run start
```

The application will be available at `http://localhost:4200`.

## Available Scripts

- `npm run start`: Start the development server
- `npm run build`: Build the application
- `npm run export`: Export the static site
- `npm run e2e`: Run end-to-end tests
- `npm run lint`: Run linting checks
- `npm run test`: Run unit tests

## Technology Stack

- [Nx](https://nx.dev) - Monorepo tooling
- [Next.js](https://nextjs.org) - React framework
- [Storybook](https://storybook.js.org) - Component development
- [TailwindCSS](https://tailwindcss.com) - Styling
- [MDX](https://mdxjs.com) - Markdown with JSX
- [React Query](https://tanstack.com/query) - Data fetching
- [Jest](https://jestjs.io) - Testing
- [Cypress](https://www.cypress.io) - E2E testing

## Development

The project uses several development tools:

- ESLint for code linting
- Prettier for code formatting
- Husky for git hooks
- TypeScript for type safety

## Contributing

1. Make sure you have the correct Node.js version installed (check `.nvmrc`)
2. Install dependencies with `npm ci`
3. Create a new branch for your changes
4. Make your changes
5. Run tests and linting
6. Submit a pull request

## License

MIT
