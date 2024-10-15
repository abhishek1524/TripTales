import React,{useState} from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container} from '@material-ui/core';
import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './input';
// import Icon from './icon';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
// import { GoogleOAuthProvider } from '@react-oauth/google';
// import { GoogleLogin, googleLogout } from '@react-oauth/google';
import {signin,signup} from '../../actions/auth';
const initialState = { firstName:'', lastName:'', email:'', password:'', confirmPassword:''};

const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    
    const [isSignup, setIsSignup] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const [formData, setFormData] = useState(initialState);
    const handleShowPassword = ()=> setShowPassword((prevShowPassword)=>!prevShowPassword);

    const handleSubmit = (e)=>{
        e.preventDefault();
   
        if(isSignup){
            dispatch(signup(formData,history));
        }
        else{
            dispatch(signin(formData,history));
        }
    };
    const handleChange = (e)=>{
        setFormData({  ...formData, [e.target.name]:e.target.value})
    }
    const switchMode = ()=>{
        setIsSignup((prevIsSignup)=> !prevIsSignup);
        setShowPassword(false);
    }

    // const googleSuccess = async (res)=>{
        // console.log(res);
        // const result = jwt_decode(res?.credential);
    //     const result = jwt_decode(res?.credential); // ?. does not throw error if obj does not exist it throws undefined
    //     console.log(result);

    //     try {
    //         dispatch({ type: 'AUTH', data: { result }});
    //         history.push('/');
    //     } catch (error) {
    //         console.log(error)
    //     }
    // };

    // const googleFailure = ()=>{
    //     console.log('Google Sign In unsuccessful. Try agian later');
    // }
  return (
    <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {
                        isSignup && (
                            <>
                            <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                            <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                            </>
                    )}
                    <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                    <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                    { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                </Grid>
                
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                    {isSignup ? 'Sign Up' : 'Sign In'}
                </Button>
                
                {/* <GoogleOAuthProvider clientId="637519503387-oetjl175m44ak5j6dllbq4e7ih75u3ld.apps.googleusercontent.com"></GoogleOAuthProvider> */}
                {/* <GoogleLogin 
                clientId = "637519503387-oetjl175m44ak5j6dllbq4e7ih75u3ld.apps.googleusercontent.com"
                render={(renderProps)=>(
                    <Button className={classes.googleButton} 
                    color="primary" 
                    fullWidth 
                    onClick={renderProps.onClick} 
                    disabled={renderProps.disabled} 
                    startIcon={<Icon />} 
                    variant="contained"
                    >
                    Google Sign In
                    </Button>
                )}
                onSuccess={googleSuccess}
                onFailure={googleFailure}
                cookiePolicy='single_host_origin'
                /> */}
                <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? 'Already have an account? Sign In' : "don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                </Grid>
            </form>
        </Paper>
    </Container>
  )
}

export default Auth


// video on 3:16 -> see new google auth vid.