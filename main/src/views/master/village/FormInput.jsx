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
            selectedSubDis: null,
            data: {
                
            }
        };
        this.refLovSubDistrict = React.createRef();
    }

    static getDerivedStateFromProps(props, state) {
        if(props.visible && !state.visible) {
            state.visible = props.visible;
            
            state.data = {
                code: props.data == undefined ? undefined : props.data.code,
                name: props.data == undefined ? undefined : props.data.name,
                zipcode: props.data == undefined ? undefined : props.data.zipcode,
            };
            if(props.data == undefined) {
                state.selectedSubDis = null;
            } else {
                state.selectedSubDis = {
                    name: props.data.subdistrict,
                };
            }
        }
        return state;
    }

    _showLovSubDistrict() {
        this.refLovSubDistrict.current.initLov();
    }

    _buildDataLovSubDistrict(page, keyword) {
        let listData = [];
        for (var i = 1; i <= 23; i++) {
            listData.push({
                code: "SUB000" + i,
                name: "Kecamatan " + i,
            });
        }
        return { list: listData, rowCount: 0 };
    }

    _buildLovSubDistrict() {
        return (
            <AzecLOV ref={this.refLovSubDistrict}
                title="List of Sub District"
                onClose={() => { }}
                onSubmit=
                {(item, index) => {
                    this.setState({ selectedSubDis: item });
                }}
                onQuery=
                {(page, keyword) => {
                    return this._buildDataLovSubDistrict(page, keyword);
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
                {this._buildLovSubDistrict()}
                <CModalHeader>
                    Master Village
                </CModalHeader>
                <CModalBody>
                    <CRow>
                        <CCol xs={3}>Village Code</CCol>
                        <CCol>
                            <CFormInput
                                size="sm"
                                type="text"
                                placeholder="Enter Village code"
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
                        <CCol xs={3}>Village Name</CCol>
                        <CCol>
                            <CFormInput
                                size="sm"
                                type="text"
                                placeholder="Enter Village name"
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
                        <CCol xs={3}>Sub District</CCol>
                        <CCol>
                            <CInputGroup size="sm">
                                <CFormInput type="text" value={this.state.selectedSubDis == undefined ? "<not selected>" : this.state.selectedSubDis.name} />
                                <CButton
                                    type="button"
                                    color="primary"
                                    onClick={() => {
                                        this._showLovSubDistrict();
                                    }}
                                >
                                    <CIcon icon={cilMenu} />
                                </CButton>
                            </CInputGroup>
                        </CCol>
                    </CRow>
                    <CRow className="mt-2">
                        <CCol xs={3}>ZIP Code</CCol>
                        <CCol>
                            <CFormInput
                                size="sm"
                                type="text"
                                placeholder="Enter street"
                                value={this.state.data.zipcode == undefined ? "" : this.state.data.zipcode}
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