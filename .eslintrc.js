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
		ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
        ecmaFeatures: {
            jsx: true, // Allows for the parsing of JSX
        },
	},
	overrides: [
		{
			files: ['*.ts', '*.tsx', '.prettierrc.js'], // Your TypeScript files extension
			

			// As mentioned in the comments, you should extend TypeScript plugins here,
			// instead of extending them outside the `overrides`.
			// If you don't want to extend any rules, you don't need an `extends` attribute.
			extends: [
				'plugin:@typescript-eslint/recommended',
				'plugin:@typescript-eslint/recommended-requiring-type-checking',
				// no-unused-vars
				'airbnb-typescript/base',
				'prettier',
				'plugin:import/typescript',
			],
			rules: {
				"prettier/prettier": [
				"error",
					{
							"printWidth": 120,
							"tabWidth": 2,
							"useTabs": true,
							"semi": true,
							"singleQuote": true,
							"trailingComma": "es5",
							"bracketSpacing": true,
							"jsxSingleQuote": false,
							"arrowParens": "always",
							"proseWrap": "never",
							"htmlWhitespaceSensitivity": "strict",
							"endOfLine": "lf"
					}
				],
				"prefer-template": ["error"],
				"space-in-parens": ["error", "never"],
				"array-bracket-spacing": ["error", "never"],
				"space-infix-ops": "error",
				"object-curly-spacing": ["error", "always"],
				"block-spacing": ["error", "always"],
				"import/extensions": [
					"error",
					"ignorePackages",
					{
						"js": "never",
						"jsx": "never",
						"ts": "never",
						"tsx": "never"
					}
			 ]
			},
			parserOptions: {
				project: ['./tsconfig.json'], // Specify it only for TypeScript files
			},
		},
	],
	settings: {
		"import/resolver": {
			"typescript": {}
		},
		react: {
				version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
		},
	}
};