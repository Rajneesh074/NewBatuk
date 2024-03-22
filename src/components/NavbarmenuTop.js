import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown, Nav, Toast } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
    onPressDashbord,
    onPressDashbordChild,
    // onPressThemeColor,
    onPressGeneralSetting,
    // onPressNotification,
    // onPressEqualizer,
    onPressSideMenuToggle,
    onPressMenuProfileDropdown,
    // onPressSideMenuTab,
    tostMessageLoad,
} from "../actions";
import Logo from "../assets/images/Batuk-logo.png";
import LogoWhite from "../assets/images/logo-white.svg";
import UserImage from "../assets/images/user.png";
import Avatar4 from "../assets/images/xs/avatar4.jpg";
import Avatar5 from "../assets/images/xs/avatar5.jpg";
import Avatar2 from "../assets/images/xs/avatar2.jpg";
import Avatar1 from "../assets/images/xs/avatar1.jpg";
import Avatar3 from "../assets/images/xs/avatar3.jpg";

class NavbarMenu extends React.Component {
    state = {
        linkupdate: false,
    };
    componentDidMount() {
        this.props.tostMessageLoad(true);
        var res = window.location.pathname;
        res = res.split("/");
        res = res.length > 4 ? res[4] : "/";
        const { activeKey } = this.props;
        this.activeMenutabwhenNavigate("/" + activeKey);
    }

    activeMenutabwhenNavigate(activeKey) {
        if (
            activeKey === "/dashboard"
            // activeKey === "/demographic" ||
            // activeKey === "/ioT"
        ) {
            this.activeMenutabContainer("dashboradContainer");
        } else if (
            activeKey === "/GoldBuy" ||
            activeKey === "/GoldSell" ||
            activeKey === "/GoldDilver"
            // activeKey === "/appcontact" ||
            // activeKey === "/apptaskbar"
        ) {
            this.activeMenutabContainer("AppContainer");
        } else if (
            activeKey === "/SilverBuy" ||
            activeKey === "/SilverSell" ||
            activeKey === "/SilverDilver"
        ) {
            this.activeMenutabContainer("BlogContainer");
        } else if (
            activeKey === "/uitypography" ||
            activeKey === "/uitabs" ||
            activeKey === "/uibuttons" ||
            activeKey === "/bootstrapui" ||
            activeKey === "/uiicons" ||
            activeKey === "/uinotifications" ||
            activeKey === "/uicolors" ||
            activeKey === "/uilistgroup" ||
            activeKey === "/uimediaobject" ||
            activeKey === "/uimodal" ||
            activeKey === "/uiprogressbar"
        ) {
            this.activeMenutabContainer("UIElementsContainer");
        } else if (
            // activeKey === "/widgetsdata" ||
            activeKey === "/widgetsweather" ||
            activeKey === "/widgetsblog" ||
            activeKey === "/widgetsecommers"
        ) {
            this.activeMenutabContainer("WidgetsContainer");
        } else if (activeKey === "/login") {
            this.activeMenutabContainer("WidgetsContainer");
        } else if (
            activeKey === "/teamsboard" ||
            activeKey === "/profilev2page" ||
            activeKey === "/helperclass" ||
            activeKey === "/searchresult" ||
            activeKey === "/invoicesv2" ||
            activeKey === "/invoices" ||
            activeKey === "/pricing" ||
            activeKey === "/timeline" ||
            activeKey === "/profilev1page" ||
            activeKey === "/blankpage" ||
            activeKey === "/imagegalleryprofile" ||
            activeKey === "/projectslist" ||
            activeKey === "/maintanance" ||
            activeKey === "/testimonials" ||
            activeKey === "/faqs"
        ) {
            this.activeMenutabContainer("PagesContainer");
        } else if (
            activeKey === "/formvalidation" ||
            activeKey === "/basicelements"
        ) {
            this.activeMenutabContainer("FormsContainer");
        } else if (activeKey === "/tablenormal") {
            this.activeMenutabContainer("TablesContainer");
        } else if (activeKey === "/echart") {
            this.activeMenutabContainer("chartsContainer");
        } else if (activeKey === "/leafletmap") {
            this.activeMenutabContainer("MapsContainer");
        }
    }



    activeMenutabContainer(id) {
        var parents = document.getElementById("main-menu");
        var activeMenu = document.getElementById(id);

        for (let index = 0; index < parents.children.length; index++) {
            if (parents.children[index].id !== id) {
                parents.children[index].classList.remove("active");
                parents.children[index].children[1].classList.remove("in");
            }
        }
        setTimeout(() => {
            activeMenu.classList.toggle("active");
            activeMenu.children[1].classList.toggle("in");
        }, 10);
    }
    render() {
        const {
            addClassactive,
            // addClassactiveChildAuth,
            addClassactiveChildMaps,
            // themeColor,
            toggleNotification,
            toggleEqualizer,
            // sideMenuTab,
            // isToastMessage,
            activeKey,
        } = this.props;
        var path = window.location.pathname;
        // document.body.classList.add(themeColor);

        return (
            <div>
                {/* {isToastMessage ? (
          <Toast
            id="toast-container"
            show={isToastMessage}
            onClose={() => {
              this.props.tostMessageLoad(false);
            }}
            className="toast-info toast-top-right"
            autohide={true}
            delay={5000}
          >
            <Toast.Header className="toast-info mb-0">
              Hello, welcome to Lucid, a unique admin Template.
            </Toast.Header>
          </Toast>
        ) : null} */}

                {/* nav start */}
                <nav className="navbar navbar-fixed-top">
                    <div className="container-fluid">
                        <div className="navbar-btn">
                            <button
                                className="btn-toggle-offcanvas"
                                onClick={() => {
                                    this.props.onPressSideMenuToggle();
                                }}
                            >
                                <i className="lnr lnr-menu fa fa-bars"></i>
                            </button>
                        </div>

                        {/* top navbar logo */}
                        <div className="navbar-brand ">
                            <a href="dashboard">
                                <img
                                    src={
                                        document.body.classList.contains("full-dark")
                                            ? LogoWhite
                                            : Logo
                                    }
                                    alt="Lucid Logo"
                                    className="img-responsive logo "
                                    style={{ height: "45px", width: "45px", marginBottom: "8px" }}
                                />
                            </a>
                            {/* <div className="text">
                <h4>Batuk</h4>
              </div> */}

                            {/* </a> */}
                        </div>



                        <div className="navbar navbar-expand-lg " style={{ height: "45px" }}>


                            <div className="user-account " >
                                <img
                                    src={UserImage}
                                    className="rounded-circle user-photo"
                                    alt="User Profile Picture"
                                />
                                <Dropdown>
                                    <span>Welcome,</span>
                                    <Dropdown.Toggle
                                        variant="none"
                                        as="a"
                                        id="dropdown-basic"
                                        className="user-name"
                                    >
                                        <strong>Alizee Thomas</strong>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu className="dropdown-menu-right account">
                                        <Dropdown.Item href="profilev2page">
                                            <i className="icon-user"></i>My Profile
                                        </Dropdown.Item>
                                        <Dropdown.Item href="GoldBuy">
                                            {" "}
                                            <i className="icon-envelope-open"></i>Messages
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                            {" "}
                                            <i className="icon-settings"></i>Settings
                                        </Dropdown.Item>
                                        <li className="divider"></li>
                                        <Dropdown.Item href="login">
                                            {" "}
                                            <i className="icon-power"></i>Logout
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                            {/* <form id="navbar-search" className="navbar-form search-form">
                <input
                  className="form-control"
                  placeholder="Search here..."
                  type="text"
                />
                <button type="button" className="btn btn-default">
                  <i className="icon-magnifier"></i>
                </button>
              </form> */}

                            {/* <div id="navbar-menu m-auto"> */}
                            <ul className="nav navbar-nav mx-auto">
                                {/* <li className="nav-item">
                        <a href="#" className="nav-link m-2 text-light"
                          style={{ fontSize: "20px" }}>Home</a>
                      </li>
                      <li className="nav-item">
                        <a href="#" className="nav-link m-2 text-light"
                          style={{ fontSize: "20px" }}>About</a>
                      </li>
                      <li className="nav-item">
                        <a href="#" className="nav-link m-2 text-light"
                          style={{ fontSize: "20px" }}>Contact Us</a>
                      </li>
                      <li className="nav-item">
                        <a href="#" className="nav-link m-2 text-light"
                          style={{ fontSize: "20px" }}></a>
                      </li> */}
                                {/* <li
                    className={
                      toggleNotification ? "show dropdown" : "dropdown"
                    }
                  >
                    <a
                      href="#!"
                      className="dropdown-toggle icon-menu"
                      data-toggle="dropdown"
                      onClick={(e) => {
                        e.preventDefault();
                        this.props.onPressNotification();
                      }}
                    >
                      <i className="icon-bell"></i>
                      <span className="notification-dot"></span>
                    </a>
                    <ul
                      className={
                        toggleNotification
                          ? "dropdown-menu notifications show"
                          : "dropdown-menu notifications"
                      }
                    >
                      <li className="header">
                        <strong>You have 4 new Notifications</strong>
                      </li>
                      <li>
                        <a>
                          <div className="media">
                            <div className="media-left">
                              <i className="icon-info text-warning"></i>
                            </div>
                            <div className="media-body">
                              <p className="text">
                                Campaign <strong>Holiday Sale</strong> is nearly
                                reach budget limit.
                              </p>
                              <span className="timestamp">10:00 AM Today</span>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a>
                          <div className="media">
                            <div className="media-left">
                              <i className="icon-like text-success"></i>
                            </div>
                            <div className="media-body">
                              <p className="text">
                                Your New Campaign <strong>Holiday Sale</strong>{" "}
                                is approved.
                              </p>
                              <span className="timestamp">11:30 AM Today</span>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a>
                          <div className="media">
                            <div className="media-left">
                              <i className="icon-pie-chart text-info"></i>
                            </div>
                            <div className="media-body">
                              <p className="text">
                                Website visits from Twitter is 27% higher than
                                last week.
                              </p>
                              <span className="timestamp">04:00 PM Today</span>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a>
                          <div className="media">
                            <div className="media-left">
                              <i className="icon-info text-danger"></i>
                            </div>
                            <div className="media-body">
                              <p className="text">
                                Error on website analytics configurations
                              </p>
                              <span className="timestamp">Yesterday</span>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="footer">
                        <a className="more">See all notifications</a>
                      </li>
                    </ul>
                  </li> */}
                                {/* <li
                    className={toggleEqualizer ? "show dropdown" : "dropdown"}
                  >
                    <a
                      href="#!"
                      className="dropdown-toggle icon-menu"
                      data-toggle="dropdown"
                      onClick={(e) => {
                        e.preventDefault();
                        this.props.onPressEqualizer();
                      }}
                    >
                      <i className="icon-equalizer"></i>
                    </a>
                    <ul
                      className={
                        toggleEqualizer
                          ? "dropdown-menu user-menu menu-icon show"
                          : "dropdown-menu user-menu menu-icon"
                      }
                    >
                      <li className="menu-heading">ACCOUNT SETTINGS</li>
                      <li>
                        <a>
                          <i className="icon-note"></i> <span>Basic</span>
                        </a>
                      </li>
                      <li>
                        <a>
                          <i className="icon-equalizer"></i>{" "}
                          <span>Preferences</span>
                        </a>
                      </li>
                      <li>
                        <a>
                          <i className="icon-lock"></i> <span>Privacy</span>
                        </a>
                      </li>
                      <li>
                        <a>
                          <i className="icon-bell"></i>{" "}
                          <span>Notifications</span>
                        </a>
                      </li>
                      <li className="menu-heading">BILLING</li>
                      <li>
                        <a>
                          <i className="icon-credit-card"></i>{" "}
                          <span>Payments</span>
                        </a>
                      </li>
                      <li>
                        <a>
                          <i className="icon-printer"></i> <span>Invoices</span>
                        </a>
                      </li>
                      <li>
                        <a>
                          <i className="icon-refresh"></i> <span>Renewals</span>
                        </a>
                      </li>
                    </ul>
                  </li> */}
                                <li>
                                    <a href="login" className="icon-menu">
                                        <i className="icon-login"></i>
                                    </a>
                                </li>
                            </ul>
                            {/* </div> */}
                        </div>
                    </div>
                </nav>

                {/* nav -end */}


            </div>
            // </div>
            // </div>
        );
    }
}

NavbarMenu.propTypes = {
    addClassactive: PropTypes.array.isRequired,
    addClassactiveChild: PropTypes.array.isRequired,
    addClassactiveChildApp: PropTypes.array.isRequired,
    addClassactiveChildFM: PropTypes.array.isRequired,
    addClassactiveChildBlog: PropTypes.array.isRequired,
    addClassactiveChildUI: PropTypes.array.isRequired,
    addClassactiveChildWidgets: PropTypes.array.isRequired,
    // addClassactiveChildAuth: PropTypes.array.isRequired,
    addClassactiveChildPages: PropTypes.array.isRequired,
    addClassactiveChildForms: PropTypes.array.isRequired,
    addClassactiveChildTables: PropTypes.array.isRequired,
    addClassactiveChildChart: PropTypes.array.isRequired,
    addClassactiveChildMaps: PropTypes.array.isRequired,
    // themeColor: PropTypes.string.isRequired,
    generalSetting: PropTypes.array.isRequired,
    toggleNotification: PropTypes.bool.isRequired,
    toggleEqualizer: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ navigationReducer }) => {
    const {
        addClassactive,
        addClassactiveChild,
        addClassactiveChildApp,
        addClassactiveChildFM,
        addClassactiveChildBlog,
        addClassactiveChildUI,
        addClassactiveChildWidgets,
        // addClassactiveChildAuth,
        addClassactiveChildPages,
        addClassactiveChildForms,
        addClassactiveChildTables,
        addClassactiveChildChart,
        addClassactiveChildMaps,
        // themeColor,
        generalSetting,
        toggleNotification,
        toggleEqualizer,
        menuProfileDropdown,
        // sideMenuTab,
        // isToastMessage,
    } = navigationReducer;
    return {
        addClassactive,
        addClassactiveChild,
        addClassactiveChildApp,
        addClassactiveChildFM,
        addClassactiveChildBlog,
        addClassactiveChildUI,
        addClassactiveChildWidgets,
        // addClassactiveChildAuth,
        addClassactiveChildPages,
        addClassactiveChildForms,
        addClassactiveChildTables,
        addClassactiveChildChart,
        addClassactiveChildMaps,
        // themeColor,
        generalSetting,
        toggleNotification,
        toggleEqualizer,
        menuProfileDropdown,
        // sideMenuTab,
        // isToastMessage,


    };
};

export default connect(mapStateToProps, {
    onPressDashbord,
    onPressDashbordChild,
    // onPressThemeColor,
    onPressGeneralSetting,
    // onPressNotification,
    // onPressEqualizer,
    onPressSideMenuToggle,
    onPressMenuProfileDropdown,
    // onPressSideMenuTab,
    tostMessageLoad,
})(NavbarMenu);
