import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import './ConfirmationModal.css';

const ConfirmationModal = ({ show, onHide, onConfirm, deleteIndex }) => {
    return (
        <Modal
            show={show}
            onHide={onHide}
            dialogClassName="confirmation-modal"
            backdropClassName="modal-backdrop-white"
        >
            <Modal.Header>
                <Modal.Title className="modal-title">Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete {deleteIndex !== null ? 'this item' : 'all items'}?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={onConfirm}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmationModal;
