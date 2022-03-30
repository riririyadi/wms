import React from "react";
import { cilExitToApp, cilFile, cilPlus, cilSave } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
    CModal, CModalBody, CModalHeader,
    CRow, CCol,
    CFormInput,
    CButton,
    CHeaderDivider,
    CInputGroup,
} from "@coreui/react";
import AzecLOV from "azec_util/AzecLOV";
import AzecGrid from "azec_util/AzecGrid";
import {cilMenu} from "@coreui/icons";

export default class FormInput extends React.Component {

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
            selectedAddress: null,
            selectedBU: null,
            selectedDistrict: null
        };
        this.refGridDetail = React.createRef();
        this.refLovAddress = React.createRef();
        this.refLovBU = React.createRef();
        this.refLovDistrict = React.createRef();
    }

    static getDerivedStateFromProps(props, state) {
        if (props.visible && !state.visible) {
            state.visible = props.visible;

            state.data = {
                warehouseCode: props.data == undefined ? undefined : props.data.warehouseCode,
                warehouseName: props.data == undefined ? undefined : props.data.warehouseName,
                address: props.data == undefined ? undefined : props.data.address,
                buOwner: props.data == undefined ? undefined : props.data.buOwner,
                directName: props.data == undefined ? undefined : props.data.directName,
                locationName: props.data == undefined ? undefined : props.data.locationName,
            };
            if (props.data == undefined) {
                state.selectedAddress = null;
                state.selectedBU = null;
                state.selectedDistrict = null;
            } else {
                state.selectedAddress = {
                    name: props.data.address,
                };
                state.selectedBU = {
                    name: props.data.buOwner,
                };
                state.selectedDistrict = {
                    name: props.data.directName,
                };
            }
        }
        return state;
    }

    componentDidMount() {
        this._requeryDetail();
    }

    _requeryDetail() {
        let listData = [];
        for (var i = 0; i < 8; i++) {
            listData.push({
                locationCode: "LC00" + i,
                locationName: "Location " + i,
            });
        }
        this.setState({
            detail: {
                listData: listData,
                rowCount: 0
            }
        });
    }

    _closeForm() {
        this.setState({
            visible: false
        });
        this.props.onClose();
    }

    _onCloseHandle() {
        document.getElementById("modalParent").style.filter = "none";
    }

    _showLovAddress() {
        this.refLovAddress.current.initLov();
        document.getElementById("modalParent").style.filter = "blur(2px)";
    }

    _buildDataLovAddress(page, keyword) {
        let listData = [];
        for (var i = 1; i <= 8; i++) {
            listData.push({ code: "ADDRESS" + i, name: "Address " + i});
        }
        return { list: listData, rowCount: 0 };
    }

    _buildLovAddress() {
        return (
            <AzecLOV ref={this.refLovAddress}
                title="List of Address"
                onClose={() => { this._onCloseHandle() }}
                onSubmit=
                {(item, index) => {
                    this.setState({ selectedAddress: item });
                }}
                onQuery=
                {(page, keyword) => {
                    return this._buildDataLovAddress(page, keyword);
                }}
                grid=
                {{
                    header: {
                        title: ["No", "Address Code", "Address Name"],
                        width: [45, 100, -1],
                    },
                    rowDisplay: function (item, index, number) {
                        return [number, item.code, item.name];
                    },
                }}>
            </AzecLOV>
        );
    }

    _showLovBU() {
        this.refLovBU.current.initLov();
        document.getElementById("modalParent").style.filter = "blur(2px)";
      }

    _buildDataLovBU(page, keyword) {
        let listData = [];
        for (var i = 1; i <= 8; i++) {
            listData.push({ code: "BU" + i, name: "BU Name " + i});
        }
        return { list: listData, rowCount: 0 };
    }

    _buildLovBU() {
        return (
            <AzecLOV ref={this.refLovBU}
                title="List of BU"
                onClose={() => { }}
                onSubmit=
                {(item, index) => {
                    this.setState({ selectedBU: item });
                }}
                onQuery=
                {(page, keyword) => {
                    return this._buildDataLovBU(page, keyword);
                }}
                grid=
                {{
                    header: {
                        title: ["No", "BU Code", "BU Name"],
                        width: [45, 100, -1],
                    },
                    rowDisplay: function (item, index, number) {
                        return [number, item.code, item.name];
                    },
                }}>
            </AzecLOV>
        );
    }

    _showLovDistrict() {
        this.refLovDistrict.current.initLov();
        document.getElementById("modalParent").style.filter = "blur(2px)";
      }

    _buildDataLovDistrict(page, keyword) {
        let listData = [];
        for (var i = 1; i <= 8; i++) {
            listData.push({ code: "District" + i, name: "District Name " + i});
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
                        title: ["No", "District Code", "District Name"],
                        width: [45, 100, -1],
                    },
                    rowDisplay: function (item, index, number) {
                        return [number, item.code, item.name];
                    },
                }}>
            </AzecLOV>
        );
    }

    _buildGridDetail() {
        return (
            <div className="mt-2">
                <AzecGrid
                    ref={this.refGridDetail}
                    header={{
                        columnWidth: [40, 40, 150, -1, 120, -1],
                        columns: [
                            <CButton variant="outline" size="sm"><CIcon size="sm" icon={cilPlus} /></CButton>,
                            "No", "Location Code", "Location Name"
                        ]
                    }}
                    renderRow={
                        (item, index) => {
                            return ["", (index + 1), item.locationCode, item.locationName];
                        }
                    }
                    onRowSelected={(index) => {

                    }}
                    listModel={this.state.detail.listData}
                    paging={{ rowPerPage: 5, totalRow: this.state.detail.rowCount }} />
            </div>
        );
    }

    render() {
        return (
            <div>
                {this._buildLovAddress()}
                {this._buildLovBU()}
                {this._buildLovDistrict()}
                <CModal visible={this.props.visible} size="lg" backdrop="static"
                    onClose={() => {
                        this._closeForm();
                    }}
                >
                    <CModalHeader>
                        Warehouse
                    </CModalHeader>
                    <CModalBody id="modalParent">
                        <CRow>
                            <CCol xs={3}>Warehouse Code</CCol>
                            <CCol>
                                <CFormInput
                                    size="sm"
                                    type="text"
                                    placeholder="Enter Warehouse code"
                                    value={this.state.data.warehouseCode == undefined ? "" : this.state.data.warehouseCode}
                                    onChange={(evt) => {
                                        let data = this.state.data;
                                        data.warehouseCode = evt.target.value;
                                        this.setState({
                                            data: data
                                        });
                                    }}
                                />
                            </CCol>
                        </CRow>
                        <CRow className="mt-2">
                            <CCol xs={3}>Warehouse Name</CCol>
                            <CCol>
                                <CFormInput
                                    size="sm"
                                    type="text"
                                    placeholder="Enter Warehouse Name"
                                    value={this.state.data.warehouseName == undefined ? "" : this.state.data.warehouseName}
                                    onChange={(evt) => {
                                        let data = this.state.data;
                                        data.warehouseName = evt.target.value;
                                        this.setState({
                                            data: data
                                        });
                                    }}
                                />
                            </CCol>
                        </CRow>
                        <CRow className="mt-2">
                            <CCol xs={3}>Address</CCol>
                            <CCol>
                                <CInputGroup size="sm">
                                    <CFormInput
                                        size="sm"
                                        type="text"
                                        placeholder="Select Address"
                                        value={(this.state.selectedAddress == null ? "" : this.state.selectedAddress.name)}
                                    />
                                    <CButton
                                        onClick={() => {
                                            this._showLovAddress();
                                        }}><CIcon icon={cilMenu} /></CButton>
                                </CInputGroup>
                            </CCol>
                        </CRow>
                        <CRow className="mt-2">
                            <CCol xs={3}>BU Owner</CCol>
                            <CCol>
                                <CInputGroup size="sm">
                                    <CFormInput
                                        size="sm"
                                        type="text"
                                        placeholder="Select Business Unit"
                                        value={(this.state.selectedBU == null ? "" : this.state.selectedBU.name)}
                                    />
                                    <CButton
                                        onClick={() => {
                                            this._showLovBU();
                                        }}><CIcon icon={cilMenu} /></CButton>
                                </CInputGroup>
                            </CCol>
                        </CRow>
                        <CRow className="mt-2">
                            <CCol xs={3}>District</CCol>
                            <CCol>
                                <CInputGroup size="sm">
                                    <CFormInput
                                        size="sm"
                                        type="text"
                                        placeholder="Select District"
                                        value={(this.state.selectedDistrict == null ? "" : this.state.selectedDistrict.name)}
                                    />
                                    <CButton
                                        onClick={() => {
                                            this._showLovDistrict();
                                        }}><CIcon icon={cilMenu} /></CButton>
                                </CInputGroup>
                            </CCol>
                        </CRow>
                        {this._buildGridDetail()}
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
            </div>
        );
    }
}