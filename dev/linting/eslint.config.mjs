import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';

import nextPlugin from '@next/eslint-plugin-next';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

const projectRules = {
	'@next/next/no-img-element': 'off',
	'linebreak-style': ['error', 'unix'],
	'react/jsx-pascal-case': ['error'],
	'react/button-has-type': ['error'],
	'@typescript-eslint/no-unused-vars': [
		'error',
		{
			argsIgnorePattern: '^_',
			caughtErrorsIgnorePattern: '^_',
			varsIgnorePattern: '^_',
		},
	],
};

export default [
	{
		plugins: {
			'@typescript-eslint': typescriptPlugin,
		},
		languageOptions: {
			parser: typescriptParser,
			parserOptions: {
				warnOnUnsupportedTypeScriptVersion: false,
			},
		},
		rules: {
			...typescriptPlugin.configs.recommended.rules,
			'@typescript-eslint/explicit-module-boundary-types': 'off',
			'@typescript-eslint/explicit-function-return-type': [
				'warn',
				{
					allowedNames: ['Page', 'generateMetadata', 'Layout'],
				},
			],
		},
	},
	{
		files: ['**/*.{ts,tsx}'],
		plugins: {
			react: reactPlugin,
			'react-hooks': reactHooksPlugin,
			'@next/next': nextPlugin,
		},
		rules: {
			...reactPlugin.configs['jsx-runtime'].rules,
			// ...hooksPlugin.configs.recommended.rules,
			...nextPlugin.configs.recommended.rules,
			...nextPlugin.configs['core-web-vitals'].rules,
			...projectRules,
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
	},
	{
		ignores: ['.next/', 'out/', 'next-env.d.ts'],
	},
];
