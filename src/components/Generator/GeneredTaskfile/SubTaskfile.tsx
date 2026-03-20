'use client';

import { ReactElement } from 'react';
import { subTaskfile } from '@/components/Generator/GeneredTaskfile/taskfile';
import SaveFile from './SaveFile';
import { highlighter } from './Highlighter';

const SubTaskfile = (): ReactElement => {
	const resultTaskfile = subTaskfile();

	return (
		<>
			<SaveFile content={resultTaskfile} />
			<pre>{highlighter(resultTaskfile)}</pre>
		</>
	);
};

export default SubTaskfile;
