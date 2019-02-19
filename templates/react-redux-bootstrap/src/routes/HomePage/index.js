import React from 'react';
import config from '../../config/default.json';

import { connect } from "react-redux";
import { addValue } from "../../store/counter.js";

import './styles.css';


class HomePage extends React.Component {

    addValue(value) {
        this.props.addValue(value);
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col text-center">

                        <h2>{config.APP_NAME}</h2>
                        <p>We help you count easily, without errors.</p>


                        <img className="landing-photo" src="/images/counter.jpg" alt="Counter" />
                        <p className="counter-value">
                            Counter: <strong>{this.props.counter}</strong><br />

                            {this.props.lastAddition
                                ? <span style={{ fontSize: '50%' }}>Last value added: { this.props.lastAddition }</span>
                                : ''}
                        </p>

                        <p>
                            <button className="btn btn-primary" onClick={() => { this.addValue(1); }}>Increase by 1</button> &nbsp;
                            <button className="btn btn-danger" onClick={() => { this.addValue(2); }}>Increase by 2</button>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        counter: state.counter.counter,
        lastAddition: state.counter.lastAddition
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addValue: (value) => { dispatch(addValue(value)); }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
