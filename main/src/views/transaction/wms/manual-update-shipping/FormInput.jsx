import React from "react";
import { cilExitToApp, cilSearch, cilSave } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
    CModal, CModalBody, CModalHeader,
    CRow, CCol,
    CFormInput,
    CButton,
    CHeaderDivider,
    CFormTextarea
} from "@coreui/react";
import AzecSelect from "azec_util/AzecSelect";

export default class FormInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            data: {

            },
            shippingStatus: [
              { code: "", name: "" },
              { code: "DELIVERED", name: "Delivered" },
              { code: "RETURN", name: "Return" },
              { code: "MISSING", name: "Missing" },
              { code: "CANCEL", name: "Cancel" },
            ],
            couriers: [
              { code: "", name: "" },
              { code: "GOJ", name: "Gosend Instant" },
              { code: "GOS", name: "Gosend Sameday" },
              { code: "GRI", name: "Grab Instant" },
              { code: "GRS", name: "Grab Sameday" },
            ],
            detail: {
                listData: [],
                rowCount: 0
            }
        };
        this.refGridDetail = React.createRef();
    }

    static getDerivedStateFromProps(props, state) {
        if (props.visible && !state.visible) {
            state.visible = props.visible;

            state.data = {
                transactionId: props.data == undefined ? undefined : props.data.transactionId,
                orderNumber: props.data == undefined ? undefined : props.data.orderNumber,
                fileName: props.data == undefined ? undefined : props.data.fileName,
                trackingNo: props.data == undefined ? undefined : props.data.trackingNo,
                courierCode: props.data == undefined ? undefined : props.data.courierCode,
                oldShippingStatus: props.data == undefined ? undefined : props.data.oldShippingStatus,
                newShippingStatus: props.data == undefined ? undefined : props.data.newShippingStatus,
                creationDate: props.data == undefined ? undefined : props.data.creationDate,
                createdBy: props.data == undefined ? undefined : props.data.createdBy,
                modifiedDate: props.data == undefined ? undefined : props.data.modifiedDate,
                modifiedBy: props.data == undefined ? undefined : props.data.modifiedBy,
                approvedDate: props.data == undefined ? undefined : props.data.approvedDate,
                approvedBy: props.data == undefined ? undefined : props.data.approvedBy,
                transactionStatus: props.data == undefined ? undefined : props.data.transactionStatus,
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
            <CModal scrollable visible={this.props.visible} size="lg" backdrop="static"
                onClose={() => {
                    this._closeForm();
                }}
            >
                <CModalHeader>
                    Location Type
                </CModalHeader>
                <CModalBody>
                    <CRow className="mt-2">
                        <CCol xs={4} style={{ fontSize: "14px" }}>Transaction ID</CCol>
                        <CCol>
                        <CFormInput
                            size="sm"
                            type="text"
                            value={this.state.data.transactionId == undefined ? "" : this.state.data.transactionId}
                        />
                        </CCol>
                    </CRow>
                    <CRow className="mt-2">
                        <CCol xs={4} style={{ fontSize: "14px" }}>Order Number</CCol>
                        <CCol style={{ paddingRight: "2px" }}>
                        <CFormInput
                            size="sm"
                            type="text"
                            value={this.state.data.orderNumber == undefined ? "" : this.state.data.orderNumber}
                        />
                        </CCol>
                        <CCol xs={1} style={{ padding: "0px 0px", width: "5%" }}>
                        <CButton color="light" style={{ padding: "3px 5px" }}><CIcon icon={cilSearch} style={{ cursor: 'pointer' }} /></CButton>
                        </CCol>
                    </CRow>
                    <CRow className="mt-2">
                        <CCol xs={4} style={{ fontSize: "14px" }}>Tracking No</CCol>
                        <CCol>
                        <CFormInput
                            size="sm"
                            type="text"
                            value={this.state.data.trackingNo == undefined ? "" : this.state.data.trackingNo}
                        />
                        </CCol>
                    </CRow>
                    <CRow className="mt-2">
                        <CCol xs={4} style={{ fontSize: "14px" }}>Courier Code</CCol>
                        <CCol>
                        <CFormInput
                            size="sm"
                            type="text"
                            value={this.state.data.courierCode == undefined ? "" : this.state.data.courierCode}
                        />
                        </CCol>
                    </CRow>
                    <CRow className="mt-2">
                        <CCol xs={4} style={{ fontSize: "14px" }}>New Shipping Status</CCol>
                        <CCol>
                        <AzecSelect
                            listData={this.state.shippingStatus}
                            displayPrompt={(item) => {
                            return item.name;
                            }}
                            onSelected={(item, index) => {

                            }}
                        />
                        </CCol>
                    </CRow>
                    <CRow className="mt-2">
                        <CCol xs={4} style={{ fontSize: "14px" }}>Remark</CCol>
                        <CCol>
                        <CFormTextarea
                            size="sm"
                            type="text"
                            rows="3"
                            value={this.state.data.remark == undefined ? "" : this.state.data.remark}
                        />
                        </CCol>
                    </CRow>
                    <CRow className="mt-2">
                        <CCol xs={4} style={{ fontSize: "14px" }}>File Name</CCol>
                        <CCol style={{ paddingRight: "2px" }}>
                        <CFormInput
                            size="sm"
                            type="text"
                            value={this.state.data.fileName == undefined ? "" : this.state.data.fileName}
                        />
                        </CCol>
                        <CCol xs={1} style={{ padding: "0px 0px", width: "5%" }}>
                        <CButton color="light" style={{ padding: "3px 5px" }}><CIcon icon={cilSearch} style={{ cursor: 'pointer' }} /></CButton>
                        </CCol>
                    </CRow>
                    <CRow className="mt-2">
                        <CCol xs={4} style={{ fontSize: "14px" }}>Transaction Status</CCol>
                        <CCol>
                        <CFormInput
                            size="sm"
                            type="text"
                            value={this.state.data.transactionStatus == undefined ? "" : this.state.data.transactionStatus}
                        />
                        </CCol>
                    </CRow>
                    <CRow className="mt-2">
                        <CCol xs={4} style={{ fontSize: "14px" }}>Creation Date</CCol>
                        <CCol>
                        <CFormInput
                            size="sm"
                            type="text"
                            value={this.state.data.creationDate == undefined ? "" : this.state.data.creationDate}
                        />
                        </CCol>
                    </CRow>
                    <CRow className="mt-2">
                        <CCol xs={4} style={{ fontSize: "14px" }}>Created by</CCol>
                        <CCol>
                        <CFormInput
                            size="sm"
                            type="text"
                            value={this.state.data.createdBy == undefined ? "" : this.state.data.createdBy}
                        />
                        </CCol>
                    </CRow>
                    <CRow className="mt-2">
                        <CCol xs={4} style={{ fontSize: "14px" }}>Modified Date</CCol>
                        <CCol>
                        <CFormInput
                            size="sm"
                            type="text"
                            value={this.state.data.modifiedDate == undefined ? "" : this.state.data.modifiedDate}
                        />
                        </CCol>
                    </CRow>
                    <CRow className="mt-2">
                        <CCol xs={4} style={{ fontSize: "14px" }}>Modified by</CCol>
                        <CCol>
                        <CFormInput
                            size="sm"
                            type="text"
                            value={this.state.data.modifiedBy == undefined ? "" : this.state.data.modifiedBy}
                        />
                        </CCol>
                    </CRow>
                    <CRow className="mt-2">
                        <CCol xs={4} style={{ fontSize: "14px" }}>Approved Date</CCol>
                        <CCol>
                        <CFormInput
                            size="sm"
                            type="text"
                            value={this.state.data.approvedDate == undefined ? "" : this.state.data.approvedDate}
                        />
                        </CCol>
                    </CRow>
                    <CRow className="mt-2">
                        <CCol xs={4} style={{ fontSize: "14px" }}>Approved by</CCol>
                        <CCol>
                        <CFormInput
                            size="sm"
                            type="text"
                            value={this.state.data.approvedBy == undefined ? "" : this.state.data.approvedBy}
                        />
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
            </CModal>
        );
    }
}