import styles from './Button.module.css'
function Button(props) {
  return (
    <>
      <button
        className={
          props.styles === 'save' ? `${styles.button} ${styles.save}` : (props.styles === 'start' ? `${styles.button} ${styles.start}` :(props.styles === 'finish' ? `${styles.button} ${styles.finish}` :styles.button))
        }
        onClick={props.onClick}
      >
        {props.value}
      </button>
    </>
  );
}

export default Button;
