import React from 'react'
import { AppSidebar, AppHeader, AppContent, AppFooter } from '../components/index'

export default class DefaultLayout extends React.Component {

  constructor(props) {
    super(props);
}

  _menuCliked(item) {
    this.tabInstance.openMenu(item);
  }

  render() {
    return (
      <div>
        <AppSidebar roleCode={this.props.roleCode} menuClicked={(item)=>{this._menuCliked(item)}} />
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <AppHeader />
          <div className="body flex-grow-1 px-3">
            <AppContent setTabInstance={(value)=>{
              this.tabInstance = value;
            }} />
          </div>
          <AppFooter />
        </div>
      </div>
    )
  }
}