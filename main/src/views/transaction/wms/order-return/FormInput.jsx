import { cilMenu, cilExitToApp, cilFile, cilPlus, cilCheckCircle, cilXCircle, cilPrint, cilChevronDoubleRight } from "@coreui/icons";
import AzecGrid from "azec_util/AzecGrid";
import AzecLOV from "azec_util/AzecLOV";
import CIcon from "@coreui/icons-react";
import {
    CModal, CModalBody, CModalHeader,
    CRow, CCol,
    CFormInput,
    CButton,
    CHeaderDivider,
    CCard,
    CInputGroup,
    CTooltip
} from "@coreui/react";
import React from "react";

export default class FormInput extends React.Component {

    trxTypes = ["Type 1", "Type 2", "Type 3"];

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            data: {

            },
            detail: {
                listData: [],
                rowCount: 0
            },
            returItem: {
                listData: [],
                rowCount: 0
            },
            selectedItem: null
        };
        this.refLovLocation = React.createRef();
        this.refGridDetail = React.createRef();
        this.refGridReturnItem = React.createRef();
    }

    static getDerivedStateFromProps(props, state) {
        if (props.visible && !state.visible) {
            state.visible = props.visible;

            state.data = {
                code: props.data == undefined ? undefined : props.data.code,
                name: props.data == undefined ? undefined : props.data.name,
            };
        }
        return state;
    }

    componentDidMount() {
        this._requeryDetail();
    }

    _requeryDetail() {
        let listData = [];
        for (var i = 0; i < 3; i++) {
            listData.push({
                reffNo: "POS/0000" + i,
                code: "ITM00" + i,
                desc: "Samsung Galaxy " + i,
                qtySales: 3,
                qtyReturn: 0,
                price: 200000
            });
        }
        this.setState({
            detail: {
                listData: listData,
                rowCount: 0
            }
        });
    }

    _showLovLocation() {
        this.refLovLocation.current.initLov();
    }

    _buildDataLovLocation(page, keyword) {
        let listData = [];
        let data = ["Sales", "Buffer", "Damage"];
        for (var i = 0; i < 3; i++) {
            listData.push({
                code: "LOC00" + i,
                desc: "Location " + (data[i])
            });
        }
        return { list: listData, rowCount: 0 };
    }

    _buildLovLocation() {
        return (
            <AzecLOV ref={this.refLovLocation}
                title="List of Location"
                onClose={() => { }}
                onSubmit=
                {(item, index) => {
                    let detailIndex = this.refGridDetail.current.getSelectedRowIndex();
                    if (detailIndex > -1) {
                        let returItem = this.state.returItem;
                        let itemData = this.state.detail.listData[detailIndex];
                        returItem.listData.push({
                            code: itemData.code,
                            desc: itemData.desc,
                            qtyReturn: 1,
                        });
                        this.setState({
                            returItem: returItem
                        });
                    }
                }}
                onQuery=
                {(page, keyword) => {
                    return this._buildDataLovLocation(page, keyword);
                }}
                grid=
                {{
                    header: {
                        title: ["No", "Code", "Description"],
                        width: [45, 100, -1],
                    },
                    rowDisplay: function (item, index, number) {
                        return [number, item.code, item.desc];
                    },
                }}>
            </AzecLOV>
        );
    }

    _closeForm() {
        this.setState({
            visible: false
        });
        this.props.onClose();
    }

    _buildHeader() {
        let style = { fontSize: 13 };
        return (
            <CRow>
                <CCard className="col mx-1 p-2">
                    <CRow>
                        <CCol xs={4} style={style}>Return Number</CCol>
                        <CCol>
                            <CFormInput
                                size="sm"
                                type="text"
                                value={this.state.data.returnNo == undefined ? "" : this.state.data.returnNo}
                            />
                        </CCol>
                    </CRow>
                    <CRow className="mt-2">
                        <CCol xs={4} style={style}>Business Unit</CCol>
                        <CCol>
                            <CInputGroup size="sm">
                                <CFormInput type="text" placeholder="Pick business unit" value={this.state.selectedBU == undefined ? "<not selected>" : this.state.selectedBU.desc} />
                                <CButton
                                    type="button"
                                    color="primary"
                                    onClick={() => {
                                        // this._showLovWarehouse();
                                    }}
                                >
                                    <CIcon icon={cilMenu} />
                                </CButton>
                            </CInputGroup>
                        </CCol>
                    </CRow>
                    <CRow className="mt-2">
                        <CCol xs={4} style={style}>Order Reff No</CCol>
                        <CCol>
                            <CInputGroup size="sm">
                                <CFormInput type="text" placeholder="Pick reff no" value={this.state.selectedReffOrder == undefined ? "<not selected>" : this.state.selectedReffOrder.number} />
                                <CButton
                                    type="button"
                                    color="primary"
                                    onClick={() => {
                                        // this._showLovWarehouse();
                                    }}
                                >
                                    <CIcon icon={cilMenu} />
                                </CButton>
                            </CInputGroup>
                        </CCol>
                    </CRow>
                </CCard>

                <CCard className="col mx-1 p-2">
                    <CRow>
                        <CCol xs={3} style={style}>Return Date</CCol>
                        <CCol>
                            <CFormInput
                                size="sm"
                                type="text"
                                value={this.state.data.date == undefined ? "" : this.state.data.date}
                            />
                        </CCol>
                    </CRow>
                    <CRow className="mt-2">
                        <CCol xs={3} style={style}>Order Return Status</CCol>
                        <CCol>
                            <CFormInput
                                size="sm"
                                type="text"
                                value={this.state.data.status == undefined ? "" : this.state.data.status}
                            />
                        </CCol>
                    </CRow>
                    <CRow className="mt-2">
                        <CCol xs={3} style={style}>Remark</CCol>
                        <CCol>
                            <CFormInput
                                size="sm"
                                type="text"
                                value={this.state.data.remark == undefined ? "" : this.state.data.remark}
                            />
                        </CCol>
                    </CRow>
                </CCard>
            </CRow>
        );
    }

    _buildGridDetail() {
        let styleNumber = { textAlign: "right" };
        return (
            <CRow className="mt-2">
                <CCard className="p-2">
                    <AzecGrid
                        ref={this.refGridDetail}
                        header={{
                            columnWidth: [40, 150, 150, -1, 100, 100, 130],
                            columns: [
                                "No", "Reff No", "Item Code", "Item Description",
                                <div style={styleNumber}>Qty Sales</div>,
                                <div style={styleNumber}>Qty Return</div>,
                                <div style={styleNumber}>Price</div>
                            ]
                        }}
                        renderRow={
                            (item, index) => {
                                return [
                                    (index + 1), item.reffNo, item.code, item.desc,
                                    <div style={styleNumber}>{item.qtySales}</div>,
                                    <div style={styleNumber}>{item.qtyReturn}</div>,
                                    <div style={styleNumber}>{item.price}</div>,
                                ];
                            }
                        }
                        onRowSelected={(index) => {
                            this.setState({
                                selectedItem: this.state.detail.listData[index]
                            })
                        }}
                        listModel={this.state.detail.listData}
                        paging={{ rowPerPage: 5, totalRow: this.state.detail.rowCount }} />
                    {this._buildDetailInput()}
                </CCard>
            </CRow>
        );
    }

    _buildDetailInput() {
        let style = { textAlign: "right", fontSize: 14 }
        return (
            <CRow className="mt-2">
                <CCol xs={2} style={style}>Scan Quantity</CCol>
                <CCol>
                    <CInputGroup size="sm">
                        <CFormInput
                            size="sm"
                            type="text"
                        />
                        <CButton
                            onClick={() => {

                            }}>Scan <CIcon icon={cilChevronDoubleRight} /></CButton>
                    </CInputGroup>
                </CCol>
                <CCol xs={2} style={style}>Scan IMEI</CCol>
                <CCol>
                    <CInputGroup size="sm">
                        <CFormInput
                            size="sm"
                            type="text"
                        />
                        <CButton
                            onClick={() => {

                            }}>Scan <CIcon icon={cilChevronDoubleRight} /></CButton>
                    </CInputGroup>
                </CCol>
            </CRow>
        );
    }

    _buildGridReturnItem() {
        let styleNumber = { textAlign: "right" };
        return (
            <CRow className="mt-2">
                <CCard className="p-2">
                    <AzecGrid
                        ref={this.refGridReturnItem}
                        header={{
                            columnWidth: [40, 40, 150, 150, -1, 100],
                            columns: [
                                <CTooltip content="Add Line">
                                    <CButton variant="outline" size="sm"
                                        onClick={() => {
                                            this._showLovLocation();
                                        }}>
                                        <CIcon size="sm" icon={cilPlus} />
                                    </CButton>
                                </CTooltip>,
                                "No", "Item Code", "Item Description",
                                <div style={styleNumber}>Qty Return</div>,
                            ]
                        }}
                        renderRow={
                            (item, index) => {
                                return [
                                    <CButton color="danger" variant="outline" size="sm"
                                        onClick={() => {
                                            let index = this.refGridReturnItem.current.getSelectedRowIndex();
                                            let returItem = this.state.returItem;
                                            returItem.listData.splice(index, 1);
                                            this.setState({
                                                returItem: returItem
                                            });
                                        }}>
                                        <CIcon size="sm" icon={cilXCircle} />
                                    </CButton>,
                                    (index + 1), item.code, item.desc,
                                    <div style={styleNumber}>{item.qtyReturn}</div>,
                                ];
                            }
                        }
                        onRowSelected={(index) => {

                        }}
                        listModel={this.state.returItem.listData}
                        paging={{ rowPerPage: 5, totalRow: this.state.returItem.rowCount }} />
                </CCard>
            </CRow>
        );
    }

    render() {
        return (
            <CModal scrollable visible={this.props.visible} size="xl" backdrop="static"
                onClose={() => {
                    this._closeForm();
                }}
            >
                {this._buildLovLocation()}
                <CModalHeader>
                    Order Return Transaction
                </CModalHeader>
                <CModalBody>
                    {this._buildHeader()}
                    {this._buildGridDetail()}
                    {this._buildGridReturnItem()}
                    <CHeaderDivider />
                    <CRow className="mt-2">
                        <CCol>
                            <CButton variant="outline"><CIcon icon={cilFile} /> Create New</CButton>
                        </CCol>
                        <CCol style={{ textAlign: "right" }}>
                            <CButton className="ms-2"><CIcon icon={cilCheckCircle} /> Approve</CButton>
                            <CButton variant="outline" className="ms-2"><CIcon icon={cilPrint} /> Print</CButton>
                            <CButton variant="outline" className="ms-2"><CIcon icon={cilXCircle} /> Cancel</CButton>
                            <CButton color="secondary" variant="outline" className="ms-2"
                                onClick={() => {
                                    this._closeForm();
                                }}
                            ><CIcon icon={cilExitToApp} /> Close</CButton>
                        </CCol>
                    </CRow>
                </CModalBody>
            </CModal>
        );
    }
}