import { cilBan, cilExitToApp, cilFile, cilSave } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
    CModal, CModalBody, CModalHeader,
    CRow, CCol,
    CFormInput,
    CButton,
    CHeaderDivider
} from "@coreui/react";
import React from "react";

export default class FormInput extends React.Component {

    constructor(props) {
        super(props);

        this.allowInsert = this.props.permission.insert;
        this.allowEdit = this.props.permission.insert || this.props.permission.update;

        this.state = {
            visible: false,
            data: {

            }
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (props.visible && !state.visible) {
            state.visible = props.visible;

            state.data = {
                code: props.data == undefined ? undefined : props.data.code,
                desc: props.data == undefined ? undefined : props.data.desc,
                value: props.data == undefined ? 0 : props.data.value,
            };
        }
        return state;
    }


    _closeForm() {
        this.setState({
            visible: false
        });
        this.props.onClose();
    }

    render() {
        return (
            <CModal visible={this.props.visible} backdrop="static" size="lg"
                onClose={() => {
                    this._closeForm();
                }}
            >
                <CModalHeader>
                    Master Tax
                </CModalHeader>
                <CModalBody>
                    <CRow>
                        <CCol xs={3}>Tax Code</CCol>
                        <CCol>
                            <CFormInput
                                size="sm"
                                type="text"
                                placeholder="Enter Tax code"
                                value={this.state.data.code == undefined ? "" : this.state.data.code}
                                onChange={(evt) => {
                                    if (this.allowEdit) {
                                        let data = this.state.data;
                                        data.code = evt.target.value;
                                        this.setState({
                                            data: data
                                        });
                                    }
                                }}
                            />
                        </CCol>
                    </CRow>
                    <CRow className="mt-2">
                        <CCol xs={3}>Tax Description</CCol>
                        <CCol>
                            <CFormInput
                                size="sm"
                                type="text"
                                placeholder="Enter Tax description"
                                value={this.state.data.desc == undefined ? "" : this.state.data.desc}
                                onChange={(evt) => {
                                    if (this.allowEdit) {
                                        let data = this.state.data;
                                        data.desc = evt.target.value;
                                        this.setState({
                                            data: data
                                        });
                                    }
                                }}
                            />
                        </CCol>
                    </CRow>
                    <CRow className="mt-2">
                        <CCol xs={3}>Tax Value (%)</CCol>
                        <CCol>
                            <CFormInput
                                size="sm"
                                type="text"
                                placeholder="Enter Tax value"
                                value={this.state.data.value == undefined ? 0 : this.state.data.value}
                                onChange={(evt) => {
                                    if (this.allowEdit) {
                                        let data = this.state.data;
                                        data.value = evt.target.value;
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