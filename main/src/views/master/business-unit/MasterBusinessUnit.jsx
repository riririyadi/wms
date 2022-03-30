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
    this.refLovAddress = React.createRef();
    this.refLovTenant = React.createRef();
    this.refGrid = React.createRef();
  }

  componentDidMount() {
    this._requery();
  }

  _requery() {
    this.refGrid.current.initGrid();

    let listData = [];
    for (var i = 1; i <= 4; i++) {
      listData.push({
        buCode: "JKT-000" + i,
        buDesc: "Kantor Erajaya" + i,
        phoneNumber: "085123456" + i,
        email: "customer_care@erajaya.com",
        address: "Erajaya Plaza",
        tenantName: ""
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

  _showLovAddress() {
    this.refLovAddress.current.initLov();
  }

  _buildDataLovAddress(page, keyword) {
    let listData = [];
    for (var i = 1; i <= 8; i++) {
      listData.push({ code: "RI000" + i, name: "Erajaya " + i });
    }
    return { list: listData, rowCount: 0 };
  }

  _buildLovAddress() {
    return (
      <AzecLOV ref={this.refLovAddress}
        title="List of Address"
        onClose={() => { }}
        onSubmit=
        {(item, index) => {
          this.setState({ selectedAddress: item });
        }}
        onQuery=
        {(page, keyword) => {
          return this._buildDataLovAddress(page, keyword);
        }}
        grid=
        {{
          header: {
            title: ["No", "Address Code", "Address Name"],
            width: [45, 100, -1],
          },
          rowDisplay: function (item, index, number) {
            return [number, item.code, item.name];
          },
        }}>
      </AzecLOV>
    );
  }

  _showLovTenant() {
    this.refLovTenant.current.initLov();
  }

  _buildDataLovTenant(page, keyword) {
    let listData = [];
    for (var i = 1; i <= 8; i++) {
      listData.push({ code: "RI000" + i, name: "Tenant " + i });
    }
    return { list: listData, rowCount: 0 };
  }

  _buildLovTenant() {
    return (
      <AzecLOV ref={this.refLovTenant}
        title="List of Tenant"
        onClose={() => { }}
        onSubmit=
        {(item, index) => {
          this.setState({ selectedTenant: item });
        }}
        onQuery=
        {(page, keyword) => {
          return this._buildDataLovTenant(page, keyword);
        }}
        grid=
        {{
          header: {
            title: ["No", "Tenant Code", "Tenant Name"],
            width: [45, 100, -1],
          },
          rowDisplay: function (item, index, number) {
            return [number, item.code, item.name];
          },
        }}>
      </AzecLOV>
    );
  }

  _selectRow(index) {
    let gridData = this.state.gridData;
    gridData.listData[index].checked = !gridData.listData[index].checked;
    this.setState({
      gridData: gridData
    });
  }

  _buildGrid() {
    return (
        <AzecGrid ref={this.refGrid}
            header={{
                columnWidth: [40, 250, 100, 100, 70, 150, 70, 50],
                columns: ["No", "Business Unit Code", "Business Unit Desc", "Phone Number", "Email", "Address", "Tenant Name"]
            }}
            renderRow={
                (item, index) => {
                    return [(index + 1), item.buCode, item.buDesc, item.phoneNumber, item.email, item.address, item.tenangName];
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
          columnWidth: [40, 100, 200, -1, 200, 200, -1],
          columns: ["No", "BU Code", "BU Description", "Phone Number", "Email", "Address", "Tenant"
          ]
        }}
        renderRow={
          (item, index) => {
            return [(index + 1), item.buCode, item.buDesc, item.phoneNumber, item.email, item.address, item.tenantName];
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
