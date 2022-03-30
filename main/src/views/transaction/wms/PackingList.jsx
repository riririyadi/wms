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
import AzecGrid from "azec_util/AzecGrid";
import CIcon from "@coreui/icons-react";
import { cilChevronDoubleRight, cilMinus, cilPlus, cilPrint } from "@coreui/icons";

export default class PackingList extends React.Component {
  constructor(props) {
    super(props);
    this.allowEdit = this.props.permission.update;
    this.state = {
      orderData: {
        orderNumber: "",
        trackingNo: "",
        courier: "",
        imei: "",
        weight: 0
      },
      gridData: {
        listData: [],
        rowCount: 0
      },
      visible: true,
    };
    this.refLovPicker = React.createRef();
    this.refGrid = React.createRef();
  }

  _scanOrderNumber() {
    this.refGrid.current.initGrid();

    let listData = [];
    for (var i = 1; i <= 4; i++) {
      listData.push({
        itemCode: "ITM" + i,
        itemDesc: "Item Description " + i,
        price: 100000,
        scanned: 1
      });
    }
    let orderData = {
      orderNumber: this.state.orderData.orderNumber,
      trackingNo: "GRAB00001",
      courier: "Grab Instant"
    };
    this.setState({
      orderData: orderData,
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

  _buildFormHeader() {
    return [
      <CRow>
        <CCol xs={3}>Order Number</CCol>
        <CCol>
          <CInputGroup size="sm">
            <CFormInput
              size="sm"
              type="text"
              placeholder="Scan order number"
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
              }}>Scan <CIcon icon={cilChevronDoubleRight} /></CButton>
          </CInputGroup>
        </CCol>
      </CRow>,
      <CRow className="mt-2">
        <CCol xs={3}>Imei Number</CCol>
        <CCol>
          <CInputGroup size="sm">
            <CFormInput
              value={this.state.orderData.imei}
              size="sm"
              type="text"
              placeholder="Scan imei"
              onChange={(evt) => {
                if (this.allowEdit) {
                  let orderData = this.state.orderData;
                  orderData.imei = evt.target.value;
                  this.setState({
                    orderData: orderData
                  });
                }
              }}
            />
            <CButton disabled={!this.allowEdit}>Scan <CIcon icon={cilChevronDoubleRight} /></CButton>
          </CInputGroup>
        </CCol>
      </CRow>,
      <CRow className="mt-2">
        <CCol xs={3}>Weight</CCol>
        <CCol>
          <CInputGroup size="sm">
            <CFormInput
              value={this.state.orderData.weight}
              size="sm"
              type="text"
              placeholder="Scan weight"
              onChange={(evt) => {
                if (this.allowEdit) {
                  let orderData = this.state.orderData;
                  orderData.weight = evt.target.value;
                  this.setState({
                    orderData: orderData
                  });
                }
              }}
            />
            <CButton disabled={!this.allowEdit}>Scan <CIcon icon={cilChevronDoubleRight} /></CButton>
          </CInputGroup>
        </CCol>
      </CRow>,
      <CRow className="mt-2">
        <CCol xs={3}>Tracking No</CCol>
        <CCol>
          <CFormInput
            size="sm"
            type="text"
            value={this.state.orderData.trackingNo}
          />
        </CCol>
      </CRow>,
      <CRow className="mt-2">
        <CCol xs={3}>Courier</CCol>
        <CCol>
          <CFormInput
            size="sm"
            type="text"
            value={this.state.orderData.courier}
          />
        </CCol>
      </CRow>,
      <CRow className="mt-2">
        <CCol xs={3}></CCol>
        <CCol>
          <CButton disabled={!this.allowEdit} variant="outline"><CIcon icon={cilPrint}/> Print Label</CButton>
          <CButton disabled={!this.allowEdit} variant="outline" className="ms-2"><CIcon icon={cilPrint}/> Print IMEI</CButton>
          <CButton disabled={!this.allowEdit} className="ms-2">Get Tracking No</CButton>
        </CCol>
      </CRow>,
    ];
  }

  _buildGrid() {
    return (
      <AzecGrid ref={this.refGrid}
        header={{
          columnWidth: [40, 180, -1, 100, 100],
          columns: ["No", "Item Code", "Item Description", "Sales Price", "Qty Scanned"
          ]
        }}
        renderRow={
          (item, index) => {
            return [(index + 1), item.itemCode, item.itemDesc, item.price, item.scanned];
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
                  <CCol><strong>Packing List</strong></CCol>
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
