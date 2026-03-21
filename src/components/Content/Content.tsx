'use client';

import { ReactElement } from 'react';

import styles from './content.module.scss';
import Window from '@/components/Window';
import Markdown from 'markdown-to-jsx';
import { highlighter } from '@/components/Generator/GeneredTaskfile/Highlighter';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SaveFile from '@/components/Generator/GeneredTaskfile/SaveFile';

const links = [
	{ href: '/docs', label: 'About Taskfile' },
	{ href: '/docs/how-does-it-work', label: 'How does it work?' },
	{ href: '/docs/auto-completion', label: 'Auto completion' },
	{ href: '/docs/sub-taskfiles', label: 'SubTaskfiles' },
];

type WindowProps = {
	content: string;
};

const Content = ({ content }: WindowProps): ReactElement => {
	const path = usePathname();

	return (
		<div className={styles.container}>
			<div className={styles.menu}>
				<Window className={styles.menuWindow}>
					<div className={styles.links}>
						{links.map(({ href, label }) => (
							<Link key={href} href={href} className={path === href ? styles.active : ''}>
								{label}
							</Link>
						))}
					</div>
				</Window>
			</div>
			<Window>
				<Markdown
					className={styles.content}
					options={{
						overrides: {
							pre: (original) => (
								<pre>
									<SaveFile content={original.children.props.children} className={styles.preSave} />
									{highlighter(original.children.props.children)}
								</pre>
							),
							img: ({ alt, src }) => <img className={styles.image} src={src.replace('public/', '/')} alt={alt} />,
							a: ({ href, props, children }) => {
								if (href.includes('.md')) {
									const target = href.replace('.md', '');

									return (
										<Link href={target === 'README' ? '/' : target} {...props}>
											{children}
										</Link>
									);
								}

								return (
									<a href={href} target="_blank" {...props}>
										{children}
									</a>
								);
							},
						},
					}}
				>
					{content}
				</Markdown>
			</Window>
		</div>
	);
};

export default Content;
