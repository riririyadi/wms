import { cilMenu, cilExitToApp, cilFile, cilSave, cilSync, cilPlus, cilFunctions, cilCheckCircle, cilX, cilXCircle, cilPrint } from "@coreui/icons";
import AzecSelect from "azec_util/AzecSelect";
import AzecGrid from "azec_util/AzecGrid";
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
            }
        };
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
        for (var i = 0; i < 30; i++) {
            listData.push({
                code: "ITM00" + i,
                desc: "Samsung Galaxy " + i,
                available: 20,
                planned: 10,
                proccesed: 5
            });
        }
        this.setState({
            detail: {
                listData: listData,
                rowCount: 0
            }
        });
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
                    <CRow className="mt-2">
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
                    </CRow>
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
                        <CCol xs={2} style={style}>JG Id</CCol>
                        <CCol>
                            <CFormInput
                                size="sm"
                                type="text"
                                value={this.state.data.jg == undefined ? "" : this.state.data.jg}
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
                        <CCol xs={2} style={style}>JG Id Cancel</CCol>
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
            <div className="mt-2">
                <AzecGrid
                    ref={this.refGridDetail}
                    header={{
                        columnWidth: [40, 40, 150, -1, 100, 100, 130],
                        columns: [
                            <CButton variant="outline" size="sm"
                                onClick={() => {

                                }}>
                                <CIcon size="sm" icon={cilPlus} />
                            </CButton>,
                            "No", "Item Code", "Item Description",
                            <div style={styleNumber}>Inv. Available</div>,
                            <div style={styleNumber}>Planned Qty</div>,
                            <div style={styleNumber}>Processed Qty</div>
                        ]
                    }}
                    renderRow={
                        (item, index) => {
                            return ["", (index + 1), item.code, item.desc,
                                <div style={styleNumber}>{item.available}</div>,
                                <div style={styleNumber}>{item.planned}</div>,
                                <div style={styleNumber}>{item.proccesed}</div>,
                            ];
                        }
                    }
                    onRowSelected={(index) => {

                    }}
                    listModel={this.state.detail.listData}
                    paging={{ rowPerPage: 5, totalRow: this.state.detail.rowCount }} />
            </div>
        );
    }

    render() {
        return (
            <CModal scrollable visible={this.props.visible} size="xl" backdrop="static"
                onClose={() => {
                    this._closeForm();
                }}
            >
                <CModalHeader>
                    Inventory Transfer
                </CModalHeader>
                <CModalBody>
                    {this._buildHeader()}
                    {this._buildGridDetail()}
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