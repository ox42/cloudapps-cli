import React from 'react';
import { connect } from 'react-redux';
import { Route, Link, Switch } from 'react-router-dom';

import { withRouter } from "react-router";
import RestrictedRoute from '../../RestrictedRoute';

import './styles.css';
import { logoutUser } from "../../store/auth.js";
import config from '../../config/default.json';

import HomePage from '../../routes/HomePage';
import LoginPage from '../../routes/LoginPage';
import SignupPage from '../../routes/SignupPage';
import DashboardPage from '../../routes/DashboardPage';
import AddNotePage from '../../routes/AddNotePage';
import EditNotePage from '../../routes/EditNotePage';


class App extends React.PureComponent {

    logoutUser() {
        this.props.logoutUser();
    }

    render() {
        return (
            <div>

                <nav className="navbar fixed-top navbar-expand-md navbar-dark bg-primary">
                    <div className="container">
                        <Link className="navbar-brand py-3" to="/">
                            <img src="/images/winner.png" width="30" height="30" className="d-inline-block align-top mr-1"
                                 alt="Winner" />
                            { config.APP_NAME }
                        </Link>

                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarResponsive">
                            <span className="navbar-toggler-icon px-3 py-3"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarResponsive">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/user/dashboard">Dashboard</Link>
                                </li>

                                {this.props.isAuthenticated
                                    ? (
                                        <li className="nav-item">
                                            <a href="/" className="nav-link" onClick={(event) => { event.preventDefault(); this.logoutUser(); }}>Logout</a>
                                        </li>
                                    )
                                    : ''}
                            </ul>
                        </div>
                    </div>
                </nav>

                <div>
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <RestrictedRoute exact path="/auth/login" allow={!this.props.isAuthenticated} fallback="/user/dashboard" component={LoginPage} />
                        <RestrictedRoute exact path="/auth/signup" allow={!this.props.isAuthenticated} fallback="/user/dashboard" component={SignupPage} />

                        <RestrictedRoute exact path="/user/dashboard" allow={this.props.isAuthenticated} fallback="/auth/login" component={DashboardPage} />
                        <RestrictedRoute exact path="/user/note/add" allow={this.props.isAuthenticated} fallback="/auth/login" component={AddNotePage} />
                        <RestrictedRoute exact path="/user/note/:id/edit" allow={this.props.isAuthenticated} fallback="/auth/login" component={EditNotePage} />
                    </Switch>
                </div>
            </div>
        )
    }
}


const mapStateToProps = function(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
};

function mapDispatchToProps(dispatch) {
    return {
        logoutUser: () => { dispatch(logoutUser()); }
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
