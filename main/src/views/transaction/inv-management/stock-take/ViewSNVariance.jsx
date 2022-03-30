import AzecGrid from "azec_util/AzecGrid";
import {
    CModal, CModalBody, CModalHeader,
    CHeaderDivider,
} from "@coreui/react";
import React from "react";

export default class ViewSNVariance extends React.Component {

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
                system: (2 + i),
                captured: (4 + i)
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
        let style = { textAlign: "right" };
        return (
            <AzecGrid ref={this.refGrid}
                header={{
                    columnWidth: [40, -1, -1],
                    columns: ["No", <div style={style}>System</div>, <div style={style}>Captured</div>]
                }}
                renderRow={
                    (item, index) => {
                        return [(index + 1), <div style={style}>{item.system}</div>, <div style={style}>{item.captured}</div>];
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
            <CModal scrollable visible={this.props.visible} size="md" backdrop="static"
                onClose={() => {
                    this._closeForm();
                }}
            >
                <CModalHeader>
                    View SN Variance
                </CModalHeader>
                <CModalBody>
                    {this._buildGrid()}
                    <CHeaderDivider />

                </CModalBody>
            </CModal>
        );
    }

}