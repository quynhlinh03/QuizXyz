import React from 'react';
import styles from './Results.module.css';
import Button from '../UI/Button/Button';
import ButtonCircle from '../UI/Button/ButtonCircle';
import PieChart from '../PieChart/PieChart';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


function Results(props) {
  return (
    <>
      <div className={styles['exit-button']}>
        <ButtonCircle styles='exit' icon={faTimes}></ButtonCircle>
      </div>
      <div className={styles.container}>
        <div className={styles['sub-container']}>
          <div className={styles['pie-chart']}>
            <PieChart value={props.percent} ></PieChart>
          </div>
          <div className={styles['content-container']}>
            <p className={styles.title}>{props.title}</p>
            <p className={styles.content}>{props.content}</p>
            <p className={styles.score}>{props.score}/{props.all} correct answers in {props.time} seconds</p>
            <div className={styles['container-button']}>
              <Button styles='finish' value='Replay quiz' onClick={props.replayClick} ></Button>
              <Button styles='finish' value='Review quiz' onClick={props.reviewClick}></Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Results;
