import React from "react";
import { cilExitToApp, cilFile, cilPlus, cilSave } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
    CModal, CModalBody, CModalHeader,
    CRow, CCol,
    CFormInput,
    CButton,
    CHeaderDivider,
    CInputGroup,
} from "@coreui/react";
import AzecLOV from "azec_util/AzecLOV";
import AzecSelect from "azec_util/AzecSelect";
import { cilMenu } from "@coreui/icons";

export default class FormInput extends React.Component {

    constructor(props) {
        super(props);

        this.allowInsert = this.props.permission.insert;
        this.allowEdit = this.props.permission.insert || this.props.permission.update;

        this.state = {
            visible: false,
            data: {

            },
            inactive: [
                { code: "", name: "-- Select Inactive --" },
                { code: "0", name: "True" },
                { code: "1", name: "False" },
            ],
            detail: {
                listData: [],
                rowCount: 0
            },
            selectedDivisionName: null
        };
        this.refGridDetail = React.createRef();
        this.refLovDivisionName = React.createRef();
    }

    static getDerivedStateFromProps(props, state) {
        if (props.visible && !state.visible) {
            state.visible = props.visible;

            state.data = {
                userName: props.data == undefined ? undefined : props.data.userName,
                employeeNumber: props.data == undefined ? undefined : props.data.employeeNumber,
                divisionName: props.data == undefined ? undefined : props.data.divisionName,
                phoneNumber: props.data == undefined ? undefined : props.data.phoneNumber,
                email: props.data == undefined ? undefined : props.data.email,
                inactive: props.data == undefined ? undefined : props.data.inactive,
                password: props.data == undefined ? undefined : props.data.password,
            };
            if (props.data == undefined) {
                state.selectedDivisionName = null;
            } else {
                state.selectedDivisionName = {
                    name: props.data.divisionName,
                };
            }
        }
        return state;
    }

    componentDidMount() {
        this._requeryDetail();
    }

    _requeryDetail() {
        let listData = [];
        for (var i = 0; i < 8; i++) {
            listData.push({
                locationCode: "LC00" + i,
                locationName: "Location " + i,
            });
        }
        this.setState({
            detail: {
                listData: listData,
                rowCount: 0
            }
        });
    }

    _closeForm() {
        this.setState({
            visible: false
        });
        this.props.onClose();
    }

    _showLovDivisionName() {
        this.refLovDivisionName.current.initLov();
    }

    _buildDataLovDivisionName(page, keyword) {
        let listData = [];
        for (var i = 1; i <= 8; i++) {
            listData.push({ code: "DivisionName" + i, name: "DivisionName " + i });
        }
        return { list: listData, rowCount: 0 };
    }

    _buildLovDivisionName() {
        return (
            <AzecLOV ref={this.refLovDivisionName}
                title="List of DivisionName"
                onClose={() => { }}
                onSubmit=
                {(item, index) => {
                    this.setState({ selectedDivisionName: item });
                }}
                onQuery=
                {(page, keyword) => {
                    return this._buildDataLovDivisionName(page, keyword);
                }}
                grid=
                {{
                    header: {
                        title: ["No", "DivisionName Code", "DivisionName Name"],
                        width: [45, 100, -1],
                    },
                    rowDisplay: function (item, index, number) {
                        return [number, item.code, item.name];
                    },
                }}>
            </AzecLOV>
        );
    }

    render() {
        return (
            <CModal visible={this.props.visible} size="lg" backdrop="static"
                onClose={() => {
                    this._closeForm();
                }}
            >
                <CModalHeader>
                    Create New User
                </CModalHeader>
                <CModalBody>
                    {this._buildLovDivisionName()}
                    <CRow>
                        <CCol xs={3}>User Name</CCol>
                        <CCol>
                            <CFormInput
                                size="sm"
                                type="text"
                                placeholder="Enter User Name"
                                value={this.state.data.userName == undefined ? "" : this.state.data.userName}
                                onChange={(evt) => {
                                    if (this.allowEdit) {
                                        let data = this.state.data;
                                        data.userName = evt.target.value;
                                        this.setState({
                                            data: data
                                        });
                                    }
                                }}
                            />
                        </CCol>
                    </CRow>
                    <CRow className="mt-2">
                        <CCol xs={3}>Employee Number</CCol>
                        <CCol>
                            <CFormInput
                                size="sm"
                                type="text"
                                placeholder="Enter Employee Number"
                                value={this.state.data.employeeNumber == undefined ? "" : this.state.data.employeeNumber}
                                onChange={(evt) => {
                                    if (this.allowEdit) {
                                        let data = this.state.data;
                                        data.employeeNumber = evt.target.value;
                                        this.setState({
                                            data: data
                                        });
                                    }
                                }}
                            />
                        </CCol>
                    </CRow>
                    <CRow className="mt-2">
                        <CCol xs={3}>Division Name</CCol>
                        <CCol>
                            <CInputGroup size="sm">
                                <CFormInput
                                    size="sm"
                                    type="text"
                                    placeholder="Select Division Name"
                                    value={(this.state.selectedDivisionName == null ? "" : this.state.selectedDivisionName.name)}
                                />
                                <CButton disabled={!this.allowEdit}
                                    onClick={() => {
                                        this._showLovDivisionName();
                                    }}><CIcon icon={cilMenu} /></CButton>
                            </CInputGroup>
                        </CCol>
                    </CRow>
                    <CRow className="mt-2">
                        <CCol xs={3}>Phone Number</CCol>
                        <CCol>
                            <CFormInput
                                size="sm"
                                type="number"
                                placeholder="Enter Phone Number"
                                value={this.state.data.phoneNumber == undefined ? "" : this.state.data.phoneNumber}
                                onChange={(evt) => {
                                    if (this.allowEdit) {
                                        let data = this.state.data;
                                        data.phoneNumber = evt.target.value;
                                        this.setState({
                                            data: data
                                        });
                                    }
                                }}
                            />
                        </CCol>
                    </CRow>
                    <CRow className="mt-2">
                        <CCol xs={3}>Email</CCol>
                        <CCol>
                            <CFormInput
                                size="sm"
                                type="email"
                                placeholder="Enter Email"
                                value={this.state.data.email == undefined ? "" : this.state.data.email}
                                onChange={(evt) => {
                                    if (this.allowEdit) {
                                        let data = this.state.data;
                                        data.email = evt.target.value;
                                        this.setState({
                                            data: data
                                        });
                                    }
                                }}
                            />
                        </CCol>
                    </CRow>
                    <CRow className="mt-2">
                        <CCol xs={3}>Inactive</CCol>
                        <CCol>
                            <AzecSelect
                                enable={this.allowEdit}
                                listData={this.state.inactive}
                                displayPrompt={(item) => {
                                    return item.name;
                                }}
                                onSelected={(item, index) => {
                                    let data = this.state.data;
                                    data.inactive = item.code;
                                    this.setState({
                                        data: data
                                    });
                                }}
                            />
                        </CCol>
                    </CRow>
                    <CRow className="mt-2">
                        <CCol xs={3}>Password</CCol>
                        <CCol>
                            <CFormInput
                                size="sm"
                                type="password"
                                placeholder="Enter Password"
                                value={this.state.data.password == undefined ? "" : this.state.data.password}
                                onChange={(evt) => {
                                    if (this.allowEdit) {
                                        let data = this.state.data;
                                        data.password = evt.target.value;
                                        this.setState({
                                            data: data
                                        });
                                    }
                                }}
                            />
                        </CCol>
                    </CRow>
                    <CHeaderDivider />
                    <CRow className="mt-2">
                        <CCol>
                            <CButton disabled={!this.allowInsert} variant="outline"><CIcon icon={cilFile} /> Create New</CButton>
                        </CCol>
                        <CCol style={{ textAlign: "right" }}>
                            <CButton className="ms-2" disabled={!this.allowEdit}><CIcon icon={cilSave} /> Save</CButton>
                            <CButton color="secondary" variant="outline" className="ms-2"
                                onClick={() => {
                                    this._closeForm();
                                }}
                            ><CIcon icon={cilExitToApp} /> Close</CButton>
                        </CCol>
                    </CRow>
                </CModalBody>
            </CModal>
        );
    }
}