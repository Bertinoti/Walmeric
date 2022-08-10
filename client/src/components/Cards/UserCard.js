import React from 'react'
import Card from '@mui/material/Card';
import { CardActionArea } from '@mui/material';
import { CardContent } from '@mui/material';


export default function UserCard({ firstName, lastName, phone, email, uid}) {
    return (
        <Card>
            <CardActionArea>
                <div className='row '>
                    <div className='col-md-7'>
                        <CardContent>
                            <h4> {firstName} </h4>
                            <h5> {lastName} </h5>
                            <h6> {email} </h6>
                            <h6> {phone} </h6>
                            <h6> {uid} </h6>
                        </CardContent>
                    </div>
                    <div className='col-md-4'>
                        <CardContent>
                            <h4> 100 </h4>
                            <h6> Your Coins</h6>
                        </CardContent>
                    </div>
                </div>
            </CardActionArea>
        </Card>
    )
}
