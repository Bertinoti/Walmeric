import * as yup from 'yup';
import { useFormik } from 'formik';
import { Alert, TextField } from '@mui/material'
import { Button } from '@mui/material';
import { useAuth } from '../../contexts/authContext';
import { getRefUrl } from '../Helpers';
import MuiPhoneNumber from "material-ui-phone-number";
import { useState } from 'react';


const validationSchema = yup.object().shape({

  userPhoneNumber: yup
    .number()
    .when(['userUid', 'email'], {
      is: (userUid, email) => !userUid && !email,
      then: yup
        .number('Enter the phone number')
        .min(11, 'add the prefix (34) and the phone number (623456789)')
        .required('Please enter one of the three fields')
    }),

  userUid: yup
    .string()
    .when(['userPhoneNumber', 'email'], {
      is: (userPhoneNumber, email) => !userPhoneNumber && !email,
      then: yup
        .string('Enter user the count number ')
        .min(3, 'the length is to short')
        .required('Please enter one of the three fields'),
    }),

  email: yup
    .string()
    .when(['userPhoneNumber', 'userUid'], {
      is: (userPhoneNumber, userUid) => !userPhoneNumber && !userUid,
      then: yup
        .string('Enter user Email')
        .required('Please enter one of the three fields')
    }),

}, [['userUid', 'email'], ['userPhoneNumber', 'email'], ['userPhoneNumber', 'userUid']]);

export default function FormAddFriend() {
  const { show, setShow, currentUser } = useAuth();
  const [error, setError] = useState('');

  const handleClose = async () => {
    setShow(false)
  };
  const handleShow = () => setShow(true);

  const formik = useFormik({
    initialValues: {
      userPhoneNumber: '',
      userUid: '',
      email: '',

    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      handleClose();
    }

  });


  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className=' mx-2 d-flex justify-content-center'> To Add a new Friend you can choose One of this three Options</div>
        {error && <Alert variant='danger'> {error} </Alert>}
        {(formik.errors.userPhoneNumber || formik.errors.email || formik.errors.userUid) && <Alert variant='danger'>{formik.errors.userPhoneNumber || formik.errors.email || formik.errors.userUid} </Alert>}

          <div className='mx-2'>
            <MuiPhoneNumber
              fullWidth
              id="userPhoneNumber"
              name='userPhoneNumber'
              variant="outlined"
              margin="normal"
              label="User Mobile Number"
              defaultCountry={"es"}
              regions={'europe'}
              value={formik.values.userPhoneNumber}
              onChange={value => formik.values.userPhoneNumber = value}
              error={formik.touched.userPhoneNumber && Boolean(formik.errors.userPhoneNumber)}
              helperText={formik.touched.userPhoneNumber && formik.errors.userPhoneNumber}
            />
          </div>
        <div className='mx-2 my-3'>

          <TextField
            fullWidth
            sx={{
              maxHeigth: '.5em'
            }}
            id='userUid'
            name="userUid"
            label='Account Number'
            placeholder='cBWY7FGxUrTaAefV4TXS2hGJ5Vx1'
            value={formik.values.userUid}
            onChange={formik.handleChange}
            error={formik.touched.userUid ? Boolean(formik.errors.userUid) : undefined}
          />
        </div>
        <div className='mx-2 my-4'>
          <TextField
            fullWidth
            id='email'
            name="email"
            label='User Email'
            placeholder='user@mail.com'
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email ? Boolean(formik.errors.email) : undefined}
          />
        </div>

        <div className=' mx-2 d-flex justify-content-center' >
          <Button color="primary" variant="contained" fullWidth type="submit" >
            Add new Friend
          </Button>
        </div>
      </form>
    </>
  )
}
