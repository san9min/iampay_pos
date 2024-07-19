import { React, useEffect } from "react";
import Header from '../../components/Header';
import styles from '../../css/PaymentSuccessPage.module.css';
import { useNavigate, useLocation } from "react-router-dom";
import checkSign from '../../images/checkSign.png';

function PaymentSuccessPage(props) {
  const output = useLocation().state;
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
      window.location.reload();
    }, 2000);
  }, []);

  return (
    <div>
      <Header />
      <div className={styles.imgBox}>
        <img src={checkSign} alt="결제 성공" className={styles.checkSign}/>
      </div>
      <div className={styles.successText}>
        <span>{output.username.substr(0,1)}</span>X<span>{output.username.substr(2,1)}</span>님<br/>
        결제가 완료되었습니다<br/>
      </div>
    </div>
  );
}

export default PaymentSuccessPage;