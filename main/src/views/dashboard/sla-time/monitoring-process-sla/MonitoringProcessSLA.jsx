import { CCard, CButton, CCardBody, CCardHeader, CCol, CFormInput, CFormLabel, CRow } from "@coreui/react";
import React from "react";
import AzecGrid from "azec_util/AzecGrid"
import FormInput from "./FormInput";
import CIcon from "@coreui/icons-react";
import { createMessagebox, messageboxType } from "azec_util/AzecMessagebox";

export default class MonitoringProcessSLA extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gridData: {
                listData: [],
                rowCount: 0
            },
            dialog: {
                formInput: {
                    visible: false,
                    selectedData: undefined
                }
            },
            messageBox: <div></div>
        }
        this.refGrid = React.createRef();
    }

    componentDidMount() {
        this.requery();
    }

    requery() {
        let listData = [];
        for (var i = 0; i < 32; i++) {
            listData.push({
                orderNumber: "ORDER000" + i,
            });
        }
        this.setState({
            gridData: {
                listData: listData,
                rowCount: 0
            }
        });
    }

    openFormInput(selectedData) {
        let dialog = this.state.dialog;
        dialog.formInput.visible = true;
        dialog.formInput.selectedData = selectedData;
        this.setState({
            dialog: dialog
        });
    }

    openSelected(index) {
        if (index == undefined) {
            index = this.refGrid.current.getSelectedRowIndex();
        }
        if (index > -1) {
            let selectedData = this.state.gridData.listData[index];
            this.openFormInput(selectedData);
        } else {
            this.setState({
                messageBox: createMessagebox({
                    message: "Record not selected",
                    type: messageboxType.WARNING,
                })
            });
        }
    }

    buildGrid() {
        return(
            <AzecGrid ref={this.refGrid}
                multiSelect={true}
                header={{
                    columnWidth: [40, 100],
                    columns: ["No", "Order Number"],
                }}
                renderRow={
                    (item, index) => {
                        return [(index + 1), item.orderNumber];
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
            <CRow>
                <CFormLabel className="col-sm-2 col-form-label">Order Number</CFormLabel>
                <CCol xs={4}>
                    <CFormInput 
                    type="text" 
                    size="sm"
                    placeholder="Enter Order Number">
                    </CFormInput>
                </CCol>
            </CRow>,
            <CRow className="mt-2">
                <CFormLabel className="col-sm-2 col-form-label"></CFormLabel>
                <CCol>
                    <CButton 
                        className="me-2" 
                        size="sm"
                        onClick={() => {
                            this.openFormInput();
                        }}
                    >Internal Process
                    </CButton>
                    <CButton 
                        size="sm"
                        onClick={() => {
                            this.openFormInput();
                        }}
                    >External Process
                    </CButton>
                </CCol>
                {/* <CCol>
                    <CButton size="sm">External Process</CButton>
                </CCol> */}
            </CRow>
        ]
    }

    render() {
        return(
            <div>
                <FormInput visible={this.state.dialog.formInput.visible}
                    data={this.state.dialog.formInput.selectedData}
                    onClose={() => {
                        let dialog = this.state.dialog;
                        dialog.formInput.visible = false;
                        this.setState({
                            dialog: dialog
                        });
                    }}
                />
                {/* {this.state.messageBox} */}
                <CRow>
                    <CCol>
                        <CCard>
                            <CCardHeader>Monitoring Process SLA</CCardHeader>
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