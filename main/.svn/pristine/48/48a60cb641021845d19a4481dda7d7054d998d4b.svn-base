import { cilBan, cilExitToApp, cilFile, cilSave } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
    CModal, CModalBody, CModalHeader,
    CRow, CCol,
    CFormInput,
    CButton,
    CHeaderDivider
} from "@coreui/react";
import React from "react";
import AzecGrid from "azec_util/AzecGrid";

export default class FormInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            data: {
                
            },
            gridData: {
                listData: [],
                rowCount: 0
            },
        };
    }

    static getDerivedStateFromProps(props, state) {
        if(props.visible && !state.visible) {
            state.visible = props.visible;
            
            state.data = {
                warehouseCode: props.data == undefined ? undefined : props.data.warehouseCode,
                itemCode: props.data == undefined ? undefined : props.data.itemCode,
                qty: props.data == undefined ? undefined : props.data.qty,
            };
        }
        return state;
    }

    componentDidMount() {
        this._requery();
    }

    _requery() {
        let listData = [];
        for (var i = 0; i < 32; i++) {
            listData.push({
                processName: "Prc" + i,
                slaTime: i + " minute",
                startDate: "12-03-2022",
                endDate: "23-03-2022",
                totalDate: i + " days",
                successRate: "100%",
            });
        }
        this.setState({
            gridData: {
                listData: listData,
                rowCount: 0
            }
        });
    }

    _buildGrid() {
        return (
            <AzecGrid ref={this.refGrid}
                header={{
                    columnWidth: [40, 100, 100, 100, 100, 100, 100],
                    columns: ["No", "Process Name", "SLA Time (Minutes)", "Start Date", "End Date", "Total Date", "Success Rate"]
                }}
                renderRow={
                    (item, index) => {
                        return [(index + 1), item.processName, item.slaTime, item.startDate, item.endDate, item.totalDate, item.successRate];
                    }
                }
                onRowSelected={(index) => {

                }}
                onDoubleClick={(index) => {
                    this._openSelected(index);
                }}
                listModel={this.state.gridData.listData}
                paging={{ rowPerPage: 5, totalRow: this.state.gridData.rowCount }}
            />
        );
    }

    _closeForm() {
        this.setState({
            visible: false
        });
        this.props.onClose();
    }

    render() {
        return (
            <CModal visible={this.props.visible} size="lg" backdrop="static"
                onClose={() => {
                    this._closeForm();
                }}
            >
                <CModalHeader>
                    Monitoring Process SLA
                </CModalHeader>
                <CModalBody>
                    <CRow>
                        <CCol>
                            {this._buildGrid()}
                        </CCol>
                    </CRow>
                </CModalBody>
            </CModal>
        );
    }
}