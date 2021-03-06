import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useNavigate } from "react-router-dom";
import { createMessagebox, messageboxType } from "azec_util/AzecMessagebox";

import '@coreui/coreui/dist/css/coreui.min.css'
import warehouse from '../assets/images/warehouse.jpg'
import { LoadCanvasTemplate, loadCaptchaEnginge, validateCaptcha } from 'react-simple-captcha';

// const history = useNavigate();
// const navigateTo = () => history('/componentURL');//eg.history.push('/login');

export const routeNext = () => {
  let navigate = useNavigate();
  // const routeChange = () =>{ 
  let path = `/dashboard`;
  navigate(path);
  // } 
}

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      captchaValue: "",
      username: "",
      password: "",
      messageBox: <div></div>
    }
  }

  redirectToMainPage() {
    // let navigate = useNavigate(); 
    // const routeChange = () =>{ 
    //   let path = `/dashboard`; 
    //   return navigate(path);
    // }  
    if (typeof this.props.onLoggedIn === 'function') {
      let roleCode = "";
      if (this.state.username == 'SYSTEM') {
        roleCode = "R01";
      } else if (this.state.username == 'AGG') {
        roleCode = "R02";
      } else if (this.state.username == 'TENANT') {
        roleCode = "R03";
      } else if (this.state.username == 'APP') {
        roleCode = "R04";
      }
      this.props.onLoggedIn(roleCode);
    }
    window.location.href = "/#/";
  }

  componentDidMount() {
    loadCaptchaEnginge(6, "grey", "black");
  }

  doSubmit() {
    if (validateCaptcha(this.state.captchaValue) === true) {
      // alert("Captcha Matched");
      // loadCaptchaEnginge(6, "grey", "black");
      this.setState({
        messageBox: createMessagebox({
          message: "Login successfuly",
          type: messageboxType.INFORMATION,
          onPositive: (dialog) => {
            dialog.closeDialog();
            this.redirectToMainPage();
          }
        }),
        captchaValue: ""
      });
      
    } else {
      // alert("Captcha Does Not Match");
      this.setState({
        messageBox: createMessagebox({
          message: "Captcha Does Not Match",
          type: messageboxType.WARNING,
        }),
        captchaValue: ""
      });
    }
  };

  render() {
    return (
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
        <CContainer>
          {this.state.messageBox}
          <CRow className="justify-content-center">
            <CCol md={8}>
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm>
                      <h1>Login</h1>
                      <p className="text-medium-emphasis">Sign In to your account</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput placeholder="Username" autoComplete="username"
                          onChange={(evt) => {
                            this.setState({
                              username: evt.target.value
                            })
                          }} />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CCol>
                          <LoadCanvasTemplate />
                        </CCol>
                        <CCol>
                          <CFormInput size="sm"
                            placeholder="Enter Captcha"
                            id="user_captcha_input"
                            name="user_captcha_input"
                            value={this.state.captchaValue}
                            onChange={(evt) => {
                              this.setState({
                                captchaValue: evt.target.value
                              })
                              // let data = this.state.data;
                              // data.code = evt.target.value;
                              // this.setState({
                              //     data: data
                              // });
                            }}
                            type="text">
                          </CFormInput>
                        </CCol>
                      </CInputGroup>
                      <CRow>
                        <CCol xs={6}>
                          <CButton color="primary" className="px-4"
                            onClick={() => {
                              this.doSubmit();
                            }}
                          >
                            Login
                          </CButton>
                        </CCol>
                        <CCol xs={6} className="text-right">
                          <CButton color="link" className="px-0">
                            Forgot password?
                          </CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
                <CCard className="text-white" style={{ width: '44%' }}>
                  <img src={warehouse} style={{ width: '100%', height: '100%' }} />
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    )
  }
}

export default Login