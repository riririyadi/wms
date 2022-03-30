import { cilMenu, cilExitToApp, cilFile } from "@coreui/icons";
import AzecGrid from "azec_util/AzecGrid";
import AzecLOV from "azec_util/AzecLOV";
import CIcon from "@coreui/icons-react";
import {
    CModal, CModalBody, CModalHeader,
    CRow, CCol,
    CFormInput,
    CButton,
    CHeaderDivider,
    CCard,
    CInputGroup,
} from "@coreui/react";
import React from "react";
import ScanBarcode from "./ScanBarcode";
import ViewSNVariance from "./ViewSNVariance";

export default class FormInput extends React.Component {

    trxTypes = ["Type 1", "Type 2", "Type 3"];

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            data: {

            },
            dialog: {
                scanBarcode: false,
                viewSN: false
            },
            detail: {
                listData: [],
                rowCount: 0
            },
            returItem: {
                listData: [],
                rowCount: 0
            },
            selectedItem: null
        };
        this.refLovLocation = React.createRef();
        this.refGridDetail = React.createRef();
        this.refGridReturnItem = React.createRef();
    }

    static getDerivedStateFromProps(props, state) {
        if (props.visible && !state.visible) {
            state.visible = props.visible;

            state.data = {
                code: props.data == undefined ? undefined : props.data.code,
                name: props.data == undefined ? undefined : props.data.name,
            };
        }
        return state;
    }

    componentDidMount() {
        this._requeryDetail();
    }

    _requeryDetail() {
        let listData = [];
        for (var i = 1; i <= 7; i++) {
            listData.push({
                itemCode: "ITM000" + i,
                itemDesc: "Iphone " + i + " Pro Max",
                sysCount: 10,
                captureCount: 2,
                variancePlus: 1,
                varianceMinus: 3
            });
        }
        this.setState({
            detail: {
                listData: listData,
                rowCount: 0
            }
        });
    }

    _showLovLocation() {
        this.refLovLocation.current.initLov();
    }

    _buildDataLovLocation(page, keyword) {
        let listData = [];
        let data = ["Sales", "Buffer", "Damage"];
        for (var i = 0; i < 3; i++) {
            listData.push({
                code: "LOC00" + i,
                desc: "Location " + (data[i])
            });
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
                    let detailIndex = this.refGridDetail.current.getSelectedRowIndex();
                    if (detailIndex > -1) {
                        let returItem = this.state.returItem;
                        let itemData = this.state.detail.listData[detailIndex];
                        returItem.listData.push({
                            code: itemData.code,
                            desc: itemData.desc,
                            qtyReturn: 1,
                        });
                        this.setState({
                            returItem: returItem
                        });
                    }
                }}
                onQuery=
                {(page, keyword) => {
                    return this._buildDataLovLocation(page, keyword);
                }}
                grid=
                {{
                    header: {
                        title: ["No", "Code", "Description"],
                        width: [45, 100, -1],
                    },
                    rowDisplay: function (item, index, number) {
                        return [number, item.code, item.desc];
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

    _buildHeader() {
        let style = { fontSize: 13 };
        return (
            <CRow>
                <CCard className="col mx-1 p-2">
                    <CRow>
                        <CCol xs={4} style={style}>Business Unit</CCol>
                        <CCol>
                            <CInputGroup size="sm">
                                <CFormInput type="text" value={this.state.selectedBU == undefined ? "<not selected>" : this.state.selectedBU.desc} />
                                <CButton
                                    type="button"
                                    color="primary"
                                    onClick={() => {
                                        // this._showLovWarehouse();
                                    }}
                                >
                                    <CIcon icon={cilMenu} />
                                </CButton>
                            </CInputGroup>
                        </CCol>
                    </CRow>
                    <CRow className="mt-2">
                        <CCol xs={4} style={style}>Warehouse</CCol>
                        <CCol>
                            <CInputGroup size="sm">
                                <CFormInput type="text" value={this.state.selectedBU == undefined ? "<not selected>" : this.state.selectedBU.desc} />
                                <CButton
                                    type="button"
                                    color="primary"
                                    onClick={() => {
                                        // this._showLovWarehouse();
                                    }}
                                >
                                    <CIcon icon={cilMenu} />
                                </CButton>
                            </CInputGroup>
                        </CCol>
                    </CRow>
                    <CRow className="mt-2">
                        <CCol xs={4} style={style}>Location</CCol>
                        <CCol>
                            <CInputGroup size="sm">
                                <CFormInput type="text" value={this.state.selectedReffOrder == undefined ? "<not selected>" : this.state.selectedReffOrder.number} />
                                <CButton
                                    type="button"
                                    color="primary"
                                    onClick={() => {
                                        // this._showLovWarehouse();
                                    }}
                                >
                                    <CIcon icon={cilMenu} />
                                </CButton>
                            </CInputGroup>
                        </CCol>
                    </CRow>
                </CCard>

                <CCard className="col mx-1 p-2">
                    <CRow>
                        <CCol xs={3} style={style}>Order Date</CCol>
                        <CCol>
                            <CFormInput
                                size="sm"
                                type="text"
                                value={this.state.data.date == undefined ? "" : this.state.data.date}
                            />
                        </CCol>
                    </CRow>
                    <CRow className="mt-2">
                        <CCol xs={3} style={style}>Order Number</CCol>
                        <CCol>
                            <CFormInput
                                size="sm"
                                type="text"
                                value={this.state.data.status == undefined ? "" : this.state.data.status}
                            />
                        </CCol>
                    </CRow>
                    <CRow className="mt-2">
                        <CCol xs={3} style={style}>Order Status</CCol>
                        <CCol>
                            <CFormInput
                                size="sm"
                                type="text"
                                value={this.state.data.remark == undefined ? "" : this.state.data.remark}
                            />
                        </CCol>
                    </CRow>
                    <CRow className="mt-2">
                        <CCol xs={3} style={style}>Transaction Reff No</CCol>
                        <CCol>
                            <CInputGroup size="sm">
                                <CFormInput type="text" value={this.state.selectedBU == undefined ? "<not selected>" : this.state.selectedBU.desc} />
                                <CButton
                                    type="button"
                                    color="primary"
                                    onClick={() => {
                                        // this._showLovWarehouse();
                                    }}
                                >
                                    <CIcon icon={cilMenu} />
                                </CButton>
                            </CInputGroup>
                        </CCol>
                    </CRow>
                </CCard>
            </CRow>
        );
    }

    _buildFooter() {
        let style = { fontSize: 13 };
        return (
            <CRow>
                <CCard className="col mx-1 p-2">
                    <CRow>
                        <CCol xs={4} style={style}>Created By</CCol>
                        <CCol>
                            <CFormInput size="sm" type="text" />
                        </CCol>
                    </CRow>
                    <CRow className="mt-2">
                        <CCol xs={4} style={style}>Approved By</CCol>
                        <CCol>
                            <CFormInput size="sm" type="text" />
                        </CCol>
                    </CRow>
                    <CRow className="mt-2">
                        <CCol xs={4} style={style}>Posting By</CCol>
                        <CCol>
                            <CFormInput size="sm" type="text" />
                        </CCol>
                    </CRow>
                </CCard>

                <CCard className="col mx-1 p-2">
                    <CRow>
                        <CCol xs={4} style={style}>Created Date</CCol>
                        <CCol>
                            <CFormInput size="sm" type="text" />
                        </CCol>
                    </CRow>
                    <CRow className="mt-2">
                        <CCol xs={4} style={style}>Approved Date</CCol>
                        <CCol>
                            <CFormInput size="sm" type="text" />
                        </CCol>
                    </CRow>
                    <CRow className="mt-2">
                        <CCol xs={4} style={style}>Posting Date</CCol>
                        <CCol>
                            <CFormInput size="sm" type="text" />
                        </CCol>
                    </CRow>
                </CCard>
            </CRow>
        );
    }

    _buildGridDetail() {
        let styleNumber = { textAlign: "right" };
        return (
            <CRow className="mt-2">
                <CCard className="p-2">
                    <AzecGrid
                        ref={this.refGridDetail}
                        header={{
                            columnWidth: [40, 150, -1, 120, 120, 100, 100, 140],
                            columns: [
                                "No", "Item Code", "Item Description",
                                <div style={styleNumber}>System Count</div>,
                                <div style={styleNumber}>Capture Count</div>,
                                <div style={styleNumber}>Variance (+)</div>,
                                <div style={styleNumber}>Variance (-)</div>,
                                "View SN Variance"
                            ]
                        }}
                        renderRow={
                            (item, index) => {
                                return [
                                    (index + 1), item.itemCode, item.itemDesc,
                                    <div style={styleNumber}>{item.sysCount}</div>,
                                    <div style={styleNumber}>{item.captureCount}</div>,
                                    <div style={styleNumber}>{item.variancePlus}</div>,
                                    <div style={styleNumber}>{item.varianceMinus}</div>,
                                    <CButton className="w-100" size="sm" variant="outline"
                                        onClick={() => {
                                            let dialog = this.state.dialog;
                                            dialog.viewSN = true;
                                            this.setState({
                                                dialog: dialog
                                            })
                                        }}>View</CButton>
                                ];
                            }
                        }
                        onRowSelected={(index) => {
                            this.setState({
                                selectedItem: this.state.detail.listData[index]
                            })
                        }}
                        listModel={this.state.detail.listData}
                        paging={{ rowPerPage: 5, totalRow: this.state.detail.rowCount }} />
                    {this._buildDetailInput()}
                </CCard>
            </CRow>
        );
    }

    _buildDetailInput() {
        let style = { textAlign: "right", fontSize: 14 }
        return (
            <CRow className="mt-2">
                <CCol>
                    <CInputGroup size="sm">
                        <CButton variant="outline"
                            onClick={() => {
                                let dialog = this.state.dialog;
                                dialog.scanBarcode = true;
                                this.setState({
                                    dialog: dialog
                                })
                            }}>Scan Barcode</CButton>
                        <CButton variant="outline">Upload</CButton>
                        <CButton variant="outline">Approved</CButton>
                        <CButton variant="outline">Posting Variance</CButton>
                    </CInputGroup>
                </CCol>
            </CRow>
        );
    }

    _buildWindowScanBarcode() {
        return (
            <ScanBarcode visible={this.state.dialog.scanBarcode}
                onClose={() => {
                    let dialog = this.state.dialog;
                    dialog.scanBarcode = false;
                    this.setState({
                        dialog: dialog
                    })
                }} />
        );
    }

    _buildWindowViewSN() {
        return (
            <ViewSNVariance visible={this.state.dialog.viewSN}
                onClose={() => {
                    let dialog = this.state.dialog;
                    dialog.viewSN = false;
                    this.setState({
                        dialog: dialog
                    })
                }} />
        );
    }

    render() {
        return (
            <CModal visible={this.props.visible} size="xl" backdrop="static"
                onClose={() => {
                    this._closeForm();
                }}
            >
                {this._buildWindowScanBarcode()}
                {this._buildWindowViewSN()}
                {this._buildLovLocation()}
                <CModalHeader>
                    Stock Take Transaction
                </CModalHeader>
                <CModalBody>
                    {this._buildHeader()}
                    {this._buildGridDetail()}
                    {this._buildFooter()}
                    <CHeaderDivider />
                    <CRow className="mt-2">
                        <CCol>
                            <CButton variant="outline"><CIcon icon={cilFile} /> Create New</CButton>
                        </CCol>
                        <CCol style={{ textAlign: "right" }}>
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