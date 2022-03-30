import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
  CFormInput,
  CButton,
  CInputGroup,
  CCollapse,
} from "@coreui/react";

import React from "react";
import CIcon from "@coreui/icons-react";
import AzecGrid from "azec_util/AzecGrid";
import { cilFolderOpen, cilMinus, cilPlus, cilShare } from "@coreui/icons";

export default class PickingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderData: {
        orderNumber: "",
      },
      gridData: {
        listData: [],
        rowCount: 0
      },
      visible: true
    };
    this.refLovPicker = React.createRef();
    this.refGrid = React.createRef();
  }

  _scanOrderNumber() {
    this.refGrid.current.initGrid();

    let listData = [];
    for (var i = 1; i <= 4; i++) {
      listData.push({
        listNumber: "201601220000" + i,
        listDate: "22-01-2022 05:01:24",
        name: "ADE HILMAWAN",
        courierCode: "RPX",
        trxNumber: ""
      });
    }
    let orderData = {
      orderNumber: this.state.orderData.orderNumber,
    };
    this.setState({
      orderData: orderData,
      gridData: {
        listData: listData,
        rowCount: 0
      }
    });
  }

  _openDetail(index) {
    this.props.tabMenu.openMenu({
      code: "pickinglistdetail",
      name: "PL " + this.state.gridData.listData[index].listNumber,
      formProps: {
        permission: this.props.permission,
        role: this.props.role
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

  _buildFormHeader() {
    return [
      <CRow>
        <CCol xs={3}>Order Number</CCol>
        <CCol>
          <CInputGroup size="sm">
            <CFormInput
              size="sm"
              type="text"
              placeholder="Input Order number"
              value={this.state.orderData.orderNumber}
              onChange={(evt) => {
                let orderData = this.state.orderData;
                orderData.orderNumber = evt.target.value;
                this.setState({
                  orderData: orderData
                });
              }}
            />
            <CButton
              onClick={() => {
                this._scanOrderNumber();
              }}>Refresh</CButton>
          </CInputGroup>
        </CCol>
      </CRow>
    ];
  }

  _buildGrid() {
    return (
      <AzecGrid ref={this.refGrid}
        header={{
          columnWidth: [40, 150, -1, 200, -1, 200],
          columns: ["No", "Picking List Number", "Picking List Date", "Picker Name", "Courier Code", "Stock Transaction Number"
          ]
        }}
        renderRow={
          (item, index) => {
            return [(index + 1),
            <div><CIcon icon={cilFolderOpen} style={{ cursor: "pointer" }}
              onClick={() => {
                this._openDetail(index);
              }} />{item.listNumber}</div>,
            item.listDate, item.name, item.courierCode, item.trxNumber
            ];
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
        <CRow>
          <CCol>
            <CCard className="mb-2">
              <CCardHeader>
                <CRow>
                  <CCol><strong>Picking List</strong></CCol>
                  <CCol style={{ textAlign: 'right' }}>{this.state.visible ? <CIcon icon={cilMinus} style={{ cursor: 'pointer' }} onClick={() => this.setState({ visible: !this.state.visible })} /> : <CIcon icon={cilPlus} style={{ cursor: 'pointer' }} onClick={() => this.setState({ visible: !this.state.visible })} />}</CCol>
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
