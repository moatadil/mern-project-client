import React, { useEffect, useState } from 'react'
import { AppBar, Typography, Toolbar, Button, Avatar } from '@material-ui/core'
import useStyles from './styles'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import decode from 'jwt-decode'
import memoriesLogo from '../../images/memories-Logo.png'
import memoriesText from '../../images/memories-Text.png'

const Navbar = (props) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const classes = useStyles()
    const dispatch = useDispatch()
    const location = useLocation()
    const history = useHistory()
    const logoutHandler = () => {
        try {
            dispatch({ type: 'LOGOUT' })
            history.push('/')
            setUser(null)
        } catch (error) {
            console.log(error)
        }
    }
    const token = user?.token
    useEffect(() => {
        if (token) {
            if (token) {
                const decodedToken = decode(token)
                if (decodedToken.exp * 1000 < new Date().getTime()) {
                    logoutHandler()
                }
            }
        }
        setUser(JSON.parse(localStorage.getItem('profile')))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location, token])
    return (
        <AppBar className={`${classes.appBar}`} position='static' color='inherit'>
            <Link to='/' className={classes.brandContainer} >
                <img src={memoriesText} className={classes.image} alt='Text' height='45px' />
                <img src={memoriesLogo} className={classes.image} alt='Logo' height='45px' />
            </Link>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user?.result?.name} src={user?.result?.imageUrl}>{user?.result?.name?.charAt(0).toUpperCase()}</Avatar>
                        <Typography className={classes.userName} variant='h6' >{user?.result?.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logoutHandler}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign in</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar