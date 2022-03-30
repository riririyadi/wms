import { cilMenu, cilExitToApp, cilFile, cilSave } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
    CModal, CModalBody, CModalHeader,
    CRow, CCol,
    CFormInput,
    CButton,
    CHeaderDivider,
    CInputGroup
} from "@coreui/react";
import AzecLOV from "azec_util/AzecLOV";
import AzecSelect from "azec_util/AzecSelect";
import React from "react";

export default class FormInput extends React.Component {

    itemUnits = ["Serial", "Non Serial"];
    itemTypes = ["Purchase", "Konsi Stock", "Konsi Non Stock"];

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            data: {

            },
            selectedBrand: null,
            selectedItemGroup: null,
            selectedTax: null
        };
        this.refLovBrand = React.createRef();
        this.refLovTax = React.createRef();
        this.refLovItmGroup = React.createRef();
    }

    static getDerivedStateFromProps(props, state) {
        if (props.visible && !state.visible) {
            state.visible = props.visible;

            state.data = {
                code: props.data == undefined ? undefined : props.data.code,
                desc: props.data == undefined ? undefined : props.data.desc,
                unit: props.data == undefined ? undefined : props.data.unit,
                type: props.data == undefined ? undefined : props.data.type,
            };
            if (props.data == undefined) {
                state.selectedBrand = null;
                state.selectedItemGroup = null;
                state.selectedTax = null;
            } else {
                state.selectedBrand = {
                    name: props.data.brand
                }
                state.selectedItemGroup = {
                    name: props.data.group
                }
                state.selectedTax = {
                    code: props.data.taxCode
                }
            }
        }
        return state;
    }


    _closeForm() {
        this.setState({
            visible: false
        });
        this.props.onClose();
    }

    _showLovBrand() {
        this.refLovBrand.current.initLov();
    }

    _buildDataLovBrand(page, keyword) {
        let listData = [];
        for (var i = 1; i <= 23; i++) {
            listData.push({ code: "BRD00" + i, name: "Brand " + i });
        }
        return { list: listData, rowCount: 0 };
    }

    _buildLovBrand() {
        return (
            <AzecLOV ref={this.refLovBrand}
                title="List of Brand"
                onClose={() => { }}
                onSubmit=
                {(item, index) => {
                    this.setState({ selectedBrand: item });
                }}
                onQuery=
                {(page, keyword) => {
                    return this._buildDataLovBrand(page, keyword);
                }}
                grid=
                {{
                    header: {
                        title: ["No", "Code", "Brand Name"],
                        width: [45, 100, -1],
                    },
                    rowDisplay: function (item, index, number) {
                        return [number, item.code, item.name];
                    },
                }}>
            </AzecLOV>
        );
    }

    _showLovTax() {
        this.refLovTax.current.initLov();
    }

    _buildDataLovTax(page, keyword) {
        let listData = [];
        for (var i = 1; i <= 7; i++) {
            listData.push(
                {
                    code: "T00" + i,
                    desc: "TAX No " + i,
                    value: (10 + i)
                }
            );
        }
        return { list: listData, rowCount: 0 };
    }

    _buildLovTax() {
        return (
            <AzecLOV ref={this.refLovTax}
                title="List of Tax"
                onClose={() => { }}
                onSubmit=
                {(item, index) => {
                    this.setState({ selectedTax: item });
                }}
                onQuery=
                {(page, keyword) => {
                    return this._buildDataLovTax(page, keyword);
                }}
                grid=
                {{
                    header: {
                        title: ["No", "Code", "Description", <div style={{ textAlign: "right" }}>Tax Value (%)</div>],
                        width: [45, 100, -1, 110],
                    },
                    rowDisplay: function (item, index, number) {
                        return [number, item.code, item.desc, <div style={{ textAlign: "right" }}>{item.value}</div>];
                    },
                }}>
            </AzecLOV>
        );
    }

    _showLovItemGroup() {
        this.refLovItmGroup.current.initLov();
    }

    _buildDataLovItemGroup(page, keyword) {
        let listData = [];
        for (var i = 1; i <= 14; i++) {
            listData.push({ code: "ITG000" + i, name: "Item Group " + i });
        }
        return { list: listData, rowCount: 0 };
    }

    _buildLovItemGroup() {
        return (
            <AzecLOV ref={this.refLovItmGroup}
                title="List of Item Group"
                onClose={() => { }}
                onSubmit=
                {(item, index) => {
                    this.setState({ selectedItemGroup: item });
                }}
                onQuery=
                {(page, keyword) => {
                    return this._buildDataLovItemGroup(page, keyword);
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

    render() {
        return (
            <CModal visible={this.props.visible} size="lg" backdrop="static"
                onClose={() => {
                    this._closeForm();
                }}
            >
                {this._buildLovBrand()}
                {this._buildLovTax()}
                {this._buildLovItemGroup()}
                <CModalHeader>
                    Master Item
                </CModalHeader>
                <CModalBody>
                    <CRow>
                        <CCol xs={3}>Item Code</CCol>
                        <CCol>
                            <CFormInput
                                size="sm"
                                type="text"
                                placeholder="Enter Item code"
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
                        <CCol xs={3}>Item Name</CCol>
                        <CCol>
                            <CFormInput
                                size="sm"
                                type="text"
                                placeholder="Enter Item name"
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
                    <CRow className="mt-2">
                        <CCol xs={3}>Item Unit</CCol>
                        <CCol>
                            <AzecSelect
                                listData={this.itemUnits}
                                displayPrompt={(item) => {
                                    return item;
                                }}
                                onSelected={(item, index) => {

                                }}
                                text={this.state.data == undefined ? "" : this.state.data.unit}
                            />
                        </CCol>
                    </CRow>
                    <CRow className="mt-2">
                        <CCol xs={3}>Item Type</CCol>
                        <CCol>
                            <AzecSelect
                                listData={this.itemTypes}
                                displayPrompt={(item) => {
                                    return item;
                                }}
                                onSelected={(item, index) => {

                                }}
                                text={this.state.data == undefined ? "" : this.state.data.type}
                            />
                        </CCol>
                    </CRow>
                    <CRow className="mt-2">
                        <CCol xs={3}>Item Group</CCol>
                        <CCol>
                            <CInputGroup size="sm">
                                <CFormInput type="text" placeholder="Pick item type" value={this.state.selectedItemGroup == undefined ? "<not selected>" : this.state.selectedItemGroup.name} />
                                <CButton
                                    type="button"
                                    color="primary"
                                    onClick={() => {
                                        this._showLovItemGroup();
                                    }}
                                >
                                    <CIcon icon={cilMenu} />
                                </CButton>
                            </CInputGroup>
                        </CCol>
                    </CRow>
                    <CRow className="mt-2">
                        <CCol xs={3}>Tax Code</CCol>
                        <CCol>
                            <CInputGroup size="sm">
                                <CFormInput type="text" placeholder="Pick tax code" value={this.state.selectedTax == undefined ? "<not selected>" : this.state.selectedTax.code} />
                                <CButton
                                    type="button"
                                    color="primary"
                                    onClick={() => {
                                        this._showLovTax();
                                    }}
                                >
                                    <CIcon icon={cilMenu} />
                                </CButton>
                            </CInputGroup>
                        </CCol>
                    </CRow>
                    <CRow className="mt-2">
                        <CCol xs={3}>Brand</CCol>
                        <CCol>
                            <CInputGroup size="sm">
                                <CFormInput type="text" placeholder="Pick brand" value={this.state.selectedBrand == undefined ? "<not selected>" : this.state.selectedBrand.name} />
                                <CButton
                                    type="button"
                                    color="primary"
                                    onClick={() => {
                                        this._showLovBrand();
                                    }}
                                >
                                    <CIcon icon={cilMenu} />
                                </CButton>
                            </CInputGroup>
                        </CCol>
                    </CRow>
                    <CHeaderDivider />
                    <CRow className="mt-2">
                        <CCol>
                            <CButton variant="outline"><CIcon icon={cilFile} /> Create New</CButton>
                        </CCol>
                        <CCol style={{ textAlign: "right" }}>
                            <CButton className="ms-2"><CIcon icon={cilSave} /> Save</CButton>
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