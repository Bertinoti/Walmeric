
import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/authContext'
import NavBar from '../components/NavBar'

import UserCard from '../components/Cards/UserCard'
import { getCurrentUser } from '../api/axios'



export default function Dashboard() {
    const [error, setError] = useState('')
    const { currentUser, logout, results, setResults } = useAuth()
    const { show, setShow } = useAuth();
    const navigate = useNavigate()

    console.log(currentUser)
    useEffect(async () => {
        const res = await getCurrentUser(currentUser.accessToken, currentUser.email)
        setResults(res)
    }, [])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // const handleLogout = async () => {
    //     setError('')
    //     try {
    //         await logout()
    //         navigate('/')
    //     } catch (error) {
    //         setError('Failed to Log Out ')
    //     }
    // }

    return (
        <>
            <div className='w-100' style={{ maxWidth: '100%' }}>
                <NavBar />
                <div>
                    <Card>
                        <Card.Body>
                            <div className='w-100 h-25 m-3 d-flex flex-column justify-content-center ' >
                                <div className='m-2 ' key={results.uid}>
                                    <UserCard
                                        firstName={results.firstName}
                                        lastName={results.lastName}
                                        phone={results.phone}
                                        email={results.email}
                                        uid={results.uid}
                                    />
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>

        </>

    )
}
// P@ssw0rd