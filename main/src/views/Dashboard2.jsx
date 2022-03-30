import React from 'react'
import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormInput,
  CFormLabel,
  CButton,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
} from '@coreui/react'

import AzecLov from 'azec_util/AzecLOV'
import AzecGrid from "azec_util/AzecGrid";

export default class Dashboard  extends React.Component {
    constructor(props) {
        super(props);

        this.refLovBu = React.createRef();
        this.refGrid = React.createRef();

        this.state = {
            selectedBu: null,
            lovBuData: {
                listData: [],
                rowCount: 0
            }
        };
    }

    //ini contoh dengan query per page
    _buildDataLovBU(page, keyword) {
        let listData = [];
        for (var i = 1; i <= 5; i++) {
            listData.push({ code:"BUCODE " + i, desc: "Business Unit "+keyword+" " + i });
        }
        return {list:listData, rowCount:38};
    }

    _showLovBu() {
        this.refLovBu.current.initLov();
        buCode = document.getElementById("buCode");
        buCode.innerHTML = this.state.selectedBu == null ? "" : " " + this.state.selectedBu.desc
    }

    _loadDataGrid(page, initial) {
        if(initial) {
            this.refGrid.current.initGrid();
        }
        let listData = [];
        for (var i = 1; i <= 5; i++) {
            listData.push({ name: "Busines Unit " + i, page: page, id: i });
        }
        this.setState({
            lovBuData: {
                listData: listData,
                rowCount: 54
            }
        });
    }
    
    render() {
        return (
            <CRow>
                <CCol xs={12}>
                <CCard className="mb-4">
                <CCardHeader>
                    <strong>React Form Control</strong>
                </CCardHeader>
                <CCardBody>
                    {/* <DocsExample href="forms/form-control"> */}
                    <CForm>
                        <div className="mb-3">
                        <CFormLabel htmlFor="businessUnitName">Business Unit Name</CFormLabel>
                        <CFormInput
                            type="text"
                            id="businessUnitName"
                            placeholder="Business Unit Name"
                        />
                        </div>
                        <div className="mb-3">
                        <CFormLabel htmlFor="buCode">Business Unit Code</CFormLabel>
                        <AzecLov ref={this.refLovBu}
                            title="List of Business Unit"
                            onClose={
                                () => {
                                    
                                }
                            }
                            onSubmit={
                                (item, index) => {
                                    this.setState({selectedBu:item});
                                }
                            }
                            onQuery={
                                (page, keyword) => {
                                    return this._buildDataLovBU(page, keyword);
                                }
                            }
                            grid={
                                {
                                    header : {
                                        title : ["No", "Code", "Description"],
                                        width : [45, 100, -1]
                                    },
                                    rowDisplay : function(item, index, number) {
                                        return [number, item.code, item.desc];
                                    }
                                }
                            }
                        />
                        <div className="d-grid gap-2">
                            <CButton id="buCode" className="lov-input" color="secondary" variant="outline" onClick={()=>{this._showLovBu()}} style={{textAlign:"left"}}>{this.state.selectedBu == null ? "Business Unit Code" : " " + this.state.selectedBu.desc}</CButton>
                        </div>
                        </div>
                    </CForm>
                    <CButton onClick={() => { this._loadDataGrid(1, true); document.getElementById("resultCard").style.visibility = "visible"}}>Find Data</CButton>
                    {/* </DocsExample> */}
                </CCardBody>
                </CCard>
                </CCol>
                <CCol xs={12}>
                <CCard id="resultCard" style={{visibility: "hidden"}}>
                <CCardBody>
                    <AzecGrid ref={this.refGrid}
                        renderHeader={
                            <CTableRow>
                                <CTableHeaderCell scope="col">No</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Nama</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Page</CTableHeaderCell>
                            </CTableRow>
                        }
                        renderRow={
                            (item, index) => {
                                return [
                                    <CTableDataCell key={"kr1-"+index}>{item.id}</CTableDataCell>,
                                    <CTableDataCell key={"kr2-"+index}>{item.name}</CTableDataCell>,
                                    <CTableDataCell key={"kr3-"+index}>{item.page}</CTableDataCell>
                                ];
                            }
                        }
                        listModel={this.state.lovBuData.listData}
                        paging={{ rowPerPage: 5, totalRow: this.state.lovBuData.rowCount }}
                        onQuery={
                            (page) => {
                                this._loadDataGrid(page, false);
                            }
                        }
                    />
                </CCardBody>
            </CCard>
                </CCol>
            </CRow>
        )
    }
}