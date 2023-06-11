import React, { useState } from 'react';
import styles from './Answer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Answer(props) {
  // const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    props.onClick(props.value);
  };

  return (
    <button
      className={`${styles.button} ${props.isSelected ? styles.selected : ''}`}
      onClick={handleClick}
    >
      <p className={styles['answer-value']}>{props.value}</p>
      {props.showCorrectAns && <FontAwesomeIcon icon={props.icon} className={styles.icon} />}
    </button>
  );
}

export default Answer;
