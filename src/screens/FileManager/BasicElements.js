
import React from "react";
import { connect } from "react-redux";
import { onLeave } from "../../actions";
import axios from 'axios';
import { useState } from "react";
import { useEffect } from "react";
import { Modal, Button } from 'react-bootstrap';
import AdharLogo from '../../assets/images/Aadhaar_Logo.png';
import PanLogo from '../../assets/images/pan-logo.png';
import { useHistory } from "react-router-dom";
import '../App/payment.css';
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useCountdown } from 'react-countdown-circle-timer';


const AppTaskbar = (props, location) => {
  const BuyDetails = props.location.state ? props.location.state.coinDetails : null;
  const Gweight = BuyDetails.quantity;
  const LiveVal = BuyDetails.preTaxAmount;
  const GST = BuyDetails.taxAmount;
  const TotalAmount = BuyDetails.totalAmount;



  const [razorpayResponse, setRazorpayResponse] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showKycPopup, setShowKycPopup] = useState(false);
  const [showAdharPopup, setShowAdharPopup] = useState(false);
  const [adharValidationMessage, setAdharValidationMessage] = useState("");
  const [adhar, setAdhar] = useState('');
  const [updated, setUpdated] = useState(adhar);
  const [pan, setpan] = useState('');
  const [panupdated, setpanUpdated] = useState(pan);
  const [pandob, setpandob] = useState('');
  const [pandobupdated, setpandobUpdated] = useState(pandob);
  const [panemail, setpanemail] = useState('');
  const [panemailupdated, setpanemailUpdated] = useState(panemail);
  const [showSecondPopup, setShowSecondPopup] = useState(false);
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  // state and city api start
  useEffect(() => {
    callAPI();

    callCityAPI();
  }, []);

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };


  // state and city api over

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  useEffect(() => {
    if (stateData.length > 0) {
      setSelectedState(stateData[0]._id); // Assuming stateData contains an array of objects with _id field
    }
  }, [stateData]);


  // razorpay api
  useEffect(() => {
    if (selectedState !== '') {
      const filteredCities = cityData.filter(city => city.state_id === selectedState);
      if (filteredCities.length > 0) {
        setSelectedCity(filteredCities[0]._id); // Assuming cityData contains an array of objects with _id field
      }
    }
  }, [cityData, selectedState]);

  const callAPI = async () => {
    try {
      const url = "http://13.233.119.42:1337/stateCode/getstateCode";
      const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lclJlZk5vIjoiNjVjYjNkYTkxMGM2YzAxMjdjZmE3NmFlIiwibmFtZSI6IkhodmYiLCJpYXQiOjE3MDgzMzY1MTd9.HDOi5QeqaG5eSFB0wM8D0E0Hm7QspQgMk8L3Pz-JhUo",
      };

      const response = await fetch(url, {
        method: 'GET',
        headers: headers,
      });

      const data = await response.json();
      setStateData(data.data);

      console.log("API Response:", data.data);




    } catch (error) {
      console.error("Error connecting to API", error);
    }
  };

  const callCityAPI = async () => {
    try {
      const url = "http://13.233.119.42:1337/stateCode/getcity";
      const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lclJlZk5vIjoiNjVjYjNkYTkxMGM2YzAxMjdjZmE3NmFlIiwibmFtZSI6IkhodmYiLCJpYXQiOjE3MDgzMzY1MTd9.HDOi5QeqaG5eSFB0wM8D0E0Hm7QspQgMk8L3Pz-JhUo",
      };

      const response = await fetch(url, {
        method: 'GET',
        headers: headers,
      });
      const data = await response.json();
      setCityData(data.data);
      console.log("CIty API Response:", data.data);
    } catch (error) {
      console.error("Error connecting to API", error);
    }
  };

  // api are over


  // pan api start


  // pan api end
  const handleAdharChange = (event) => {
    setAdhar(event.target.value);
  };

  const handlePanChange = (event) => {
    setpan(event.target.value);

  }

  // pancard pop state

  const [showPanPopup, setShowPanPopup] = useState(false)
  const [panValidationMessage, setpanValidationMessage] = useState("");

  const history = useHistory();

  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 12) {
      return <div className="timer">Too late...</div>;
    }

    return (
      <div className="timer text-dark">
        <div className="value text-dark">{remainingTime}</div>
      </div>
    );
  };

  // show pops
  const handleAdharPopupClose = () => {
    setShowAdharPopup(false);

  };


  const handleAdharPopupConfirm = () => {
    const adharInput = document.getElementById("adharInput").value;
    if (adharInput.length != 12) {
      setAdharValidationMessage("Please enter valid adhar number.");
      return;
    }

    localStorage.setItem('adharNumber', adhar);
    localStorage.setItem('panNumber', pan);
    localStorage.setItem('pandob', pandob);
    localStorage.setItem('panemail', panemail);
    setUpdated(adhar);
    setpanUpdated(pan);
    setpandobUpdated(pandob);
    setpanemailUpdated(panemail);
    setShowAdharPopup(false);

  };


  // local store
  const printAadharFromLocalStorage = () => {
    // const storedAdharNumber = localStorage.getItem('adharNumber');
    const pandobstore = localStorage.getItem('pandob');
    const pannumber = localStorage.getItem('panNumber');
    const panemail = localStorage.getItem('panemail');
    console.log("pannumber", pannumber);
    console.log("pandobstore", pandobstore);
    console.log("panemail", panemail);

  };
  const handleProClick = () => {
    const storedAdharNumber = localStorage.getItem('adharNumber');
    const storedPanNumber = localStorage.getItem('panNumber');

    if (storedAdharNumber || storedPanNumber) {
      handlePayment();
    } else {
      setShowKycPopup(true);
    }
  };

  const handlePanPopupclose = () => {
    setShowPanPopup(false);
  }

  const handlesecondPopup = () => {
    setShowSecondPopup(false);
    // showKycPopup(false);
  }

  const handlePanPopupConfirm = () => {

    const PanInput = document.getElementById("PanInput").value;
    if (PanInput.length != 11) {
      setpanValidationMessage("Please enter valid Pan number.");
      return;
    }
    localStorage.setItem('adharNumber', adhar); // Store Aadhar here as well
    localStorage.setItem('panNumber', pan);
    localStorage.setItem('pandob', pandob);
    localStorage.setItem('panemail', panemail);
    setUpdated(pan);
    setShowPanPopup(false);
    setShowSecondPopup(true);
    setShowKycPopup(false)

  }
  const handleSecondPopupClose = () => {
    setShowSecondPopup(false);
  };







  useEffect(() => {
    if (showSuccessPopup) {
      const timeout = setTimeout(() => {
        setShowSuccessPopup(false)

      }, 5000);

      return () => clearTimeout(timeout);
    }
    printAadharFromLocalStorage();
  }, [showSuccessPopup]);

  const handleOpenRazorpay = (data) => {
    const options = {
      key: 'rzp_test_68eN6vBfVZYS6b',
      amount: Number(data.amount),
      currency: data.currency,
      name: "Bharat Batuk Pvt.ltd.",
      description: "XYZ",
      order_id: data.id,
      handler: function (response) {
        console.log(response, "34");
        console.log("transaction details", response);
        setRazorpayResponse(response);
        setShowSuccessPopup(true);

      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };


  const handlePayment = () => {
    const _data = { TotalAmount: TotalAmount };
    axios.post("http://localhost:1337/orders", _data)
      .then(res => {
        console.log(res.data, "29");
        handleOpenRazorpay(res.data.data);
      })
      .catch(err => {
        console.log(err);



      });
  };

  const redirectToSummary = () => {
    history.push("/summary", { razorpayResponse, BuyDetails });
  }


  // timer 
  const {
    path,
    pathLength,
    stroke,
    strokeDashoffset,
    remainingTime,
    elapsedTime,
    size,
    strokeWidth,
  } = useCountdown({ isPlaying: true, duration: 7, colors: '#abc' })

  return (
    <>


      <div className={`container text-light`} style={{ filter: showKycPopup || showAdharPopup ? 'blur(5px)' : 'none' }}>

        <div className="container-fluid" style={{ height: "auto" }}>

          <div className="row d-flex justify-content-center" style={{ height: "auto" }}>
            <div className="col-md-7 bg-white p-3">
              <div className="col-md-12">
                <h2 className="text-dark text-center mb-2 p-2 mr-5" style={{ borderBottom: "2px solid black" }}>Order Summary</h2>
              </div>
              <div className="d-flex justify-contact-center p-2" style={{ borderBottom: "2px solid black" }}>
                <div className="col-md-4">
                  <div class="silvify-logo">
                    <h2 className="silvify-color">24k</h2>
                  </div>
                </div>
                <div className="col-md-5 " >
                  <h3 className="text-warning ml-3">MMTC-PAMP</h3>
                  <h5 className="text-dark h6">Silver Weight: {Gweight} gm</h5>
                </div>
              </div>
              <div className="details" style={{ color: "black" }}>
                <div className="col-md-12" >
                  <h5 className="text-center h2 p-2">Payment details</h5>
                </div>

                <table class="table h6">

                  <tbody>
                    <tr>
                      <td scope="col">Rate Of Silver Per Gm</td>
                      <td scope="col">{LiveVal}</td>

                    </tr>
                    <tr>

                      <td>Silver Weight</td>
                      <td>{Gweight}</td>
                    </tr>
                    <tr>
                      <td>Silver Value Of 1.0000/gm</td>
                      <td>{LiveVal}</td>
                    </tr>

                    <tr>
                      <td>GST</td>
                      <td>{GST}</td>
                    </tr>

                    <tr>
                      <td>Total Amount</td>
                      <td>{TotalAmount}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="d-flex justify-content-center mt-4">
                <button
                  type="button"
                  className="btn btn-warning p-3"
                  style={{ width: "300px", borderRadius: "20px", fontSize: "20px" }}
                  // onClick={handlePayment}
                  onClick={() => handleProClick()}
                >
                  Buy NOW
                </button>
              </div>
              <div className="d-flex justify-content-center mt-5" style={{ height: "50px" }}>
                <span className=" mt-3 mr-3 h5" style={{ color: "#EED881" }}>This price will expire in :</span>   <CountdownCircleTimer
                  style={{ width: "50px", height: "50px" }} // Add height property
                  isPlaying
                  size={60}
                  strokeWidth={10}
                  duration={120}
                  colors={["#EED881"]}
                  colorsTime={[10, 6, 3, 0]}
                  onComplete={() => ({ shouldRepeat: true, delay: 1 })}
                >
                  {renderTime}
                </CountdownCircleTimer>
              </div>

            </div>
          </div>
        </div>
      </div>




      {/* Show KYC pop-up */}
      {showKycPopup && (
        <div className="success-popup bg-light p-4 mb-5" style={{ border: "4px solid brown" }}>
          <div className="container " >

            <h2 className="text-dark p-2">Verfication</h2>
            <div class="row d-flex fw-bold p-1" style={{ borderRadius: "15px", border: "2px solid black" }}>
              <div className="col-md-4">
                <img src={AdharLogo} className="img-fluid" />
              </div>
              <div className="col-md-8">
                <button className="text-dark p-3" style={{ fontSize: "20px" }} onClick={() => setShowAdharPopup(true)}>
                  Do KYC with Adhar
                </button>
              </div>
            </div>
            <div className="mx-auto m-4 text-dark">
              <h3>OR</h3>
            </div>
            <div class="row d-flex fw-bold p-1" style={{ borderRadius: "15px", border: "2px solid black", height: "70px" }}>
              <div className="col-md-4">
                <img src={PanLogo} className="img-fluid" style={{ height: "70px" }} />
              </div>
              <div className="col-md-8">
                <button className="text-dark p-3" style={{ fontSize: "20px" }} onClick={() => setShowPanPopup(true)}>
                  Do KYC with Pan Card
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* this is adhar pop */}
      {showAdharPopup && (
        <Modal show={showAdharPopup}>
          <Modal.Header closeButton style={{ fontSize: "18px" }}>
            <Modal.Title>Complete KYC with Adhar</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input placeholder="Enter Adhar Number" type="text" style={{ width: "100%", border: "2px solid black", borderRadius: "15px", fontSize: "18px" }} className="p-3" id="adharInput" onChange={handleAdharChange} />
            <p style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>{adharValidationMessage}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" className="p-2" style={{ fontSize: "18px" }} onClick={() => setShowAdharPopup(false)}>

              Cancel
            </Button>
            <Button variant="primary" className="p-2" style={{ fontSize: "18px" }} onClick={handleAdharPopupConfirm} >
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* this is Pan Pop */}
      {showPanPopup && (
        <Modal show={showPanPopup}>
          <Modal.Header closeButton style={{ fontSize: "18px" }} className="mb-2">
            <Modal.Title>Complete KYC with Pan Card</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <form className="form-group" style={{ fontSize: "20px" }}>
              <div className="row mb-3 p-2">
                <label for="exampleInputEmail1">Enter PAN No</label>
                <input type="text" className="form-control outline-none" id="PanInput" placeholder="Enter PAN no" style={{ border: "2px solid #eed881" }} onChange={handlePanChange} />
                <p style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>{panValidationMessage}</p>
              </div>
              <div className="row mb-3 p-2">
                <label for="exampleInputEmail1">DOB</label>
                <input type="date" className="form-control outline-none" id="exampleInputEmail1" placeholder="Enter your address" style={{ border: "2px solid #eed881" }} />
              </div>
              <div className="row mb-3 p-2">
                <label for="exampleInputEmail1">Email</label>
                <input type="email" className="form-control outline-none" id="exampleInputEmail1" placeholder="Enter your email" style={{ border: "2px solid #eed881" }} />
              </div>
            </form>
            {/* <p style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>{emailValidationMessage}</p> */}

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" className="p-2" style={{ fontSize: "18px" }} onClick={handlePanPopupclose}>
              Cancel
            </Button>
            <Button variant="primary" className="p-2" style={{ fontSize: "18px" }} onClick={handlePanPopupConfirm} >
              Next
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Show payment success pop */}

      {showSuccessPopup && (
        <div className="success-popup">
          <div className="container">
            <div className="row mx-auto">
              <div className="col-md-5 " >
                <div className="success-checkmark " style={{ marginLeft: "120px" }} >
                  <div className="check-icon">
                    <span className="icon-line line-tip"></span>
                    <span className="icon-line line-long"></span>
                    <div className="icon-circle"></div>
                    <div className="icon-fix"></div>
                  </div>
                </div>
                <ul className="unorderList text-light" style={{ width: "300px" }} >

                  <li className="text-center m-3" style={{ fontSize: "20px" }}>Payment SUccessful</li>
                  <li className="text-center m-3 " >Transaction Number : {razorpayResponse?.razorpay_payment_id}</li>
                  <li className="text-center m-3" style={{ fontSize: "16px" }}>Amount Paid: {TotalAmount}</li>
                  <li className="text-center m-3"><a className="btn btn-warning p-2" onClick={redirectToSummary} style={{ fontSize: "20px" }} >View Details</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* show another pop when submit click on pan */}
      {showSecondPopup && (
        <Modal show={showSecondPopup}>
          <Modal.Header closeButton style={{ fontSize: "18px" }}>
            <Modal.Title>Billing Address</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row mb-4">
              <div className="col ">
                <label for="exampleInputEmail1">Name</label>
                <input type="text" class="form-control outline-none" id="exampleInputEmail1" placeholder="Enter your Full Name" style={{ border: "2px solid #eed881" }} />
              </div>

            </div>
            <div className="row mb-4">
              <div className="col ">
                <label for="exampleInputEmail1">Address Line 1</label>
                <input type="text" className="form-control outline-none" id="exampleInputEmail1" placeholder="Enter your address" style={{ border: "2px solid #eed881" }} />
              </div>
              <div className="col">
                <label for="exampleInputEmail1">Address Line 2</label>
                <input type="text" className="form-control outline-none" id="exampleInputEmail1" placeholder="Enter your address" style={{ border: "2px solid #eed881" }} />
              </div>
            </div>

            <div className="row mb-4">
              <div className="col ">
                <label for="exampleInputEmail1">State</label>
                <select className="custom-select outline-none" id="inputGroupSelect02" style={{ border: "2px solid #eed881" }} value={selectedState} onChange={handleStateChange}>
                  <option value="#">--Select State--</option>
                  {
                    stateData.map((state) => (
                      <option value={state._id} key={state._id}>{state.name}</option>
                    ))
                  }
                </select>
              </div>

              <div className='col mb-4'>
                <label for="exampleInputEmail1">City</label>
                <select className="custom-select outline-none" id="inputGroupSelect02" style={{ border: "2px solid #eed881" }} value={selectedCity} onChange={handleCityChange}>
                  <option value="">--Select City--</option>
                  {
                    cityData.filter(city => city.state_id === selectedState).map((city) => (
                      <option value={city._id} key={city._id}>{city.city_name}</option>
                    ))
                  }
                </select>
              </div>
            </div>


            <div className="row mb-4">
              <div className="col ">
                <label for="exampleInputEmail1">Pin Code</label>
                <input type="text" className="form-control outline-none" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your pincode" style={{ border: "2px solid #eed881" }} />
              </div>
              <div className="col">
                <label for="exampleInputEmail1">Mobile No</label>
                <input type="text" className="form-control outline-none" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your mobile" style={{ border: "2px solid #eed881" }} />
              </div>
            </div>







            {/* <input placeholder="Street Number" type="text" style={{ width: "100%", border: "2px solid black", borderRadius: "15px", fontSize: "18px" }} className="p-3" id="PanInput"  /> */}
          </Modal.Body>
          <Modal.Footer>
            <button type="submit" className=" " style={{ fontSize: "18px", backgroundColor: "#ffc107", padding: "10px 15px", borderRadius: "5px" }} onClick={handlesecondPopup}>
              Cancel
            </button>
            <button type="submit" className=" " style={{ fontSize: "18px", backgroundColor: "#ffc107", padding: "10px 15px", borderRadius: "5px" }} onClick={handleSecondPopupClose}>
              Submit
            </button>
            {/* Add any additional buttons or actions for the second pop-up */}
          </Modal.Footer>
        </Modal>
      )}
    </>


  );
};



const mapStateToProps = ({ mailInboxReducer }) => ({
  isInbox: mailInboxReducer.isInbox,
});

export default connect(mapStateToProps, { onLeave })(AppTaskbar);
