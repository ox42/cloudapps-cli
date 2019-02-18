import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

import './styles.css';

Modal.setAppElement('#root');

const ConfirmModal = (props) => (
    <Modal isOpen={props.open} className="confirm_modal_style" overlayClassName="confirm_modal_overlay">
        <h2>Confirmation needed</h2>
        <p>{props.content}</p>

        <div className="text-right" style={{ marginTop: '20px' }}>
            <button onClick={(event) => { event.preventDefault(); props.onConfirm(); }} className="btn btn-primary">Confirm</button> &nbsp;
            <button onClick={(event) => { event.preventDefault(); props.onCancel(); }} className="btn btn-danger">Cancel</button>
        </div>
    </Modal>
);


ConfirmModal.propTypes = {
    open: PropTypes.bool,

    content: PropTypes.string,

    onConfirm: PropTypes.func,
    onCancel: PropTypes.func
};

export default ConfirmModal;
