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
        this.state = {
            visible: false,
            selectedDistrict: null,
            data: {
                
            }
        };
        this.refLovDistrict = React.createRef();
    }

    static getDerivedStateFromProps(props, state) {
        if(props.visible && !state.visible) {
            state.visible = props.visible;
            
            state.data = {
                code: props.data == undefined ? undefined : props.data.code,
                name: props.data == undefined ? undefined : props.data.name,
            };
            if(props.data == undefined) {
                state.selectedDistrict = null;
            } else {
                state.selectedDistrict = {
                    name: props.data.district,
                };
            }
        }
        return state;
    }

    _showLovDistrict() {
        this.refLovDistrict.current.initLov();
    }

    _buildDataLovDistrict(page, keyword) {
        let listData = [];
        for (var i = 1; i <= 23; i++) {
            listData.push({
                code: "DIS000" + i,
                name: "Jakarta Kota " + i,
                province: "DKI Jakarta",
            });
        }
        return { list: listData, rowCount: 0 };
    }

    _buildLovDistrict() {
        return (
            <AzecLOV ref={this.refLovDistrict}
                title="List of District"
                onClose={() => { }}
                onSubmit=
                {(item, index) => {
                    this.setState({ selectedDistrict: item });
                }}
                onQuery=
                {(page, keyword) => {
                    return this._buildDataLovDistrict(page, keyword);
                }}
                grid=
                {{
                    header: {
                        title: ["No", "Code", "District", "Province"],
                        width: [45, 100, -1, -1],
                    },
                    rowDisplay: function (item, index, number) {
                        return [number, item.code, item.name, item.province];
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
                {this._buildLovDistrict()}
                <CModalHeader>
                    Master Sub District
                </CModalHeader>
                <CModalBody>
                    <CRow>
                        <CCol xs={3}>Sub District Code</CCol>
                        <CCol>
                            <CFormInput
                                size="sm"
                                type="text"
                                placeholder="Enter Sub District code"
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
                        <CCol xs={3}>Sub District Name</CCol>
                        <CCol>
                            <CFormInput
                                size="sm"
                                type="text"
                                placeholder="Enter Sub District name"
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
                        <CCol xs={3}>District</CCol>
                        <CCol>
                            <CInputGroup size="sm">
                                <CFormInput type="text" placeholder="Pick district" value={this.state.selectedDistrict == undefined ? "<not selected>" : this.state.selectedDistrict.name} />
                                <CButton
                                    type="button"
                                    color="primary"
                                    onClick={() => {
                                        this._showLovDistrict();
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
                            <CButton variant="outline"><CIcon icon={cilFile} /> Create New</CButton>
                        </CCol>
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
            </CModal>
        );
    }
}