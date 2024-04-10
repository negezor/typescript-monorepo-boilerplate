# TypeScript Monorepo Boilerplate
> Pure ESM monorepo using native TypeScript compiler instead of external bundlers 🌟

### Requirements
> **[Node.js](https://nodejs.org/) 20.12.2 or newer is required**

> **[NPM](http://npm.im/npm) 10.5.1 or newer is required**

### Initialization
```
git clone https://github.com/negezor/typescript-monorepo-boilerplate.git
cd typescript-monorepo-boilerplate
npm install
npm run build
```

### Configuration
#### Change namespace name
- In `tsconfig.json`, change the `paths` from `@template` to the one you need
- Change the namespace in the `name` property of the` package.json` file of each module

#### Add or remove packages folder
- In `package.json`, change `workspaces` and path in scripts `lint:biome` & `typescript:clean`
- In `tsconfig.json`, change the `paths`
- In `.gitignore`, change the `# Build` place
- In `jest.config.json`, change the `testMatch` pattern
- Run `npm run update:tsconfig` for update tsconfig references

### Add new package
- Copy template structure
- Run `npm run update:tsconfig` for update tsconfig references
- Run `npm install` for create new symlinks in node_modules

### Add internal dependency
- Add to `package.json` dependency in `peerDependencies`
- Run `npm run update:tsconfig` for update tsconfig references

### Scripts

`npm run build`
- Starts the assembly of all packages in monorepo

`npm run watch`
- Waits for changes in each package and performs build. Used for development.

`npm run test`
- Runs tests for packages

`npm run clean`
- Cleans the entire TypeScript assembly

`npm run build --workspaces`
- Run build in all packages. [More info](https://docs.npmjs.com/cli/v8/using-npm/workspaces)

`npm run build --workspace=name`
- Run build in specific package. [More info](https://docs.npmjs.com/cli/v8/using-npm/workspaces)
