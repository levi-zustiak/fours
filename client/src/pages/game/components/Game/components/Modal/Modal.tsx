import { Show, Portal as SolidPortal } from 'solid-js/web';
import styles from './style.module.css';

type ModalRootProps = any;

//TODO: Add animation and presence functionality
export function Root(props: ModalRootProps) {
  return <div>{props.children}</div>;
}

type ModalPortalProps = any;

export function Portal(props: ModalPortalProps) {
  return (
    <Show when={props.when}>
      <SolidPortal>
        <div
          style={{
            position: 'fixed',
            inset: 0,
            display: 'flex',
            'align-items': 'center',
            'justify-content': 'center',
          }}
        >
          {props.children}
        </div>
      </SolidPortal>
    </Show>
  );
}

type ModalContentProps = any;

export function Content(props: ModalContentProps) {
  return <div class={styles.content_container}>{props.children}</div>;
}

type ModalActionProps = any;

export function Actions(props: ModalActionProps) {
  return <div class={styles.actions_container}>{props.children}</div>;
}
