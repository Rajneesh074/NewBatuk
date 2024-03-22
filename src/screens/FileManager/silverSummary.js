import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
// import '../../../src/App.css';
const summary = (props) => {
    const { location } = props;
    const BuyDetails = location.state ? location.state.BuyDetails : null;
    const razorpayResponse = location.state ? location.state.razorpayResponse : null;

    const rateSilver = BuyDetails.preTaxAmount;
    const SilverWeight = BuyDetails.quantity;
    const silvertax = BuyDetails.taxAmount;
    const finalTotal = BuyDetails.totalAmount;
    const QuateId = BuyDetails.quoteId;
    const transactionID = razorpayResponse.razorpay_payment_id
    const InvoiceId = razorpayResponse.razorpay_order_id
    return (

        <div className="container-fluid" style={{ marginLeft: "35rem" }}>
            <div className="row">
                <div className="d-flex  p-4 mt-3 " style={{ borderBottom: "2px solid #fff", width: "100%" }}>
                    <div className="col-md-2">
                        <div className="btn-gradient-2 silvify-logo">
                            <h2 className="silvify-color">24K</h2>
                        </div>
                    </div>
                    <div className="col  mt-3 text-light" >
                        <h4 className="text-warning">MMTC-PAMP</h4>
                        <h6>Silver Weight : {SilverWeight} gm</h6>
                    </div>
                </div>
                {/* <div className="col-md-12 text-light p-5">Hello</div> */}
            </div >
            <hr />
            <table class="table table-bordered table-dark table-borderless">
                <thead>
                    <tr>
                        <th scope="col" className="h4">Payment Details</th>

                    </tr>
                </thead>
                <tbody>
                    <tr>

                        <td>Rate of gold</td>
                        <td>{rateSilver}</td>

                    </tr>
                    <tr>

                        <td>Per gm</td>
                        <td>{SilverWeight}</td>

                    </tr>
                    <tr style={{ borderBottom: "2px solid #fff " }}>

                        <td>GST</td>
                        <td>{silvertax}</td>

                    </tr>

                    <tr style={{ borderBottom: "2px solid #fff ", fontSize: "18px" }}>

                        <td >Total Amount</td>
                        <td>{finalTotal}</td>

                    </tr>
                    <tr>

                        <td>Transaction/Order ID</td>
                        <td>{transactionID}</td>

                    </tr>
                    <tr>
                        <td>Invoice Id</td>
                        <td>{InvoiceId}</td>
                    </tr>
                    <tr>
                        <td>QuoteId</td>
                        <td>{QuateId}</td>
                    </tr>
                    <tr style={{ borderBottom: "2px solid #fff " }}>
                        <td>Status</td>
                        <td style={{ color: "green", fontWeight: "bold" }}>SUCCESSFUL</td>
                    </tr>
                    <tr>
                        <td class="text-center"><i class="fa-solid fa-copy " style={{ fontSize: "24px" }}></i>
                            <p>Get Invoice</p>
                        </td>
                        <td class="text-center"><i class="fa fa-share-alt" aria-hidden="true" style={{ fontSize: "24px" }}></i>

                            <p>Share Receipt</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div >
    )
}

export default summary;