import { IconButton } from '@mui/material'
import React from 'react'
import ModalBase from '../components/Modal/ModalBase'
import NavBar from '../components/NavBar'
import { SearchBar } from '../components/SearchBar'
import { useAuth } from '../contexts/authContext'

export default function Friends() {
    const { show, setShow } = useAuth();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAddFriend = () => {

    }

    return (
        <>
            <div className='w-100'>
                <NavBar />
                <div className='row w-100'>
                    <div className='w-50'>
                        <SearchBar />
                    </div>
                    <div className='w-50'>
                        <IconButton onClick={() => { handleShow() }}> Add Friend </IconButton>
                    </div>
                </div>

                <ModalBase formName={'Add Friend'} formdata={'addFriend'} />

            </div>
        </>
    )
}
