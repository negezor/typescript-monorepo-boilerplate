# TypeScript Monorepo Boilerplate 🌟
Monorepo using native TypeScript compiler instead of external bundle collectors

## Usage
> **[Yarn](http://npm.im/yarn) 1.22.0 or newer is required**

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
- Change the namespace in the `name` property of the` package.json` file of each module

#### Add or remove packages folder
- In `package.json`, change `workspaces` and path in scripts `test:eslint` & `typescript:clean`
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

### Parsing error: "parserOptions.project"
If you see this error, then eslint does not include your files in linting, you can add your files in `tsconfig.eslint.json`. 

The full error looks something like this:: 
```
Parsing error: "parserOptions.project" has been set for @typescript-eslint/parser.
The file does not match your project config: path/to/file.
The file must be included in at least one of the projects provided.
```

### Scripts

`yarn run build`
- Starts the assembly of all packages in monorepo

`yarn run watch`
- Waits for changes in each package and performs build. Used for development.

`yarn run test`
- Runs tests for packages

`yarn run clean`
- Cleans the entire TypeScript assembly
