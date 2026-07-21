'use client';

import { ReactElement, useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import TextInput from '@/components/Form/Text';
import { GeneratorSettings } from '@/components/Generator';

import styles from './local-domains.module.scss';

const LocalDomains = (): ReactElement => {
	const form = useFormContext<GeneratorSettings>();
	const { fields, append, remove } = useFieldArray<GeneratorSettings, 'localDomains'>({ name: 'localDomains' });
	const domains = form.watch('localDomains');
	const lastDomain = domains?.length ? domains[domains.length - 1]?.domain : undefined;
	const emptyIndex = domains ? domains.slice(0, -1).findIndex((entry) => !entry?.domain) : -1;

	// Remove emptied textboxes and make sure there is always one empty textbox to add a new domain
	useEffect(() => {
		if (emptyIndex !== -1) {
			remove(emptyIndex);
			return;
		}

		if (lastDomain !== '') {
			append({ domain: '' }, { shouldFocus: false });
		}
	}, [emptyIndex, lastDomain, append, remove]);

	return (
		<div className={styles.container}>
			{fields.map((field, index) => (
				<TextInput key={field.id} name={`localDomains.${index}.domain`} placeholder="example.local" />
			))}
		</div>
	);
};

export default LocalDomains;
