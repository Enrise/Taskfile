import { Metadata } from 'next';
import Content from '@/components/Content';

import markdown from '@/../docs/auto-completion.md';

export const generateMetadata = (): Metadata => ({
	title: 'Auto completion • taskfile.sh',
	description:
		'Quickly kick start your project by moving all your development commands to one easy to understand and maintain place.',
});

export default function Page() {
	return <Content content={markdown} />;
}
