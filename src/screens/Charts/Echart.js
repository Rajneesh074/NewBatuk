import React from "react";
import { connect } from "react-redux";
// import PageHeader from "../../components/PageHeader";
// import StackedAreaChart from "../../components/Charts/StackedAreaChart";
// import PieChart from "../../components/Charts/PieChart";
// import PunchCard from "../../components/Charts/PunchCard";
// import LargeScaleAreaChart from "../../components/Charts/LargeScaleAreaChart";

class Echart extends React.Component {

  render() {
    return (

      <><h1>hello</h1></>
    );
  }
}

const mapStateToProps = ({ ioTReducer }) => ({});

export default connect(mapStateToProps, {})(Echart);
