import React from "react";
import { cilExitToApp, cilSave } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
    CModal, CModalBody, CModalHeader,
    CRow, CCol,
    CFormInput,
    CButton,
    CHeaderDivider,
    CInputGroup,
} from "@coreui/react";
import AzecSelect from "azec_util/AzecSelect";

export default class FormInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            data: {

            },
            selectValue: [
                { code: "", name: "-- Select Inactive --" },
                { code: "0", name: "Y" },
                { code: "1", name: "N" },
            ],
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
                process: props.data == undefined ? undefined : props.data.process,
                activity: props.data == undefined ? undefined : props.data.activity,
                selectValue: props.data == undefined ? undefined : props.data.selectValue,
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
                    Create New Setting Reorder Point
                </CModalHeader>
                <CModalBody>
                    <CRow className="mt-2">
                        <CCol xs={3}>Process</CCol>
                        <CCol>
                            <CFormInput
                                size="sm"
                                type="text"
                                placeholder="Enter Process"
                                value={this.state.data.process == undefined ? "" : this.state.data.process}
                                onChange={(evt) => {
                                    let data = this.state.data;
                                    data.process = evt.target.value;
                                    this.setState({
                                        data: data
                                    });
                                }}
                            />
                        </CCol>
                    </CRow>
                    <CRow className="mt-2">
                        <CCol xs={3}>Activity</CCol>
                        <CCol>
                            <CInputGroup size="sm">
                                <CFormInput
                                    size="sm"
                                    type="text"
                                    placeholder="Enter Activity"
                                    value={(this.state.data.activity == null ? "" : this.state.data.activity)}
                                />
                            </CInputGroup>
                        </CCol>
                    </CRow>
                    <CRow className="mt-2">
                        <CCol xs={3}>Value</CCol>
                        <CCol>
                            <AzecSelect
                                listData={this.state.selectValue}
                                displayPrompt={(item) => {
                                    return item.name;
                                }}
                                onSelected={(item, index) => {
                                    let data = this.state.data;
                                    data.value = item.code;
                                    this.setState({
                                        data: data
                                    });
                                }}
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