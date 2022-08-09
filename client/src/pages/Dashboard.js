
import React, { useEffect, useState } from 'react'
import { Alert, Button, Card, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/authContext'
import ModalNewTeam from '../components/Modal/ModalNewTeam'
import NavBar from '../components/NavBar'
import * as yup from 'yup';
import { useFormik } from 'formik';
import { checkTeam, teamDetail } from '../components/Helpers'
import { createTeam, findAllTeamsUser, getAllPlayerOneTeam, searchTeam } from '../api/axios'
import { IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { Input } from '@mui/material'
import TeamCard from '../components/Cards/TeamCard'

const validationSchema = yup.object({

    inputSearch: yup
        .string()
        .min(3, 'for search you need to write more than 3 letters'),
});

export default function Dashboard() {
    const [error, setError] = useState('')
    const { currentUser, logout, setCap, results, setResults } = useAuth()
    const { show, setShow } = useAuth();
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            inputSearch: '',
        },

        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const team = { teamName: values.inputSearch }
            const { data } = await searchTeam(currentUser.accessToken, team)
            setResults(data)
            setCap(true)
        }
    });

    useEffect(async () => {
        const res = await checkTeam(currentUser.accessToken)
        setResults(res)
    }, [])

    useEffect(async () => {
        const res = await checkTeam(currentUser.accessToken)
        setResults(res)
    }, [show])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleLogout = async () => {
        setError('')
        try {
            await logout()
            navigate('/')
        } catch (error) {
            setError('Failed to Log Out ')
        }
    }

    return (
        <>
            <div className='w-100' style={{ maxWidth: '100%' }}>
                <NavBar logout={handleLogout}/>
                <div>
                    <Card>
                        <div className='row'>
                            <div className='d-flex justify-content-center '>
                                <div className='col-md-6'>
                                    <form onSubmit={formik.handleSubmit}>
                                        <div className='d-flex'>
                                            <Input
                                                variant='standard'
                                                fullWidth
                                                className='mt-4'
                                                id='inputSearch'
                                                name="inputSearch"
                                                sx={{ ml: 1, flex: 1 }}
                                                placeholder="Before create Search your Team Name"
                                                value={formik.values.inputSearch}
                                                onChange={formik.handleChange}
                                                error={formik.touched.inputSearch && Boolean(formik.errors.inputSearch)}
                                            />
                                            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                                                <SearchIcon />
                                            </IconButton>
                                        </div>
                                        <div className='d-flex justify-content-center w-100'>
                                            {formik.errors.inputSearch && <Alert variant='danger'> {formik.errors.inputSearch} </Alert>}
                                        </div>
                                    </form>
                                </div>
                                <div className='offset-2 col-md-4 m-2'>
                                    <Button className='btn-lg w-100' onClick={handleShow}> Create Team </Button>
                                </div>
                            </div>
                        </div>
                        <Card.Body>

                            <div className='w-100 h-25 m-3 d-flex flex-column justify-content-center ' >
                                {(results.length > 0) ? results.map(({ city, name, country, logo, _id }) => {
                                    return (
                                        <div className='m-2 ' key={_id}>
                                            <TeamCard
                                                teamCity={city}
                                                teamName={name}
                                                teamCountry={country}
                                                teamLogo={logo}
                                                team_id={_id}
                                            />
                                        </div>
                                    )
                                }) : <h4> You do not have a Team  </h4>}
                            </div>
                        </Card.Body>
                    </Card>
                </div>

                <div className='w-100' style={{ maxWidth: '600px' }}>
                    <Modal show={show} onHide={handleClose} animation={false}>
                        <Modal.Header closeButton>
                            <Modal.Title>Create Team </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <ModalNewTeam />
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

            </div>

        </>

    )
}
// P@ssw0rd