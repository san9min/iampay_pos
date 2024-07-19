import React from "react";
import { Link } from "react-router-dom";
import styles from "../css/Button.module.css";

function Button(props) {
  const {buttonLink, buttonColor, buttonText, onClick} = props;

  return (
    <Link to={buttonLink} className={styles.buttonLink}>
      <div className={styles.buttonBox}>
        <button onClick={onClick} className={styles.button} style={{backgroundColor: buttonColor}}>{buttonText}</button>
      </div>
    </Link>
  );
}

export default Button;
