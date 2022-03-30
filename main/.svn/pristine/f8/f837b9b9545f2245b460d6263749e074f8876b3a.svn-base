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
        this.state = {
            visible: false,
            data: {
                
            }
        };
    }

    static getDerivedStateFromProps(props, state) {
        if(props.visible && !state.visible) {
            state.visible = props.visible;
            
            state.data = {
                warehouseCode: props.data == undefined ? undefined : props.data.warehouseCode,
                itemCode: props.data == undefined ? undefined : props.data.itemCode,
                qty: props.data == undefined ? undefined : props.data.qty,
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
                    Buffer Stock
                </CModalHeader>
                <CModalBody>
                    <CRow>
                        <CCol xs={3}>Warehouse Code</CCol>
                        <CCol>
                            <CFormInput
                                size="sm"
                                type="text"
                                placeholder="Enter Warehouse Code"
                                value={this.state.data.warehouseCode == undefined ? "" : this.state.data.warehouseCode}
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
                        <CCol xs={3}>Item Code</CCol>
                        <CCol>
                            <CFormInput
                                size="sm"
                                type="text"
                                placeholder="Enter Item Code"
                                value={this.state.data.itemCode == undefined ? "" : this.state.data.itemCode}
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
                        <CCol xs={3}>Qty</CCol>
                        <CCol>
                            <CFormInput
                                size="sm"
                                type="text"
                                placeholder="Enter Quantity"
                                value={this.state.data.qty == undefined ? "" : this.state.data.qty}
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