import { cilBasket, cilBuilding, cilCash, cilClock, cilDevices, cilFolder, cilGroup, cilIndustry, cilPrint, cilShareBoxed, cilSpeedometer } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CNavGroup, CNavItem } from "@coreui/react";
import { menuCollections } from "./menuCollection";

import React from 'react'

/**
 * Permission:
 * Insert: 100
 * Update: 10
 * Delete: 1
 * 
 * Contoh: Update dan Delete saja => 10 + 1 => 11
 * Contoh: Insert dan Delete saja => 100 + 1 => 101
*/

const role_system = {
    code: "R01",
    name: "System",
    menu: [
        {
            name: "Master Data",
            icon: <CIcon icon={cilFolder} customClassName="nav-icon" />,
            items: [
                {
                    form: menuCollections.mastersaleschannel,
                    name: "Master Sales Channel",
                    permission: 111
                },
                {
                    form: menuCollections.mastertenant,
                    name: "Master Tenant"
                },
                {
                    form: menuCollections.mastervendor,
                    name: "Master Vendor",
                },
                {
                    form: menuCollections.masterbu,
                    name: "Master Business Unit"
                },
                {
                    form: menuCollections.masterlocation,
                    name: "Master Location Type"
                },
                {
                    form: menuCollections.masterwarehouse,
                    name: "Master Warehouse"
                },
                {
                    form: menuCollections.masterbrand,
                    name: "Master Brand"
                },
                {
                    form: menuCollections.masterdivision,
                    name: "Master Division"
                },
                {
                    name: "Item",
                    icon: <CIcon icon={cilDevices} customClassName="nav-icon" />,
                    items: [
                        {
                            form: menuCollections.mastertax,
                            name: "Master Tax",
                            permission: 111
                        },
                        {
                            form: menuCollections.masteritemgroup,
                            name: "Master Item Group"
                        },
                        {
                            form: menuCollections.masteritem,
                            name: "Master Item"
                        },
                        {
                            form: menuCollections.itemtenant,
                            name: "Master Item to Tenant"
                        },
                    ]
                },
                {
                    name: "Address",
                    icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
                    items: [
                        {
                            form: menuCollections.masterprovince,
                            name: "Master Province",
                            permission: 111
                        },
                        {
                            form: menuCollections.masterdistrict,
                            name: "Master District / City"
                        },
                        {
                            form: menuCollections.mastersubdistrict,
                            name: "Master Sub District"
                        },
                        {
                            form: menuCollections.mastervillage,
                            name: "Master Village",
                            permission: 111,
                        },
                        {
                            form: menuCollections.masteraddress,
                            name: "Master Address"
                        },
                        {
                            form: menuCollections.mappingarea,
                            name: "Mapping Area / Cluster"
                        },
                    ]
                },
                {
                    name: "User",
                    icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
                    items: [
                        {
                            form: menuCollections.masteruser,
                            name: "Master User",
                            permission: 111
                        },
                        {
                            form: menuCollections.usertenant,
                            name: "Mapping User to Tenant"
                        },
                        {
                            form: menuCollections.mappinguserrole,
                            name: "Mapping User to Responsibility",
                            permission: 111
                        },
                    ]
                },
                {
                    form: menuCollections.masterrole,
                    name: "Master Responsibility",
                    permission: 111
                },
            ]
        }
    ]
};

const role_aggregator = {
    code: "R02",
    name: "Aggregator",
    menu: [
        {
            name: "Dashboard",
            icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
            items: [
                {
                    name: "SLA Time",
                    icon: <CIcon icon={cilClock} customClassName="nav-icon" />,
                    items: [
                        {
                            form: menuCollections.masterslatime,
                            name: "Master SLA Time"
                        },
                        {
                            form: menuCollections.monitoringproccesssla,
                            name: "Monitoring Process SLA"
                        }
                    ]
                },
            ]
        },
        {
            name: "Report",
            icon: <CIcon icon={cilPrint} customClassName="nav-icon" />,
            items: [
                {
                    form: menuCollections.consolidatereport,
                    name: "Consolidate Report"
                }
            ]
        },
        {
            name: "Master Data",
            icon: <CIcon icon={cilFolder} customClassName="nav-icon" />,
            items: [
                {
                    form: menuCollections.mastersaleschannel,
                    name: "Master Sales Channel"
                },
                {
                    form: menuCollections.mastertenant,
                    name: "Master Tenant",
                    permission: 111
                },
                {
                    form: menuCollections.mastervendor,
                    name: "Master Vendor",
                    permission: 111
                },
                {
                    form: menuCollections.masterbu,
                    name: "Master Business Unit"
                },
                {
                    form: menuCollections.masterlocation,
                    name: "Master Location Type"
                },
                {
                    form: menuCollections.masterwarehouse,
                    name: "Master Warehouse"
                },
                {
                    form: menuCollections.masterbrand,
                    name: "Master Brand",
                    permission: 111,
                },
                {
                    form: menuCollections.masterdivision,
                    name: "Master Division"
                },
                {
                    name: "Item",
                    icon: <CIcon icon={cilDevices} customClassName="nav-icon" />,
                    items: [
                        {
                            form: menuCollections.mastertax,
                            name: "Master Tax"
                        },
                        {
                            form: menuCollections.masteritemgroup,
                            name: "Master Item Group"
                        },
                        {
                            form: menuCollections.masteritem,
                            name: "Master Item"
                        },
                        {
                            form: menuCollections.itemtenant,
                            name: "Master Item to Tenant",
                            permission: 111,
                        },
                    ]
                },
                {
                    name: "Address",
                    icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
                    items: [
                        {
                            form: menuCollections.masterprovince,
                            name: "Master Province"
                        },
                        {
                            form: menuCollections.masterdistrict,
                            name: "Master District / City"
                        },
                        {
                            form: menuCollections.mastersubdistrict,
                            name: "Master Sub District"
                        },
                        {
                            form: menuCollections.mastervillage,
                            name: "Master Village"
                        },
                        {
                            form: menuCollections.masteraddress,
                            name: "Master Address"
                        },
                        {
                            form: menuCollections.mappingarea,
                            name: "Mapping Area / Cluster",
                            permission: 111,
                        },
                    ]
                },
                {
                    name: "User",
                    icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
                    items: [
                        {
                            form: menuCollections.masteruser,
                            name: "Master User",
                            permission: 111
                        },
                        {
                            form: menuCollections.usertenant,
                            name: "Mapping User to Tenant",
                            permission: 111
                        },
                        {
                            form: menuCollections.mappinguserrole,
                            name: "Mapping User to Responsibility",
                            permission: 111
                        },
                    ]
                },
                {
                    form: menuCollections.masterrole,
                    name: "Master Responsibility"
                },
            ]
        }
    ]
};

const role_tenant = {
    code: "R03",
    name: "Tenant",
    menu: [
        {
            name: "Dashboard",
            icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
            items: [
                {
                    name: "SLA Time",
                    icon: <CIcon icon={cilClock} customClassName="nav-icon" />,
                    items: [
                        {
                            form: menuCollections.masterslatime,
                            name: "Master SLA Time"
                        },
                        {
                            form: menuCollections.monitoringproccesssla,
                            name: "Monitoring Process SLA"
                        }
                    ]
                },
            ]
        },
        {
            name: "Transaction",
            icon: <CIcon icon={cilCash} customClassName="nav-icon" />,
            items: [
                {
                    name: "WMS",
                    icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
                    items: [
                        {
                            form: menuCollections.listorder,
                            name: "List Order"
                        },
                        {
                            form: menuCollections.pickinglist,
                            name: "Picking List"
                        },
                        {
                            form: menuCollections.pickingconfirm,
                            name: "Picking Confirm"
                        },
                        {
                            form: menuCollections.gettrackingnumber,
                            name: "Get Tracking Number"
                        },
                        {
                            form: menuCollections.packinglist,
                            name: "Packing List"
                        },
                        {
                            form: menuCollections.preoutbound,
                            name: "Pre Outbound"
                        },
                        {
                            form: menuCollections.outbound,
                            name: "Outbound"
                        },
                        {
                            form: menuCollections.manualupdateshipping,
                            name: "Manual Update Shipping"
                        },
                        {
                            form: menuCollections.orderreturn,
                            name: "Order Return"
                        },
                    ]
                },
                {
                    name: "Inventory Management",
                    icon: <CIcon icon={cilBasket} customClassName="nav-icon" />,
                    items: [
                        {
                            form: menuCollections.inventorytransfer,
                            name: "Stock Transfer"
                        },
                        {
                            form: menuCollections.stockreceive,
                            name: "Stock Receive / Inbound"
                        },
                        {
                            form: menuCollections.stockoutbound,
                            name: "Stock Outbound"
                        },
                        {
                            form: menuCollections.bufferstock,
                            name: "Buffer Stock"
                        },
                        {
                            form: menuCollections.stocktake,
                            name: "Stock Take"
                        },
                        {
                            form: menuCollections.stockbundling,
                            name: "Bundling / Unbundling"
                        },
                    ]
                }
            ]
        },
        {
            name: "Report",
            icon: <CIcon icon={cilPrint} customClassName="nav-icon" />,
            items: [
                {
                    name: "Order Report",
                    icon: <CIcon icon={cilShareBoxed} customClassName="nav-icon" />,
                    items: [
                        {
                            form: menuCollections.reportprintlistoutbound,
                            name: "Report Print List Outbound"
                        },
                        {
                            form: menuCollections.reportmasterorderview,
                            name: "Report Master Order View"
                        },
                        {
                            form: menuCollections.reportorder,
                            name: "Report Order"
                        },
                        {
                            form: menuCollections.reportreservedorder,
                            name: "Report Reversed Order"
                        },
                    ]
                },
                {
                    name: "Stock Report",
                    icon: <CIcon icon={cilIndustry} customClassName="nav-icon" />,
                    items: [
                        {
                            form: menuCollections.reportallstock,
                            name: "Report All Stock"
                        },
                        {
                            form: menuCollections.reportstocksummary,
                            name: "Stock Report Summary"
                        },
                        {
                            form: menuCollections.dailystockreport,
                            name: "Daily Stock Report"
                        },
                        {
                            form: menuCollections.displayitembywarehouse,
                            name: "Display Item by Warehouse"
                        },
                        {
                            form: menuCollections.availstockmonitoring,
                            name: "Stock Monitoring"
                        },
                        {
                            form: menuCollections.movementstock,
                            name: "Movement Stock"
                        },
                        {
                            form: menuCollections.seriallog,
                            name: "Serial Log"
                        },
                    ]
                },
                {
                    form: menuCollections.consolidatereport,
                    name: "Consolidate Report"
                },
            ]
        },
        {
            name: "Master Data",
            icon: <CIcon icon={cilFolder} customClassName="nav-icon" />,
            items: [
                {
                    form: menuCollections.mastersaleschannel,
                    name: "Master Sales Channel"
                },
                {
                    form: menuCollections.mastertenant,
                    name: "Master Tenant"
                },
                {
                    form: menuCollections.mastervendor,
                    name: "Master Vendor"
                },
                {
                    form: menuCollections.masterbu,
                    name: "Master Business Unit"
                },
                {
                    form: menuCollections.masterlocation,
                    name: "Master Location Type"
                },
                {
                    form: menuCollections.masterwarehouse,
                    name: "Master Warehouse"
                },
                {
                    form: menuCollections.masterbrand,
                    name: "Master Brand"
                },
                {
                    form: menuCollections.masterdivision,
                    name: "Master Division"
                },
                {
                    name: "Item",
                    icon: <CIcon icon={cilDevices} customClassName="nav-icon" />,
                    items: [
                        {
                            form: menuCollections.mastertax,
                            name: "Master Tax"
                        },
                        {
                            form: menuCollections.masteritemgroup,
                            name: "Master Item Group"
                        },
                        {
                            form: menuCollections.masteritem,
                            name: "Master Item"
                        },
                        {
                            form: menuCollections.itemtenant,
                            name: "Master Item to Tenant"
                        },
                    ]
                },
                {
                    name: "Address",
                    icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
                    items: [
                        {
                            form: menuCollections.masterprovince,
                            name: "Master Province"
                        },
                        {
                            form: menuCollections.masterdistrict,
                            name: "Master District / City"
                        },
                        {
                            form: menuCollections.mastersubdistrict,
                            name: "Master Sub District"
                        },
                        {
                            form: menuCollections.mastervillage,
                            name: "Master Village"
                        },
                        {
                            form: menuCollections.masteraddress,
                            name: "Master Address",
                            permission: 111,
                        },
                        {
                            form: menuCollections.mappingarea,
                            name: "Mapping Area / Cluster"
                        },
                    ]
                },
                {
                    name: "User",
                    icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
                    items: [
                        {
                            form: menuCollections.masteruser,
                            name: "Master User",
                            permission: 111
                        },
                        {
                            form: menuCollections.usertenant,
                            name: "Mapping User to Tenant"
                        },
                        {
                            form: menuCollections.mappinguserrole,
                            name: "Mapping User to Responsibility",
                            permission: 111
                        },
                    ]
                },
                {
                    form: menuCollections.masterrole,
                    name: "Master Responsibility"
                },
                {
                    form: menuCollections.settingreorderpoint,
                    name: "Setting Reorder Point"
                },
            ]
        }
    ]
};

const role_application = {
    code: "R04",
    name: "Application",
    menu: [
        {
            name: "Dashboard",
            icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
            items: [
                {
                    name: "SLA Time",
                    icon: <CIcon icon={cilClock} customClassName="nav-icon" />,
                    items: [
                        {
                            form: menuCollections.masterslatime,
                            name: "Master SLA Time"
                        },
                        {
                            form: menuCollections.monitoringproccesssla,
                            name: "Monitoring Process SLA"
                        }
                    ]
                },
            ]
        },
        {
            name: "Transaction",
            icon: <CIcon icon={cilCash} customClassName="nav-icon" />,
            items: [
                {
                    name: "WMS",
                    icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
                    items: [
                        {
                            form: menuCollections.listorder,
                            name: "List Order"
                        },
                        {
                            form: menuCollections.pickinglist,
                            name: "Picking List"
                        },
                        {
                            form: menuCollections.pickingconfirm,
                            name: "Picking Confirm"
                        },
                        {
                            form: menuCollections.gettrackingnumber,
                            name: "Get Tracking Number"
                        },
                        {
                            form: menuCollections.packinglist,
                            name: "Packing List"
                        },
                        {
                            form: menuCollections.preoutbound,
                            name: "Pre Outbound"
                        },
                        {
                            form: menuCollections.outbound,
                            name: "Outbound"
                        },
                        {
                            form: menuCollections.manualupdateshipping,
                            name: "Manual Update Shipping"
                        },
                        {
                            form: menuCollections.orderreturn,
                            name: "Order Return"
                        },
                    ]
                },
                {
                    name: "Inventory Management",
                    icon: <CIcon icon={cilBasket} customClassName="nav-icon" />,
                    items: [
                        {
                            form: menuCollections.inventorytransfer,
                            name: "Stock Transfer"
                        },
                        {
                            form: menuCollections.stockreceive,
                            name: "Stock Receive / Inbound"
                        },
                        {
                            form: menuCollections.stockoutbound,
                            name: "Stock Outbound"
                        },
                        {
                            form: menuCollections.bufferstock,
                            name: "Buffer Stock"
                        },
                        {
                            form: menuCollections.stocktake,
                            name: "Stock Take"
                        },
                        {
                            form: menuCollections.stockbundling,
                            name: "Bundling / Unbundling"
                        },
                    ]
                }
            ]
        },
        {
            name: "Report",
            icon: <CIcon icon={cilPrint} customClassName="nav-icon" />,
            items: [
                {
                    name: "Order Report",
                    icon: <CIcon icon={cilShareBoxed} customClassName="nav-icon" />,
                    items: [
                        {
                            form: menuCollections.reportprintlistoutbound,
                            name: "Report Print List Outbound"
                        },
                        {
                            form: menuCollections.reportmasterorderview,
                            name: "Report Master Order View"
                        },
                        {
                            form: menuCollections.reportorder,
                            name: "Report Order"
                        },
                        {
                            form: menuCollections.reportreservedorder,
                            name: "Report Reversed Order"
                        },
                    ]
                },
                {
                    name: "Stock Report",
                    icon: <CIcon icon={cilIndustry} customClassName="nav-icon" />,
                    items: [
                        {
                            form: menuCollections.reportallstock,
                            name: "Report All Stock"
                        },
                        {
                            form: menuCollections.reportstocksummary,
                            name: "Stock Report Summary"
                        },
                        {
                            form: menuCollections.dailystockreport,
                            name: "Daily Stock Report"
                        },
                        {
                            form: menuCollections.displayitembywarehouse,
                            name: "Display Item by Warehouse"
                        },
                        {
                            form: menuCollections.availstockmonitoring,
                            name: "Stock Monitoring"
                        },
                        {
                            form: menuCollections.movementstock,
                            name: "Movement Stock"
                        },
                        {
                            form: menuCollections.seriallog,
                            name: "Serial Log"
                        },
                    ]
                },
            ]
        },
        {
            name: "Master Data",
            icon: <CIcon icon={cilFolder} customClassName="nav-icon" />,
            items: [
                {
                    form: menuCollections.mastersaleschannel,
                    name: "Master Sales Channel"
                },
                {
                    form: menuCollections.mastertenant,
                    name: "Master Tenant"
                },
                {
                    form: menuCollections.mastervendor,
                    name: "Master Vendor"
                },
                {
                    form: menuCollections.masterbu,
                    name: "Master Business Unit"
                },
                {
                    form: menuCollections.masterlocation,
                    name: "Master Location Type"
                },
                {
                    form: menuCollections.masterwarehouse,
                    name: "Master Warehouse"
                },
                {
                    form: menuCollections.masterbrand,
                    name: "Master Brand"
                },
                {
                    form: menuCollections.masterdivision,
                    name: "Master Division"
                },
                {
                    name: "Item",
                    icon: <CIcon icon={cilDevices} customClassName="nav-icon" />,
                    items: [
                        {
                            form: menuCollections.mastertax,
                            name: "Master Tax"
                        },
                        {
                            form: menuCollections.masteritemgroup,
                            name: "Master Item Group"
                        },
                        {
                            form: menuCollections.masteritem,
                            name: "Master Item"
                        },
                        {
                            form: menuCollections.itemtenant,
                            name: "Master Item to Tenant"
                        },
                    ]
                },
                {
                    name: "Address",
                    icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
                    items: [
                        {
                            form: menuCollections.masterprovince,
                            name: "Master Province"
                        },
                        {
                            form: menuCollections.masterdistrict,
                            name: "Master District / City"
                        },
                        {
                            form: menuCollections.mastersubdistrict,
                            name: "Master Sub District"
                        },
                        {
                            form: menuCollections.mastervillage,
                            name: "Master Village"
                        },
                        {
                            form: menuCollections.masteraddress,
                            name: "Master Address"
                        },
                        {
                            form: menuCollections.mappingarea,
                            name: "Mapping Area / Cluster"
                        },
                    ]
                },
                {
                    name: "User",
                    icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
                    items: [
                        {
                            form: menuCollections.masteruser,
                            name: "Master User"
                        },
                        {
                            form: menuCollections.usertenant,
                            name: "Mapping User to Tenant"
                        },
                        {
                            form: menuCollections.mappinguserrole,
                            name: "Mapping User to Responsibility"
                        },
                    ]
                },
                {
                    form: menuCollections.masterrole,
                    name: "Master Responsibility"
                },
            ]
        }
    ]
};

function translatePermission(permissionValue) {
    if (permissionValue == undefined) {
        return {
            insert: false,
            update: false,
            delete: false
        };
    } else {
        let tmpVal = permissionValue;
        let p_insert = false;
        let p_update = false;
        let p_delete = false;

        if (tmpVal >= 100) {
            tmpVal = tmpVal - 100;
            if (tmpVal >= 0 && tmpVal < 100) {
                p_insert = true;
            }
        }

        if (tmpVal >= 10) {
            tmpVal = tmpVal - 10;
            if (tmpVal >= 0 && tmpVal < 10) {
                p_update = true;
            }
        }

        if (tmpVal >= 1) {
            tmpVal = tmpVal - 1;
            if (tmpVal >= 0 && tmpVal < 1) {
                p_delete = true;
            }
        }

        return {
            insert: p_insert,
            update: p_update,
            delete: p_delete
        };
    }
}

function createMenu(parent, items, role) {
    for (let i = 0; i < items.length; i++) {
        let permission = translatePermission(items[i].permission);
        if (items[i].items == undefined) {
            let child = {
                component: CNavItem,
                name: items[i].name,
                to: items[i].form.to,
                code: items[i].form.code,
                style: items[i].form.style,
                formProps: {
                    permission: permission,
                    role: role
                }
            };
            parent.items.push(child);
        } else {
            let child = {
                component: CNavGroup,
                icon: items[i].icon,
                name: items[i].name,
                items: []
            };
            parent.items.push(child);
            createMenu(child, items[i].items, role);
        }
    }
}

export function generateMenuByRole(roleCode) {
    let menuRoles = [role_system, role_aggregator, role_tenant, role_application];
    let menumap = null;
    for (let i = 0; i < menuRoles.length; i++) {
        if (menuRoles[i].code == roleCode) {
            menumap = menuRoles[i];
        }
    }

    let result = {
        items: []
    };
    if (menumap != undefined) {
        createMenu(result, menumap.menu,
            {
                code: roleCode,
                name: menumap.name
            }
        );
    }
    return result.items;
}