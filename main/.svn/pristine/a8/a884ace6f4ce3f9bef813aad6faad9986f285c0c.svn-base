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
import AzecLOV from "azec_util/AzecLOV";
import CIcon from "@coreui/icons-react";
import { cilMinus, cilPlus, cilLoopCircular, cilMenu, cilPrint } from "@coreui/icons";

export default class ListOrder extends React.Component {
    constructor(props) {
        super(props);
        this.allowPicking = this.props.permission.update;
        this.state = {
            orderNumber: "",
            gridData: {
                listData: [],
                rowCount: 0
            },
            selectedCourier: null,
            visible: true
        };
        this.refGrid = React.createRef();
        this.refLovCourier = React.createRef();
    }

    _requery() {
        this.refGrid.current.initGrid();

        let listData = [];
        for (var i = 1; i <= 14; i++) {
            listData.push({
                orderNumber: "ITM" + i,
                orderDate: "14-03-2022",
                customerName: "Nama Customer " + i,
                courier: "JNE",
                trackingNo: "000992832" + i
            });
        }
        this.setState({
            gridData: {
                listData: listData,
                rowCount: 0
            }
        });
    }

    _showLovCourier() {
        this.refLovCourier.current.initLov();
    }

    _buildDataLovCourier(page, keyword) {
        let listData = [];
        for (var i = 1; i <= 8; i++) {
            listData.push({ code: "COURIER" + i, name: "Layanan Express " + i + " page " + page });
        }
        return { list: listData, rowCount: 0 };
    }

    _buildLovCourier() {
        return (
            <AzecLOV ref={this.refLovCourier}
                title="List of Courier"
                onClose={() => { }}
                onSubmit=
                {(item, index) => {
                    this.setState({ selectedCourier: item });
                }}
                onQuery=
                {(page, keyword) => {
                    return this._buildDataLovCourier(page, keyword);
                }}
                grid=
                {{
                    header: {
                        title: ["No", "Courier Code", "Courier Name"],
                        width: [45, 100, -1],
                    },
                    rowDisplay: function (item, index, number) {
                        return [number, item.code, item.name];
                    },
                }}>
            </AzecLOV>
        );
    }

    _buildFormHeader() {
        return [
            <CRow>
                <CCol xs={3}>Courier</CCol>
                <CCol>
                    <CInputGroup size="sm">
                        <CFormInput
                            size="sm"
                            type="text"
                            value={(this.state.selectedCourier == null ? "" : this.state.selectedCourier.name)}
                        />
                        <CButton
                            onClick={() => {
                                this._showLovCourier();
                            }}><CIcon icon={cilMenu} /></CButton>
                    </CInputGroup>
                </CCol>
            </CRow>,
            <CRow className="mt-2">
                <CCol xs={3}>Order Number</CCol>
                <CCol>
                    <CInputGroup size="sm">
                        <CFormInput
                            size="sm"
                            type="text"
                            value={this.state.orderNumber}
                        />
                    </CInputGroup>
                </CCol>
            </CRow>,
            <CRow className="mt-2">
                <CCol xs={3}></CCol>
                <CCol>
                    <CButton variant="outline"
                        onClick={() => {
                            this._requery();
                        }}><CIcon icon={cilLoopCircular} /> Refresh</CButton>
                    <CButton
                        className="ms-2"
                        disabled={!this.allowPicking}
                        onClick={() => {
                            
                        }}><CIcon icon={cilPrint} /> Picking List</CButton>
                </CCol>
            </CRow>
        ];
    }

    _buildGrid() {
        return (
            <AzecGrid ref={this.refGrid}
                multiSelect={true}
                header={{
                    columnWidth: [40, 180, 120, -1, 100, 150],
                    columns: ["No", "Order Number", "Order Date", "Customer Name", "Courier", "Tracking No"
                    ]
                }}
                renderRow={
                    (item, index) => {
                        return [(index + 1), item.orderNumber, item.orderDate, item.customerName, item.courier, item.trackingNo];
                    }
                }
                onRowSelected={(index) => {

                }}
                listModel={this.state.gridData.listData}
                paging={{ rowPerPage: 5, totalRow: this.state.gridData.rowCount }}
            />
        );
    }

    render() {
        return (
            <div>
                {this._buildLovCourier()}
                <CRow>
                    <CCol>
                        <CCard className="mb-2">
                            <CCardHeader>
                                <CRow>
                                    <CCol><strong>List Order</strong></CCol>
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