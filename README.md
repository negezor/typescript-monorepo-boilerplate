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

`npm run lint`
- Checks the code with the biome.js linter

`npm run fmt`
- Formats source code using biome.js

`npm run clean`
- Cleans the entire TypeScript assembly

`npm run build --workspaces`
- Run build in all packages. [More info](https://docs.npmjs.com/cli/v8/using-npm/workspaces)

`npm run build --workspace=name`
- Run build in specific package. [More info](https://docs.npmjs.com/cli/v8/using-npm/workspaces)

### FAQ

#### Why not take Rollup/Esbuild/SWC?

Because they are external dependencies, yes of course they can faster than the typescript compiler for a build. But we will still check types and it is trivially easier. It's worth noting that now we use tsx which depends on esbuild (will be replaced later with a simpler solution).

#### Why Biome.js and not Eslint?

It's very simple, eslint is very slow. Usually the rules that we often need are already available in Biome.js, and those that are not are probably will implemented in the next version. It is also worth noting that eslint pulls a lot of small dependencies, while Biome.js is 1 binary file for your platform, which is much faster when installing and updating dependencies. Also it provides a formatter out of the box, we don't need to install prettier separately.

#### Why not Jest/Mocha?

Because these are external dependencies, and `node:test` is available out of the box, plus it's faster. The only thing that may be missing is simpler expect comparison, but you can put a smaller module for that separately.
