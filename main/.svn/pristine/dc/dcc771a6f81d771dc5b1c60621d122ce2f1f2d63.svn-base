import {
    CRow,
    CCol,
    CCard,
    CCardBody,
    CCardHeader,
    CFormInput,
    CButton,
    CInputGroup,
    CFormCheck,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import React from "react";
import AzecSelect from "azec_util/AzecSelect";
import AzecGrid from "azec_util/AzecGrid";
import AzecLOV from "azec_util/AzecLOV";
import { cilMenu, cilSync } from "@coreui/icons";

export default class AvailStockMonitoring extends React.Component {

    flags = ["All", "Yes", "No"];

    constructor(props) {
        super(props);
        this.state = {
            gridData: {
                listData: [],
                rowCount: 0
            },
            selectedWH: null,
            selectedBU: null,
            selectedItem: null
        };
        this.refGrid = React.createRef();
        this.refLovWH = React.createRef();
        this.refLovBU = React.createRef();
        this.refLovItem = React.createRef();
    }

    _requery() {
        let listData = [];
        for (var i = 0; i < 1; i++) {
            listData.push({
                itemCode: "ITM0" + i,
                itemDesc: "Item Desc " + i,
                avail: 0,
                allocated: 0,
                usedTrx: 0,
                bloked: 0,
                blokedRet: 0,
                specifiedBloked: 0,
                transit: 0,
                preorderBooked: 0,
                preorderScanned: 0,
                preorderUnscanned: 0,
                avaiToSell: 0,
                minStock: 0
            });
        }
        this.setState({
            gridData: {
                listData: listData,
                rowCount: 0
            }
        });
    }

    _showLovWarehouse() {
        this.refLovWH.current.initLov();
    }

    _buildDataLovWarehouse(page, keyword) {
        let listData = [];
        for (var i = 1; i <= 14; i++) {
            listData.push({ code: "WH00" + i, desc: "Warehouse " + i });
        }
        return { list: listData, rowCount: 0 };
    }

    _buildLovWarehouse() {
        return (
            <AzecLOV ref={this.refLovWH}
                title="List of Warehouse"
                onClose={() => { }}
                onSubmit=
                {(item, index) => {
                    this.setState({
                        selectedWH: item
                    })
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
                        return [number, item.code, item.desc];
                    },
                }}>
            </AzecLOV>
        );
    }

    _showLovBU() {
        this.refLovBU.current.initLov();
    }

    _buildDataLovBU(page, keyword) {
        let listData = [];
        for (var i = 1; i <= 14; i++) {
            listData.push({ code: "BU00" + i, desc: "Business Unit " + i });
        }
        return { list: listData, rowCount: 0 };
    }

    _buildLovBU() {
        return (
            <AzecLOV ref={this.refLovBU}
                title="List of Business Unit"
                onClose={() => { }}
                onSubmit=
                {(item, index) => {
                    this.setState({
                        selectedBU: item
                    })
                }}
                onQuery=
                {(page, keyword) => {
                    return this._buildDataLovBU(page, keyword);
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

    _showLovItem() {
        this.refLovItem.current.initLov();
    }

    _buildDataLovItem(page, keyword) {
        let listData = [];
        for (var i = 1; i <= 14; i++) {
            listData.push({ code: "ITM00" + i, desc: "Samsung Galaxy " + i });
        }
        return { list: listData, rowCount: 0 };
    }

    _buildLovItem() {
        return (
            <AzecLOV ref={this.refLovItem}
                title="List of Item"
                onClose={() => { }}
                onSubmit=
                {(item, index) => {
                    this.setState({
                        selectedItem: item
                    })
                }}
                onQuery=
                {(page, keyword) => {
                    return this._buildDataLovItem(page, keyword);
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

    _buildFormHeader() {
        return [
            <CRow>
                <CCol xs={3}>Warehouse</CCol>
                <CCol>
                    <CInputGroup size="sm">
                        <CFormInput type="text" value={this.state.selectedWH == null ? "" : this.state.selectedWH.desc} />
                        <CButton
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
                <CCol xs={2}>Is Serial Number</CCol>
                <CCol xs={2}>
                    <AzecSelect
                        listData={this.flags}
                        displayPrompt={(item) => {
                            return item;
                        }}
                        onSelected={(item, index) => {

                        }}
                    />
                </CCol>
            </CRow>,
            <CRow className="mt-2">
                <CCol xs={3}>Business Unit</CCol>
                <CCol>
                    <CInputGroup size="sm">
                        <CFormInput type="text" value={this.state.selectedBU == null ? "" : this.state.selectedBU.desc} />
                        <CButton
                            type="button"
                            color="primary"
                            onClick={() => {
                                this._showLovBU();
                            }}
                        >
                            <CIcon icon={cilMenu} />
                        </CButton>
                    </CInputGroup>
                </CCol>
                <CCol xs={2}>Is Booked</CCol>
                <CCol xs={2}>
                    <AzecSelect
                        listData={this.flags}
                        displayPrompt={(item) => {
                            return item;
                        }}
                        onSelected={(item, index) => {

                        }}
                    />
                </CCol>
            </CRow>,
            <CRow className="mt-2">
                <CCol xs={3}>Item</CCol>
                <CCol>
                    <CInputGroup size="sm">
                        <CFormInput type="text" value={this.state.selectedItem == null ? "" : this.state.selectedItem.desc} />
                        <CButton
                            type="button"
                            color="primary"
                            onClick={() => {
                                this._showLovItem();
                            }}
                        >
                            <CIcon icon={cilMenu} />
                        </CButton>
                    </CInputGroup>
                </CCol>
                <CCol xs={4}>
                    <CButton
                        onClick={() => {
                            this._requery();
                        }}>
                        <CIcon icon={cilSync} /> Requery
                    </CButton>
                </CCol>
            </CRow>,
        ];
    }

    _buildGrid() {
        return (
            <AzecGrid ref={this.refGrid}
                header={{
                    columnWidth: [40, 100, -1, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
                    columns: ["No", "Item Code", "Item Description", "Available", "Used in Transaction", "Allocated",
                        "Blocked", "Blocked Return", "Specified Blocked", "Transit", "Preorder Booked", "Preorder Scanned",
                        "Preorder Unscanned", "Available to Sell", "Min Stock"]
                }}
                renderRow={
                    (item, index) => {
                        return [(index + 1), item.itemCode, item.itemDesc, item.avail, item.usedTrx, item.allocated,
                        item.bloked, item.blokedRet, item.specifiedBloked, item.transit, item.preorderBooked,
                        item.preorderScanned, item.preorderUnscanned, item.avaiToSell, item.minStock];
                    }
                }
                onRowSelected={(index) => {

                }}
                onDoubleClick={(index) => {
                    this._openSelected(index);
                }}
                listModel={this.state.gridData.listData}
                paging={{ rowPerPage: 10, totalRow: this.state.gridData.rowCount }}
            />
        );
    }

    render() {
        return (
            <div>
                {this._buildLovWarehouse()}
                {this._buildLovBU()}
                {this._buildLovItem()}
                <CRow>
                    <CCol>
                        <CCard className="mb-4">
                            <CCardHeader>
                                <strong>Filter Data</strong>
                            </CCardHeader>
                            <CCardBody>{this._buildFormHeader()}</CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol>
                        {this._buildGrid()}
                    </CCol>
                </CRow>
            </div>
        );
    }

}