'use client';

import { ReactElement, ReactNode } from 'react';

import styles from './desktop.module.scss';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type DesktopProps = {
	children: ReactNode;
};

const Desktop = ({ children }: DesktopProps): ReactElement => {
	const path = usePathname();

	return (
		<div className={styles.screen}>
			<div className={styles.bar}>
				<div className={styles.container}>
					<a href="https://enrise.com" target="_blank" className={styles.enrise} />
					<a href="https://github.com/Enrise/Taskfile" target="_blank" className={styles.github} />
					<Link href="/" className={`${styles.page} ${path === '/' ? styles.active : ''}`}>
						Generate <span>your Taskfile</span>
					</Link>
					<Link href="/docs" className={`${styles.page} ${path.startsWith('/docs') ? styles.active : ''}`}>
						Documentation
					</Link>
				</div>
			</div>
			<div className={styles.desktop}>{children}</div>
		</div>
	);
};

export default Desktop;
