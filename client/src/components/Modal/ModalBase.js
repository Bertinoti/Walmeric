import React from 'react'
import { Modal } from 'react-bootstrap'
import { useAuth } from '../../contexts/authContext';
import FormAddFriend from './FormAddFriend';

export default function () {
    const { currentUser, logout, results, setResults } = useAuth()
    const { show, setShow } = useAuth();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div className='w-100' style={{ maxWidth: '600px' }}>
                <Modal show={show} onHide={handleClose} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Team </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                       <FormAddFriend/>
                    </Modal.Body>
                    <Modal.Footer>
                        {/* <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button> */}
                        {/* <Button variant="primary" type='submit' onClick={handleClose}>
                            Save Changes
                        </Button> */}
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}
