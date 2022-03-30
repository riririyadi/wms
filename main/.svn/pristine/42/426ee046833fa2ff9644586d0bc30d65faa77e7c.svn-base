import React from "react";
import { cilExitToApp, cilSearch } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
    CModal, CModalBody, CModalHeader,
    CRow, CCol,
    CFormInput,
    CButton,
    CHeaderDivider,
    CInputGroup,
} from "@coreui/react";

export default class ScanIMEI extends React.Component {

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
        };
        this.refGridDetail = React.createRef();
    }

    static getDerivedStateFromProps(props, state) {
        if (props.visible && !state.visible) {
            state.visible = props.visible;

            state.data = {
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
                    Scan Imei
                </CModalHeader>
                <CModalBody>
                    <CRow className="mt-2">
                        <CCol xs={3}>Item Code</CCol>
                        <CCol>
                            <CFormInput
                                size="sm"
                                type="text"
                                placeholder="Enter Item Code"
                            />
                        </CCol>
                    </CRow>
                    <CRow className="mt-2">
                        <CCol xs={3}>Imei</CCol>
                        <CCol>
                            <CInputGroup size="sm">
                                <CFormInput
                                    size="sm"
                                    type="text"
                                    placeholder="Enter Imei"
                                />
                            </CInputGroup>
                        </CCol>
                    </CRow>
                    <CHeaderDivider />
                    <CRow className="mt-2">
                        <CCol style={{ textAlign: "right" }}>
                            <CButton className="ms-2"><CIcon icon={cilSearch} /> Scan</CButton>
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