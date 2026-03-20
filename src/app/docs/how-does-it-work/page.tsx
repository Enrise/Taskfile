import { Metadata } from 'next';
import Content from '@/components/Content';

import markdown from '@/../docs/how-does-it-work.md';

export const generateMetadata = (): Metadata => ({
	title: 'How does it work? • taskfile.sh',
	description:
		'Quickly kick start your project by moving all your development commands to one easy to understand and maintain place.',
});

export default function Page() {
	return <Content content={markdown} />;
}
