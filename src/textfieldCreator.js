import React from 'react';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';
import styles from './styles';

function CreateTextfield(props){
    const {error, helpertext} = props;
    return (
        <TextField 
            error = {error}
            style={props.outline === "Name" || props.outline === "Surname" ? {paddingRight: '20%', width: '30%'} : {width: '30%'}}
            id="outlined-basic" 
            label={props.outline} 
            variant="outlined" 
            size="medium"
            value={props.text}
            onChange={props.onChangeEvent}
            helperText = {error ? helpertext : ""}
        />
    );
}

export default CreateTextfield;