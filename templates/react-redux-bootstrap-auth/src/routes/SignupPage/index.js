import React from 'react';

import { connect } from 'react-redux';
import { signUpUser } from '../../store/auth';

class SignupPage extends React.Component {
    state = {
        name: '',
        email: '',
        password: '',
        password2: '',

        internalError: null
    };

    submitForm() {

        this.setState({ internalError: null });
        if (!this.state.name || !this.state.email || !this.state.password){
            this.setState({ internalError: 'Please complete all fields and try again!' });
            return /* don't submit form */;
        }

        if (this.state.password !== this.state.password2) {
            this.setState({ internalError: 'You passwords don\'t match. Please try again.' });
            return /* don't submit form */;
        }

        this.props.signUpUser(this.state.name, this.state.email, this.state.password);
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">

                        <form className="form auth-form mt-4" onSubmit={(event) => { event.preventDefault(); this.submitForm(); }}>
                            <h2 className="text-center mt-1 mb-4">Sign up</h2>

                            {(this.state.internalError || this.props.error) ? <p className="form-error">{this.state.internalError || this.props.error}</p> : ''}


                            <div className="form-group">
                                <label htmlFor="name">Full name</label>
                                <input type="text" className="form-control" id="name" name="name" autoFocus
                                       placeholder="Enter your name" value={this.state.name} onChange={event => this.setState({ name: event.target.value })} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email address</label>
                                <input type="email" className="form-control" id="email" name="email"
                                       placeholder="Enter email" value={this.state.email} onChange={event => this.setState({ email: event.target.value })} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" id="password" name="password"
                                       placeholder="Enter password" value={this.state.password} onChange={event => this.setState({ password: event.target.value })} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password2">Repeat password</label>
                                <input type="password" className="form-control" id="password2" name="password2"
                                       placeholder="Repeat password" value={this.state.password2} onChange={event => this.setState({ password2: event.target.value })} />
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
        signUpUser: (name, email, password) => { dispatch(signUpUser(name, email, password)); }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
