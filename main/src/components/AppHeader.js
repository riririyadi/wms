import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CCol,
  CRow,
  CHeaderText,
  CHeaderNav,
  CHeaderToggler,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from '@coreui/icons'

import { AppHeaderDropdown } from './header/index'

const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CHeader position="sticky" className="mb-2">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderText id="headerText">
          <CRow>
            <CCol sm="auto" style={{fontSize: "14px", textAlign: "left"}}>Responsibility : Warehouse Managemet System</CCol>
            <CCol style={{fontSize: "14px", textAlign: "center"}}>Business Unit : AE-TGR-001</CCol>
            <CCol style={{fontSize: "14px", textAlign: "right"}}>Development Erafone</CCol>
          </CRow>
        </CHeaderText>
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader