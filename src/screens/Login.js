import React, { useState, useEffect, useContext } from "react";
import { connect } from "react-redux";

import PropTypes from "prop-types";
import 'bootstrap/dist/css/bootstrap.min.css';
import OtpInputBox from "../screens/OtpInputBox";
import LoginOne from '../assets/images/one-img.jpg'
import LoginTwo from '../assets/images/two-img.jpg'
import Logo from "../assets/images/Batuk-logo.png";
import { useHistory } from "react-router-dom";
import { updateEmail, updatePassword, onLoggedin } from "../actions";


const Login = () => {
  const history = useHistory();

  const [isLoad, setIsLoad] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const token = sessionStorage.getItem("token");




  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoad(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.classList.remove("theme-cyan");
    document.body.classList.remove("theme-purple");
    document.body.classList.remove("theme-blue");
    document.body.classList.remove("theme-green");
    document.body.classList.remove("theme-orange");
    document.body.classList.remove("theme-blush");
  }, []);

  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handlePhoneSubmit = async (event) => {
    event.preventDefault();

    const regex = /[^0-9]/g;
    if (phoneNumber.length !== 10 || regex.test(phoneNumber)) {
      alert("Invalid Phone Number");
      return;
    }

    try {
      const url = "http://13.233.119.42:1337/customUser/register";
      const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ "phone": phoneNumber }),
      });

      const data = await response.json();
      console.log(" register API Response:", data);
      // sessionStorage.setItem("token", data.Token)
      console.log(" my  API Response:", data);
      if (data.data && data.data.length > 0 && data.data[0].jwt_token) {
        console.log("Token:", data.data[0].jwt_token);
        sessionStorage.setItem("token", data.data[0].jwt_token);
        setShowOtpInput(true);

      } else {
        console.log("Error: JWT token not found in response");
        // Handle error condition here
      }


      setShowOtpInput(true);

    } catch (err) {
      console.log("Error connecting to API", err);
    }
  };

  const onOtpSubmit = async (otp, e) => {
    // e.preventDefault();














    console.log("Login Successful", otp);

    try {
      const url = "http://13.201.77.26:1337/customUser/register";
      const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
      };
      const reqBody = {
        "phone": phoneNumber,
        "otp": otp,

      }
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(reqBody),
      });

      const data = await response.json();
      console.log(" login   API Response:", data);
      if (data.data && data.data.length > 0 && data.data[0].jwt_token) {
        console.log("Token:", data.data[0].jwt_token);
        // sessionStorage.setItem("token", data.data[0].jwt_token);
        setShowOtpInput(true);
        // history.push("/GoldBuy", { token: data.data[0].jwt_token });
      } else {
        // console.log("Error: JWT token not found in response");
        // Handle error condition here
      }



    } catch (err) {
      console.log("Error connecting to API", err);
    }


  }


  return (

    <div className="container-fluid"   >
      <div className="row d-flex justify-content-between align-items-center" style={{ height: "100vh" }}>
        <div className="col-md-4 " style={{ height: "100vh" }}>
          <img src={LoginTwo} alt=" here first image" className="img-fluid" style={{ height: "100vh", width: "auto" }} />
        </div>

        <div className="col-md-3 float-left" style={{ backgroundColor: "#8b0b07" }} >


          <div className="  " >
            <div className="top ">
              <img src={Logo} alt="Lucid" style={{ height: "90x", marginTop: "0px " }} />
              <span className=" pt-5" style={{ fontSize: "24px", fontWeight: "bold", color: "#EED881" }}>Batuk</span>
            </div>
            <div className="card">
              <div className="header " >
                <p className="lead" style={{ fontWeight: "bold" }}>Login to your account</p>
              </div>
              <div className="body">
                {!showOtpInput ? (
                  <form onSubmit={handlePhoneSubmit}>
                    <label for="phone">Enter Phone Number</label>
                    <input class="form-control" id="phone" type="text" value={phoneNumber} onChange={handlePhoneNumber} placeholder="Enter Phone Number" />

                    <button className="btn btn-info mt-3 btn-lg btn-block" type="submit">Submit</button>

                  </form>
                ) : (
                  <div>
                    <p>Enter OTP sent to {phoneNumber}</p>
                    <OtpInputBox length={6} onClick={onOtpSubmit} />
                  </div>
                )

                }
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 " style={{ height: "100vh" }}>
          <img src={LoginOne} alt="here second image" style={{ height: "100vh", width: "auto" }} />
        </div>


      </div>
    </div>



  );
};
Login.propTypes = {
  updateEmail: PropTypes.func.isRequired,
  updatePassword: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
};

const mapStateToProps = ({ loginReducer }) => ({
  email: loginReducer.email,
  password: loginReducer.password
});

export default connect(mapStateToProps, {
  updateEmail,
  updatePassword,
  onLoggedin
})(Login);