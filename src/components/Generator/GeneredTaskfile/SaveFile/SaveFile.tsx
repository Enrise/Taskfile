'use client';

import { ReactElement, useState } from 'react';

import styles from './save-file.module.scss';

type SaveFileProps = {
	content: string;
	className?: string;
};

const SaveFile = ({ content, className = '' }: SaveFileProps): ReactElement => {
	const [isCopied, setCopied] = useState(false);

	const copyToClipboard = (): void => {
		setCopied(true);
		navigator.clipboard.writeText(content);

		setTimeout(() => setCopied(false), 1000);
	};

	const download = (): void => {
		const blob = new Blob([content], { type: 'text/x-shellscript' });
		const elem = window.document.createElement('a');
		elem.href = window.URL.createObjectURL(blob);
		elem.download = 'Taskfile';
		document.body.appendChild(elem);
		elem.click();
		document.body.removeChild(elem);
	};

	return (
		<div className={`${styles.container} ${className}`}>
			<button type="button" className={styles.download} onClick={download} title="Download Taskfile" />
			<button
				type="button"
				className={`${styles.copy} ${isCopied && styles.copied}`}
				onClick={copyToClipboard}
				title="Copy Taskfile content"
			/>
		</div>
	);
};

export default SaveFile;
