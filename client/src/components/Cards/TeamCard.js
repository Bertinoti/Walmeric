import React from 'react'
import Card from '@mui/material/Card';
import { CardActionArea } from '@mui/material';
import { CardMedia } from '@mui/material';
import { CardContent } from '@mui/material';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import { joinUserToTeam } from '../../api/axios';
import { checkTeam } from '../Helpers';


export default function TeamCard({ teamName, teamLogo, teamCity, teamCountry }) {
    const { currentUser, cap, setResults } = useAuth();
    const navigate = useNavigate();

    const handleJoin = async (teamName) => {
        joinUserToTeam(currentUser.accessToken, teamName)
        window.location.reload();
    }

    return (

        <Card>
            <CardActionArea>
                <div className='row '>
                    <div className='col-md-6 '>
                        <CardMedia
                            component='img'
                            height='180'
                            image={teamLogo}
                        />
                    </div>
                    <div className='col-md-6'>
                        <CardContent>
                            <h4> {teamName} </h4>
                            <h5> {teamCountry} </h5>
                            <h6> {teamCity} </h6>
                            <Button
                                color="primary"
                                onClick={() => navigate(`/${teamName}`)}
                            >
                                Select the Team
                            </Button>

                            {(cap === true) ? <Button
                                color="primary"
                                onClick={() => handleJoin(teamName)}
                            >
                                Join Team
                            </Button> : ''}

                        </CardContent>
                    </div>
                </div>
            </CardActionArea>
        </Card>
    )
}
