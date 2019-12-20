import {
	join as pathJoin,
	relative as pathRelative
} from 'path';
import {
	writeFileSync,
	readFileSync,
	readdirSync,
	lstatSync
} from 'fs';

enum ConfigFilename {
	PACKAGE = 'package.json',
	BASE_TSCONFIG = 'tsconfig.base.json',
	PACKAGE_TSCONFIG = 'tsconfig.package.json',
	PROJECT_TSCONFIG = 'tsconfig.project.json'
}

const TSCONFIG_HEADER = '// File generated automatically, use yarn update:tsconfig for update\n';

interface IPackageJSON {
	name: string;
	workspaces: string[];
	dependencies: Record<string, string>;
	devDependencies: Record<string, string>;
	peerDependencies: Record<string, string>;
}

const readJSON = <T>(path: string): T => {
	return JSON.parse(
		readFileSync(path, 'utf8')
	);
}

const rootPath = pathJoin(__dirname, '..');

const rootPackage = readJSON<IPackageJSON>(
	pathJoin(rootPath, ConfigFilename.PACKAGE)
);

const workspacePaths = rootPackage.workspaces
	.map(workspaceDirectory => (
		workspaceDirectory.replace('/*', '')
	))
	.map(workspaceDirectory => (
		pathJoin(rootPath, workspaceDirectory)
	));

const packageDirectories = workspacePaths
	.map(workspacePath => (
		readdirSync(workspacePath)
			.map(packageDirectory => (
				pathJoin(workspacePath, packageDirectory)
			))
	))
	.flat()
	.filter(packageDirectory => (
		lstatSync(packageDirectory).isDirectory()
	));

const packagePathMap: Map<string, string> = new Map();
const packageJSONMap: Map<string, IPackageJSON> = new Map();

for (const packageDirectory of packageDirectories) {
	const packageJSON = readJSON<IPackageJSON>(
		pathJoin(packageDirectory, ConfigFilename.PACKAGE)
	);

	const { name: packageName } = packageJSON;

	packagePathMap.set(packageName, packageDirectory);
	packageJSONMap.set(packageName, packageJSON);
}

const internalDependencyMap: Map<string, string[]> = new Map();

for (const [packageName, packageJSON] of packageJSONMap.entries()) {
	const allDependencies = [
		...Object.keys(packageJSON.dependencies || {}),
		...Object.keys(packageJSON.devDependencies || {}),
		...Object.keys(packageJSON.peerDependencies || {})
	];

	const internalDependencies = allDependencies.filter(dependencyName => (
		packageJSONMap.has(dependencyName)
	));

	internalDependencyMap.set(packageName, internalDependencies);
}

const resolveInternalDependencies = (dependencies: string[]): string[] => (
	[...new Set(
		[
			...dependencies
				.map(dependency => {
					const internalDependencies = internalDependencyMap.get(dependency)!;

					return resolveInternalDependencies(internalDependencies);
				})
				.flat(Infinity),
			...dependencies
		]
	)]
);

for (const [packageName, packagePath] of packagePathMap.entries()) {
	const tsconfigPath = pathJoin(packagePath, ConfigFilename.PACKAGE_TSCONFIG);

	const internalDependencies = resolveInternalDependencies(
		internalDependencyMap.get(packageName)!
	);

	const tsconfigData = {
		extends: pathJoin(
			pathRelative(packagePath, rootPath),
			ConfigFilename.BASE_TSCONFIG
		),
		compilerOptions: {
			outDir: './lib',
			rootDir: './src',
			composite: true
		},
		include: ['src'],
		exclude: ['test', 'lib'],
		references: internalDependencies.map(dependencyName => {
			const dependencyPath = packagePathMap.get(dependencyName)!;

			return {
				path: pathJoin(
					pathRelative(packagePath, dependencyPath),
					ConfigFilename.PACKAGE_TSCONFIG
				)
			};
		})
	};

	writeFileSync(tsconfigPath, TSCONFIG_HEADER + JSON.stringify(tsconfigData, undefined, '\t'))
}

const tsconfigProjectPath = pathJoin(rootPath, ConfigFilename.PROJECT_TSCONFIG);

const tsconfigProjectData = {
	files: [],
	references: resolveInternalDependencies([...packagePathMap.keys()])
		.map(dependencyName => {
			const dependencyPath = packagePathMap.get(dependencyName)!;

			return {
				path: pathJoin(
					pathRelative(rootPath, dependencyPath),
					ConfigFilename.PROJECT_TSCONFIG
				)
			};
		})
};

writeFileSync(tsconfigProjectPath, TSCONFIG_HEADER + JSON.stringify(tsconfigProjectData, undefined, '\t'))
