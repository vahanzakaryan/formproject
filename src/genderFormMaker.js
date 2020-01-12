import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

function GenderForm(props){
    const {updater, value} = props;
    const handleChange = event => {
    updater(event.target.value);
  };
    return (
        <FormControl component="fieldset" error={false}>
        <FormLabel component="legend"><span style={{marginLeft:'26%'}}>Gender</span></FormLabel >
        <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
          <FormControlLabel
            value="female"
            control={<Radio color="secondary" />}
            label="Female"
            labelPlacement="start"
          />
          <FormControlLabel
            value="male"
            control={<Radio color="primary" />}
            label="Male"
            labelPlacement="start"
          />
        </RadioGroup>
        {
            !value ? <FormHelperText>Choose your gender.</FormHelperText> : false

        }
      </FormControl>
    );
}

export default GenderForm;