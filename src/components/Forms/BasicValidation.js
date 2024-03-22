import React from "react";
import { connect } from "react-redux";
import Select from "react-dropdown-select";
import MMTC from '../../assets/images/MMTC-PAMP-Logo-2.png'
import '../../../src/App.css'

class BasicValidation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amountInput: "",
      // emailInput: "",
      weightInput: "",
      submeet: false,
    };
  }
  render() {
    const { amountInput, weightInput, submeet } = this.state;
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    return (
      <div className="container-fluid " style={{ height: "642px", width: "100%" }}>
        <div className="row p-4">
          <h2 className=" col-sm-lg p-2">WelCome to Gold Buy..&#128522;</h2>
          <div className="col-md-12  " >

            <div className="card " style={{ backgroundColor: "#f4f7f6", outline: "none" }}>
              {/* top header */}
              <div className="container  " >
                <div className="row mt-5" style={{ border: "2px solid #ffc107", borderRadius: "17px" }}  >
                  <div className="col-md-2"></div>

                  <div className="col-md-2 p-3 ">
                    {/* <img src={gold} alt="gold logo" className="img-fluid" style={{ height: "80px" }} /> */}
                    <div class="btn-gradient-2">
                      <h2 className="logo-head">24K</h2>
                    </div>
                  </div>
                  <div className="col-md-4 p-3" >
                    <h4 style={{ color: "#ffc107" }}>MMTC-PAMP</h4>
                    <h5 className="">24k 99.9% Purity</h5>
                    {/* <h5 className="text-light">Gold in Locker : 8.5000 gm</h5> */}
                  </div>
                  <div className="col-md-2 p-3">

                    <span style={{ width: "5px", height: "50px", backgroundColor: "black" }}></span>
                    <h6 style={{ color: "green" }} >LIVE</h6>
                    <h4 className=""><span>&#8377;</span> <span>5434 / gm</span></h4>
                  </div>

                  <div className="col-md-2"></div>
                </div>
              </div>

              {/* top end */}
              {/* <div className="header bg-info">
            <h2>Basic Validation</h2>
          </div> */}
              <div className="body ">
                <form className="ng-untouched  ng-invalid">

                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="row">

                          {/* first input */}
                          <div className="col">
                            <div className="form-group">
                              <label className="text-light">Amount (Rs)</label>
                              <input
                                className={`form-control ${amountInput === "" && submeet && "parsley-error"
                                  }`}
                                value={amountInput}
                                name="text"
                                required=""
                                placeholder="₹ 5434"
                                style={{ padding: "25px 25px", borderRadius: "10px", border: "2px solid #ffc107" }}

                                onChange={(e) => {
                                  this.setState({
                                    amountInput: e.target.value,
                                    submeet: false,
                                  });
                                }}
                              />
                              {amountInput === "" && submeet ? (
                                <ul className="parsley-errors-list filled" id="parsley-id-29">
                                  <li className="parsley-required">
                                    This value is required.
                                  </li>
                                </ul>
                              ) : null}
                            </div>
                          </div>


                          {/* second input */}
                          <div className="col">
                            <div className="form-group">
                              <label className="text-light">Weight (gm)</label>
                              <input
                                className={`form-control ${weightInput === "" && submeet && "parsley-error"
                                  }`}
                                value={weightInput}
                                name="text"
                                required=""
                                placeholder="1gm"
                                style={{ padding: "25px 25px", borderRadius: "10px", border: "2px solid #ffc107" }}
                                onChange={(e) => {
                                  this.setState({
                                    weightInput: e.target.value,
                                    submeet: false,
                                  });
                                }}
                              />
                              {weightInput === "" && submeet ? (
                                <ul className="parsley-errors-list filled" id="parsley-id-29">
                                  <li className="parsley-required">
                                    This value is required.
                                  </li>
                                </ul>
                              ) : null}
                            </div>
                          </div>


                        </div>
                      </div>
                    </div>

                    {/* <div className="col">

                </div> */}
                  </div>


                  {/* <div className="form-group">
                <label>Email Input</label>
                <input
                  className={`form-control ${!reg.test(emailInput) && submeet && "parsley-error"
                    }`}
                  value={emailInput}
                  name="email"
                  pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
                  required=""
                  type="email"
                  onChange={(e) => {
                    this.setState({ emailInput: e.target.value });
                  }}
                />
                {submeet && !reg.test(emailInput) ? (
                  <ul className="parsley-errors-list filled" id="parsley-id-29">
                    <li className="parsley-required">
                      This value is required.
                    </li>
                  </ul>
                ) : null}
              </div> */}
                  <div className="form-group align-center " style={{ fontSize: "18px", backgroundColor: "" }}>
                    Exclusive of 3% GST
                    {/* <label>Text Area</label>
                <textarea
                  className={`form-control ${areaInput === "" && submeet && "parsley-error"
                    }`}
                  value={areaInput}
                  cols="30"
                  name="textarea"
                  required=""
                  rows="5"
                  onChange={(e) => {
                    this.setState({ areaInput: e.target.value });
                  }}
                ></textarea>
                {areaInput === "" && submeet ? (
                  <ul className="parsley-errors-list filled" id="parsley-id-29">
                    <li className="parsley-required">
                      This value is required.
                    </li>
                  </ul>
                ) : null} */}
                  </div>
                  {/* <div className="form-group">
                <label>Checkbox</label>
                <br />
                <label className="fancy-checkbox">
                  <input name="checkbox" type="checkbox" />
                  <span>Option 1</span>
                </label>
                <label className="fancy-checkbox">
                  <input name="checkbox" type="checkbox" />
                  <span>Option 2</span>
                </label>
                <label className="fancy-checkbox">
                  <input name="checkbox" type="checkbox" />
                  <span>Option 3</span>
                </label>
              </div> */}
                  {/* <div className="form-group"> */}
                  {/* <label>Radio Button</label>
              <br />
              <label className="fancy-radio">
                <input
                  data-parsley-errors-container="#error-radio"
                  name="gender"
                  required=""
                  type="radio"
                  value="male"
                />
                <span>
                  <i></i>Male
                </span>
              </label>
              <label className="fancy-radio">
                <input name="gender" type="radio" value="female" />
                <span>
                  <i></i>Female
                </span>
              </label> */}
                  {/* </div> */}
                  {/* <div className="form-group"> */}
                  {/* <label>Multiselect</label>
              <br />
              <Select
                className="js-states "
                placeholder=""
                options={[]}
                values={[
                  { label: " Mozzarella ", value: " Mozzarella " },
                  { label: "Mushrooms", value: "Mushrooms" },
                ]}
                disabled={false}
                create={true}
                multi={true}
                dropdownHandle={false}
                searchable={true}
                onChange={(values) => { }}
              /> */}
                  {/* </div> */}
                  <br />
                </form>
                {/* <div className=""> */}




                <div className="d-flex justify-content-center">
                  <button
                    className="btn btn-center    "
                    onClick={() => {
                      this.setState({ submeet: true });
                    }}
                    style={{ borderRadius: "20px", fontSize: "18px", backgroundColor: "#ffc107", width: "300px" }}
                  >
                    Proceed to Pay <span>&#8377;</span>  0
                  </button>


                </div>
                <h6 className="d-flex justify-content-center p-2 text-dark">Gold Accumulation Plan <span style={{ color: "red" }}>T & C</span></h6>

                {/* </div> */}
              </div>
            </div>
          </div >
        </div>
        <div className=" d-flex justify-content-center " style={{ marginTop: "-35px" }}  >
          <img src={MMTC} className="img-fluid" style={{ height: "70px", width: "270px" }}></img>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ mailInboxReducer }) => ({});

export default connect(mapStateToProps, {})(BasicValidation);
