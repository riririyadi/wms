import { cilMenu, cilExitToApp, cilFile, cilSave } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
    CModal, CModalBody, CModalHeader,
    CRow, CCol,
    CFormInput,
    CButton,
    CHeaderDivider,
    CInputGroup
} from "@coreui/react";
import AzecLOV from "azec_util/AzecLOV";
import React from "react";

export default class FormInput extends React.Component {

    constructor(props) {
        super(props);

        this.allowInsert = this.props.permission.insert;
        this.allowEdit = this.props.permission.insert || this.props.permission.update;

        this.state = {
            visible: false,
            data: {

            },
            selectedUsername: null,
            selectedTenant: null
        };
        this.refLovUsername = React.createRef();
        this.refLovTenant = React.createRef();
    }

    static getDerivedStateFromProps(props, state) {
        if (props.visible && !state.visible) {
            state.visible = props.visible;

            state.data = {
                username: props.data == undefined ? undefined : props.data.username,
                tenant: props.data == undefined ? undefined : props.data.tenant,
            };
            if (props.data == undefined) {
                state.selectedUsername = null;
                state.selectedTenant = null;
            } else {
                state.selectedUsername = {
                    username: props.data.username
                }
                state.selectedTenant = {
                    tenant: props.data.tenant
                }
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

    _showLovUsername() {
        this.refLovUsername.current.initLov();
    }

    _buildDataLovUsername(page, keyword) {
        let listData = [];
        for (var i = 1; i <= 23; i++) {
            listData.push({ username: "ADM00" + i, name: "Admin " + i });
        }
        return { list: listData, rowCount: 0 };
    }

    _buildLovUsername() {
        return (
            <AzecLOV ref={this.refLovUsername}
                title="List of Username"
                onClose={() => { }}
                onSubmit=
                {(item, index) => {
                    this.setState({ selectedUsername: item });
                }}
                onQuery=
                {(page, keyword) => {
                    return this._buildDataLovUsername(page, keyword);
                }}
                grid=
                {{
                    header: {
                        title: ["No", "User Name", "Name"],
                        width: [45, 100, -1],
                    },
                    rowDisplay: function (item, index, number) {
                        return [number, item.username, item.name];
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
        for (var i = 1; i <= 7; i++) {
            listData.push(
                {
                    code: "T00" + i,
                    tenant: "Samsung " + i,
                    value: (10 + i)
                }
            );
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
                        title: ["No", "Code", "Name"],
                        width: [45, 100, 110],
                    },
                    rowDisplay: function (item, index, number) {
                        return [number, item.code, item.tenant];
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
                {this._buildLovUsername()}
                {this._buildLovTenant()}
                <CModalHeader>
                    Mapping User to Tenant
                </CModalHeader>
                <CModalBody>
                    <CRow className="mt-2">
                        <CCol xs={3}>Username</CCol>
                        <CCol>
                            <CInputGroup size="sm">
                                <CFormInput type="text" placeholder="Pick User Name" value={this.state.selectedUsername == undefined ? "<not selected>" : this.state.selectedUsername.username} />
                                <CButton
                                    disabled={!this.allowEdit}
                                    type="button"
                                    color="primary"
                                    onClick={() => {
                                        this._showLovUsername();
                                    }}
                                >
                                    <CIcon icon={cilMenu} />
                                </CButton>
                            </CInputGroup>
                        </CCol>
                    </CRow>
                    <CRow className="mt-2">
                        <CCol xs={3}>Tenant</CCol>
                        <CCol>
                            <CInputGroup size="sm">
                                <CFormInput type="text" placeholder="Pick Tenant" value={this.state.selectedTenant == undefined ? "<not selected>" : this.state.selectedTenant.tenant} />
                                <CButton
                                    disabled={!this.allowEdit}
                                    type="button"
                                    color="primary"
                                    onClick={() => {
                                        this._showLovTenant();
                                    }}
                                >
                                    <CIcon icon={cilMenu} />
                                </CButton>
                            </CInputGroup>
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