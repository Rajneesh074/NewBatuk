import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import PanOtpInput from "./PanOtp";

const UIHeaderCard = () => {

  const [isLoad, setIsLoad] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [PanNumber, setPanNumber] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const token = sessionStorage.getItem("token");



  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoad(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handlePanNumber = (e) => {
    setPanNumber(e.target.value)
  }

  const handlePhoneSubmit = async (event) => {
    event.preventDefault();

    const regex = /[^0-9]/g;
    if (phoneNumber.length !== 10 || regex.test(phoneNumber)) {
      alert("Invalid Phone Number");
      return;
    }


    try {
      const url = "https://api.partners.stage.abhiloans.com/v1/eligibility/user/info";
      const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Bearer zpka_23708ff4241d48e3b97892d7c909d994_1768e70e",
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: headers,

        body: JSON.stringify({ "mobileNumber": phoneNumber, "panNumber": PanNumber }),
      });

      const data = await response.json();
      console.log("API Response:", data);
      // sessionStorage.setItem("token", data.Token)

      setShowOtpInput(true);

    } catch (err) {
      console.log("Error connecting to API", err);
    }


  };

  const onOtpSubmit = async (otp, e) => {
    // e.preventDefault();
    console.log("Login Successful", otp);




  }

  return (
    <div className="col-lg-12 col-md-12 bg-light vh-100">
      <div className=" col-md-5 m-5 p-2 mx-auto">
        <div className="card">
          <div className="header">
            <p className="lead text-center">Login to your Loanify account</p>
          </div>
          <div className="body">
            {!showOtpInput ? (
              <form onSubmit={handlePhoneSubmit}>
                <div className="mb-3">
                  <label htmlFor="pan">Enter PAN Number</label>
                  <input
                    className="form-control"
                    id="pan"
                    type="text"
                    value={PanNumber}
                    placeholder="Enter PAN Number"
                    onChange={handlePanNumber}
                  />
                </div>

                <div className="mb-1">
                  <label htmlFor="phone">Enter Mobile Number</label>
                  <input
                    className="form-control"
                    id="phone"
                    type="text"
                    value={phoneNumber}
                    onChange={handlePhoneNumber}
                    placeholder="Enter Mobile Number"
                  />
                </div>

                <button className="btn btn-info mt-3 btn-block" type="submit">
                  Submit
                </button>
              </form>
            ) : (
              <div>
                <p>Enter OTP sent to {phoneNumber}</p>
                <PanOtpInput length={6} onOtpSubmit={onOtpSubmit} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ mailInboxReducer }) => ({});

export default connect(mapStateToProps, {})(UIHeaderCard);