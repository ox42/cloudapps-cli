import React from 'react';

import { connect } from 'react-redux';
import { signInUser } from '../../store/auth';

class LoginPage extends React.Component {
    state = {
        email: '',
        password: ''
    };

    submitForm() {
        if (this.state.email && this.state.password) {
            this.props.signInUser(this.state.email, this.state.password);
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">

                        <form className="form auth-form mt-4" onSubmit={(event) => { event.preventDefault(); this.submitForm(); }}>
                            <h2 className="text-center mt-1 mb-4">Sign in</h2>

                            {(this.props.error) ? <p className="form-error">{this.props.error}</p> : ''}

                            <div className="form-group">
                                <label htmlFor="email">Email address</label>
                                <input type="email" className="form-control" id="email" name="email" autoFocus
                                       placeholder="Enter email" value={this.state.email} onChange={event => this.setState({ email: event.target.value })} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" id="password" name="password"
                                       placeholder="Enter password" value={this.state.password} onChange={event => this.setState({ password: event.target.value })} />
                            </div>

                            <div className="text-right">
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        error: state.auth.lastError,
        isAuthenticated: state.auth.isAuthenticated
    }
};

function mapDispatchToProps(dispatch) {
    return {
        signInUser: (email, password) => { dispatch(signInUser(email, password)); }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
