'use client';

import { ReactElement } from 'react';
import loadTemplate from '@/helpers/loadTemplate';
import subTaskfileBase from './sub-taskfile-base.sh';
import SaveFile from '@/components/Generator/GeneredTaskfile/SaveFile';
import { highlighter } from '@/components/Generator/GeneredTaskfile/Highlighter';

const SubTaskfile = (): ReactElement => {
	const resultTaskfile = loadTemplate(subTaskfileBase);

	return (
		<>
			<SaveFile content={resultTaskfile} />
			<pre>{highlighter(resultTaskfile)}</pre>
		</>
	);
};

export default SubTaskfile;
