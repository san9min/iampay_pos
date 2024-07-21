import { React, useEffect } from "react";
import Header from '../../components/Header';
import rolling_white from '../../images/rolling_white.gif';
import axios from 'axios';
import styles from '../../css/LoadingPage.module.css';
import hostURL from '../../hostURL';
import { useNavigate, useLocation } from "react-router-dom";

function LoadingPage(props) {
  const output = useLocation().state;
  const navigate = useNavigate();

  // REST API: get payment result
  useEffect(() => {
    setInterval(() => {
      axios
      .get(`${hostURL}/api/payments/${output.payments_id}`)
      .then((response) => {
        console.log(response.data)
        // 결제 성공시
        if (response.data.is_done) {
          navigate("/paymentsuccess", {state: {
            user_name : response.data.user_name,
          }});
        }
      })
      .catch((error) => {
        // 결제 실패시
        console.error(error);
        navigate("/paymentfail", {state: {
          errorMessage : error.getMessage(),
        }});
      });
    }, 1000);
  }, []);

  return (
    <div>
      <Header />
      <div className={styles.loadingBox}>
        <img src={rolling_white} alt="로딩 중..." width="10%"/>
        <div className={styles.loadingText}>결제 중</div>
      </div>
    </div>
  );
}

export default LoadingPage;