import {
    CRow,
    CCol,
} from "@coreui/react";
import React, { Component } from "react";
import AzecButtonGroup from "azec_util/AzecButtonGroup";
import CIcon from "@coreui/icons-react";
import { cilCloudDownload, cilSync } from "@coreui/icons";

export default class ReportStockSummary extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    _preview() {

    }

    _buildToolbar() {
        let items = [
            <CIcon icon={cilSync} />,
            <CIcon icon={cilCloudDownload} />,
        ];
        let tooltips = [
            "Preview Report", "Download Report"
        ];
        return (
            <AzecButtonGroup items={items} tooltips={tooltips}
                onClick={(index) => {
                    switch (index) {
                        case 0: {

                        } break;
                        case 1: {

                        } break;
                    }
                }} />
        );
    }

    _buildReportView() {
        const iframe = '<iframe src="http://192.168.100.51:3001/assets/rpt-stock-summary.pdf" width="100%" height="400px"></iframe>';
        const data = {
            __html : iframe
        }

        return (
            <div>
                <div dangerouslySetInnerHTML={data} />
            </div>
        );
    }

    render() {
        return (
            <div>
                {this._buildToolbar()}
                <CRow>
                    <CCol>
                        {this._buildReportView()}
                    </CCol>
                </CRow>
            </div>
        );
    }

}