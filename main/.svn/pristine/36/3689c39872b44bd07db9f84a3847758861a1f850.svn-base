import {
  CRow,
  CCol,
} from "@coreui/react";

import React from "react";
import CIcon from "@coreui/icons-react";
import AzecGrid from "azec_util/AzecGrid";
import AzecButtonGroup from "azec_util/AzecButtonGroup";
import { createMessagebox, messageboxType } from "azec_util/AzecMessagebox";
import { cilCloudDownload, cilFile, cilPencil, cilSearch, cilSync, cilTrash } from "@coreui/icons";
import FormInput from "./FormInput";

export default class ManualUpdateShipping extends React.Component {
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
    this.refGrid.current.initGrid();

    let listData = [];
    for (var i = 0; i < 6; i++) {
      listData.push({
        orderNumber: "SX022220300145" + i,
        fileName: "file0"+i+".xlsx",
        trackingNo: "TRCAKING00"+i,
        courierCode: "RPX",
        oldShippingStatus: "On Progress",
        newShippingStatus: "Arrived",
        creationDate: "23-03-2022 16:18:00",
        createdBy: "Sales",
        modifiedDate: "",
        modifiedBy: "",
        approvedDate: "23-03-2022 17:18:00",
        approvedBy: "Supervisor",
        transactionStatus: "Success"
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

  _buildGrid() {
      return (
        <AzecGrid ref={this.refGrid}
          header={{
            columnWidth: [],
            columns: ["No", "Order Number", "Filename", "Tracking No", "Courier Code", "Old Shipping Status", "New Shipping Status", "Creation Date", "Created by", "Modified Date", "Modified by", "Approved Date", "Approved by", "Transaction Status"]
          }}
          renderRow={
            (item, index) => {
              return [(index + 1), item.orderNumber, item.fileName, item.trackingNo, item.courierCode, item.oldShippingStatus, item.newShippingStatus, item.creationDate, item.createdBy, item.modifiedDate, item.modifiedBy, item.approvedDate, item.approvedBy, item.trxStatus];
            }
          }
          onRowSelected={(index) => {
            this._selectRow(index);
          }}
          listModel={this.state.gridData.listData}
          paging={{ rowPerPage: 5, totalRow: this.state.gridData.rowCount }}
        />
      );
    }

  render() {
    return (
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
