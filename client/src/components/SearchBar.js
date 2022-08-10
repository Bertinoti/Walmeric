import React from 'react'
import * as yup from 'yup';
import { useFormik } from 'formik';
import SearchIcon from '@mui/icons-material/Search';
import { Alert, IconButton, Input } from '@mui/material'


export const SearchBar = () => {

  const validationSchema = yup.object({

    inputSearch: yup
      .string()
      .min(3, 'for search you need to write more than 3 letters'),
  });

  const formik = useFormik({
    initialValues: {
      inputSearch: '',
    },

    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values)
      const team = { teamName: values.inputSearch }
      // const { data } = await searchTeam(currentUser.accessToken, team)
      // setResults(data)
    }
  });

  return (
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
                placeholder="Search Friend"
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
      </div>
    </div>
  )
}
