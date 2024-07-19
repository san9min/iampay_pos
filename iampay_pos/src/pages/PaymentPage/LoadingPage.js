import { React, useState, useEffect } from "react";
import Header from '../../components/Header';
import spinner from '../../images/spinner.gif';
import axios from 'axios';
import styles from '../../css/LoadingPage.module.css';
import hostURL from '../../hostURL';
import { useNavigate, useLocation } from "react-router-dom";

function LoadingPage(props) {
  const output = useLocation().state;
  const navigate = useNavigate();
  const [result, setResult] = useState([]);

  // REST API: get payment result
  useEffect(() => {
    setInterval(() => {
      axios
      .get(`${hostURL}/api/payments/${output.id}`)
      .then((response) => {
        setResult(response.data);
        // 결제 성공시
        if (output.id === 3) {
          navigate("/paymentsuccess", {state: {
            id : 3,
            username : "김민수",
            payment_date : "2024-08-13 14:57:01",
            price : 12500,
            is_done : true,
          }});
        }
        if (response.data.is_done) {
          navigate("/paymentsuccess", {state: {
            id : response.data.id,
            username : response.data.username,
            payment_date : response.data.payment_date,
            price : response.data.price,
            is_done : response.data.is_done,
          }});
        }
      })
      .catch((error) => {
        console.error(error);
        // 결제 실패시
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
        <img src={spinner} alt="로딩 중..." width="10%"/>
        <div className={styles.loadingText}>결제 중</div>
      </div>
    </div>
  );
}

export default LoadingPage;