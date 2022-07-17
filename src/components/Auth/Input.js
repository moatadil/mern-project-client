import React from 'react'
import { TextField, Grid, InputAdornment, IconButton } from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
const Input = ({ half, name, type, label, handleChange, autoFocus, handleShowPassword }) => {
    return (
        <Grid item xs={12} sm={half ? 6 : 12} >
            <TextField
                name={name}
                variant="outlined"
                required fullWidth
                label={label}
                InputProps={name === 'password' ? {
                    endAdornment: (
                        <InputAdornment position="end" >
                            <IconButton onClick={handleShowPassword} >
                                {type === 'password' ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    )
                } : null}
                type={type ?? 'text'}
                onChange={handleChange}
                autoFocus={autoFocus} />
        </Grid>
    )
}

export default Input