import React from "react";
import {
    CRow,
    CCol,
    CCard,
    CCardHeader,
    CCardBody,
    CInputGroup,
    CFormInput,
    CButton
} from "@coreui/react"
import AzecLOV from "azec_util/AzecLOV";
import AzecGrid from "azec_util/AzecGrid";
import CIcon from "@coreui/icons-react";
import { cilMenu, cilPlus } from "@coreui/icons";

export default class MappingUser extends React.Component {
    constructor(props) {
        super(props);

        this.buVisible = this.props.role.code == 'R03' || this.props.role.code == 'R04';
        this.allowInsert = this.props.permission.insert;
        this.allowEdit = this.props.permission.insert || this.props.permission.update;

        this.state = {
            gridDataBU: {
                listData: [],
                rowCount: 0
            },
            gridDataResp: {
                listData: [],
                rowCount: 0
            },
            selectedUserName: null
        };

        this.refGridBU = React.createRef();
        this.refGridResponsibility = React.createRef();
        this.refLovUserName = React.createRef();
    }

    _requeryBU(index) {
        this.refGridBU.current.initGrid();

        let listDataBU = [];
        for (var i = 1; i <= 14; i++) {
            listDataBU.push({
                buName: "AEON BEKASI " + i + " Resp " + index
            });
        }
        this.setState({
            gridDataBU: {
                listData: listDataBU,
                rowCount: 0
            }
        })
    }

    _requeryResp() {
        this.refGridResponsibility.current.initGrid();

        let listDataResp = [];
        for (var i = 1; i <= 14; i++) {
            listDataResp.push({
                responsibilityName: "Administrator" + i
            });
        }
        this.setState({
            gridDataResp: {
                listData: listDataResp,
                rowCount: 0
            }
        });
    }

    _showLovUserName() {
        this.refLovUserName.current.initLov();
    }

    _buildDataLovUserName(page, keyword) {
        let listData = [];
        for (var i = 1; i <= 8; i++) {
            listData.push({ userName: "customer" + i, employeeNumber: "20220471" + i, divisionName: "Cashier" + i });
        }
        return { list: listData, rowCount: 0 };
    }

    _buildLovUserName() {
        return (
            <AzecLOV ref={this.refLovUserName}
                title="List of User Name"
                onClose={() => { }}
                onSubmit=
                {(item, index) => {
                    this.setState({ selectedUserName: item });
                    this._requeryResp();
                }}
                onQuery=
                {(page, keyword) => {
                    return this._buildDataLovUserName(page, keyword);
                }}
                grid=
                {{
                    header: {
                        title: ["No", "User Name", "Employee Number", "Division Name"],
                        width: [45, 180, 100, 150],
                    },
                    rowDisplay: function (item, index, number) {
                        return [number, item.userName, item.employeeNumber, item.divisionName];
                    },
                }}>
            </AzecLOV>
        );
    }

    _buildUserToResponsibilityGrid() {
        return (
            <AzecGrid ref={this.refGridResponsibility}
                multiSelect={true}
                header={{
                    columnWidth: [40, 40, 250],
                    columns: [<CButton disabled={!this.allowInsert} variant="outline" size="sm"><CIcon size="sm" icon={cilPlus} /></CButton>, "No", "Responsibility"]
                }}
                renderRow={
                    (item, index) => {
                        return ["", (index + 1), item.responsibilityName];
                    }
                }
                onRowSelected={(index) => {
                    this._requeryBU(index);
                }}
                listModel={this.state.gridDataResp.listData}
                paging={{ rowPerPage: 5, totalRow: this.state.gridDataResp.rowCount }}
            />
        );
    }

    _buildUserToBUGrid() {
        let comp = <div></div>;
        if (this.buVisible) {
            comp = <AzecGrid ref={this.refGridBU}
                multiSelect={true}
                header={{
                    columnWidth: [40, 40, 250],
                    columns: [<CButton disabled={!this.allowInsert} variant="outline" size="sm"><CIcon size="sm" icon={cilPlus} /></CButton>, "No", "BU"]
                }}
                renderRow={
                    (item, index) => {
                        return ["", (index + 1), item.buName];
                    }
                }
                onRowSelected={(index) => {

                }}
                listModel={this.state.gridDataBU.listData}
                paging={{ rowPerPage: 5, totalRow: this.state.gridDataBU.rowCount }}
            />;
            return (
                <CCol>
                    <CCard>
                        <CCardHeader>
                            <strong>User to Business Unit</strong>
                        </CCardHeader>
                        <CCardBody>
                            {comp}
                        </CCardBody>
                    </CCard>
                </CCol>
            );
        } else {
            return comp;
        }
    }

    render() {
        return (
            <div>
                {this._buildLovUserName()}
                <CRow className="mb-2">
                    <CCol>
                        <CCard>
                            <CCardHeader>
                                <strong>Mapping User to Responsibility BU</strong>
                            </CCardHeader>
                            <CCardBody>
                                <CRow>
                                    <CCol xs={3}>User Name</CCol>
                                    <CCol>
                                        <CInputGroup size="sm">
                                            <CFormInput
                                                size="sm"
                                                type="text"
                                                value={(this.state.selectedUserName == null ? "" : this.state.selectedUserName.userName)}
                                            />
                                            <CButton
                                                onClick={() => {
                                                    this._showLovUserName();
                                                }}><CIcon icon={cilMenu} /></CButton>
                                        </CInputGroup>
                                    </CCol>
                                </CRow>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol>
                        <CCard>
                            <CCardHeader>
                                <strong>User to Responsibility</strong>
                            </CCardHeader>
                            <CCardBody>
                                {this._buildUserToResponsibilityGrid()}
                            </CCardBody>
                        </CCard>
                    </CCol>
                    {this._buildUserToBUGrid()}
                </CRow>
            </div>
        );
    }
}
