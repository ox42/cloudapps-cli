import React from 'react';
import ReactDOM from 'react-dom';

import {MemoryRouter} from 'react-router';
import HomePage from './';

it('renders the HomePage route', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <MemoryRouter>
            <HomePage />
        </MemoryRouter>
        , div);

    ReactDOM.unmountComponentAtNode(div);
});
