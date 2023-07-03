module.exports = {
	root: true,
	plugins: ['@typescript-eslint', 'import', 'prettier'],
	extends: [
	  'airbnb-typescript/base',
	  'prettier',
	  'plugin:@typescript-eslint/recommended',
	  'plugin:import/typescript',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
	  project: './tsconfig.eslint.json',
	  tsconfigRootDir: __dirname,
      sourceType: "module",
	},
	overrides: [
		{
		  files: ['*.ts', '*.tsx'], // Your TypeScript files extension
	
		  // As mentioned in the comments, you should extend TypeScript plugins here,
		  // instead of extending them outside the `overrides`.
		  // If you don't want to extend any rules, you don't need an `extends` attribute.
		  extends: [
			'plugin:@typescript-eslint/recommended',
			'plugin:@typescript-eslint/recommended-requiring-type-checking',
		  ],
	
		  parserOptions: {
			project: ['./tsconfig.json'], // Specify it only for TypeScript files
		  },
		},
	],
	settings: {
		react: {
		  version: "detect"
		}
	}
};