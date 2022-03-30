import React from "react";
import { cilExitToApp, cilMenu, cilSave } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
    CModal, CModalBody, CModalHeader,
    CRow, CCol,
    CFormInput,
    CButton,
    CHeaderDivider,
} from "@coreui/react";
import AzecLOV from "azec_util/AzecLOV";

export default class FormInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            data: {

            },
            detail: {
                listData: [],
                rowCount: 0
            },
            selectedAddress: null,
            selectedTenant: null
        };
        this.refGridDetail = React.createRef();
        this.refLovAddress = React.createRef();
        this.refLovTenant = React.createRef();
    }

    static getDerivedStateFromProps(props, state) {
        if (props.visible && !state.visible) {
            state.visible = props.visible;

            state.data = {
                buCode: props.data == undefined ? undefined : props.data.buCode,
                buDesc: props.data == undefined ? undefined : props.data.buDesc,
                phoneNumber: props.data == undefined ? undefined : props.data.phoneNumber,
                email: props.data == undefined ? undefined : props.data.email,
                address: props.data == undefined ? undefined : props.data.address,
                tenantName: props.data == undefined ? undefined : props.data.tenantName,
            };
            if (props.data == undefined) {
                state.selectedAddress = null;
                state.selectedTenant = null;
            } else {
                state.selectedAddress = {
                    name: props.data.address,
                    name: props.data.tenant,
                };
            }
        }
        return state;
    }

    _closeForm() {
        this.setState({
            visible: false
        });
        this.props.onClose();
    }

    _showLovAddress() {
        this.refLovAddress.current.initLov();
    }
    
    _buildDataLovAddress(page, keyword) {
        let listData = [];
        for (var i = 1; i <= 8; i++) {
          listData.push({ code: "RI000" + i, name: "Erajaya " + i });
        }
        return { list: listData, rowCount: 0 };
    }
    
    _buildLovAddress() {
        return (
          <AzecLOV ref={this.refLovAddress}
            title="List of Address"
            onClose={() => { }}
            onSubmit=
            {(item, index) => {
              this.setState({ selectedAddress: item });
            }}
            onQuery=
            {(page, keyword) => {
              return this._buildDataLovAddress(page, keyword);
            }}
            grid=
            {{
              header: {
                title: ["No", "Address Code", "Address Name"],
                width: [45, 100, -1],
              },
              rowDisplay: function (item, index, number) {
                return [number, item.code, item.name];
              },
            }}>
          </AzecLOV>
        );
    }
    
    _showLovTenant() {
        this.refLovTenant.current.initLov();
    }
    
    _buildDataLovTenant(page, keyword) {
        let listData = [];
        for (var i = 1; i <= 8; i++) {
          listData.push({ code: "RI000" + i, name: "Tenant " + i });
        }
        return { list: listData, rowCount: 0 };
    }
    
    _buildLovTenant() {
        return (
          <AzecLOV ref={this.refLovTenant}
            title="List of Tenant"
            onClose={() => { }}
            onSubmit=
            {(item, index) => {
              this.setState({ selectedTenant: item });
            }}
            onQuery=
            {(page, keyword) => {
              return this._buildDataLovTenant(page, keyword);
            }}
            grid=
            {{
              header: {
                title: ["No", "Tenant Code", "Tenant Name"],
                width: [45, 100, -1],
              },
              rowDisplay: function (item, index, number) {
                return [number, item.code, item.name];
              },
            }}>
          </AzecLOV>
        );
    }
    
    _selectRow(index) {
        let gridData = this.state.gridData;
        gridData.listData[index].checked = !gridData.listData[index].checked;
        this.setState({
          gridData: gridData
        });
    }

    render() {
        return (
            <CModal visible={this.props.visible} size="lg" backdrop="static"
                onClose={() => {
                    this._closeForm();
                }}
            >
                <CModalHeader>
                    Business Unit
                </CModalHeader>
                <CModalBody>
                    <CRow className="mt-2">
                        <CCol xs={4} style={{ fontSize: "14px" }}>Business Unit Code</CCol>
                        <CCol>
                        <CFormInput
                            size="sm"
                            type="text"
                            value={this.state.data.buCode == undefined ? "" : this.state.data.buCode}
                            onChange={(evt) => {
                                let data = this.state.data;
                                data.buCode = evt.target.value;
                                this.setState({
                                    data: data
                                });
                            }}
                        />
                        </CCol>
                    </CRow>
                    <CRow className="mt-2">
                        <CCol xs={4} style={{ fontSize: "14px" }}>Business Unit Description</CCol>
                        <CCol>
                        <CFormInput
                            size="sm"
                            type="text"
                            value={this.state.data.buDesc == undefined ? "" : this.state.data.buDesc}
                            onChange={(evt) => {
                                let data = this.state.data;
                                data.buDesc = evt.target.value;
                                this.setState({
                                    data: data
                                });
                            }}
                        />
                        </CCol>
                    </CRow>
                    <CRow className="mt-2">
                        <CCol xs={4} style={{ fontSize: "14px" }}>Phone Number</CCol>
                        <CCol>
                        <CFormInput
                            size="sm"
                            type="number"
                            value={this.state.data.phoneNumber == undefined ? "" : this.state.data.phoneNumber}
                            onChange={(evt) => {
                                let data = this.state.data;
                                data.phoneNumber = evt.target.value;
                                this.setState({
                                    data: data
                                });
                            }}
                        />
                        </CCol>
                    </CRow>
                    <CRow className="mt-2">
                        <CCol xs={4} style={{ fontSize: "14px" }}>Email</CCol>
                        <CCol>
                        <CFormInput
                            size="sm"
                            type="email"
                            value={this.state.data.email == undefined ? "" : this.state.data.email}
                            onChange={(evt) => {
                                let data = this.state.data;
                                data.email = evt.target.value;
                                this.setState({
                                    data: data
                                });
                            }}
                        />
                        </CCol>
                    </CRow>
                    <CRow className="mt-2">
                        <CCol xs={4} style={{ fontSize: "14px" }}>Address</CCol>
                        <CCol style={{ paddingRight: "2px" }}>
                        <CFormInput
                            size="sm"
                            type="text"
                            value={(this.state.selectedAddress == null ? "" : this.state.selectedAddress.buCode)}
                        />
                        </CCol>
                        <CCol xs={1} style={{ padding: "0px 0px", width: "5%" }}>
                        <CButton color="light" style={{ padding: "3px 5px" }}
                            onClick={() => {
                            this._showLovAddress();
                            }}
                        ><CIcon icon={cilMenu} /></CButton>
                        </CCol>
                    </CRow>
                    <CRow className="mt-2">
                        <CCol xs={4} style={{ fontSize: "14px" }}>Tenant</CCol>
                        <CCol style={{ paddingRight: "2px" }}>
                        <CFormInput
                            size="sm"
                            type="text"
                            value={(this.state.selectedTenant == null ? "" : this.state.selectedTenant.name)}
                        />
                        </CCol>
                        <CCol xs={1} style={{ padding: "0px 0px", width: "5%" }}>
                        <CButton color="light" style={{ padding: "3px 5px" }}
                            onClick={() => {
                            this._showLovTenant();
                            }}
                        ><CIcon icon={cilMenu} /></CButton>
                        </CCol>
                    </CRow>
                    <CHeaderDivider />
                    <CRow className="mt-2">
                        <CCol style={{ textAlign: "right" }}>
                            <CButton className="ms-2"><CIcon icon={cilSave} /> Save</CButton>
                            <CButton color="secondary" variant="outline" className="ms-2"
                                onClick={() => {
                                    this._closeForm();
                                }}
                            ><CIcon icon={cilExitToApp} /> Close</CButton>
                        </CCol>
                    </CRow>
                </CModalBody>
                {this._buildLovAddress()}
                {this._buildLovTenant()}
            </CModal>
        );
    }
}