import React, { useState } from "react";
import { connect } from "react-redux";

const UIBootstrapSimpleExampleTab = () => {
  const [activeTab, setActiveTab] = useState(1);

  const onTabChange = (e) => {
    setActiveTab(e);
  };

  return (
    <div className="col-lg-12 col-md-12 bg-light vh-100">
      <div className="col-md-7 mx-auto m-5 p-2">
        <div className="card ">
          <div className="header">
            <h2>Welcome to Loanify!</h2>
          </div>
          <div className="body">
            <table className="table">
              <tbody>
                <tr>
                  <td>Total Portfolio</td>
                  <td>100%</td>
                </tr>
                <tr>
                  <td>Available Portfolio</td>
                  <td>50%</td>
                </tr>
                <tr>
                  <td>Loan Amount</td>
                  <td>10000000</td>
                </tr>
              </tbody>
            </table>
            <button className="btn btn-info mt-3 btn-block" type="submit">
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ mailInboxReducer }) => ({});

export default connect(mapStateToProps, {})(UIBootstrapSimpleExampleTab);