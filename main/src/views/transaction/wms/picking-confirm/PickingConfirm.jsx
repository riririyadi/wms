import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
  CFormInput,
  CButton,
  CInputGroup,
  CFormCheck,
  CCollapse,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import ScanIMEI from "./ScanIMEI";
import React from "react";
import AzecLOV from "azec_util/AzecLOV";
import AzecGrid from "azec_util/AzecGrid";
import { createConfirmbox } from "azec_util/AzecMessagebox"
import { cilCheck, cilLoopCircular, cilMenu, cilMinus, cilPlus } from "@coreui/icons";

export default class PickingConfirm extends React.Component {
  constructor(props) {
    super(props);
    this.allowEdit = this.props.permission.update;
    this.state = {
      selectedPicker: null,
      gridData: {
        listData: [],
        rowCount: 0
      },
      visible: true,
      messagebox: <div></div>,
      dialog: {
        scanIMEI: false,
    },
    };
    this.refLovPicker = React.createRef();
    this.refGrid = React.createRef();
  }

  _loadDataGrid(page, initial) {
    if (initial) {
      this.refGrid.current.initGrid();
    }
    let listData = [];
    for (var i = 1; i <= 32; i++) {
      listData.push({
        itemCode: "ITM" + i,
        itemDesc: "Item Description " + i,
        qty: 1,
        checked: false
      });
    }
    this.setState({
      gridData: {
        listData: listData,
        rowCount: 0
      }
    });
  }

  _selectRow(index) {
    let gridData = this.state.gridData;
    gridData.listData[index].checked = !gridData.listData[index].checked;
    this.setState({
      gridData: gridData
    });
  }

  _showLovPicker() {
    this.refLovPicker.current.initLov();
  }

  _buildDataLovPicker(page, keyword) {
    let listData = [];
    for (var i = 1; i <= 5; i++) {
      listData.push({ number: "EMP" + i, name: "Employee " + i + " page " + page });
    }
    return { list: listData, rowCount: 38 };
  }

  _buildLovPicker() {
    return (
      <AzecLOV ref={this.refLovPicker}
        title="List of Picker"
        onClose={() => { }}
        onSubmit=
        {(item, index) => {
          this.setState({ selectedPicker: item });
        }}
        onQuery=
        {(page, keyword) => {
          return this._buildDataLovPicker(page, keyword);
        }}
        grid=
        {{
          header: {
            title: ["No", "Employee Number", "Employee Name"],
            width: [45, 160, -1],
          },
          rowDisplay: function (item, index, number) {
            return [number, item.number, item.name];
          },
        }}>
      </AzecLOV>
    );
  }

  _buildWindowScanIMEI() {
    return (
        <ScanIMEI visible={this.state.dialog.scanIMEI}
            onClose={() => {
                let dialog = this.state.dialog;
                dialog.scanIMEI = false;
                this.setState({
                    dialog: dialog
                })
            }} />
    );
}

  _buildFormHeader() {
    return [
      <CRow>
        <CCol xs={3}>Picking Number</CCol>
        <CCol>
          <CFormInput
            size="sm"
            type="text"
            placeholder="Enter picking number"
          />
        </CCol>
      </CRow>,
      <CRow className="mt-2">
        <CCol xs={3}>Picker</CCol>
        <CCol>
          <CInputGroup size="sm">
            <CFormInput type="text" placeholder="Pick picker person" value={this.state.selectedPicker == null ? "" : this.state.selectedPicker.name} />
            <CButton
              type="button"
              color="primary"
              onClick={() => {
                this._showLovPicker();
              }}
            >
              <CIcon icon={cilMenu} />
            </CButton>
          </CInputGroup>
        </CCol>
      </CRow>,
      <CRow className="mt-2">
        <CCol xs={3}></CCol>
        <CCol>
          <CButton
            disabled={!this.allowEdit}
            onClick={() => {
              this.setState({
                messagebox: createConfirmbox({
                  title: "Confirmation",
                  message: "Confirm this picking number?",
                  buttonsText: ["Confirm", "Cancel"]
                })
              });
            }}
          ><CIcon icon={cilCheck} className="me-2" />Confirm</CButton>
          <CButton variant="outline" style={{ marginLeft: 10 }}
            onClick={() => {
              this._loadDataGrid(1, true);
            }}>
            <CIcon icon={cilLoopCircular} className="me-2" />
            Refresh
          </CButton>
        </CCol>
      </CRow>,
    ];
  }

  _buildGrid() {
    return (
      <AzecGrid ref={this.refGrid}
        header={{
          columnWidth: [40, 120, 100, 100, 100, 50],
          columns: ["No", "Item Code", "Item Description",
          <div style={{textAlign: "right"}}>Quantity</div>,
          <div style={{textAlign: "center"}}>Check</div>,
          "Scan IMEI"]
        }}
        renderRow={
          (item, index) => {
            return [(index + 1), item.itemCode, item.itemDesc, 
            <div style={{textAlign:"right"}}>{item.qty}</div>, 
            <div style={{textAlign:"center"}}><CFormCheck checked={item.checked} /></div>,
            <CButton className="w-20" size="sm" variant="outline" disabled={!this.allowEdit}
            onClick={() => {
                let dialog = this.state.dialog;
                dialog.scanIMEI = true;
                this.setState({
                    dialog: dialog
                })
            }}
            >Scan IMEI              
            </CButton>
          ];
          }
        }
        onRowSelected={(index) => {
          this._selectRow(index);
        }}
        listModel={this.state.gridData.listData}
        paging={{ rowPerPage: 5, totalRow: this.state.gridData.rowCount }}
        onQuery={
          (page) => {
            this._loadDataGrid(page, false);
          }
        }
      />
    );
  }

  render() {
    return (
      <div>
        {this.state.messagebox}
        <CRow>
          {this._buildWindowScanIMEI()}
          {this._buildLovPicker()}
          <CCol>
            <CCard className="mb-2">
              <CCardHeader>
                <CRow>
                  <CCol><strong>Picking List</strong></CCol>
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
