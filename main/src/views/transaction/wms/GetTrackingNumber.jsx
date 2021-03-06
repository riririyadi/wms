import {
    CRow,
    CCol,
    CCard,
    CCardBody,
    CCardHeader,
    CCollapse,
    CButton,
} from "@coreui/react";
import React from "react";
import AzecGrid from "azec_util/AzecGrid";
import AzecSelect from "azec_util/AzecSelect";
import { createConfirmbox } from "azec_util/AzecMessagebox"
import CIcon from "@coreui/icons-react";
import { cilCheck, cilLoopCircular, cilX, cilMinus, cilPlus } from "@coreui/icons";

export default class GetTrackingNumber extends React.Component {

    constructor(props) {
        super(props);
        this.allowEdit = this.props.permission.update;
        this.state = {
            couriers: [
                { code: "GOJ", name: "Gosend Instant" },
                { code: "GOS", name: "Gosend Sameday" },
                { code: "GRI", name: "Grab Instant" },
                { code: "GRS", name: "Grab Sameday" },
            ],
            gridData: {
                listData: [],
                rowCount: 0
            },
            visible: true,
            messagebox: <div></div>
        };
        this.refGrid = React.createRef();
    }

    _requery() {
        this.refGrid.current.initGrid();

        let listData = [];
        for (var i = 1; i <= 17; i++) {
            listData.push({
                orderNumber: "ORDER" + i,
                orderDate: "01-03-2022",
                customerName: "Nama Customer " + i,
                shipping: "On Process",
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

    _buildFormHeader() {
        return [
            <CRow>
                <CCol xs={3}>Courier</CCol>
                <CCol>
                    <AzecSelect
                        listData={this.state.couriers}
                        displayPrompt={(item) => {
                            return item.name;
                        }}
                        onSelected={(item, index) => {

                        }}
                    />
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
                                    message: "Do You want to push package order to courier?",
                                    buttonsText: ["Yes", "Cancel"]
                                })
                            });
                        }}
                    >
                        <CIcon icon={cilCheck} className="me-2" />Get Tracking No
                    </CButton>
                    <CButton disabled={!this.allowEdit} color="danger" variant="outline" style={{ marginLeft: 10 }}>
                        <CIcon icon={cilX} className="me-2" />
                        Cancel Booking
                    </CButton>
                    <CButton variant="outline" style={{ marginLeft: 10 }}
                        onClick={() => {
                            this._requery();
                        }}>
                        <CIcon icon={cilLoopCircular} className="me-2" />
                        Refresh
                    </CButton>
                </CCol>
            </CRow>
        ];
    }

    _buildGrid() {
        return (
            <AzecGrid ref={this.refGrid}
                multiSelect={{
                    enable: true,
                    key: function (item) {
                        return item.orderNumber;
                    }
                }}
                header={{
                    columnWidth: [40, 180, 120, -1, 140, 150],
                    columns: ["No", "Order Number", "Order Date", "Customer Name", "Shipping Status", "Tracking No"
                    ]
                }}
                renderRow={
                    (item, index) => {
                        return [(index + 1), item.orderNumber, item.orderDate, item.customerName, item.shipping, item.trackingNo];
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
                {this.state.messagebox}
                <CRow>
                    <CCol>
                        <CCard className="mb-2">
                            <CCardHeader>
                                <CRow>
                                    <CCol><strong>Get Tracking Number</strong></CCol>
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