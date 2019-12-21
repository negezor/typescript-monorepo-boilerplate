# TypeScript Monorepo Boilerplate 🌟
Monorepo using native TypeScript compiler instead of external bundle collectors

## Usage
> **[Yarn](http://npm.im/yarn) 1.21.1 or newer is required**

### Initialization
```
git clone git@github.com:negezor/typescript-monorepo-boilerplate.git
cd typescript-monorepo-boilerplate
yarn install
yarn build
```

### Configuration
#### Change namespace name
- In `tsconfig.json`, change the `paths` from `@template` to the one you need

#### Add or remove packages folder
- In `package.json`, change `workspaces`
- In `tsconfig.json`, change the `paths`
- In `.gitignore`, change the `# Build` place
- In `jest.config.json`, change the `testMatch` pattern
- In `.eslintrc.json`, change the `overrides` pattern for tests
- Run `yarn run update:tsconfig` for update tsconfig references

### Add new package
- Copy template structure
- Run `yarn run update:tsconfig` for update tsconfig references
- Run `yarn install` for create new symlinks in node_modules

### Add internal dependency
- Add to `package.json` dependency in `peerDependencies`
- Run `yarn run update:tsconfig` for update tsconfig references

### Scripts

`yarn run build`
- Starts the assembly of all packages in monorepo

`yarn run watch`
- Waits for changes in each package and performs build. Used for development.

`yarn run test`
- Runs tests for packages

`yarn run clean`
- Cleans the entire TypeScript assembly
