import React from "react";
// import '../assets/assets/scss/base/style.scss';
import * as echarts from "echarts";

var timer = null;


class SparkleCard extends React.Component {
  // state = {
  //   // updateData: [...this.props.mainData],
  //   DataX: [5, 5, 5, 5, 5, 5],
  // };

  // componentDidMount() {
  //   this.timeoutID = undefined;
  //   // this.ploatData(this.props.mainData);

  //   this.setState({
  //     // updateData: [...this.props.mainData],
  //   });
  //   this.chartPlace();
  // }
  // ploatData = (data) => {
  //   var reData = [];
  //   data.map(() => {
  //     reData.push(Math.floor(Math.random() * 10) + 1);
  //   });

  //   this.timeoutID = setTimeout(() => {
  //     this.ploatData(this.state.updateData);
  //     // if (this.props.isRandomUpdate) {
  //     //   this.chartPlace();
  //     // }
  //   }, 5000);
  //   this.setState({ updateData: [...reData] });
  // };
  // chartPlace = () => {
  //   const { chartColor, mainData, index } = this.props;
  //   var chartDom = document.getElementById("main" + index);
  //   var myChart = echarts.init(chartDom);
  //   var option;
  //   option = {
  //     tooltip: {
  //       trigger: "axis",
  //       formatter: function (value) {
  //         return value[0].data;
  //       },
  //     },
  //     grid: {
  //       left: 0,
  //       bottom: 0,
  //       top: 5,
  //       right: 0,
  //     },
  //     xAxis: [
  //       {
  //         type: "category",
  //         boundaryGap: false,
  //         axisLine: {
  //           show: false,
  //         },
  //         animation: {
  //           duration: 300,
  //           easing: "cubicOut",
  //         },
  //         data: [0, 1, 2, 3, 4, 5],
  //       },
  //     ],
  //     yAxis: [
  //       {
  //         type: "value",
  //         splitLine: { show: false },
  //         axisLine: {
  //           show: false,
  //         },
  //         axisLabel: {
  //           show: false,
  //         },
  //         data: [0, 2, 4, 6, 8, 10],
  //       },
  //     ],
  //     series: [
  //       {
  //         type: "line",
  //         data: mainData ? this.state.updateData : [5, 6, 9, 2, 3, 6, 8, 5],
  //         areaStyle: {
  //           color: chartColor ? chartColor : "#f79647",
  //         },
  //         itemStyle: {
  //           color: chartColor ? chartColor : "#f79647",
  //         },
  //         symbolSize: 1,
  //       },
  //     ],
  //   };
  //   option && myChart.setOption(option);
  // };
  // componentWillUnmount() {
  //   clearTimeout(this.timeoutID);
  // }
  render() {
    const { Heading, PerText, ContainerClass, index, Image, TextColor, BorderColor, URL, backGround } = this.props;

    //const { Heading, Money, PerText, ContainerClass, index, Image } = this.props;
    return (
      <>

        <div className={ContainerClass} style={{
          marginRight: "1px", width: "150rem", marginTop: "10px",
        }
        }>
          {/* Farzi ka container */}

          {/* --------------------------------- */}

          <div className="card overflowhidden" style={{ backgroundColor: "#000", borderRadius: "15px", border: "1.8px solid #ffc107", }}>
            <a href={URL}>
              <div className="card-body text-center">
                <img src={Image} alt="image" className="rounded " style={{ width: "50px" }}></img>
                <h6 style={TextColor}>{Heading}</h6>
                <p style={TextColor}>{PerText}</p>
              </div>
            </a>
          </div>

        </div >
      </>
    );
  }
}


export default SparkleCard;
