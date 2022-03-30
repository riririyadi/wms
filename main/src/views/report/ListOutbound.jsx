import React from "react";
import {
    CRow,
    CCol,
    CCard,
    CCardBody,
    CCardHeader,
    CFormInput,
    CButton,
    CFormLabel,
    CInputGroup,
} from "@coreui/react";
import AzecGrid from "azec_util/AzecGrid";
import AzecLOV from "azec_util/AzecLOV";
import CIcon from "@coreui/icons-react";
import { cilMenu, cilPrint } from "@coreui/icons";

export default class ListOutbound extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderNumber: "",
            gridData: {
                listData: [],
                rowCount: 0
            },
            selectedCourier: null,
            selectedBatchNo: null,
            businessUnit: [
                { code: "All", name: "[ALL] All Business Unit" }
            ],
        };
        this.refGrid = React.createRef();
        this.refLovCourier = React.createRef();
        this.refLovBatchNo = React.createRef();
    }

    requery() {
        this.refGrid.current.initGrid();

        let listData = [];
        for (var i = 1; i <= 14; i++) {
            listData.push({
                orderNumber: "ITM" + i,
                creationDate: "14-03-2022",
                customerEmail: "email@email.com",
                channel: "IBOX",
                warehouse: "Gudang",
            });
        }
        this.setState({
            gridData: {
                listData: listData,
                rowCount: 0
            }
        });
    }

    buildGrid() {
        return (
            <AzecGrid ref={this.refGrid}
                multiSelect={true}
                header={{
                    columnWidth: [40, 150, -1, 100, -1, 100, 100, 100, 130],
                    columns: ["No", "Order Number", "Customer Name", "Warehouse", "Address", "Province", "Country", "Zip Code", "Trancking No"],
                }}
                renderRow={
                    (item, index) => {
                        return [(index + 1), item.orderNumber, item.channel, item.warehouse, item.customerEmail, item.creationDate];
                    }
                }
                onRowSelected={(index) => {

                }}
                listModel={this.state.gridData.listData}
                paging={{ rowPerPage: 5, totalRow: this.state.gridData.rowCount }}
            />
        );
    }

    showLovCourier() {
        this.refLovCourier.current.initLov();
    }

    buildDataLovCourier(page, keyword) {
        let listData = [];
        for (var i = 1; i <= 8; i++) {
            listData.push({ code: "COURIER" + i, name: "Layanan Express " + i + " page " + page });
        }
        return { list: listData, rowCount: 0 };
    }

    buildLovCourier() {
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
                    return this.buildDataLovCourier(page, keyword);
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

    showLovBatchNo() {
        this.refLovBatchNo.current.initLov();
    }

    buildDataLovBatchNo(page, keyword) {
        let listData = [];
        for (var i = 1; i <= 8; i++) {
            listData.push({ code: "COURIER" + i, name: "Batch " + i + " page " + page });
        }
        return { list: listData, rowCount: 0 };
    }

    buildLovBatchNo() {
        return (
            <AzecLOV ref={this.refLovBatchNo}
                title="List of Batch No"
                onClose={() => { }}
                onSubmit=
                {(item, index) => {
                    this.setState({ selectedCourier: item });
                }}
                onQuery=
                {(page, keyword) => {
                    return this.buildDataLovBatchNo(page, keyword);
                }}
                grid=
                {{
                    header: {
                        title: ["No", "Courier Code", "Batch No"],
                        width: [45, 100, -1],
                    },
                    rowDisplay: function (item, index, number) {
                        return [number, item.code, item.name];
                    },
                }}>
            </AzecLOV>
        );
    }

    buildFormHeader() {
        return [
            <CRow className="mt-2 align-items-center">
                <CFormLabel className="col-sm-2 col-form-label">Batch Date</CFormLabel>
                <CCol xs={4} style={{ marginLeft: "-75px", marginRight: "100px" }}>
                    <CFormInput
                        size="sm"
                        type="date"
                    />
                </CCol>
                {/* <CCol xs={1}></CCol> */}
                <CFormLabel className="col-sm-2 col-form-label">Batch No</CFormLabel>
                <CCol xs={4} style={{ marginLeft: "-75px" }}>
                    <CInputGroup size="sm">
                        <CFormInput
                            size="sm"
                            type="text"
                            value={(this.state.selectedBatchNo == null ? "" : this.state.selectedBatchNo.name)}
                        />
                        <CButton
                            onClick={() => {
                                this.showLovBatchNo();
                            }}><CIcon icon={cilMenu} /></CButton>
                    </CInputGroup>
                </CCol>
            </CRow>,
            <CRow className="mt-2">
                <CFormLabel className="col-sm-2 col-form-label">Courier</CFormLabel>
                <CCol xs={4} style={{ marginLeft: "-75px", marginRight: "100px" }}>
                    <CInputGroup size="sm">
                        <CFormInput
                            size="sm"
                            type="text"
                            value={(this.state.selectedCourier == null ? "" : this.state.selectedCourier.name)}
                        />
                        <CButton
                            onClick={() => {
                                this.showLovCourier();
                            }}><CIcon icon={cilMenu} /></CButton>
                    </CInputGroup>
                </CCol>
                <CFormLabel className="col-sm-2 col-form-label">Batch Quantity</CFormLabel>
                <CCol xs={4} style={{ marginLeft: "-75px" }}>
                    <CFormInput
                        size="sm"
                        type="text"
                    />
                </CCol>
            </CRow>,
            <CRow className="mt-2">
                <CCol className="col-sm-2 col-form-label" style={{ marginLeft: "-75px" }}></CCol>
                <CCol>
                    <CButton
                        size="sm"
                        style={{ marginRight: "10px" }}
                        onClick={() => {
                            // this.requery();
                        }}><CIcon icon={cilPrint} className="me-2" />Print
                    </CButton>
                </CCol>
            </CRow>
        ]
    }

    render() {
        return (
            <div>
                {this.buildLovCourier()}
                {this.buildLovBatchNo()}
                <CRow>
                    <CCol>
                        <CCard>
                            <CCardHeader>Report Print List Outbound</CCardHeader>
                            <CCardBody>
                                {this.buildFormHeader()}
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
                <CRow className="mt-2">
                    <CCol>
                        {this.buildGrid()}
                    </CCol>
                </CRow>
            </div>
        )
    }
}