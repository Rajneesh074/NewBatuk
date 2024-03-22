import React from "react";
import { connect } from "react-redux";
import { onPressAddContact } from "../../actions";
import axios from 'axios';

const Chat = ({ location }) => {
  const coinDetails = location.state ? location.state.coinDetails : null;

  const imagePath = coinDetails && coinDetails.skus[0].images[0].src;
  console.log("coin details is", coinDetails);
  const details = coinDetails.name;
  const des = coinDetails.description;
  const weight = coinDetails && coinDetails.skus[0].weight;
  const purity = coinDetails && coinDetails.skus[0].purity
  const SId = coinDetails && coinDetails.skus[0].skuId
  const charge = coinDetails && coinDetails.skus[0].makingCharges;

  const handleOpenRazorpay = (data) => {
    const options = {
      key: 'rzp_test_68eN6vBfVZYS6b',
      amount: Number(data.amount) * 100,
      currency: data.currency,
      name: "Bharat Batuk Pvt.ltd.",
      description: "XYZ",
      order_id: data.id,
      handler: function (response) {
        console.log(response, "34");
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  }

  const handlePayment = (charge) => {
    const _data = { charge: charge }
    axios.post("http://localhost:1337/ord", _data)
      .then(res => {
        console.log(res.data, "29");
        handleOpenRazorpay(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
  }


  return (

    <div>
      <div className="container mt-5" style={{ marginLeft: "35rem" }}>
        <div className="col-md-6"></div>
        <div className="row d-flex justify-content-around mx-auto p-4" style={{ height: "auto" }}>
          <div className="col-md-3 d-flex justify-content-center p-4 align-item-center align-self-center" style={{ height: "auto", border: "3px solid  #ffc107", borderRadius: "10px" }}>
            <img src={imagePath} alt=" images" style={{ height: "150px", width: "150px" }} />
          </div>

          <div className="col-md-6 p-2 " style={{ height: "auto", fontSize: "18px" }}>
            <p className="text-justify"><span>{details}</span><br /><span>{des}</span></p>
            <h4 style={{ color: "green" }}>&#8377; {charge} (All Inclusive)</h4>
          </div>
        </div>
      </div>

      {/* footer */}
      <div className="container">
        <h3 className="p-2">Product Details</h3>
        <div className="row d-flex justify-content-around " >
          <div className="col-md-8" style={{ height: "auto" }}>
            <table className="table" style={{ fontSize: "18px" }}>
              <tbody>
                <tr>
                  <td>Weight :</td>
                  <td>{weight}</td>
                </tr>
                <tr>
                  <td>Metal Purity :</td>
                  <td>{purity}</td>
                </tr>
                <tr>
                  <td>Model :</td>
                  <td>Coin</td>
                </tr>
                <tr>
                  <td>SKU ID :</td>
                  <td>{SId}</td>
                </tr>
              </tbody>
            </table>
            <h5 className="">Refund Policy</h5>
            <p className="">This product can not be cancelled, returned or replaced once ordered</p>
            <p className="">Agree to accept<a>Term & Conditions</a> of Gold</p>
            <div className="d-flex justify-content-center mb-2">
              <button
                type="button"
                className="btn btn-warning p-3"
                onClick={() => handlePayment(charge)}
                style={{ width: "300px", borderRadius: "20px", fontSize: "18px" }}

              >
                Proceed to Pay &#8377;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ mailInboxReducer }) => ({
  isContactModal: mailInboxReducer.isContactModal,
});

export default connect(mapStateToProps, { onPressAddContact })(Chat);
