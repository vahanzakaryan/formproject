import React from 'react';
import Button from '@material-ui/core/Button';

function SubmitButton(props){
    const {isDisabled, name, buttFunc} = props;
    return (
        <Button 
            variant="contained" 
            size='large'
            color = {name === 'Cancel' ? 'secondary' : 'primary'}
            disabled={isDisabled}
            onClick = {buttFunc}
        >
            {name}
        </Button>
    );
}

export default SubmitButton;