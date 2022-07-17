import React, { useState } from 'react'
import { Avatar, Button, Typography, Paper, Grid, Container } from '@material-ui/core'
import { GoogleLogin } from 'react-google-login'
import useStyles from './styles'
import { useDispatch } from 'react-redux'
import { LockOutlined } from '@material-ui/icons'
import Input from './Input'
import Icon from './Icon'
import { useHistory } from 'react-router-dom'
import { signIn, signUp } from '../../actions/auth'
const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }
const Auth = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [isSignup, setIsSignup] = useState(false)
    const [formData, setFormData] = useState(initialState)
    const classes = useStyles()
    const history = useHistory()
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (isSignup) {
            dispatch(signUp(formData, history))
        } else {
            dispatch(signIn(formData, history))
        }
        // console.log(formData)
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleShowPassword = () => setShowPassword(prev => !prev)
    const handleSignup = () => setIsSignup(prev => !prev)
    const googleSuccess = async (res) => {
        const result = res?.profileObj
        const token = res?.tokenId
        try {
            dispatch({ type: 'AUTH', data: { result, token } })
            history.push('/')
        } catch (error) {
            console.log(error)
        }
    }
    const googleFailure = (err) => {
        console.log(err)
        console.log('google Fail')
    }
    return (
        <Container component="main" maxWidth='xs' >
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar} >
                    <LockOutlined />
                </Avatar>
                <Typography variant='h5' >{isSignup ? 'Sign Up' : 'Sign in'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} autoFocus half />
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password"
                            handleChange={handleChange}
                            handleShowPassword={handleShowPassword}
                            type={showPassword ? "text" : "password"} />
                        {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>

                    <GoogleLogin
                        clientId="365843064339-dk68jjt6u3oa6jfsen1hmcqbbem5ooqt.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button
                                className={classes.googleButton}
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
                        cookiePolicy={'single_host_origin'}
                    />
                    <Grid container justifyContent="flex-end">
                        <Grid item >
                            <Button type="button" onClick={handleSignup}>
                                {isSignup ? 'Already have an account' : 'Dont have an account'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth