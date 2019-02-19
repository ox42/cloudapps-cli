import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { Route, Link, Switch } from 'react-router-dom';

import HomePage from '../../routes/HomePage';
import ConfirmModal from '../../components/ConfirmModal';

import config from '../../config/default.json';
import { resetCounter } from "../../store/counter.js";

import './styles.css';


class App extends React.PureComponent {

    state = {
        navbarToggle: false,
        resetModalIsOpen: false
    };

    resetCounter() {
        this.props.resetCounter();
    }

    render() {
        return (
            <div>

                <ConfirmModal content="Are you sure that you want to reset the counter?" open={this.state.resetModalIsOpen}
                              onConfirm={() => { this.setState({ resetModalIsOpen: false }); this.resetCounter(); }}
                              onCancel={() => { this.setState({ resetModalIsOpen: false }); }} />

                <nav className="navbar fixed-top navbar-expand-md navbar-dark bg-primary">
                    <div className="container">
                        <Link className="navbar-brand py-3" to="/">
                            <img src="/images/winner.png" width="30" height="30" className="d-inline-block align-top mr-1"
                                 alt="Winner" />
                            { config.APP_NAME }
                        </Link>

                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarResponsive" onClick={() => { this.setState({ navbarToggle: !this.state.navbarToggle }); }}>
                            <span className="navbar-toggler-icon px-3 py-3"></span>
                        </button>
                        <div className={"collapse navbar-collapse" + (this.state.navbarToggle ? ' show' : '')} id="navbarResponsive">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/" onClick={() => { this.setState({ navbarToggle: false }); }}>Home</Link>
                                </li>

                                <li className="nav-item">
                                    <a href="/" className="nav-link" onClick={(event) => { event.preventDefault(); this.setState({ navbarToggle: false, resetModalIsOpen: true }); }}>Reset</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <div>
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                    </Switch>
                </div>
            </div>
        )
    }
}


function mapDispatchToProps(dispatch) {
    return {
        resetCounter: () => { dispatch(resetCounter()); }
    };
}

export default withRouter(connect(null, mapDispatchToProps)(App));
