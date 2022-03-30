import { CButton, CCard, CCardBody, CCardHeader, CCol, CFormInput, CFormLabel, CInputGroup, CRow } from "@coreui/react";
import React from "react";
import AzecLOV from "azec_util/AzecLOV";
import AzecGrid from "azec_util/AzecGrid";
import CIcon from "@coreui/icons-react";
import { cilMenu } from "@coreui/icons";

export default class SerialLog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedSerialNumberType:null,
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
                trxNumber: "ITM" + i,
                date: "14-03-2022",
                itemCode: "SMSG",
                itemDesc: "SAMSUNG",
                whDesc: "Gudang Kapuk",
                locDesc: "Location Buffer"
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
        return(
            <AzecGrid ref={this.refGrid}
                multiSelect={true}
                header={{
                    columnWidth: [40, 150, 100, 100, -1, -1, -1],
                    columns: ["No", "Transaction Number", "Date", "Item Code", "Item Description", "Warehouse", "Location"],
                }}
                renderRow={
                    (item, index) => {
                        return [(index + 1), item.trxNumber, item.date, item.itemCode, item.itemDesc, item.whDesc, item.locDesc];
                    }
                }
                onRowSelected={(index) => {

                }}
                listModel={this.state.gridData.listData}
                paging={{ rowPerPage: 5, totalRow: this.state.gridData.rowCount }}
            />
        )
    }

    buildFormHeader() {
        return[
            <CRow className="mt-2 align-items-center">
                <CFormLabel className="col-sm-2 col-form-label">Serial Number Type</CFormLabel>
                <CCol xs={4}>
                    <CInputGroup size="sm">
                        <CFormInput
                            size="sm"
                            type="text"
                            value={(this.state.selectedSerialNumberType == null ? "" : this.state.selectedSerialNumberType.name)}
                        />
                        <CButton
                            onClick={() => {
                                // this.showLovBatchNo();
                            }}><CIcon icon={cilMenu} /></CButton>
                    </CInputGroup>
                </CCol>
                <CCol xs={6}>
                    <CFormInput size="sm" type="text"/>
                </CCol>
            </CRow>,
            <CRow className="mt-2">
                <CFormLabel className="col-sm-2 col-form-label">Serial</CFormLabel>
                <CCol xs={4}>
                    <CFormInput size="sm" type="text"/>
                </CCol>   
                <CCol>
                    <CButton
                        size="sm"
                        style={{ marginRight: "10px" }}
                        onClick={() => {
                            this.requery();
                        }}>Search
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
                            <CCardHeader>Serial Log</CCardHeader>
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