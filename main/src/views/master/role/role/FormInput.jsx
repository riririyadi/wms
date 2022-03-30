import React from "react";
import { cilExitToApp, cilFile, cilSave } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
    CModal, CModalBody, CModalHeader,
    CRow, CCol,
    CFormInput,
    CButton,
    CHeaderDivider,
    CInputGroup,
} from "@coreui/react";

export default class FormInput extends React.Component {

    constructor(props) {
        super(props);

        this.allowInsert = this.props.permission.insert;
        this.allowEdit = this.props.permission.insert || this.props.permission.update;

        this.state = {
            visible: false,
            data: {

            },
            detail: {
                listData: [],
                rowCount: 0
            },
            selectedDivisionName: null
        };
        this.refGridDetail = React.createRef();
    }

    static getDerivedStateFromProps(props, state) {
        if (props.visible && !state.visible) {
            state.visible = props.visible;

            state.data = {
                respCode: props.data == undefined ? undefined : props.data.respCode,
                respName: props.data == undefined ? undefined : props.data.respName,
                level: props.data == undefined ? undefined : props.data.level,
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
            <CModal visible={this.props.visible} size="lg" backdrop="static"
                onClose={() => {
                    this._closeForm();
                }}
            >
                <CModalHeader>
                    Create New Responsibility
                </CModalHeader>
                <CModalBody>
                    <CRow className="mt-2">
                        <CCol xs={3}>Responsibility Code</CCol>
                        <CCol>
                            <CFormInput
                                size="sm"
                                type="text"
                                placeholder="Enter Responsibility Code"
                                value={this.state.data.respCode == undefined ? "" : this.state.data.respCode}
                                onChange={(evt) => {
                                    if (this.allowEdit) {
                                        let data = this.state.data;
                                        data.respCode = evt.target.value;
                                        this.setState({
                                            data: data
                                        });
                                    }
                                }}
                            />
                        </CCol>
                    </CRow>
                    <CRow className="mt-2">
                        <CCol xs={3}>Responsibility Name</CCol>
                        <CCol>
                            <CInputGroup size="sm">
                                <CFormInput
                                    size="sm"
                                    type="text"
                                    placeholder="Enter Responsibility Name"
                                    value={(this.state.data.respName == null ? "" : this.state.data.respName)}
                                    onChange={(evt) => {
                                        if (this.allowEdit) {
                                            let data = this.state.data;
                                            data.respName = evt.target.value;
                                            this.setState({
                                                data: data
                                            });
                                        }
                                    }}
                                />
                            </CInputGroup>
                        </CCol>
                    </CRow>
                    <CRow className="mt-2">
                        <CCol xs={3}>Level</CCol>
                        <CCol>
                            <CFormInput
                                size="sm"
                                type="number"
                                placeholder="Enter Level"
                                value={this.state.data.level == undefined ? "" : this.state.data.level}
                                onChange={(evt) => {
                                    if (this.allowEdit) {
                                        let data = this.state.data;
                                        data.level = evt.target.value;
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