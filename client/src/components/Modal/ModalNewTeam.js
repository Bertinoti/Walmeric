import * as yup from 'yup';
import { useFormik } from 'formik';
import { FormControl } from '@mui/material';
import { TextField } from '@mui/material'
import { Button } from '@mui/material';
import { Input } from '@mui/material';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { useAuth } from '../../contexts/authContext';

import '../style/modal.scss'
import { createTeam } from '../../api/axios';
import { getRefUrl } from '../Helpers';


const validationSchema = yup.object({

  teamName: yup
    .string('Enter your email')
    .required("This field is required"),

  country: yup
    .string('Need to insert the Country')
    .required('this field is required')
    .min(3, 'the length is to short'),

  region: yup
    .string('Enter valid password')
    .required("This field is required"),

  logo: yup
    .string(),

});

export default function ModalNewTeam() {
  const { show, setShow, currentUser } = useAuth();

  const handleClose = async () => {
    formik.handleSubmit()
    setShow(false)
  };
  const handleShow = () => setShow(true);

  const formik = useFormik({
    initialValues: {
      teamName: '',
      country: '',
      region: '',
      logo: '',

    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const team = await getRefUrl(values)
      createTeam(currentUser.accessToken, team)
    }

  });


  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <TextField
            fullWidth
            id='teamName'
            name="teamName"
            label='Team Name'
            placeholder='Barcelona Addiction'
            value={formik.values.teamName}
            onChange={formik.handleChange}
            error={formik.touched.teamName ? Boolean(formik.errors.teamName) : undefined}
          />
        </div>
        <FormControl>
          <div className='regionClass row'>
            <div className='col-8'>
              <CountryDropdown
                id="country"
                classes='dropdown'
                name="country"
                value={formik.values.country}
                onChange={(_, e) => formik.handleChange(e)}
                error={formik.touched.country && Boolean(formik.errors.country)}

              />
            </div>
            <div className='col-4'>
              <RegionDropdown
                country={formik.values.country}
                classes='dropdown'
                id="region"
                name="region"
                label="Select region"
                value={formik.values.region}
                onChange={(_, e) => formik.handleChange(e)}
                error={formik.touched.region ? Boolean(formik.errors.region) : undefined}
              />
            </div>
          </div>
        </FormControl>

        <div className=' mt-3 d-flex justify-content-center' >
          <label htmlFor="contained-button-file">
            <Input
              accept="image/*"
              id="logo"
              name='logo'
              type="file"
              onChange={(e) => {
                formik.handleChange(e)
                formik.setFieldValue('logo', e.target.files[0])
              }}
              error={formik.touched.logo ? Boolean(formik.errors.logo) : undefined}
            />
          </label>
        </div>

        <div className=' mt-3 d-flex justify-content-center' >
          <Button color="primary" variant="contained" fullWidth type="submit" onClick={handleClose} >
            Create Team
          </Button>
        </div>
      </form>
    </>
  )
}
