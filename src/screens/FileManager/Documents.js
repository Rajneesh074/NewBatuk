import React, { useEffect } from "react";
import { connect } from "react-redux";
import PageHeader from "../../components/PageHeader";
import MMTCLOGO from '../../assets/images/MMTC-PAMP-Logo-2.png';
import '../../../src/App.css';

const FileDocuments = () => {
  const token = sessionStorage.getItem("token");
  console.log("silver sell  token", token);
  useEffect(() => {
    callAPI();
  }, []);

  const callAPI = async () => {
    try {
      const url = "http://13.233.119.42:1337/customTrade/getNonExecutableQuote";
      const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token} `,
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
      var goldValue = document.getElementById("num1");
      var val = goldValue.value = data.data[0].preTaxAmount;

      console.log("goldValue", val);
      console.log("API Response:", data);
    } catch (error) {
      console.error("Error connecting to API", error);
    }
  };

  const handleInputChange = (inputId) => {
    const num1 = parseFloat(document.getElementById("num1").value);
    const num2 = parseFloat(document.getElementById("num2").value);
    const num3 = parseFloat(document.getElementById("num3").value);

    if (inputId === "num1") {
      const result = isNaN(num1) || isNaN(num2) ? "" : num2 / num1;
      document.getElementById("result").value = result;
    } else if (inputId === "num3") {
      const amount = isNaN(num3) || isNaN(num1) ? "" : num3 * num1;
      document.getElementById("num2").value = amount;
    } else if (inputId === "num2") {
      const weight = isNaN(num2) || isNaN(num1) || num1 === 0 ? "" : num2 / num1;
      document.getElementById("num3").value = weight;
    }
  };

  return (
    <div>
      <div className="container text-dark" style={{ marginLeft: "35rem" }}>
        <div className="col-md-6"></div>
        <div className="row">
          <div className="col-md-12 p-4 mt-3">
            <h3>Hello! Welcome to Silvify Sell</h3>
          </div>
        </div>
        <div className="row justify-content-around d-flex p-2 mt-5" style={{ borderRadius: "25px", border: "2px solid silver" }}>
          <div className="col-md-2 p-2">
            <div className="silvify-logo">
              <h5 className="silvify-color">999.9</h5>
            </div>
          </div>
          <div className="col-md-3" style={{ height: "auto" }}>
            <h4 className="text-warning">MMTC-PAMP</h4>
            <h6>999.9 Purity</h6>
            <h6>Silver in Locker: 8.5000 gm</h6>
          </div>
          <div className="col-md-3 mt-4" style={{ fontSize: "20px" }}>
            &#8377;&nbsp;
            <input type="text" id="num1" onInput={() => handleInputChange("num1")} style={{ width: "70px", border: "none", background: "transparent", color: "#000" }} />
          </div>
          <h6 className="mt-4" style={{ color: "green", fontSize: "20px" }} ><span className="blinking-circle"></span>&nbsp;Live</h6>
        </div>
        <div className="row mt-5">
          <div className="col mt-2">
            <div className="col-md-5">
              <h4>Amount (&#8377;)</h4>
            </div>
            <div className="col">
              <div className="input-group input-group-lg">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1">&#8377;</span>
                </div>
                <input type="text" className="form-control"
                  placeholder="Enter amount" aria-label="Sizing example input"
                  id="num2"
                  aria-describedby="inputGroup-sizing-lg" onInput={() => handleInputChange("num2")} />
              </div>
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
                <input type="text" className="form-control" aria-label="Sizing example input"
                  id="num3"
                  aria-describedby="inputGroup-sizing-lg" onInput={() => handleInputChange("num3")} />
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center mt-3">
          <button type="button" className="btn btn-warning mt-5 p-3" style={{ width: "300px", borderRadius: "20px", fontSize: "18px" }}>Sell</button>
        </div>
        <div className="d-flex justify-content-center mt-4 p-2">
          <img src={MMTCLOGO} alt="MMTC" style={{ height: "80px", width: "250px" }} className="img-fluid" />
        </div>
      </div>
    </div >
  );
};

const mapStateToProps = ({ ioTReducer }) => ({
  isSecuritySystem: ioTReducer.isSecuritySystem,
});

export default connect(mapStateToProps, {})(FileDocuments);
