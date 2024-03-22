import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import MMTCLOGO from '../../assets/images/MMTC-PAMP-Logo-2.png';
import SilverSummay from './silverSummary'
import BasicElements from "./BasicElements";
import { useHistory } from "react-router-dom";
import { set } from "mongoose";

const Inbox = () => {
  const token = sessionStorage.getItem("token");
  console.log("silver buy token", token);
  const [userList, setUserList] = useState([]);
  const history = useHistory();
  const [amountValue, setAmountValue] = useState("");
  const [amountValidationMessage, setAmountValidationMessage] = useState("");
  const [weightValidationMessage, setweightValidationMessage] = useState("");

  useEffect(() => {
    callAPI();
  }, []);



  const callAPI = async () => {
    try {
      const url = "http://13.233.119.42:1337/customTrade/getNonExecutableQuote";
      const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
      };

      const requestBody = {
        "currencyPair": "XAG/INR",
        "type": "BUY"
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      var goldValue = document.getElementById("num1")
      var val = goldValue.value = data.data[0].preTaxAmount;

      // console.log("goldValue", val)

      console.log("API Response:", data);
      setUserList(data);

    } catch (error) {
      console.error("Error connecting to API", error);
    }


  };
  const handleProClick = () => {

    const amountInput = document.getElementById("num2").value;
    const weightInput = document.getElementById("num3").value;
    if (!amountInput.trim() && !weightInput.trim()) {
      setAmountValidationMessage("Please enter a valid amount.");
      setweightValidationMessage("Please enter a valid weight.");
      return;
    }
    setAmountValidationMessage("");
    setweightValidationMessage("")
    // Use history.push to navigate to AppTaskbar and pass the API data as state
    history.push({
      pathname: "/BasicElements",
      state: { coinDetails: userList.data[0] },
      amountValue: amountValue, // Assuming your data structure is an array and you want to pass the first item
    });
  };


  const handleInputChange = (inputId) => {
    const num1 = parseFloat(document.getElementById("num1").value);
    const num2 = parseFloat(document.getElementById("num2").value);
    const num3 = parseFloat(document.getElementById("num3").value);


    if (inputId === "num1") {
      const result = (isNaN(num1) || isNaN(num2) ? "" : num2 / num1);
      document.getElementById("num3").value = result;
    }
    if (inputId === "num3") {
      const amount = isNaN(num3) || isNaN(num1) ? "" : num3 * num1
      document.getElementById("num2").value = amount;
    } else if (inputId === "num2") {
      let weight = isNaN(num2) || isNaN(num1) || num1 === 0 ? "" : num2 / num1;
      document.getElementById("num3").value = weight;
    }
    if (inputId === "num2" || inputId === "num3")
      setAmountValue(document.getElementById("num2").value);
  };


  return (
    <>


      <div className="container  text-dark" style={{ height: "auto", marginLeft: "35rem" }}>
        <div className="col-md-6"></div>
        <div className="row">
          <div className="col-md-12 p-4 mt-3">
            <h3>Hello! Welcome to Silvify for Buy</h3>
          </div>
        </div>
        <div className="row justify-content-around d-flex p-2 mt-4" style={{ borderRadius: "25px", border: "2px solid #ffc107" }}>

          <div className="col-md-2 pt-3 pb-3">
            <div className="btn-gradient-2 silvify-logo">
              <h2 className=" silvify-color">24K</h2>
            </div>
          </div>
          <div className="col-md-3  ml-2 mt-3" >
            <h4 className="text-warning">MMTC-PAMP</h4>
            <h6>24k 999.9 Purity</h6>
          </div>
          <div className="col-md-3 mt-4" style={{ fontSize: "20px" }}>
            &#8377;&nbsp;
            <input type="text" id="num1" onInput={() => handleInputChange("num1")} className="live text-dark" style={{ width: "80px", border: "none", background: "transparent" }} />
          </div>
          <h6 className=" mt-4" style={{ color: "green", fontSize: "20px" }}><span className="blinking-circle"></span>Live</h6>

        </div>
        {/* <div className="row mt-4"> */}
        {/* ... rest of the code ... */}
        <div className="row mt-4 d-flex justify-content-cente">
          <div className="col mt-2">
            <div className="col-md-5">
              <h4>Amount (&#8377;)</h4>
            </div>
            <div className="col">
              <div className="input-group input-group-lg" >
                <div class="input-group-prepend" >
                  <span class="input-group-text" id="basic-addon1">&#8377;</span>
                </div>
                <input type="text" className="form-control" onInput={() => handleInputChange("num2")} id="num2" />
              </div>
              <p style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>{amountValidationMessage}</p>
            </div>
          </div>

          <div className="col mt-2">
            <div className="col-md-5">
              <h4>Weight (g)</h4>
            </div>
            <div className="col">
              <div className="input-group input-group-lg">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">gm</span>
                </div>
                <input type="text" className="form-control" aria-label="Sizing example input" id="num3"
                  onInput={() => handleInputChange("num3")} />

              </div>
              <p style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>{weightValidationMessage}</p>
            </div>
          </div>
          <div className="col-md-12 mt-5 mt-5">
            <h6 className="text-center">Exclusive of 3% GST</h6>
          </div>
        </div>
        {/* </div> */}
        <div className="d-flex justify-content-center mt-3">
          <a
            onClick={() => handleProClick()}
            // href="/apptaskbar"
            type="button"
            className="btn btn-warning p-3 text-dark"
            style={{ width: "300px", borderRadius: "20px", fontSize: "20px" }}
          >
            Proceed to Pay &#8377; {amountValue}
          </a>
        </div>
        <div className="d-flex justify-content-center mt-5">
          <img src={MMTCLOGO} alt="MMTC" style={{ height: "80px", width: "250px" }} className="img-fluid" />
        </div>
      </div>

    </>
  );
};

const mapStateToProps = ({ mailInboxReducer }) => ({
  isInbox: mailInboxReducer.isInbox,
});

export default connect(mapStateToProps, {})(Inbox);


