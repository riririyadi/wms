import {
    CRow,
    CCol,
    CCard,
    CCardBody,
    CCardHeader,
    CFormInput,
    CButton,
    CInputGroup,
    CCollapse,
} from "@coreui/react";
import React from "react";
import AzecGrid from "azec_util/AzecGrid";
import AzecLOV from "azec_util/AzecLOV";
import CIcon from "@coreui/icons-react";
import { cilChevronDoubleRight, cilMenu, cilMinus, cilPlus } from "@coreui/icons";

export default class Preoutbound extends React.Component {
    constructor(props) {
        super(props);
        this.allowEdit = this.props.permission.update;
        this.state = {
            shippingId: "",
            batchQty: 0,
            gridData: {
                listData: [],
                rowCount: 0
            },
            visible: true,
            selectedCourier: null,
            selectedBatch: null
        };
        this.refGrid = React.createRef();
        this.refLovCourier = React.createRef();
        this.refLovBatch = React.createRef();
    }

    _requery() {
        this.refGrid.current.initGrid();

        let listData = [];
        for (var i = 1; i <= 7; i++) {
            listData.push({
                orderNumber: "ITM" + i,
                customerName: "Nama Customer " + i,
                address: "Jalan Pramuka No 3" + i,
                province: "DKI Jakarta",
                trackingNo: "000992832" + i
            });
        }
        this.setState({
            gridData: {
                listData: listData,
                rowCount: 0
            }
        });
    }

    _showLovCourier() {
        this.refLovCourier.current.initLov();
    }

    _buildDataLovCourier(page, keyword) {
        let listData = [];
        for (var i = 1; i <= 8; i++) {
            listData.push({ code: "COURIER" + i, name: "Layanan Express " + i + " page " + page });
        }
        return { list: listData, rowCount: 0 };
    }

    _buildLovCourier() {
        return (
            <AzecLOV ref={this.refLovCourier}
                title="List of Courier"
                onClose={() => { }}
                onSubmit=
                {(item, index) => {
                    this.setState({ selectedCourier: item });
                }}
                onQuery=
                {(page, keyword) => {
                    return this._buildDataLovCourier(page, keyword);
                }}
                grid=
                {{
                    header: {
                        title: ["No", "Courier Code", "Courier Name"],
                        width: [45, 100, -1],
                    },
                    rowDisplay: function (item, index, number) {
                        return [number, item.code, item.name];
                    },
                }}>
            </AzecLOV>
        );
    }

    _showLovBatch() {
        this.refLovBatch.current.initLov();
    }

    _buildDataLovBatch(page, keyword) {
        let listData = [];
        for (var i = 1; i <= 5; i++) {
            listData.push({ code: "Batch" + i, desc: "Batch pukul " + i });
        }
        return { list: listData, rowCount: 0 };
    }

    _buildLovBatch() {
        return (
            <AzecLOV ref={this.refLovBatch}
                title="List of Batch"
                onClose={() => { }}
                onSubmit=
                {(item, index) => {
                    this.setState({ selectedBatch: item });
                }}
                onQuery=
                {(page, keyword) => {
                    return this._buildDataLovBatch(page, keyword);
                }}
                grid=
                {{
                    header: {
                        title: ["No", "Batch Code", "Description"],
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
                <CCol xs={3}>Batch Date</CCol>
                <CCol>
                    <CInputGroup size="sm">
                        <CFormInput
                            size="sm"
                            type="date"
                        />
                    </CInputGroup>
                </CCol>
            </CRow>,
            <CRow className="mt-2">
                <CCol xs={3}>Courier</CCol>
                <CCol>
                    <CInputGroup size="sm">
                        <CFormInput
                            size="sm"
                            type="text"
                            value={(this.state.selectedCourier == null ? "" : this.state.selectedCourier.name)}
                        />
                        <CButton
                            onClick={() => {
                                this._showLovCourier();
                            }}><CIcon icon={cilMenu} /></CButton>
                    </CInputGroup>
                </CCol>
            </CRow>,
            <CRow className="mt-2">
                <CCol xs={3}>Batch No</CCol>
                <CCol>
                    <CInputGroup size="sm">
                        <CFormInput
                            size="sm"
                            type="text"
                            value={(this.state.selectedBatch == null ? "" : this.state.selectedBatch.desc)}
                        />
                        <CButton
                            onClick={() => {
                                this._showLovBatch();
                            }}><CIcon icon={cilMenu} /></CButton>
                    </CInputGroup>
                </CCol>
            </CRow>,
            <CRow className="mt-2">
                <CCol xs={3}>Batch Quantity</CCol>
                <CCol>
                    <CInputGroup size="sm">
                        <CFormInput
                            size="sm"
                            type="text"
                            value={this.state.batchQty}
                        />
                    </CInputGroup>
                </CCol>
            </CRow>,
            <CRow className="mt-2">
                <CCol xs={3}>Shipping Id</CCol>
                <CCol>
                    <CInputGroup size="sm">
                        <CFormInput
                            size="sm"
                            type="text"
                            value={this.state.shippingId}
                            onChange={(evt) => {
                                if(this.allowEdit) {
                                    this.setState({
                                        shippingId: evt.target.value
                                    })
                                }
                            }}
                        />
                        <CButton
                            disabled={!this.allowEdit}
                            onClick={() => {
                                this._requery();
                            }}>Scan <CIcon icon={cilChevronDoubleRight} /></CButton>
                    </CInputGroup>
                </CCol>
            </CRow>
        ];
    }

    _buildGrid() {
        return (
            <AzecGrid ref={this.refGrid}
                header={{
                    columnWidth: [40, 180, 200, -1, 100, 150],
                    columns: ["No", "Order Number", "Customer Name", "Delivery Address", "Province", "Tracking No"
                    ]
                }}
                renderRow={
                    (item, index) => {
                        return [(index + 1), item.orderNumber, item.customerName, item.address, item.province, item.trackingNo];
                    }
                }
                onRowSelected={(index) => {

                }}
                listModel={this.state.gridData.listData}
                paging={{ rowPerPage: 5, totalRow: this.state.gridData.rowCount }}
            />
        );
    }

    render() {
        return (
            <div>
                {this._buildLovCourier()}
                {this._buildLovBatch()}
                <CRow>
                    <CCol>
                        <CCard className="mb-2">
                            <CCardHeader>
                                <CRow>
                                    <CCol><strong>Pre Outbound Data</strong></CCol>
                                    <CCol style={{textAlign: 'right'}}>{this.state.visible ? <CIcon icon={cilMinus} style={{cursor: 'pointer'}} onClick={() => this.setState({visible: !this.state.visible})}/> : <CIcon icon={cilPlus} style={{cursor: 'pointer'}} onClick={() => this.setState({visible: !this.state.visible})}/>}</CCol>
                                </CRow>
                            </CCardHeader>
                            <CCollapse visible={this.state.visible}>
                                <CCardBody>{this._buildFormHeader()}</CCardBody>
                            </CCollapse>
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