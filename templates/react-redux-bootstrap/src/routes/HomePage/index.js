import React from 'react';
import {Link} from "react-router-dom";
import config from '../../config/default.json';

import './styles.css';

const HomePage = props => (
    <div className="container">
        <div className="row">
            <div className="col text-center">

                <h2>{config.APP_NAME}</h2>
                <p>Get started by creating an account. Have fun!</p>

                <img className="landing-photo" src="/images/notes.jpg" alt="Notes" />
                    <p>
                        <Link to="/auth/login" className="btn btn-lg btn-primary">Login</Link> &nbsp;
                        <Link to="/auth/signup" className="btn btn-lg btn-danger">Sign up</Link>
                    </p>
            </div>
        </div>
    </div>
);

export default HomePage;
