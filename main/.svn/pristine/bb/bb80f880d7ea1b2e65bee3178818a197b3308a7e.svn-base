import { CButton, CCard, CCardBody, CCardHeader, CCol, CFormInput, CFormLabel, CRow } from "@coreui/react";
import React from "react";
import AzecGrid from "azec_util/AzecGrid"

export default class DailyStockReport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gridData: {
                listData: [],
                rowCount: 0
            },
        };
        this.refGrid = React.createRef();
    }

    requery() {
        this.refGrid.current.initGrid();

        let listData = [];
        for (var i = 1; i <= 14; i++) {
            listData.push({
                stockDate: "21-03-2022",
                total: i,
                available: "Yes",
                sold: "Yes",
                blocked: "No",
                useInTransaction: "YES",
                blockedReturn: "true"
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
                    columnWidth: [40, 100, 100, 100, 100, 100, 100, 130],
                    columns: ["No", "Stock Date", "Total", "Available", "Sold", "Blocked", "Use In Transaction", "Blocked Return"],
                }}
                renderRow={
                    (item, index) => {
                        return [(index + 1), item.stockDate, item.total, item.available, item.sold, item.blocked, item.useInTransaction, item.blockedReturn]
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
        return[
            <CRow className="mt-2">
                <CFormLabel className="col-sm-2 col-form-label">Warehouse</CFormLabel>
                <CCol xs={4}>
                    <CFormInput
                        size="sm"
                        type="text"
                        placeholder="Enter Warehouse"
                    />
                </CCol>
            </CRow>,
            <CRow className="mt-2">
                <CFormLabel className="col-sm-2 col-form-label">Item Code</CFormLabel>
                <CCol xs={4}>
                    <CFormInput
                        size="sm"
                        type="text"
                        placeholder="Enter Item Code"
                    />
                </CCol>
            </CRow>,
            <CRow className="mt-2 align-items-center">
                <CFormLabel className="col-sm-2 col-form-label">Order Date From</CFormLabel>
                <CCol xs={2} style={{marginRight: "-7px" }}>
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
                <CFormLabel className="col-sm-2 col-form-label"></CFormLabel>
                <CCol>
                    <CButton
                        size="sm"
                        onClick={() => {
                            this.requery();
                        }}
                    >Search
                    </CButton>
                </CCol>
            </CRow>
        ]
    }

    render() {
        return(
            <div>
                <CRow>
                    <CCol>
                        <CCard>
                            <CCardHeader>Daily Stock Report</CCardHeader>
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