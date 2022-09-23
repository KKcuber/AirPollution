import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Facebook as FacebookIcon } from '../icons/facebook';
import { Google as GoogleIcon } from '../icons/google';
import { useState , useEffect } from 'react';
import axios from 'axios';
const Login = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: 'demo@devias.io',
      password: 'Password123'
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email(
          'Must be a valid email')
        .max(255)
        .required(
          'Email is required'),
      password: Yup
        .string()
        .max(255)
        .required(
          'Password is required')
    }),
  });
  const [email, setEmail] = useState("");
  const onSubmit = (event)=> {
    event.preventDefault();
    axios.post('https://sheet.best/api/sheets/73238808-4d9f-40da-b355-7c9d8de72115' , 
    {
      email: email
    }).then((response) => {
      console.log(response);
    }
    
    )
    .catch((error) => {
      console.log(error);
    })
  };

  return (
    <>
      <Head>
        <title>Login | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
        <Container maxWidth="sm">
          <NextLink
            href="/"
            passHref
          >
            <Button
              component="a"
              startIcon={<ArrowBackIcon fontSize="small" />}
            >
              Dashboard
            </Button>
          </NextLink>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography
                color="textPrimary"
                variant="h4"
              >
              Join our mailing list !!
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                Register your email alerts and don't miss on important updates on air quality and pollution.
              </Typography>
            </Box>
           
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email Address"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              type="email"
              value={email}
              onChange = {(event) => setEmail(event.target.value)}
              variant="outlined"
            />
          
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                onClick={onSubmit}
              >
                Subscribe Now
              </Button>
            </Box>
      
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;
