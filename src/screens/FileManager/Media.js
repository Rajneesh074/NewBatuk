// AppCalendar.js
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import GoldCoin from '../../assets/images/gold.png';
import { onPresAddEvent } from "../../actions";
import Chat from './Images';
import '../../../src/App.css';

const AppCalendar = ({ isEventModal, onPresAddEvent }) => {
  const token = sessionStorage.getItem("token");
  console.log("silver delivery token", token);
  const [userList, setUserList] = useState([]);
  const history = useHistory();

  useEffect(() => {
    callAPI();
  }, []);

  const callAPI = async () => {
    try {
      const url = "http://13.233.119.42:1337/redeem/getRedemptionCatalog";
      const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token} `,
      };

      const response = await fetch(url, {
        method: 'GET',
        headers: headers,
      });

      const data = await response.json();

      console.log("API Response:", data);

      setUserList(data);

    } catch (error) {
      console.error("Error connecting to API", error);
    }
  };

  const handleCoinClick = (item) => {
    history.push({
      pathname: "/appcontact",
      state: { coinDetails: item }
    });
  };

  return (
    <div className="container" style={{ marginTop: "110px", marginLeft: "35rem" }}>

      <div className="row ml-5 mb-3 mt-5">
        {userList && userList.data && userList.data.map((item, index) => (
          <div
            key={index}
            className="col-md-4 mr-3 mb-4"
            style={{ border: "3px solid #ffc107", height: "350px", borderRadius: "10px" }}
            onClick={() => handleCoinClick(item)}
          >
            <img src={item.skus[0].images[0].src} alt="images" className="p-2" style={{ marginLeft: "22%", marginTop: "20px", width: "200px" }} />
            <h5 className="text-center">{item.skus[0].weight}gm</h5>
            <h5 className="text-center">Coin</h5>
            <h5 className="text-center">&#8377;{item.skus[0].makingCharges}</h5>

          </div>
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = ({ mailInboxReducer }) => ({
  isEventModal: mailInboxReducer.isEventModal,
});

export default connect(mapStateToProps, { onPresAddEvent })(AppCalendar);
