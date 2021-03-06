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
import AzecSelect from "azec_util/AzecSelect";
import AzecLOV from "azec_util/AzecLOV";

export default class FormInput extends React.Component {

    types = ["Marketplace", "Offline Store", "Canvasser"];

    constructor(props) {
        super(props);

        this.allowInsert = this.props.permission.insert;
        this.allowEdit = this.props.permission.insert || this.props.permission.update;

        this.state = {
            visible: false,
            selectedWH: null,
            selectedLoc: null,
            data: {

            }
        };
        this.refLovWarehouse = React.createRef();
        this.refLovLocation = React.createRef();
    }

    static getDerivedStateFromProps(props, state) {
        if (props.visible && !state.visible) {
            state.visible = props.visible;

            state.data = {
                code: props.data == undefined ? undefined : props.data.code,
                name: props.data == undefined ? undefined : props.data.name,
                type: props.data == undefined ? undefined : props.data.type,
            };
            if (props.data == undefined) {
                state.selectedWH = null;
                state.selectedLoc = null;
            } else {
                state.selectedWH = {
                    name: props.data.warehouse,
                };
                state.selectedLoc = {
                    name: props.data.storage,
                };
            }
        }
        return state;
    }

    _showLovWarehouse() {
        this.refLovWarehouse.current.initLov();
    }

    _buildDataLovWarehouse(page, keyword) {
        let listData = [];
        for (var i = 1; i <= 23; i++) {
            listData.push({ code: "WH00" + i, name: "Warehouse " + i });
        }
        return { list: listData, rowCount: 0 };
    }

    _buildLovWarehouse() {
        return (
            <AzecLOV ref={this.refLovWarehouse}
                title="List of Warehouse"
                onClose={() => { }}
                onSubmit=
                {(item, index) => {
                    this.setState({ selectedWH: item });
                }}
                onQuery=
                {(page, keyword) => {
                    return this._buildDataLovWarehouse(page, keyword);
                }}
                grid=
                {{
                    header: {
                        title: ["No", "Code", "Description"],
                        width: [45, 100, -1],
                    },
                    rowDisplay: function (item, index, number) {
                        return [number, item.code, item.name];
                    },
                }}>
            </AzecLOV>
        );
    }

    _showLovLocation() {
        this.refLovLocation.current.initLov();
    }

    _buildDataLovLocation(page, keyword) {
        let listData = [];
        for (var i = 1; i <= 17; i++) {
            listData.push({ code: "LOC000" + i, name: "Location " + i });
        }
        return { list: listData, rowCount: 0 };
    }

    _buildLovLocation() {
        return (
            <AzecLOV ref={this.refLovLocation}
                title="List of Location"
                onClose={() => { }}
                onSubmit=
                {(item, index) => {
                    this.setState({ selectedLoc: item });
                }}
                onQuery=
                {(page, keyword) => {
                    return this._buildDataLovLocation(page, keyword);
                }}
                grid=
                {{
                    header: {
                        title: ["No", "Code", "Location Name"],
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
                {this._buildLovWarehouse()}
                {this._buildLovLocation()}
                <CModalHeader>
                    Master Sales Channel
                </CModalHeader>
                <CModalBody>
                    <CRow>
                        <CCol xs={3}>Channel Code</CCol>
                        <CCol>
                            <CFormInput
                                size="sm"
                                type="text"
                                placeholder="Enter Channel code"
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
                        <CCol xs={3}>Channel Name</CCol>
                        <CCol>
                            <CFormInput
                                size="sm"
                                type="text"
                                placeholder="Enter Channel name"
                                value={this.state.data.name == undefined ? "" : this.state.data.name}
                                onChange={(evt) => {
                                    if (this.allowEdit) {
                                        let data = this.state.data;
                                        data.name = evt.target.value;
                                        this.setState({
                                            data: data
                                        });
                                    }
                                }}
                            />
                        </CCol>
                    </CRow>
                    <CRow className="mt-2">
                        <CCol xs={3}>Type</CCol>
                        <CCol>
                            <AzecSelect
                                enable={this.allowEdit}
                                listData={this.types}
                                displayPrompt={(item) => {
                                    return item;
                                }}
                                onSelected={(item, index) => {

                                }}
                                text={this.state.data.type == undefined ? "" : this.state.data.type}
                            />
                        </CCol>
                    </CRow>
                    <CRow className="mt-2">
                        <CCol xs={3}>Warehouse</CCol>
                        <CCol>
                            <CInputGroup size="sm">
                                <CFormInput type="text" placeholder="Pick warehouse" value={this.state.selectedWH == undefined ? "<not selected>" : this.state.selectedWH.name} />
                                <CButton
                                    disabled={!this.allowEdit}
                                    type="button"
                                    color="primary"
                                    onClick={() => {
                                        this._showLovWarehouse();
                                    }}
                                >
                                    <CIcon icon={cilMenu} />
                                </CButton>
                            </CInputGroup>
                        </CCol>
                    </CRow>
                    <CRow className="mt-2">
                        <CCol xs={3}>Location Type</CCol>
                        <CCol>
                            <CInputGroup size="sm">
                                <CFormInput type="text" placeholder="Pick warehouse" value={this.state.selectedLoc == undefined ? "<not selected>" : this.state.selectedLoc.name} />
                                <CButton
                                    disabled={!this.allowEdit}
                                    type="button"
                                    color="primary"
                                    onClick={() => {
                                        this._showLovLocation();
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