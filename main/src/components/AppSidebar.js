import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler, CAvatar } from '@coreui/react'

import { AppSidebarNav } from './AppSidebarNav'
import {generateMenuByRole} from "../menu/menuRoles";

import warehouse from '../assets/images/warehouse.svg'

// sidebar nav config
import navigation from '../_nav'

const AppSidebar = ({menuClicked, roleCode}) => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  const sidebarToggleHandle = () => {
    dispatch({ type: 'set', sidebarUnfoldable: !unfoldable });
  }

  if(roleCode == undefined) {
    roleCode = "";
  }
  
  const menuNav = generateMenuByRole(roleCode);

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
        if (visible) {
          document.getElementById("headerText").style.width = "85%";
        } else {
          document.getElementById("headerText").style.width = "90%";
        }
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <img className="sidebar-brand-narrow" src={warehouse} style={{width: "25px", height: "25px", marginBottom: "0.5rem"}} />
        <img className="sidebar-brand-full" src={warehouse} style={{width: "25px", height: "25px", marginBottom: "0.5rem"}} />
        <h3 className="sidebar-brand-full" style={{paddingLeft: "10px"}}>Azec WMS</h3>
      </CSidebarBrand>
      <CSidebarNav id="sidebarApp">
        <AppSidebarNav items={menuNav} 
        menuClicked={menuClicked} />
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={sidebarToggleHandle}
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)