import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as yup from 'yup';
import { Card, Button, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'
import "../style/signUp.scss"

const validationSchema = yup.object({

    firstName: yup
        .string('Enter your first Name')
        .min(3, 'need to be more then 3 letters')
        .required('this field is required'),
    lastName: yup
        .string('Enter your last Name')
        .min(3, 'need to be more then 3 letters')
        .required('this field is required'),
    birthday: yup
        .date()
        .required('this field is required'),

    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required("This field is required"),

    phoneNumber: yup
        .number('Need to enter the Telephone')
        .required('this field is required')
        .min(9, 'the number need to be minimum 9 numbers'),

    password: yup
        .string('Enter valid password')
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character")
        .required("This field is required"),

    confpassword: yup
        .string('The password need to be igual')
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required("This field is required"),

});


export default function SignUp() {

    const { signup } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()


    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            birthday: '',
            phoneNumber: '',
            email: '',
            password: '',
            confpassword: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
                try {
                setLoading(true)
                await signup(values)
                navigate('/dashboard');
            } catch (error) {
                setError('Failed to create a account')
            }
            setLoading(false)
        },
    });

    return (
        <>
            <div className='w-100' style={{ maxWidth: '400px' }}>

                <Card>
                    <Card.Body>
                        <h2 className='text-center mb-4 '>Sign Up</h2>

                        {/* {currentUser && currentUser.email} */}
                        {error && <Alert variant='danger'> {error} </Alert>}
{/* 
                        {formik.errors.firstName && <Alert variant='danger'> {formik.errors.firstName} </Alert>}
                        {formik.errors.lastName && <Alert variant='danger'> {formik.errors.lastName} </Alert>}
                        {formik.errors.birthday && <Alert variant='danger'> {formik.errors.birthday} </Alert>}
                        {formik.errors.phoneNumber && <Alert variant='danger'> {formik.errors.phoneNumber} </Alert>}
                        {formik.errors.email && <Alert variant='danger'> {formik.errors.email} </Alert>}
                        {formik.errors.password && <Alert variant='danger'> {formik.errors.password} </Alert>}
                        {formik.errors.confpassword && <Alert variant='danger'> {formik.errors.confpassword} </Alert>} */}

                        <Form onSubmit={formik.handleSubmit}>

                            <Form.Group id='firstName'>
                                <Form.Label> First Name </Form.Label>
                                <Form.Control
                                    type='firstName'
                                    name='firstName'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.firstName}
                                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group id='lastName'>
                                <Form.Label> Last Name </Form.Label>
                                <Form.Control
                                    type='lastName'
                                    name='lastName'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.lastName}
                                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group id='birthday'>
                                <Form.Label> Birthday </Form.Label>
                                <Form.Control
                                    type='birthday'
                                    name='birthday'
                                    placeholder='YYYY-MM-DD'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.birthday}
                                    error={formik.touched.birthday && Boolean(formik.errors.birthday)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label> Phone Number </Form.Label>
                                <PhoneInput
                                    fullWidth
                                    placeholder='677 898 989'
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={formik.values.phoneNumber}
                                    onChange={value => formik.values.phoneNumber = value}
                                    error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                                    helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                                    country='es'
                                    regions='europe'
                                />
                            </Form.Group>

                            <Form.Group id='email'>
                                <Form.Label> Email </Form.Label>
                                <Form.Control
                                    type='email'
                                    name='email'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                >
                                </Form.Control>
                            </Form.Group>
                            <Form.Group id='password'>
                                <Form.Label> Password </Form.Label>
                                <Form.Control
                                    type='password'
                                    name="password"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                    error={formik.touched.password && Boolean(formik.errors.password)}

                                >
                                </Form.Control>
                            </Form.Group>
                            <Form.Group id='confpassword'>
                                <Form.Label>Confirm Password </Form.Label>
                                <Form.Control
                                    type='password'
                                    name="confpassword"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.confpassword}
                                    error={formik.touched.confpassword && Boolean(formik.errors.confpassword)}

                                >
                                </Form.Control>
                            </Form.Group>
                            <Button disabled={loading} className='w-100 mt-4' type='submit'> Sign Up</Button>
                        </Form>
                    </Card.Body>
                </Card>
                <div className='w-100 text-center mt-2'>
                    Already have an account? <Link to="/"> Log In </Link>
                </div>

            </div>

        </>
    )
}
