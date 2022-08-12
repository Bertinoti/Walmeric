import React from 'react'
import { Modal } from 'react-bootstrap'
import { useAuth } from '../../contexts/authContext';
import FormAddFriend from './FormAddFriend';

export default function ({ formName, formdata }) {
    const { show, setShow } = useAuth();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const formReturn = (form) => {

        switch (form.formdata) {
            case 'addFriend':
                return <FormAddFriend />

            default:
                break;
        }

    }


    return (
        <>
            <div className='w-100' style={{ maxWidth: '600px' }}>
                <Modal show={show} onHide={handleClose} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title> {formName} </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {formReturn({ formdata })}
                    </Modal.Body>
                </Modal>
            </div>
        </>
    )
}
