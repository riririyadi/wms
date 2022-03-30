import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilCash,
  cilSpeedometer,
  cilPrint,
  cilFolder,
  cilBuilding,
  cilGroup,
  cilDevices,
  cilShareBoxed,
  cilIndustry,
  cilBasket,
  cilList,
  cilBriefcase
} from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavGroup,
    name: 'Dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Dashboard',
        to: '/dashboard',
        code: 'dashboard',
      },
      {
        component: CNavGroup,
        name: 'SLA Time',
        to: '/dashboard/sla-time',
        items: [
          {
            component: CNavItem,
            name: 'Master SLA Time',
            to: '/dashboard/sla-time/master-sla-time',
            code: 'masterslatime',
          },
          {
            component: CNavItem,
            name: 'Monitoring Process SLA',
            to: '/dashboard/sla-time/monitoring-proccess-sla',
            code: 'monitoringproccesssla',
          },
        ]
      },
    ]
  },
  {
    component: CNavGroup,
    name: 'Transaction',
    to: '/transaction',
    icon: <CIcon icon={cilCash} customClassName="nav-icon" />,
    items: [
      {
        component: CNavGroup,
        name: 'WMS',
        to: '/transaction/wms',
        icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
        items: [
          {
            component: CNavItem,
            name: 'List Order',
            to: '/transaction/wms/list-order',
            code: 'listorder',
          },
          {
            component: CNavItem,
            name: 'Picking List',
            to: '/transaction/wms/picking-list',
            code: 'pickinglist',
          },
          {
            component: CNavItem,
            name: 'Picking Confirm',
            to: '/transaction/wms/picking-confirm',
            code: 'pickingconfirm',
          },
          {
            component: CNavItem,
            name: 'Get Tracking Number',
            to: '/transaction/wms/get-tracking-number',
            code: 'gettrackingnumber',
          },
          {
            component: CNavItem,
            name: 'Packing List',
            to: '/transaction/wms/packing-list',
            code: 'packinglist',
          },
          {
            component: CNavItem,
            name: 'Pre Outbound',
            to: '/transaction/wms/pre-outbound',
            code: 'preoutbound',
          },
          {
            component: CNavItem,
            name: 'Outbound',
            to: '/transaction/wms/outbound',
            code: 'outbound',
          },
          {
            component: CNavItem,
            name: 'Manual Update Shipping',
            to: '/transaction/wms/manual-update-shipping',
            code: 'manualupdateshipping',
            style: {fontSize: "15px"}
          },
          {
            component: CNavItem,
            name: 'Order Return',
            to: '/transaction/wms/order-return',
            code: 'orderreturn',
          },
        ]
      },
      {
        component: CNavGroup,
        name: 'Inventory Management',
        to: '/transaction/stock',
        icon: <CIcon icon={cilBasket} customClassName="nav-icon" />,
        items: [
          {
            component: CNavItem,
            name: 'Stock Transfer',
            to: '/transaction/stock/inventory-transfer',
            code: 'inventorytransfer',
          },
          {
            component: CNavItem,
            name: 'Stock Receive / Inbound',
            to: '/transaction/stock/stock-receive',
            code: 'stockreceive',
          },
          {
            component: CNavItem,
            name: 'Stock Outbound',
            to: '/transaction/stock/stock-outbound',
            code: 'stockoutbound',
          },
          {
            component: CNavItem,
            name: 'Buffer Stock',
            to: '/transaction/stock/buffer-stock',
            code: 'bufferstock',
          },
          {
            component: CNavItem,
            name: 'Stock Take',
            to: '/transaction/stock/stock-take',
            code: 'stocktake',
          },
          {
            component: CNavItem,
            name: 'Bundling / Unbundling',
            to: '/transaction/stock/bundling',
            code: 'stockbundling',
          },
        ]
      }
    ]
  },
  {
    component: CNavGroup,
    name: 'Report',
    to: '/report',
    icon: <CIcon icon={cilPrint} customClassName="nav-icon" />,
    items: [
      {
        component: CNavGroup,
        name: 'Order Report',
        to: '/report/order-report',
        icon: <CIcon icon={cilShareBoxed} customClassName="nav-icon" />,
        items: [
          {
            component: CNavItem,
            name: 'Report Print List Outbound',
            to: '/report/order-report/print-list-outbound',
            code: "reportprintlistoutbound"
          },
          {
            component: CNavItem,
            name: 'Report Master Order View',
            to: '/report/order-report/master-order-view',
            code: "reportmasterorderview"
          },
          {
            component: CNavItem,
            name: 'Report Order',
            to: '/report/order-report/order',
            code: "reportorder"
          },
          {
            component: CNavItem,
            name: 'Report Reserved Order',
            to: '/report/order-report/reserved-order',
            code: "reportreservedtorder"
          },
        ]
      },
      {
        component: CNavGroup,
        name: 'Stock Report',
        to: '/report/stock-report',
        icon: <CIcon icon={cilIndustry} customClassName="nav-icon" />,
        items: [
          {
            component: CNavItem,
            name: 'Report All Stock',
            to: '/report/stock-report/all-stock',
            code: "reportallstock"
          },
          {
            component: CNavItem,
            name: 'Report Stock Summary',
            to: '/report/stock-report/stock-summary',
            code: "reportstocksummary"
          },
          {
            component: CNavItem,
            name: 'Daily Stock Report',
            to: '/report/stock-report/daily-stock-report',
            code: 'dailystockreport',
          },
          {
            component: CNavItem,
            name: 'Display Item By Warehouse',
            to: '/report/stock-report/display-item-by-warehouse',
            code: 'displayitembywarehouse',
            style: {fontSize:"14px"},
          },
          {
            component: CNavItem,
            name: 'Stock Monitoring',
            to: '/report/stock-report/availablity-monitoring',
            code: "availstockmonitoring"
          },
          {
            component: CNavItem,
            name: 'Movement Stock',
            to: '/report/stock-report/movement-stock',
            code: 'movementstock',
          },
          {
            component: CNavItem,
            name: 'Serial Log',
            to: '/report/stock-report/serial-log',
            code: 'seriallog',
          },
        ]
      },
      {
        component: CNavGroup,
        name: 'Consolidate Report',
        to: '/report/consolidate-report',
        icon: <CIcon icon={cilBriefcase} customClassName="nav-icon" />,
        items: [
        ]
      },
    ]
  },
  {
    component: CNavGroup,
    name: 'Master',
    to: '/master',
    icon: <CIcon icon={cilFolder} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Master Sales Channel',
        to: '/master/sales-channel',
        code: "mastersaleschannel"
      },
      {
        component: CNavItem,
        name: 'Master Tenant',
        to: '/master/tenant',
        code: "mastertenant"
      },
      {
        component: CNavItem,
        name: 'Master Vendor',
        to: '/master/tenant',
        code: "mastervendor"
      },
      {
        component: CNavItem,
        name: 'Master Business Unit',
        to: '/master/business-unit',
        style: {fontSize: "15px"},
        code: "masterbu"
      },
      {
        component: CNavItem,
        name: 'Master Location Type',
        to: '/master/location',
        code: "masterlocation"
      },
      {
        component: CNavItem,
        name: 'Master Warehouse',
        to: '/master/master-order-view',
        code: "masterwarehouse"
      },
      {
        component: CNavItem,
        name: 'Master Brand',
        to: '/master/brand',
        code: "masterbrand"
      },
      {
        component: CNavItem,
        name: 'Master Division',
        to: '/master/division',
        code: "masterdivision"
      },
      {
        component: CNavGroup,
        name: 'Item',
        to: '/master-item',
        icon: <CIcon icon={cilDevices} customClassName="nav-icon" />,
        items: [
          {
            component: CNavItem,
            name: 'Master Tax',
            to: '/master/tax',
            code: "mastertax"
          },
          {
            component: CNavItem,
            name: 'Master Item Group',
            to: '/master/item-group',
            code: "masteritemgroup"
          },
          {
            component: CNavItem,
            name: 'Master Item',
            to: '/master/item',
            code: "masteritem"
          },
          {
            component: CNavItem,
            name: 'Mapping Item to Tenant',
            to: '/master/item-tenant',
            code: "itemtenant"
          },
        ]
      },
      {
        component: CNavGroup,
        name: 'Address',
        to: '/master-address',
        icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
        items: [
          {
            component: CNavItem,
            name: 'Master Province',
            to: '/master/province',
            code: "masterprovince"
          },
          {
            component: CNavItem,
            name: 'Master District',
            to: '/master/district',
            code: "masterdistrict"
          },
          {
            component: CNavItem,
            name: 'Master Sub District',
            to: '/master/subdistrict',
            code: "mastersubdistrict"
          },
          {
            component: CNavItem,
            name: 'Master Village',
            to: '/master/village',
            code: "mastervillage"
          },
          {
            component: CNavItem,
            name: 'Master Address',
            to: '/master/address',
            code: "masteraddress"
          },
          {
            component: CNavItem,
            name: 'Mapping Area',
            to: '/master/mappingarea',
            code: "mappingarea"
          },
        ]
      },
     {
      component: CNavGroup,
      name: 'User',
      to: '/master-user',
      icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: 'Master User',
          to: '/master/user',
          code: "masteruser"
        },
        {
          component: CNavItem,
          name: 'Mapping User to Tenant',
          to: '/master/user-tenant',
          code: "usertenant"
        },
        {
          component: CNavItem,
          name: 'Mapping User to Responsibility',
          to: '/master/user-role',
          code: "mappinguserrole"
        },
      ]
     },
     {
      component: CNavGroup,
      name: 'Role',
      to: '/master-role',
      icon: <CIcon icon={cilList} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: 'Master Role',
          to: '/master-role/role',
          code: "masterrole"
        },
      ]
     },
    ]
  },
]

export default _nav
