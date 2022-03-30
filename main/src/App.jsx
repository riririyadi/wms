import React, { Suspense } from 'react'
import ReactDOM from "react-dom";
import { HashRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from "./store";
import './scss/style.scss';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            roleCode: ""
        };
    }

    render() {
        if (this.state.roleCode == "") {
            window.location.href = "/#/login";
        }
        const loading = (
            <div className="pt-3 text-center">
                <div className="sk-spinner sk-spinner-pulse"></div>
            </div>
        )

        const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
        const Login = React.lazy(() => import('./views/Login'))

        return (
            <HashRouter>
                <Suspense fallback={loading}>
                    <Routes>
                        <Route exact path="/login" name="Login"
                            element={
                                <Login onLoggedIn={(roleCode) => {
                                    this.setState({
                                        roleCode: roleCode
                                    });
                                }} />
                            } />
                        <Route path="/*" name="Home" element={<DefaultLayout roleCode={this.state.roleCode} />} />
                    </Routes>
                </Suspense>
            </HashRouter>
        );
    }
}

ReactDOM.render(<Provider store={store}>
    <App />
</Provider>, document.getElementById("app"));