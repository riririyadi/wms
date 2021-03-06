import React from 'react'

export const menuCollections = {
    //DASHBOARD
    dashboard: {
        to: '/dashboard',
        code: "dashboard"
    },
    masterslatime: {
        to: '/dashboard/sla-time/master-sla-time',
        code: "masterslatime"
    },
    monitoringproccesssla: {
        to: '/dashboard/sla-time/monitoring-proccess-sla',
        code: "monitoringproccesssla"
    },
    //MASTER DATA
    mastersaleschannel: {
        to: '/master/sales-channel',
        code: "mastersaleschannel"
    },
    mastertenant: {
        to: '/master/tenant',
        code: "mastertenant"
    },
    mastervendor: {
        to: "/master/vendor",
        code: "mastervendor"
    },
    masterbu: {
        to: "/master/business-unit",
        code: "masterbu",
        style: {fontSize: "15px"},
    },
    masterlocation: {
        to: "/master/location-type",
        code: "masterlocation"
    },
    masterwarehouse: {
        to: "/master/warehouse",
        code: "masterwarehouse"
    },
    masterbrand: {
        to: "/master/brand",
        code: "masterbrand"
    },
    masterdivision:  {
        to: "/master/division",
        code: "masterdivision"
    },
    mastertax: {
        to: "/master/tax",
        code: "mastertax"
    },
    masteritemgroup: {
        to: "/master/item-group",
        code: "masteritemgroup"
    },
    masteritem: {
        to: "/master/item",
        code: "masteritem"
    },
    itemtenant: {
        to: "/master/item-tenant",
        code: "itemtenant"
    },
    masterprovince: {
        to: "/master/province",
        code: "masterprovince"
    },
    masterdistrict: {
        to: "/master/district",
        code: "masterdistrict"
    },
    mastersubdistrict: {
        to: "/master/subdistrict",
        code: "mastersubdistrict"
    },
    mastervillage: {
        to: "/master/village",
        code: "mastervillage"
    },
    masteraddress: {
        to: "/master/address",
        code: "masteraddress"
    },
    mappingarea: {
        to: "/master/mapping-area",
        code: "mappingarea"
    },
    masteruser: {
        to: "/master/user",
        code: "masteruser"
    },
    usertenant: {
        to: "/user/tenant",
        code: "usertenant"
    },
    mappinguserrole: {
        to: "/master/user-role",
        code: "mappinguserrole",
        style: {fontSize: "12px"},
    },
    masterrole: {
        to: "/master/role",
        code: "masterrole"
    },
    settingreorderpoint: {
        to: "/master/setting-reorder-point",
        code: "settingreorderpoint"
    },
    //REPORT
    consolidatereport: {
        to: "/report/consolidate",
        code: "consolidatereport"
    },
    reportprintlistoutbound: {
        to: "/report/order-report/print-list-outbound",
        code: "reportprintlistoutbound"
    },
    reportmasterorderview: {
        to: "/report/order-report/master-order-view",
        code: "reportmasterorderview"
    },
    reportorder: {
        to: "/report/order-report/order",
        code: "reportorder"
    },
    reportreservedorder: {
        to: "/report/order-report/reserved-order",
        code: "reportreservedorder"
    },
    reportallstock: {
        to: "/report/stock-report/all-stock",
        code: "reportallstock"
    },
    reportstocksummary: {
        to: "/report/stock-report/stock-summary",
        code: "reportstocksummary"
    },
    dailystockreport: {
        to: "/report/stock-report/daily-stock",
        code: "dailystockreport"
    },
    displayitembywarehouse: {
        to: "/report/stock-report/display-item-by-warehouse",
        code: "displayitembywarehouse"
    },
    availstockmonitoring: {
        to: "/report/stock-report/availablity-monitoring",
        code: "availstockmonitoring"
    },
    movementstock: {
        to: "/report/stock-report/movement-stock",
        code: "movementstock"
    },
    seriallog: {
        to: "/report/stock-report/serial-log",
        code: "seriallog"
    },
    //TRANSACTION WMS
    listorder: {
        to: "/transaction/wms/list-order",
        code: "listorder"
    },
    pickinglist: {
        to: "/transaction/wms/picking-list",
        code: "pickinglist"
    },
    pickingconfirm: {
        to: "/transaction/wms/picking-confirm",
        code: "pickingconfirm"
    },
    gettrackingnumber: {
        to: "/transaction/wms/get-tracking-number",
        code: "gettrackingnumber"
    },
    packinglist: {
        to: "/transaction/wms/packing-list",
        code: "packinglist"
    },
    preoutbound: {
        to: "/transaction/wms/pre-outbound",
        code: "preoutbound"
    },
    outbound: {
        to: "/transaction/wms/outbound",
        code: "outbound"
    },
    manualupdateshipping: {
        to: "/transaction/wms/manual-update-shipping",
        code: "manualupdateshipping",
        style: {fontSize: "15px"}
    },
    orderreturn: {
        to: "/transaction/wms/order-return",
        code: "orderreturn"
    },
    //INVENTORY MANAGEMENT
    inventorytransfer: {
        to: "/transaction/inv/inventory-transfer",
        code: "inventorytransfer"
    },
    stockreceive: {
        to: "/transaction/inv/stock-receive",
        code: "stockreceive"
    },
    stockoutbound: {
        to: "/transaction/inv/stocko-utbound",
        code: "stockoutbound"
    },
    bufferstock: {
        to: "/transaction/inv/buffer-stock",
        code: "bufferstock"
    },
    stocktake: {
        to: "/transaction/inv/stock-take",
        code: "stocktake"
    },
    stockbundling: {
        to: "/transaction/inv/stock-bundling",
        code: "stockbundling"
    },
};