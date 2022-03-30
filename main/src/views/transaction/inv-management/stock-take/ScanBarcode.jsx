import AzecGrid from "azec_util/AzecGrid";
import {
    CModal, CModalBody, CModalHeader,
    CHeaderDivider, CFormInput, CRow, CCol,
    CInputGroup, CButton
} from "@coreui/react";
import React from "react";
import { cilChevronDoubleRight } from "@coreui/icons";
import CIcon from "@coreui/icons-react";

export default class ScanBarcode extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            gridData: {
                listData: [],
                rowCount: 0
            }
        };
        this.refGrid = React.createRef();
    }

    componentDidMount() {
        this._requery();
    }

    _requery() {
        let listData = [];
        for (var i = 0; i < 7; i++) {
            listData.push({
                barcode: "ABC0000" + i,
                itemCode: "ITM000" + i
            });
        }
        this.setState({
            gridData: {
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

    _buildGrid() {
        return (
            <AzecGrid ref={this.refGrid}
                header={{
                    columnWidth: [40, -1, -1],
                    columns: ["No", "Barcode", "Item Code"]
                }}
                renderRow={
                    (item, index) => {
                        return [(index + 1), item.barcode, item.itemCode];
                    }
                }
                onRowSelected={(index) => {

                }}
                onDoubleClick={(index) => {

                }}
                listModel={this.state.gridData.listData}
                paging={{ rowPerPage: 5, totalRow: this.state.gridData.rowCount }}
            />
        );
    }

    render() {
        return (
            <CModal scrollable visible={this.props.visible} size="lg" backdrop="static"
                onClose={() => {
                    this._closeForm();
                }}
            >
                <CModalHeader>
                    
                </CModalHeader>
                <CModalBody>
                    <CRow className="my-1">
                        <CCol xs={3} >Scan Barcode </CCol>
                        <CCol>
                            <CInputGroup>
                                <CFormInput type="text" />
                                <CButton
                                    type="button"
                                    color="primary"
                                    onClick={() => {
                                        
                                    }}
                                >
                                    <CIcon icon={cilChevronDoubleRight} />
                                </CButton>
                            </CInputGroup>
                        </CCol>
                    </CRow>
                    {this._buildGrid()}
                    <CHeaderDivider />

                </CModalBody>
            </CModal>
        );
    }

}