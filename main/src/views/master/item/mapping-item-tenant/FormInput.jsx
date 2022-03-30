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
            selectedItemCode: null,
            selectedTenant: null
        };
        this.refLovItemCode = React.createRef();
        this.refLovTenant = React.createRef();
    }

    static getDerivedStateFromProps(props, state) {
        if (props.visible && !state.visible) {
            state.visible = props.visible;

            state.data = {
                code: props.data == undefined ? undefined : props.data.code,
                tenant: props.data == undefined ? undefined : props.data.tenant,
            };
            if (props.data == undefined) {
                state.selectedItemCode = null;
                state.selectedTenant = null;
            } else {
                state.selectedItemCode = {
                    code: props.data.code
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

    _showLovItemCode() {
        this.refLovItemCode.current.initLov();
    }

    _buildDataLovItemCode(page, keyword) {
        let listData = [];
        for (var i = 1; i <= 23; i++) {
            listData.push({ code: "ITM000" + i, name: "Samsung " + i });
        }
        return { list: listData, rowCount: 0 };
    }

    _buildLovItemCode() {
        return (
            <AzecLOV ref={this.refLovItemCode}
                title="List of Item"
                onClose={() => { }}
                onSubmit=
                {(item, index) => {
                    this.setState({ selectedItemCode: item });
                }}
                onQuery=
                {(page, keyword) => {
                    return this._buildDataLovItemCode(page, keyword);
                }}
                grid=
                {{
                    header: {
                        title: ["No", "Code", "Name"],
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
                {this._buildLovItemCode()}
                {this._buildLovTenant()}
                <CModalHeader>
                    Mapping Item to Tenant
                </CModalHeader>
                <CModalBody>
                    <CRow className="mt-2">
                        <CCol xs={3}>Item Code</CCol>
                        <CCol>
                            <CInputGroup size="sm">
                                <CFormInput type="text" placeholder="Pick Item Code" value={this.state.selectedItemCode == undefined ? "<not selected>" : this.state.selectedItemCode.code} />
                                <CButton
                                    type="button"
                                    color="primary"
                                    onClick={() => {
                                        this._showLovItemCode();
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
                            <CButton variant="outline" disabled={!this.allowInsert}><CIcon icon={cilFile} /> Create New</CButton>
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