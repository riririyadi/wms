import { cilMenu, cilExitToApp, cilFile, cilSave, cilSync, cilPlus, cilFunctions, cilCheckCircle, cilX, cilXCircle, cilPrint, cilChevronDoubleRight } from "@coreui/icons";
import AzecSelect from "azec_util/AzecSelect";
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
    CInputGroup
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
            selectedItem: null
        };
        this.refLovItem = React.createRef();
        this.refGridDetail = React.createRef();
    }

    static getDerivedStateFromProps(props, state) {
        if (props.visible && !state.visible) {
            state.visible = props.visible;

            state.data = {
                code: props.data == undefined ? undefined : props.data.code,
                name: props.data == undefined ? undefined : props.data.name,
            };
            state.detail.listData = [];
        }
        return state;
    }

    componentDidMount() {
        // this._requeryDetail();
    }

    // _requeryDetail() {
    //     let listData = [];
    //     for (var i = 0; i < 30; i++) {
    //         listData.push({
    //             code: "ITM00" + i,
    //             desc: "Samsung Galaxy " + i,
    //             available: 20,
    //             planned: 10,
    //             proccesed: 5
    //         });
    //     }
    //     this.setState({
    //         detail: {
    //             listData: listData,
    //             rowCount: 0
    //         }
    //     });
    // }

    _showLovItem() {
        this.refLovItem.current.initLov();
    }

    _buildDataLovItem(page, keyword) {
        let listData = [];
        for (var i = 1; i <= 14; i++) {
            listData.push({ code: "ITM000" + i, name: "Samsung Galaxy " + i });
        }
        return { list: listData, rowCount: 0 };
    }

    _buildLovItem() {
        return (
            <AzecLOV ref={this.refLovItem}
                title="List of Item"
                onClose={() => { }}
                onSubmit=
                {(item, index) => {
                    let detail = this.state.detail;
                    detail.listData.push({
                        code: item.code,
                        name: item.name,
                        available: 20,
                        planned: 0,
                        proccesed: 0,
                        price: (index * 23000)
                    });
                    this.setState({
                        detail: detail
                    });
                }}
                onQuery=
                {(page, keyword) => {
                    return this._buildDataLovItem(page, keyword);
                }}
                grid=
                {{
                    header: {
                        title: ["No", "Code", "Description"],
                        width: [45, 100, -1],
                    },
                    rowDisplay: function (item, index, number) {
                        return [number, item.code, item.name];
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
                        <CCol xs={4} style={style}>Transaction Number</CCol>
                        <CCol>
                            <CFormInput
                                size="sm"
                                type="text"
                                placeholder="Enter Channel name"
                                value={this.state.data.name == undefined ? "" : this.state.data.name}
                                onChange={(evt) => {
                                    let data = this.state.data;
                                    data.name = evt.target.value;
                                    this.setState({
                                        data: data
                                    });
                                }}
                            />
                        </CCol>
                    </CRow>
                    <CRow className="mt-2">
                        <CCol xs={4} style={style}>Warehouse</CCol>
                        <CCol>
                            <CInputGroup size="sm">
                                <CFormInput type="text" placeholder="Pick warehouse" value={this.state.selectedItemGroup == undefined ? "<not selected>" : this.state.selectedItemGroup.name} />
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
                        <CCol xs={4} style={style}>Business Unit</CCol>
                        <CCol>
                            <CFormInput
                                size="sm"
                                type="text"
                                value={this.state.data.name == undefined ? "" : this.state.data.name}
                            />
                        </CCol>
                    </CRow>
                    {/* <CRow className="mt-2">
                        <CCol xs={4} style={style}>Transaction Type</CCol>
                        <CCol>
                            <AzecSelect
                                listData={this.trxTypes}
                                displayPrompt={(item) => {
                                    return item;
                                }}
                                onSelected={(item, index) => {

                                }}
                            />
                        </CCol>
                    </CRow> */}
                    <CRow className="mt-2">
                        <CCol xs={4} style={style}>Destination Warehouse</CCol>
                        <CCol>
                            <CInputGroup size="sm">
                                <CFormInput type="text" placeholder="Pick destination warehouse" value={this.state.selectedWHDest == undefined ? "<not selected>" : this.state.selectedWHDest.name} />
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
                        <CCol xs={3} style={style}>Status</CCol>
                        <CCol>
                            <CFormInput
                                size="sm"
                                type="text"
                                value={this.state.data.status == undefined ? "" : this.state.data.status}
                            />
                        </CCol>
                    </CRow>
                    <CRow className="mt-2">
                        <CCol xs={3} style={style}>Batch No</CCol>
                        <CCol>
                            <CFormInput
                                size="sm"
                                type="text"
                            />
                        </CCol>
                    </CRow>
                    <CRow className="mt-2">
                        <CCol xs={3} style={style}>Reference Doc</CCol>
                        <CCol>
                            <CFormInput
                                size="sm"
                                type="text"
                            />
                        </CCol>
                    </CRow>
                    <CRow className="mt-2">
                        <CCol xs={3} style={style}>Additional  Info</CCol>
                        <CCol>
                            <CFormInput
                                size="sm"
                                type="text"
                            />
                        </CCol>
                    </CRow>
                    <CRow className="mt-2">
                        <CCol xs={3} style={style}>Synch Status</CCol>
                        <CCol>
                            <CFormInput
                                size="sm"
                                type="text"
                            />
                        </CCol>
                    </CRow>
                    <CRow className="mt-2">
                        <CCol style={{ textAlign: "right" }}>
                            <CButton><CIcon icon={cilSync} /> Ready For Synchronize</CButton>
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
                            columnWidth: [40, 40, 150, -1, 100, 100, 130, 100],
                            columns: [
                                <CButton variant="outline" size="sm"
                                    onClick={() => {
                                        this._showLovItem();
                                    }}>
                                    <CIcon size="sm" icon={cilPlus} />
                                </CButton>,
                                "No", "Item Code", "Item Description",
                                <div style={styleNumber}>Inv. Available</div>,
                                <div style={styleNumber}>Planned Qty</div>,
                                <div style={styleNumber}>Processed Qty</div>,
                                <div style={styleNumber}>Price</div>
                            ]
                        }}
                        renderRow={
                            (item, index) => {
                                return [
                                    <CButton color="danger" variant="outline" size="sm"
                                        onClick={() => {
                                            let index = this.refGridDetail.current.getSelectedRowIndex();
                                            let detail = this.state.detail;
                                            detail.listData.splice(index, 1);
                                            this.setState({
                                                detail: detail
                                            });
                                        }}>
                                        <CIcon size="sm" icon={cilXCircle} />
                                    </CButton>,
                                    (index + 1), item.code, item.desc,
                                    <div style={styleNumber}>{item.available}</div>,
                                    <div style={styleNumber}>{item.planned}</div>,
                                    <div style={styleNumber}>{item.proccesed}</div>,
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
        if (this.state.selectedItem == undefined) {
            return (<div></div>);
        } else {
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
                    <CCol xs={2} style={style}>Scan Serial</CCol>
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
    }

    _buildInputSrcDest() {
        let style = { fontSize: 13 };
        return (
            <CRow className="mt-2">
                <CCard className="col mx-1 p-2">
                    <CRow>
                        <CCol xs={4} style={style}>LOT Number</CCol>
                        <CCol>
                            <CInputGroup size="sm">
                                <CFormInput type="text" />
                                <CButton
                                    type="button"
                                    color="primary"
                                    onClick={() => {

                                    }}
                                >
                                    <CIcon icon={cilMenu} />
                                </CButton>
                            </CInputGroup>
                        </CCol>
                    </CRow>
                    <CRow className="mt-2">
                        <CCol xs={4} style={style}>LOT Date</CCol>
                        <CCol>
                            <CFormInput
                                size="sm"
                                type="text"
                            />
                        </CCol>
                    </CRow>
                    <CRow className="mt-2">
                        <CCol xs={4} style={style}>WH Location</CCol>
                        <CCol>
                            <CInputGroup size="sm">
                                <CFormInput type="text" />
                                <CButton
                                    type="button"
                                    color="primary"
                                    onClick={() => {

                                    }}
                                >
                                    <CIcon icon={cilMenu} />
                                </CButton>
                            </CInputGroup>
                        </CCol>
                    </CRow>
                    <CRow className="mt-2">
                        <CCol xs={4} style={style}>Block From</CCol>
                        <CCol>
                            <CFormInput
                                size="sm"
                                type="text"
                            />
                        </CCol>
                        <CCol xs={1} style={style}>To</CCol>
                        <CCol>
                            <CFormInput
                                size="sm"
                                type="text"
                            />
                        </CCol>
                    </CRow>
                    <CRow className="mt-2">
                        <CCol xs={4} style={style}>Transaction Qty</CCol>
                        <CCol>
                            <CFormInput
                                size="sm"
                                type="text"
                            />
                        </CCol>
                    </CRow>
                </CCard>

                <CCard className="col mx-1 p-2">
                    <CRow>
                        <CCol xs={4} style={style}>WH Location</CCol>
                        <CCol>
                            <CInputGroup size="sm">
                                <CFormInput type="text" />
                                <CButton
                                    type="button"
                                    color="primary"
                                    onClick={() => {

                                    }}
                                >
                                    <CIcon icon={cilMenu} />
                                </CButton>
                            </CInputGroup>
                        </CCol>
                    </CRow>
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
                {this._buildLovItem()}
                <CModalHeader>
                    Stock Receive
                </CModalHeader>
                <CModalBody>
                    {this._buildHeader()}
                    {this._buildGridDetail()}
                    {this._buildInputSrcDest()}
                    <CHeaderDivider />
                    <CRow className="mt-2">
                        <CCol>
                            <CButton variant="outline"><CIcon icon={cilFile} /> Create New</CButton>
                        </CCol>
                        <CCol style={{ textAlign: "right" }}>
                            <CButton variant="outline" className="ms-2"><CIcon icon={cilSave} /> Save</CButton>
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