import { React, useState, useEffect } from "react";
import Header from '../../components/Header';
import axios from "axios";
import hostURL from "../../hostURL";
import styles from "../../css/RecordPage.module.css";
import Button from "../../components/Button";

function RecordPage(props) {
  // 초기 월
  const today = new Date();
  const month = today.getMonth() + 1;

  // 월, 일 선택
  const [result, setResult] = useState([]);
  const [inputs, setInputs] = useState({
    monthSelected: month + "월",
    daySelected: "전체",
  });
  const { monthSelected, daySelected } = inputs;

  // input 객체 생성
  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  // filter dictionary
  const filterDict = {
    monthDict : {
      "전체": "전체",
      "7월": "07",
      "8월": "08",
      "9월": "09",
      "10월": "10",
      "11월": "11",
      "12월": "12",
    },
    dayDict : {
      "전체": "전체",
      "1일": "1일",
      "2일": "2일",
      "3일": "3일",
      "4일": "4일",
      "5일": "5일",
      "6일": "6일",
      "7일": "7일",
      "8일": "8일",
      "9일": "9일",
      "10일": "10일",
      "11일": "11일",
      "12일": "12일",
      "13일": "13일",
      "14일": "14일",
      "15일": "15일",
      "16일": "16일",
      "17일": "17일",
      "18일": "18일",
      "19일": "19일",
      "20일": "20일",
      "21일": "21일",
      "22일": "22일",
      "23일": "23일",
      "24일": "24일",
      "25일": "25일",
      "26일": "26일",
      "27일": "27일",
      "28일": "28일",
      "29일": "29일",
      "30일": "30일",
      "31일": "31일",
    },
  }
  
  // filtered Result
  const filteredResult = [...result]
    .sort((a, b) => {
      if (a.payment_date > b.payment_date) return -1;
      if (a.payment_date < b.payment_date) return 1;
      return 0;
    })
    .filter((payment) => {
      if (filterDict.monthDict[monthSelected] === "전체") return true;
      return payment.payment_date.substr(5, 2) === filterDict.monthDict[monthSelected];
    })
    .filter((payment) => {
      if (filterDict.dayDict[daySelected] === "전체") return true;
      return payment.payment_date.substr(8, 2) === filterDict.dayDict[daySelected].substr(0, 2);
    });
  
  // total price
  let totalPrice = 0;
  filteredResult.map((payment) => {
    totalPrice += payment.price;
  });

  // REST API: get all payments
  useEffect(() => {
    axios
      .get(`${hostURL}/api/payments`)
      .then((response) => {
        setResult(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <Header />

      <div className={styles.selectBox}>
        <div>
            <select onChange={onChange} name="monthSelected" value={monthSelected}>
              {Object.keys(filterDict.monthDict).map((month) => (
                <option value={month} key={month}>
                  {month}
                </option>
              ))}
            </select>
            <select onChange={onChange} name="daySelected" value={daySelected}>
              {Object.keys(filterDict.dayDict).map((day) => (
                <option value={day} key={day}>
                  {day}
                </option>
              ))}
            </select>
        </div>
        <div>매출: <span>{totalPrice}</span>원</div>
      </div>

      <div className={styles.recordBox}>
        <div className={styles.recordHeader}>
          <div className={styles.recordBlock}>주문일자</div>
          <div className={styles.recordBlock} id={styles.recordMiddleBlock}>이름</div>
          <div className={styles.recordBlock}>금액</div>
        </div>
        <hr/>
        <div className={styles.recordBody}>
          {filteredResult.map((payment) => (
            <div className={styles.recordRow} key={payment.id}>
              <div className={styles.recordBlock}>
                <span>{payment.payment_date.substr(2,2)}</span>.
                <span>{payment.payment_date.substr(5,2)}</span>.
                <span>{payment.payment_date.substr(8,2)}</span>&nbsp;
                <span>{payment.payment_date.substr(11,5)}</span>
              </div>
              <div className={styles.recordBlock} id={styles.recordMiddleBlock}>{payment.user_name.substr(0,1)}X{payment.user_name.substr(2,1)}</div>
              <div className={styles.recordBlock}>{payment.price.toLocaleString()}원</div>
            </div>
          ))}
        </div>
      </div>

      <Button buttonLink="/" buttonColor="#FF5555" buttonText="돌아가기" />
    </div>
  );
}

export default RecordPage;