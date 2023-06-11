import React, { useState } from "react";
import styles from "./Header.module.css";
import Button from "../../UI/Button/Button";

function Header(props) {
  const [activeItem, setActiveItem] = useState(0);

  const handleItemClick = (index) => {
    setActiveItem(index);
  };

  return (
    <header className={styles["header_container"]}>
      <div className={styles["header_left"]}>
        <a href="#">QuizXyz</a>
      </div>
      <div className={styles["header_center"]}>
        <ul>
          <li
            className={activeItem === 0 ? styles.active : ""}
            onClick={() => handleItemClick(0)}
          >
            <a href="#">Home</a>
          </li>
          <li
            className={activeItem === 1 ? styles.active : ""}
            onClick={() => handleItemClick(1)}
          >
            <a href="#">Quizzes</a>
          </li>
          <li
            className={activeItem === 2 ? styles.active : ""}
            onClick={() => handleItemClick(2)}
          >
            <a href="#">About</a>
          </li>
          <li
            className={activeItem === 3 ? styles.active : ""}
            onClick={() => handleItemClick(3)}
          >
            <a href="#">Contact</a>
          </li>
        </ul>
      </div>
      <div className={styles["header_right"]}>
        <Button value="Login"></Button>
        <Button styles="save" value="Signup"></Button>
      </div>
    </header>
  );
}

export default Header;
