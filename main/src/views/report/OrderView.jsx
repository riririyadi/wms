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
import AzecSelect from "azec_util/AzecSelect";
import CIcon from "@coreui/icons-react";
import { cilSearch } from "@coreui/icons";

export default class OrderView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gridData: {
                listData: [],
                rowCount: 0
            },
            shippingStatus: [
                { code: "Delivered", name: "Delivered" },
                { code: "OnProcessing", name: "On Processing" },
                { code: "Return", name: "Return" },
                { code: "Ship", name: "Ship" },
                { code: "Shipped", name: "Shipped" },
                { code: "Undelivered", name: "Undelivered" },
                { code: "Missing", name: "Missing" },
                { code: "Cancel", name: "Cancel" },
            ],
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
                orderDate: "14-03-2022",
                customerName: "Cust " + i,
                customerPhone: "07777111222333",
                customerEmail: "email@email.com",
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
                    columns: ["No", "Order Number", "Order Date", "Customer Name", "Customer Phone", 
                    "Customer Email", "Courier Code", "Tracking No", "Shipping Charge", "Shipping Status",
                    "Order Status", "Delivery Address", "Delivery Province", "Delivery Zipcode",
                    "Sales No", "Sales Status", "Remark", "Reason"],
                }}
                renderRow={
                    (item, index) => {
                        return [(index + 1), item.orderNumber, item.orderDate, item.customerName, item.customerPhone, item.customerEmail];
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
                <CFormLabel className="col-sm-2 col-form-label">Order Number</CFormLabel>
                <CCol xs={4} style={{ marginLeft: "-50px", marginRight: "75px" }}>
                    <CFormInput
                        size="sm"
                        type="text"
                    />
                </CCol>
                <CFormLabel className="col-sm-2 col-form-label">Customer Name</CFormLabel>
                <CCol xs={4} style={{ marginLeft: "-50px" }}>
                    <CFormInput
                        size="sm"
                        type="text"
                    />
                </CCol>
            </CRow>,
            <CRow className="mt-2 align-items-center">
                <CFormLabel className="col-sm-2 col-form-label">Tracking No</CFormLabel>
                <CCol xs={4} style={{ marginLeft: "-50px", marginRight: "75px" }}>
                    <CFormInput
                        size="sm"
                        type="text"
                    />
                </CCol>
                <CFormLabel className="col-sm-2 col-form-label">Order Date From</CFormLabel>
                <CCol xs={2} style={{ marginLeft: "-50px", marginRight: "-7px" }}>
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
            </CRow>,
            <CRow className="mt-2">
                <CFormLabel className="col-sm-2 col-form-label">Shipping Status</CFormLabel>
                <CCol xs={4} style={{ marginLeft: "-50px", marginRight: "75px"}}>
                    <AzecSelect
                        listData={this.state.shippingStatus}
                        displayPrompt={(item) => {
                            return item.name;
                        }}
                        onSelected={(item, index) => {

                        }}
                    />
                </CCol>
                <CCol className="col-sm-2 col-form-label" style={{ marginLeft: "-50px" }}></CCol>
                <CCol>
                    <CButton
                        size="sm"
                        style={{ marginRight: "10px" }}
                        onClick={() => {
                            this.requery();
                        }}><CIcon icon={cilSearch} className="me-2" />Find
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
                            <CCardHeader>Report Master Order View</CCardHeader>
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