import Search from '@mui/icons-material/Search'
import { IconButton } from '@mui/material'
import React from 'react'
import { Modal } from 'react-bootstrap'
import FormAddFriend from '../components/Modal/FormAddFriend'
import ModalNewTeam from '../components/Modal/FormAddFriend'
import ModalBase from '../components/Modal/ModalBase'
import NavBar from '../components/NavBar'
import { SearchBar } from '../components/SearchBar'
import { useAuth } from '../contexts/authContext'

export default function Friends() {
    const { show, setShow } = useAuth();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAddFriend = () =>{

    }

    return (
        <>
            <div className='w-100' style={{ maxWidth: '100%' }}>
                <NavBar />
                <div className='row w-100'>
                    <div className='w-50'>
                        <SearchBar />
                    </div>
                    <div className='w-50'>
                        <IconButton onClick={()=> {handleShow()}}> Add Friend </IconButton>
                    </div>
                </div>

               <ModalBase />

            </div>
        </>
    )
}
