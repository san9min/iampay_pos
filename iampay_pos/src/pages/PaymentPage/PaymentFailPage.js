import { React, useState } from 'react';
import Header from '../../components/Header';
import alertSign from '../../images/alertSign.png';
import styles from '../../css/PaymentFailPage.module.css';
import Button from '../../components/Button';
import { useLocation } from 'react-router-dom';

function PaymentFailPage(props) {
  const output = useLocation().state;
  const [eroorMessage, setErrorMessage] = useState("잔액이 부족합니다😢");

  // if (output.errorMessage === "얼굴을 인식할 수 없습니다") {
  //   setErrorMessage("얼굴을 인식할 수 없습니다😢");
  // }

  return (
    <div>
      <Header />
      <div className={styles.imgBox}>
        <img src={alertSign} alt="결제 실패" className={styles.alertSign}/>
      </div>
      <div className={styles.failText}>{eroorMessage}</div>
      <Button buttonLink="/" buttonColor="#FF5555" buttonText="확인" />
    </div>
  );
}

export default PaymentFailPage;