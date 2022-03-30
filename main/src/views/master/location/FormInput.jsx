import React from "react";
import { cilExitToApp, cilFile, cilPlus, cilSave } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
    CModal, CModalBody, CModalHeader,
    CRow, CCol,
    CFormInput,
    CButton,
    CHeaderDivider,
} from "@coreui/react";
import AzecLOV from "azec_util/AzecLOV";

export default class FormInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            data: {

            },
            inactive: [
                { code: "", name: "-- Select Inactive --" },
                { code: "0", name: "True" },
                { code: "1", name: "False" },
            ],
            detail: {
                listData: [],
                rowCount: 0
            },
            selectedDivisionName: null
        };
        this.refGridDetail = React.createRef();
        this.refLovDivisionName = React.createRef();
    }

    static getDerivedStateFromProps(props, state) {
        if (props.visible && !state.visible) {
            state.visible = props.visible;

            state.data = {
                locationCode: props.data == undefined ? undefined : props.data.locationCode,
                locationDesc: props.data == undefined ? undefined : props.data.locationDesc,
            };
        }
        return state;
    }

    componentDidMount() {
        this._requeryDetail();
    }

    _requeryDetail() {
        let listData = [];
        for (var i = 0; i < 8; i++) {
            listData.push({
                locationCode: "LC00" + i,
                locationName: "Location " + i,
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

    _showLovDivisionName() {
        this.refLovDivisionName.current.initLov();
      }

    _buildDataLovDivisionName(page, keyword) {
        let listData = [];
        for (var i = 1; i <= 8; i++) {
            listData.push({ code: "DivisionName" + i, name: "DivisionName " + i});
        }
        return { list: listData, rowCount: 0 };
    }

    _buildLovDivisionName() {
        return (
            <AzecLOV ref={this.refLovDivisionName}
                title="List of DivisionName"
                onClose={() => { }}
                onSubmit=
                {(item, index) => {
                    this.setState({ selectedDivisionName: item });
                }}
                onQuery=
                {(page, keyword) => {
                    return this._buildDataLovDivisionName(page, keyword);
                }}
                grid=
                {{
                    header: {
                        title: ["No", "DivisionName Code", "DivisionName Name"],
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
                <CModalHeader>
                    Location Type
                </CModalHeader>
                <CModalBody>
                    {this._buildLovDivisionName()}
                    <CRow className="mt-2">
                        <CCol xs={4} style={{ fontSize: "14px" }}>Location Type Code</CCol>
                        <CCol>
                        <CFormInput
                            size="sm"
                            type="text"
                            value={this.state.data.locationCode == undefined ? "" : this.state.data.locationCode}
                        />
                        </CCol>
                    </CRow>
                    <CRow className="mt-2">
                        <CCol xs={4} style={{ fontSize: "14px" }}>Location Type Description</CCol>
                        <CCol>
                        <CFormInput
                            size="sm"
                            type="text"
                            value={this.state.data.locationDesc == undefined ? "" : this.state.data.locationDesc}
                        />
                        </CCol>
                    </CRow>
                    <CHeaderDivider />
                    <CRow className="mt-2">
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