import React, { ReactElement } from 'react';

import styles from './highlighter.module.css';

enum RendererType {
	EmptyLines,
	HashBang,
	TaskDefinitions,
	FunctionDefinitions,
	Sections,
	Comments,
	Variables,
	TaskCalls,
	Conditionals,
	EchoStatements,
	Titles,
	FunctionEnds,
}

type LineRenderer = {
	test: (line: string) => boolean;
	render: (line: string, index: number) => ReactElement;
};

export const lineRenderers: Record<RendererType, LineRenderer> = {
	[RendererType.EmptyLines]: {
		test: (line) => line.trim() === '',
		render: (_, i) => <div key={i}>&nbsp;</div>,
	},
	[RendererType.HashBang]: {
		test: (line) => line.trim() === '#!/usr/bin/env bash',
		render: (line, i) => (
			<div key={i} className={styles['text-gray']}>
				{line}
			</div>
		),
	},
	[RendererType.TaskDefinitions]: {
		test: (line) => /^function\stask:+[a-zA-Z-_:]+/.test(line),
		render: (line, i) => {
			const [, name, rest] = line.match(/^function\stask:+([a-zA-Z-_:]+)\s{\s##(.*)/) || [];
			return (
				<div key={i} className={styles.line}>
					<span className={styles['text-gray']}>function</span>
					<span className={styles['text-white']}> task:</span>
					<span className={styles['text-yellow']}>{name}</span>
					<span className={styles['text-gray']}>{' {'}</span>
					<span className={styles['text-green']}>{' ##'}</span>
					<span className={styles['text-white']}>{rest}</span>
				</div>
			);
		},
	},
	[RendererType.FunctionDefinitions]: {
		test: (line) => /^function\s+[a-zA-Z-_:]+/.test(line),
		render: (line, i) => {
			const [, name, _filler, comment] = line.match(/^function\s+([a-zA-Z-_:]+)(\s{\s#(.*))?/) || [];
			return (
				<div key={i} className={styles.line}>
					<span className={styles['text-gray']}>function </span>
					<span className={styles['text-white']}>{name}</span>
					<span className={styles['text-gray']}>{' {'}</span>
					{!!comment && <span className={styles['text-green']}> #{comment}</span>}
				</div>
			);
		},
	},
	[RendererType.Sections]: {
		test: (line) => line.startsWith('## '),
		render: (line, i) => (
			<div key={i} className={styles.line}>
				<span className={styles['text-green']}>## </span>
				<span className={styles['text-white']}>{line.substring(3)}</span>
			</div>
		),
	},
	[RendererType.Comments]: {
		test: (line) => line.trim().startsWith('#'),
		render: (line, i) => (
			<div key={i} className={styles['text-green']}>
				{line}
			</div>
		),
	},
	[RendererType.Variables]: {
		test: (line) => /^[A-Z_]+=.*/.test(line),
		render: (line, i) => {
			const [varName, ...rest] = line.split('=');
			return (
				<div key={i} className={styles.line}>
					<span className={styles['text-blue']}>{varName}</span>
					<span className={styles['text-gray']}>=</span>
					<span className={styles['text-white']}>{rest.join('=')}</span>
				</div>
			);
		},
	},
	[RendererType.Conditionals]: {
		test: (line) => /^if+|^then+|^for+|^done+|^else+|^fi/.test(line.trim()),
		render: (line, i) => (
			<div key={i} className={styles['text-pink']}>
				{line}
			</div>
		),
	},
	[RendererType.EchoStatements]: {
		test: (line) => line.includes('echo'),
		render: (line, i) => {
			const parts = line.split('echo');
			return (
				<div key={i} className={styles.line}>
					<span className={styles['text-white']}>{parts[0]}echo</span>
					<span className={styles['text-yellow-light']}>{parts[1]}</span>
				</div>
			);
		},
	},
	[RendererType.Titles]: {
		test: (line) => line.trim().startsWith('title'),
		render: (line, i) => {
			const parts = line.split('title');
			return (
				<div key={i} className={styles.line}>
					<span className={styles['text-white']}>{parts[0]}title</span>
					<span className={styles['text-yellow-light']}>{parts[1]}</span>
				</div>
			);
		},
	},
	[RendererType.TaskCalls]: {
		test: (line) => /^\stask:+[a-zA-Z-_:]+/.test(line),
		render: (line, i) => {
			const [, space, task] = line.match(/(\s)task:+([a-zA-Z-_:]+)/) || [];

			return (
				<div key={i} className={styles.line}>
					<span className={styles['text-white']}>{space}task:</span>
					<span className={styles['text-yellow']}>{task}</span>
				</div>
			);
		},
	},
	[RendererType.FunctionEnds]: {
		test: (line) => line.trim().startsWith('}'),
		render: (line, i) => (
			<div key={i} className={styles['text-gray']}>
				{line}
			</div>
		),
	},
};
