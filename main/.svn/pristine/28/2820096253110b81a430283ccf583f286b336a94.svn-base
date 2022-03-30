import React from "react";
import CIcon from "@coreui/icons-react";
import AzecGrid from "azec_util/AzecGrid";
import { CButton, CRow, CCol, CCard } from "@coreui/react";

export default class PickingListDetail extends React.Component {

    constructor(props) {
        super(props);
        this.allowPrint = this.props.permission.update;
        this.state = {
            gridData: {
                listData: [],
                rowCount: 0
            },
        };
        this.refGrid = React.createRef();
    }

    componentDidMount() {
        this._requery();
    }

    _requery() {
        this.refGrid.current.initGrid();

        let listData = [];
        for (var i = 1; i <= 4; i++) {
            listData.push({
                orderNumber: "ORD00001" + i,
                orderDate: "22-01-2022",
                custName: "Rian Afriyadi",
                courierCode: "RPX",
                trackingNo: "ABC00001" + i,
                orderStatus: "SHIPPED"
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
                    columnWidth: [40, 120, 150, -1, 130, 150, 120],
                    columns: ["No", "Order Number", "Order Date", "Customer Name", "Courier Code", "Tracking No", "Order Status"]
                }}
                renderRow={
                    (item, index) => {
                        return [(index + 1), item.orderNumber, item.orderDate, item.custName, item.courierCode, item.trackingNo, item.orderStatus];
                    }
                }
                onRowSelected={(index) => {
                    this._selectRow(index);
                }}
                listModel={this.state.gridData.listData}
                paging={{ rowPerPage: 5, totalRow: this.state.gridData.rowCount }}
            />
        );
    }

    render() {
        return (
            <div>
                <CRow>
                    <CCol>
                        <div className="p-2">
                            <CButton disabled={!this.allowPrint}>Picking List, Shopping List</CButton>
                            <CButton disabled={!this.allowPrint} className="ms-2">Picking List</CButton>
                        </div>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol>
                        {this._buildGrid()}
                    </CCol>
                </CRow>
            </div>
        );
    }
}