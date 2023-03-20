import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import crtcTheme from '../crtcTheme';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CountrySelect from './CountrySelect';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { enqueueSnackbar, useSnackbar } from 'notistack';



const theme = crtcTheme();

export default function SignUp() {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // console.log({
        //     firstName: data.get('firstName'),
        //     lastName: data.get('lastName'),
        //     email: data.get('email'),
        //     password: data.get('password'),
        //     'confirm-password': data.get('confirm-password'),
        //     age: age,
        //     educationLevel: education,
        //     country: country,
        //     occupation: data.get('occupation')

        // });
        enqueueSnackbar(`Account created`, { variant: 'success' }); //won't work, perhaps these should be combined into one container 
        navigate('/', { replace: true });
    };

    const [education, setEducation] = useState('');
    const handleEducation = (event) => {
        setEducation(event.target.value);
    }

    const [country, setCountry] = useState('');
    const handleCountry = (i) => {
        setCountry(i);
    }

    const [age, setAge] = useState('');
    
    

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        my:6,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >

                    <Typography component="h1" variant="h4">Creative Reasoning Test</Typography>

                    <Box sx={{ m: 1.5 }} />

                    <Typography component="h1" variant="h5">Sign up</Typography>

                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="confirm-password"
                                    label="Confirm Password"
                                    type="password"
                                    id="confirm-password"
                                />
                            </Grid>

                            <Grid item xs={4}>
                                <TextField
                                    id="age"
                                    onChange={(e)=>setAge(e.target.value)}
                                    label="Age"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>

                            <Grid item xs={8}></Grid>

                            <Grid item xs={9}>
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="educationLevel-Label">Education Level</InputLabel>
                                        <Select
                                            labelId="educationLevel"
                                            id="educationLevel"
                                            value={education}
                                            label="Education Level"
                                            onChange={handleEducation}
                                        >
                                            <MenuItem value={"Grades 1-6"}>Grades 1-6</MenuItem>
                                            <MenuItem value={"Grades 7-8"}>Grades 7-8</MenuItem>
                                            <MenuItem value={"Grades 9-12"}>Grades 9-12</MenuItem>
                                            <MenuItem value={"Bachelor's Degree"}>Bachelor's Degree</MenuItem>
                                            <MenuItem value={"Master's Degree"}>Master's Degree</MenuItem>
                                            <MenuItem value={"Doctorate"}>Doctorate</MenuItem>
                                            <MenuItem value={"Post-Doctorate"}>Post-Doctorate</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Grid>

                            <Grid item xs={3}></Grid>

                            <Grid item xs={9}>
                                <CountrySelect handleCountry={handleCountry} />
                            </Grid>

                            <Grid item xs={3}></Grid>

                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="occupation"
                                    name="occupation"
                                    fullWidth
                                    id="occupation"
                                    label="Occupation"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="client"
                                    name="client"
                                    fullWidth
                                    id="client"
                                    label="Institution"
                                    placeholder="Leave blank if you're a private user"
                                />
                            </Grid>

                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>

            </Container>
        </ThemeProvider>
    );
}
