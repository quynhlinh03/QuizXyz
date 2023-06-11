
import styles from './ButtonCircle.module.css'
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ButtonCircle(props) {
  return (
    <>
      <button
        className={
          props.styles ? `${styles.button} ${styles.exit}` : styles.button
        }
        onClick={props.onClick}
      >
        <FontAwesomeIcon icon={props.icon} className={styles.icon} />
      </button>
    </>
  );
}

export default ButtonCircle;
