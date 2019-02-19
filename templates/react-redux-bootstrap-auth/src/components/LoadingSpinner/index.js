import React from 'react';
import './styles.css';

const LoadingSpinner = () => (
    <div style={{ margin: '120px 0' }}>
        <div className="sk-folding-cube">
            <div className="sk-cube1 sk-cube"></div>
            <div className="sk-cube2 sk-cube"></div>
            <div className="sk-cube4 sk-cube"></div>
            <div className="sk-cube3 sk-cube"></div>
        </div>
    </div>
);

export default LoadingSpinner;