import { cilMenu, cilExitToApp, cilFile, cilPlus, cilSave, cilXCircle } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
    CModal, CModalBody, CModalHeader,
    CRow, CCol,
    CFormInput,
    CButton,
    CHeaderDivider,
    CInputGroup
} from "@coreui/react";
import React from "react";
import AzecLOV from "azec_util/AzecLOV";
import AzecGrid from "azec_util/AzecGrid";

export default class FormInput extends React.Component {

    constructor(props) {
        super(props);

        this.allowInsert = this.props.permission.insert;
        this.allowEdit = this.props.permission.insert || this.props.permission.update;

        this.state = {
            visible: false,
            data: {

            },
            detail: {
                listData: [],
                rowCount: 0,
                requery: false
            }
        };
        this.refGridDetail = React.createRef();
        this.refLovDistrict = React.createRef();
    }

    static getDerivedStateFromProps(props, state) {
        if (props.visible && !state.visible) {
            state.visible = props.visible;

            state.data = {
                code: props.data == undefined ? undefined : props.data.code,
                desc: props.data == undefined ? undefined : props.data.desc,
            };
            if (props.data != undefined) {
                state.detail.requery = true;
            } else {
                state.detail.listData = [];
                state.detail.rowCount = 0;
            }
        }
        return state;
    }

    _requeryDetail() {
        let listData = [];
        for (var i = 0; i < 2; i++) {
            listData.push({
                districtCode: "DIS00" + i,
                districtName: "District " + i,
            });
        }
        this.setState({
            detail: {
                listData: listData,
                rowCount: 0
            }
        });
    }

    _buildGridDetail() {
        return (
            <div className="mt-2">
                <AzecGrid
                    ref={this.refGridDetail}
                    header={{
                        columnWidth: [40, 40, 150, -1],
                        columns: [
                            <CButton variant="outline" size="sm"
                                onClick={() => {
                                    this._showLovDistrict();
                                }}>
                                <CIcon size="sm" icon={cilPlus} />
                            </CButton>,
                            "No", "District Code", "District Name"
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
                                (index + 1), item.districtCode, item.districtName];
                        }
                    }
                    onRowSelected={(index) => {

                    }}
                    listModel={this.state.detail.listData}
                    paging={{ rowPerPage: 5, totalRow: this.state.detail.rowCount }} />
            </div>
        );
    }
    _showLovDistrict() {
        this.refLovDistrict.current.initLov();
    }

    _buildDataLovDistrict(page, keyword) {
        let listData = [];
        for (var i = 1; i <= 23; i++) {
            listData.push({
                code: "DIS000" + i,
                name: "Jakarta Kota " + i,
                province: "DKI Jakarta",
            });
        }
        return { list: listData, rowCount: 0 };
    }

    _buildLovDistrict() {
        return (
            <AzecLOV ref={this.refLovDistrict}
                title="List of District"
                onClose={() => { }}
                onSubmit=
                {(item, index) => {
                    let detail = this.state.detail;
                    detail.listData.push({
                        districtCode: item.code,
                        districtName: item.name,
                    });
                    this.setState({
                        detail: detail
                    });
                }}
                onQuery=
                {(page, keyword) => {
                    return this._buildDataLovDistrict(page, keyword);
                }}
                grid=
                {{
                    header: {
                        title: ["No", "Code", "District", "Province"],
                        width: [45, 100, -1, -1],
                    },
                    rowDisplay: function (item, index, number) {
                        return [number, item.code, item.name, item.province];
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

    render() {
        if (this.state.detail.requery) {
            this.state.detail.requery = false;

            this._requeryDetail();
        }
        return (
            <CModal visible={this.props.visible} size="lg" backdrop="static"
                onClose={() => {
                    this._closeForm();
                }}
            >
                {this._buildLovDistrict()}
                <CModalHeader>
                    Mapping Area
                </CModalHeader>
                <CModalBody>
                    <CRow>
                        <CCol xs={3}>Area Code</CCol>
                        <CCol>
                            <CFormInput
                                size="sm"
                                type="text"
                                placeholder="Enter Area code"
                                value={this.state.data.code == undefined ? "" : this.state.data.code}
                                onChange={(evt) => {
                                    let data = this.state.data;
                                    data.code = evt.target.value;
                                    this.setState({
                                        data: data
                                    });
                                }}
                            />
                        </CCol>
                    </CRow>
                    <CRow className="mt-2">
                        <CCol xs={3}>Area Description</CCol>
                        <CCol>
                            <CFormInput
                                size="sm"
                                type="text"
                                placeholder="Enter Area description"
                                value={this.state.data.desc == undefined ? "" : this.state.data.desc}
                                onChange={(evt) => {
                                    let data = this.state.data;
                                    data.desc = evt.target.value;
                                    this.setState({
                                        data: data
                                    });
                                }}
                            />
                        </CCol>
                    </CRow>
                    {this._buildGridDetail()}
                    <CHeaderDivider />
                    <CRow className="mt-2">
                        <CCol>
                            <CButton variant="outline" disabled={!this.allowInsert}><CIcon icon={cilFile} /> Create New</CButton>
                        </CCol>
                        <CCol style={{ textAlign: "right" }}>
                            <CButton className="ms-2" disabled={!this.allowEdit}><CIcon icon={cilSave} /> Save</CButton>
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