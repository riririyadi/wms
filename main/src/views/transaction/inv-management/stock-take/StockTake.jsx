import {
    CRow,
    CCol,
} from "@coreui/react";
import React from "react";
import AzecGrid from "azec_util/AzecGrid";
import AzecButtonGroup from "azec_util/AzecButtonGroup";
import CIcon from "@coreui/icons-react";
import { createMessagebox, messageboxType } from "azec_util/AzecMessagebox";
import { cilCloudDownload, cilFile, cilPencil, cilSearch, cilSync, cilTrash } from "@coreui/icons";
import FormInput from "./FormInput";

export default class StockTake extends React.Component {

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
        };
        this.refGrid = React.createRef();
    }

    componentDidMount() {
        this._requery();
    }

    _requery() {
        let listData = [];
        for (var i = 0; i < 27; i++) {
            listData.push({
                orderNumber: "ODR0001110" + (i+1),
                orderDate: "01-01-2022",
                orderStatus: "Paid",
                buDesc: "Carefour Bekasi " + (i+1),
                whDesc: "Gudang Kapuk",
                locDesc: "Location Sales",
                status: "Approved",
                buDesc: "Samsung Store No " + (i+1),
                reffNo: "POS/02/2000" + i
            });
        }
        this.setState({
            gridData: {
                listData: listData,
                rowCount: 0
            }
        });
    }

    _openFormInput(selectedData) {
        let dialog = this.state.dialog;
        dialog.formInput.visible = true;
        dialog.formInput.selectedData = selectedData;
        this.setState({
            dialog: dialog
        });
    }

    _openSelected(index) {
        if (index == undefined) {
            index = this.refGrid.current.getSelectedRowIndex();
        }
        if (index > -1) {
            let selectedData = this.state.gridData.listData[index];
            this._openFormInput(selectedData);
        } else {
            this.setState({
                messageBox: createMessagebox({
                    message: "Record not selected",
                    type: messageboxType.WARNING,
                })
            });
        }
    }

    _buildGrid() {
        return (
            <AzecGrid ref={this.refGrid}
                header={{
                    columnWidth: [40, -1, -1, 110, 110, 110, 90, 120],
                    columns: ["No", "Busines Unit", "Warehouse", "Location", "Order Number", "Order Date", "Order Status", "Reff No"]
                }}
                renderRow={
                    (item, index) => {
                        return [(index + 1), item.buDesc, item.whDesc, item.locDesc, item.orderNumber, item.orderDate, item.orderStatus, item.reffNo];
                    }
                }
                onRowSelected={(index) => {

                }}
                onDoubleClick={(index) => {
                    
                }}
                listModel={this.state.gridData.listData}
                paging={{ rowPerPage: 10, totalRow: this.state.gridData.rowCount }}
            />
        );
    }

    _buildToolbar() {
        let items = [
            <CIcon icon={cilFile} />,
            <CIcon icon={cilPencil} />,
            <CIcon icon={cilTrash} />,
            <CIcon icon={cilCloudDownload} />,
            <CIcon icon={cilSync} />,
            <CIcon icon={cilSearch} />
        ];
        let tooltips = [
            "Create New Record", "Edit Record", "Delete Record", "Download Record", "Requery", "Find Record"
        ];
        return (
            <AzecButtonGroup items={items} tooltips={tooltips}
                onClick={(index) => {
                    switch (index) {
                        case 0: {
                            this._openFormInput(undefined);
                        } break;
                        case 1: {
                            this._openSelected(undefined);
                        } break;
                        case 2: {
                            this.setState({
                                messageBox: createMessagebox({
                                    message: "Cannot delete this record",
                                    type: messageboxType.WARNING,
                                })
                            });
                        } break;
                        case 3: {
                            this.setState({
                                messageBox: createMessagebox({
                                    message: "Download successfuly",
                                    type: messageboxType.INFORMATION,
                                })
                            });
                        } break;
                        case 4: {

                        } break;
                        case 5: {

                        } break;
                    }
                }} />
        );
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
                {this.state.messageBox}
                {this._buildToolbar()}
                <CRow>
                    <CCol>
                        {this._buildGrid()}
                    </CCol>
                </CRow>
            </div>
        );
    }

}