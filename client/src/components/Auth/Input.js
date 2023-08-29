import { Grid, IconButton, InputAdornment, TextField } from '@mui/material'
import React from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
const Input = ({ name, handleChange, label, half, autoFocus, type, handleShowPassword }) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        onChange={handleChange}
        variant='outlined'
        required
        fullWidth
        label={label}
        type={type}
        autoFocus={autoFocus}
        InputProps={name === 'password' ? {
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton onClick={handleShowPassword}>
                {type === 'password' ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </InputAdornment>
          )
        } : null}
      />
    </Grid>
  )
}

export default Input