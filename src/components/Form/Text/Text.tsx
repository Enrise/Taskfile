import { HTMLInputAutoCompleteAttribute, HTMLInputTypeAttribute, InputHTMLAttributes, ReactElement } from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';

import FormError from '@/components/Form/Error';

import styles from '../form.module.css';

type TextInputProps = {
	title?: string;
	name: string;
	options?: RegisterOptions;
	type?: HTMLInputTypeAttribute;
	autoComplete?: HTMLInputAutoCompleteAttribute;
} & InputHTMLAttributes<HTMLInputElement>;

const TextInput = ({
	name,
	title,
	type = 'text',
	autoComplete,
	options,
	...inputAttributes
}: TextInputProps): ReactElement => {
	const form = useFormContext();

	return (
		<label className={styles.label}>
			{title && <span className={styles.title}>{title}</span>}{' '}
			<input
				className={styles.input}
				{...form.register(name, options)}
				type={type}
				autoComplete={autoComplete}
				{...inputAttributes}
			/>
			<FormError name={name} />
		</label>
	);
};

export default TextInput;
