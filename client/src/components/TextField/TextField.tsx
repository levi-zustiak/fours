import { JSX, splitProps } from 'solid-js';
import styles from './style.module.css';
import clsx from 'clsx';

type TextFieldProps = {
  name: string;
  value: string | undefined;
  onInput: JSX.EventHandler<HTMLInputElement, InputEvent>;
  type?: 'text' | 'email' | 'tel' | 'password' | 'url' | 'date';
  onChange?: JSX.EventHandler<HTMLInputElement, Event>;
  onBlur?: JSX.EventHandler<HTMLInputElement, FocusEvent>;
  ref?: (element: HTMLInputElement) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  success?: boolean;
};

export function TextField(props: TextFieldProps) {
  const [, inputProps] = splitProps(props, ['value', 'label', 'error']);

  return (
    <div class={styles.container}>
      <label class={styles.label} for={props.name}>
        {props.label}
      </label>
      <input
        {...inputProps}
        id={props.name}
        type={props.type || 'text'}
        value={props.value || ''}
        aria-invalid={!!props.error}
        aria-errormessage={`${props.name}-error`}
        class={clsx(
          styles.input,
          props.success && styles.success,
          props.error && styles.error,
        )}
      />
      {props.error && (
        <div id={`${props.name}-error`} class={styles.error}>
          {props.error}
        </div>
      )}
    </div>
  );
}
