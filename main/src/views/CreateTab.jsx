import React from "react";
import AzecTabMenu from "azec_util/AzecTabMenu";
import Dashboard from '../views/Dashboard'
import ListOrder from "./transaction/wms/ListOrder";
import PickingConfirm from "./transaction/wms/picking-confirm/PickingConfirm";
import GetTrackingNumber from "./transaction/wms/GetTrackingNumber";
import PackingList from "./transaction/wms/PackingList";
import PickingList from "./transaction/wms/picking-list/PickingList";
import PickingListDetail from "./transaction/wms/picking-list/PickingListDetail";
import Preoutbound from "./transaction/wms/Preoutbound";
import Outbound from "./transaction/wms/Outbound";
import ManualUpdateShipping from "./transaction/wms/manual-update-shipping/ManualUpdateShipping";
import OrderReturn from "./transaction/wms/order-return/OrderReturn";
import Order from "./report/Order";
import ReservedOrder from "./report/ReservedOrder";
import ReportAllStock from "./report/ReportAllStock";
import ReportStockSummary from "./report/ReportStockSummary";
import MasterBrand from "./master/brand/MasterBrand";
import MasterItem from "./master/item/MasterItem";
import MasterItemGroup from "./master/item-group/MasterItemGroup";
import MasterBusinessUnit from "./master/business-unit/MasterBusinessUnit";
import MasterWarehouse from "./master/warehouse/MasterWarehouse";
import MasterDistrict from "./master/district/MasterDistrict";
import MasterAddress from "./master/address/MasterAddress";
import MappingArea from "./master/mapping-area/MappingArea";
import MasterProvince from "./master/province/MasterProvince";
import MasterSalesChannel from "./master/sales-channel/MasterSalesChannel";
import MasterSubDistrict from "./master/sub-district/MasterSubDistrict";
import MasterTenant from "./master/tenant/MasterTenant";
import MasterVendor from "./master/vendor/MasterVendor";
import MasterVillage from "./master/village/MasterVillage";
import MasterTax from "./master/tax/MasterTax";
import MasterUser from "./master/user/user/MasterUser";
import MappingUser from "./master/user/mapping-user/MappingUser";
import ListOutbound from "./report/ListOutbound";
import Masterlocation from "./master/location/MasterLocation";
import MasterDivision from "./master/division/MasterDivision";
import OrderView from "./report/OrderView";
import InventoryTransfer from "./transaction/inv-management/inv-transfer/InventoryTransfer";
import StockReceive from "./transaction/inv-management/stock-receive/InventoryTransfer";
import MovementStock from "./transaction/inv-management/movement-stock/MovementStock";
import AvailStockMonitoring from "./transaction/inv-management/avail-stock-monitoring/AvailStockMonitoring";
import StockTake from "./transaction/inv-management/stock-take/StockTake";
import SerialLog from "./transaction/inv-management/SerialLog";
import BufferStock from "./transaction/inv-management/buffer-stock/BufferStock";
import DailyStockReport from "./transaction/inv-management/DailyStockReport";
import DisplayItemByWarehouse from "./transaction/inv-management/DisplayItemByWarehouse";
import MasterSLATime from "./dashboard/sla-time/master-sla/MasterSLATime";
import MonitoringProcessSLA from "./dashboard/sla-time/monitoring-process-sla/MonitoringProcessSLA";
import MappingUserTenant from "./master/user/mapping-user-tenant/MappingUserTenant";
import MappingItemTenant from "./master/item/mapping-item-tenant/MappingItemTenant";
import MasterRole from "./master/role/role/MasterRole";
import SettingReorderPoint from "./master/setting-reorder-point/SettingReorderPoint";

export default class CreateTab extends React.Component {
    menus = {
        dashboard: Dashboard,
        listorder: ListOrder,
        pickingconfirm: PickingConfirm,
        gettrackingnumber: GetTrackingNumber,
        packinglist: PackingList,
        pickinglist: PickingList,
        pickinglistdetail: PickingListDetail,
        preoutbound: Preoutbound,
        outbound: Outbound,
        manualupdateshipping: ManualUpdateShipping,
        orderreturn: OrderReturn,
        reportorder: Order,
        reportreservedorder: ReservedOrder,
        reportallstock: ReportAllStock,
        reportstocksummary: ReportStockSummary,
        masteritem: MasterItem,
        masterbrand: MasterBrand,
        masteritemgroup: MasterItemGroup,
        masterbu: MasterBusinessUnit,
        masterdistrict: MasterDistrict,
        masteraddress: MasterAddress,
        mappingarea: MappingArea,
        masterprovince:MasterProvince,
        mastersaleschannel: MasterSalesChannel,
        mastersubdistrict: MasterSubDistrict,
        mastertenant: MasterTenant,
        mastervendor: MasterVendor,
        mastervillage: MasterVillage,
        reportprintlistoutbound: ListOutbound,
        masterlocation: Masterlocation,
        masterdivision: MasterDivision,
        mastertax: MasterTax,
        masteruser: MasterUser,
        mappinguserrole: MappingUser,
        reportmasterorderview: OrderView,
        inventorytransfer: InventoryTransfer,
        stockreceive: StockReceive,
        availstockmonitoring: AvailStockMonitoring,
        stocktake: StockTake,
        movementstock: MovementStock,
        masterwarehouse: MasterWarehouse,
        seriallog: SerialLog,
        bufferstock: BufferStock,
        dailystockreport: DailyStockReport,
        displayitembywarehouse: DisplayItemByWarehouse,
        masterslatime: MasterSLATime,
        monitoringproccesssla: MonitoringProcessSLA,
        usertenant: MappingUserTenant,
        itemtenant: MappingItemTenant,
        masterrole: MasterRole,
        settingreorderpoint: SettingReorderPoint,
    };

    constructor(props) {
        super(props);
        this.tabMenuRef = React.createRef();
        this.state = {

        };
        
        if(typeof props.setTabInstance === 'function') {
            props.setTabInstance(this);
        }
    }

    openMenu(item) {
        if(item.formProps != undefined) {
            item.formProps.tabMenu = this;
        }
        
        this.tabMenuRef.current.openMenu({
            code: item.code,
            title: item.name,
            props: item.formProps,
        });
    }

    render() {
        return (
            <AzecTabMenu ref={this.tabMenuRef}
                        menus={this.menus} />
        )
    }
}