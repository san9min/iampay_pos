import { React, useState } from "react";
import Header from '../../components/Header';
import styles from '../../css/PriceInputPage.module.css';
import Button from '../../components/Button';
import leftVector from '../../images/leftVector.png';
import axios from 'axios';
import hostURL from '../../hostURL';
import { useNavigate } from "react-router-dom";

function PriceInputPage(props) {
  const navigate = useNavigate();
  const [price, setPrice] = useState(0);
  const onClick = (e) => {
    setPrice(price * 10 + parseInt(e.target.getAttribute("value")));
  };
  const onDelete = (e) => {
    setPrice(parseInt(price / 10));
  };
  const handleSubmit = (e) => {
    const submitInputs = {
      username: "",
      price: price,
      payment_date: "",
      is_done: false,
    }

    if (price === 0) {
      return;
    }

    axios
      .post(`${hostURL}/api/payments`, submitInputs)
      .then((response) => {
        // id값을 response로 받음
        navigate("/loading", {state: {id : 3}});
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Header />
      <div className={styles.priceInputGuide}>금액을 입력해주세요</div>
      <div className={styles.priceInput}>
        <div className={styles.changedInput}>{price.toLocaleString()}</div>
        <span className={styles.fixedInput}>원</span>
      </div>
      <table>
        <tr>
          <td onClick={onClick} value="1">1</td>
          <td onClick={onClick} value="2">2</td>
          <td onClick={onClick} value="3">3</td>
        </tr>
        <tr>
          <td onClick={onClick} value="4">4</td>
          <td onClick={onClick} value="5">5</td>
          <td onClick={onClick} value="6">6</td>
        </tr>
        <tr>
          <td onClick={onClick} value="7">7</td>
          <td onClick={onClick} value="8">8</td>
          <td onClick={onClick} value="9">9</td>
        </tr>
        <tr>
          <th></th>
          <td onClick={onClick} value="0">0</td>
          <td onClick={onDelete}><img className={styles.leftVector} src={leftVector} alt="지우기"/></td>
        </tr>
      </table>
      <Button onClick={handleSubmit} buttonLink="" buttonColor="#FF5555" buttonText="확인" />
    </div>
  );
}

export default PriceInputPage;