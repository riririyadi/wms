import { cilExitToApp, cilFile, cilMenu, cilSave } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
    CModal, CModalBody, CModalHeader,
    CRow, CCol,
    CFormInput,
    CButton,
    CHeaderDivider,
    CInputGroup
} from "@coreui/react";
import React from "react";
import AzecLOV from "azec_util/AzecLOV";

export default class FormInput extends React.Component {

    constructor(props) {
        super(props);

        this.allowInsert = this.props.permission.insert;
        this.allowEdit = this.props.permission.insert || this.props.permission.update;

        this.state = {
            visible: false,
            selectedVillage: null,
            data: {
                
            }
        };
        this.refLovVillage = React.createRef();
    }

    static getDerivedStateFromProps(props, state) {
        if(props.visible && !state.visible) {
            state.visible = props.visible;
            
            state.data = {
                code: props.data == undefined ? undefined : props.data.code,
                name: props.data == undefined ? undefined : props.data.name,
                street: props.data == undefined ? undefined : props.data.street,
                number: props.data == undefined ? undefined : props.data.number,
                latlong: props.data == undefined ? undefined : props.data.latlong,
            };
            if(props.data == undefined) {
                state.selectedVillage = null;
            } else {
                state.selectedVillage = {
                    name: props.data.village,
                };
            }
        }
        return state;
    }

    _showLovVillage() {
        this.refLovVillage.current.initLov();
    }

    _buildDataLovVillage(page, keyword) {
        let listData = [];
        for (var i = 1; i <= 23; i++) {
            listData.push({
                code: "VIL000" + i,
                name: "Village " + i,
            });
        }
        return { list: listData, rowCount: 0 };
    }

    _buildLovVillage() {
        return (
            <AzecLOV ref={this.refLovVillage}
                title="List of Village"
                onClose={() => { }}
                onSubmit=
                {(item, index) => {
                    this.setState({ selectedVillage: item });
                }}
                onQuery=
                {(page, keyword) => {
                    return this._buildDataLovVillage(page, keyword);
                }}
                grid=
                {{
                    header: {
                        title: ["No", "Code", "Village Name"],
                        width: [45, 100, -1],
                    },
                    rowDisplay: function (item, index, number) {
                        return [number, item.code, item.name];
                    },
                }}>
            </AzecLOV>
        );
    }

    _closeForm() {
        this.setState({
            visible: false
        });
        this.props.onClose();
    }

    render() {
        return (
            <CModal visible={this.props.visible} size="lg" backdrop="static"
                onClose={() => {
                    this._closeForm();
                }}
            >
                {this._buildLovVillage()}
                <CModalHeader>
                    Master Address
                </CModalHeader>
                <CModalBody>
                    <CRow>
                        <CCol xs={3}>Address Code</CCol>
                        <CCol>
                            <CFormInput
                                size="sm"
                                type="text"
                                placeholder="Enter Address code"
                                value={this.state.data.code == undefined ? "" : this.state.data.code}
                                onChange={(evt) => {
                                    let data = this.state.data;
                                    data.code = evt.target.value;
                                    this.setState({
                                        data: data
                                    });
                                }}
                            />
                        </CCol>
                    </CRow>
                    <CRow className="mt-2">
                        <CCol xs={3}>Address Name</CCol>
                        <CCol>
                            <CFormInput
                                size="sm"
                                type="text"
                                placeholder="Enter Address name"
                                value={this.state.data.name == undefined ? "" : this.state.data.name}
                                onChange={(evt) => {
                                    let data = this.state.data;
                                    data.name = evt.target.value;
                                    this.setState({
                                        data: data
                                    });
                                }}
                            />
                        </CCol>
                    </CRow>
                    <CRow className="mt-2">
                        <CCol xs={3}>Street</CCol>
                        <CCol>
                            <CFormInput
                                size="sm"
                                type="text"
                                placeholder="Enter street"
                                value={this.state.data.street == undefined ? "" : this.state.data.street}
                            />
                        </CCol>
                    </CRow>
                    <CRow className="mt-2">
                        <CCol xs={3}>Number</CCol>
                        <CCol>
                            <CFormInput
                                size="sm"
                                type="text"
                                placeholder="Enter street"
                                value={this.state.data.number == undefined ? "" : this.state.data.number}
                            />
                        </CCol>
                    </CRow>
                    <CRow className="mt-2">
                        <CCol xs={3}>Village</CCol>
                        <CCol>
                            <CInputGroup size="sm">
                                <CFormInput type="text" value={this.state.selectedVillage == undefined ? "<not selected>" : this.state.selectedVillage.name} />
                                <CButton
                                    type="button"
                                    color="primary"
                                    onClick={() => {
                                        this._showLovVillage();
                                    }}
                                >
                                    <CIcon icon={cilMenu} />
                                </CButton>
                            </CInputGroup>
                        </CCol>
                    </CRow>
                    <CRow className="mt-2">
                        <CCol xs={3}>Lat Long</CCol>
                        <CCol>
                            <CFormInput
                                size="sm"
                                type="text"
                                placeholder="Enter street"
                                value={this.state.data.latlong == undefined ? "" : this.state.data.latlong}
                            />
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