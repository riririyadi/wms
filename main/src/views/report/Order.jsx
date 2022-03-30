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
} from "@coreui/react";
import AzecSelect from "azec_util/AzecSelect";
import AzecGrid from "azec_util/AzecGrid";
import CIcon from "@coreui/icons-react";
import { cilPlus } from "@coreui/icons";

export default class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderNumber: "",
            gridData: {
                listData: [],
                rowCount: 0
            },
            selectedCourier: null,
            shippingStatus: [
                { code: "All", name: "All" },
                { code: "OnProcessing", name: "On Processing" },
                { code: "Ship", name: "Ship" },
                { code: "Delivered", name: "Delivered" },
                { code: "Return", name: "Return" },
                { code: "Missing", name: "Missing" },
                { code: "Cancel", name: "Cancel" },
            ],
            businessUnit: [
                { code: "All", name: "[ALL] All Business Unit" }
            ],
        };
        this.refGrid = React.createRef();
    }

    requery() {
        this.refGrid.current.initGrid();

        let listData = [];
        for (var i = 1; i <= 14; i++) {
            listData.push({
                orderNumber: "ITM" + i,
                orderDate: "14-03-2022",
                customerName: "Nama Customer " + i,
                customerPhone: "087722113344",
                customerEmail: "email@email.com",
                channel: "IBOX",
                warehouse: "Gudang",
                courierCode: "JNE",
                trackingNo: "000992832" + i,
                invoiceNo: "INV " + i,
                orderStatus: "PAID",
                shippingStatus: "Delivered"
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
                    columnWidth: [40, 130, 100, 150, 100, 100, -1, 100, 160, 80, 100, 90, 90],
                    columns: ["No", "Order Number", "Channel", "Warehouse", "Order Date",
                        "Invoice No", "Customer Name", "Customer Phone", "Customer Email", "Courier Code", "Tracking No", "Order Status", "Shipping Status"],
                }}
                renderRow={
                    (item, index) => {
                        return [(index + 1), item.orderNumber, item.channel, item.warehouse, item.orderDate, item.invoiceNo,
                        item.customerName, item.customerPhone, item.customerEmail, item.courierCode, item.trackingNo,
                        item.orderStatus, item.shippingStatus];
                    }
                }
                onRowSelected={(index) => {

                }}
                listModel={this.state.gridData.listData}
                paging={{ rowPerPage: 5, totalRow: this.state.gridData.rowCount }}
            />
        );
    }

    buildFormHeader() {
        return [
            <CRow className="mt-2 align-items-center">
                <CFormLabel className="col-sm-2 col-form-label">Order Date From</CFormLabel>
                <CCol xs={2} style={{ marginRight: "-7px" }}>
                    <CFormInput
                        size="sm"
                        type="date"
                    />
                </CCol>
                To
                <CCol xs={2} style={{ marginLeft: "-7px" }}>
                    <CFormInput
                        size="sm"
                        type="date"
                    />
                </CCol>
                <CFormLabel className="col-sm-2 col-form-label" style={{ textAlign: "right" }}>Order Number</CFormLabel>
                <CCol xs={3}>
                    <CFormInput
                        size="sm"
                        type="text"
                    />
                </CCol>
                <CButton size="sm" style={{ width: "40px" }}
                    color="light"
                    onClick={() => {
                        // this._scanOrderNumber();
                    }}><CIcon icon={cilPlus} /></CButton>
            </CRow>,
            <CRow className="mt-2">
                <CFormLabel className="col-sm-2 col-form-label">Shipping Status</CFormLabel>
                <CCol xs={4}>
                    <AzecSelect
                        listData={this.state.shippingStatus}
                        displayPrompt={(item) => {
                            return item.name;
                        }}
                        onSelected={(item, index) => {

                        }}
                    />
                </CCol>
            </CRow>,
            <CRow className="mt-2">
                <CFormLabel className="col-sm-2 col-form-label">Business Unit</CFormLabel>
                <CCol xs={4}>
                    <AzecSelect
                        listData={this.state.businessUnit}
                        displayPrompt={(item) => {
                            return item.name;
                        }}
                        onSelected={(item, index) => {

                        }}
                    />
                </CCol>
            </CRow>,
            <CRow className="mt-2">
                <CCol className="col-sm-2 col-form-label"></CCol>
                <CCol>
                    <CButton
                        size="sm"
                        style={{ marginRight: "10px" }}
                        onClick={() => {
                            this.requery();
                        }}>Preview
                    </CButton>
                    <CButton
                        size="sm"
                        onClick={() => {
                            // this._requery();
                        }}>Download Order Report
                    </CButton>
                </CCol>
            </CRow>
        ]
    }

    render() {
        return (
            <div>
                <CRow>
                    <CCol>
                        <CCard>
                            <CCardHeader>Report Order</CCardHeader>
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