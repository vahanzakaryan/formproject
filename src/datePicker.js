import React from 'react';
import styles from "./styles.js";

function DatePicker(props){
    const classes = styles();
    const {value, updater, maxDate} = props;
    return (
        <>
            <input 
                max = {maxDate}
                value = {value}
                onChange = {updater}
                type="date" 
                id="start" 
                name="trip-start" 
                className={classes.datePicker}
            >
            </input>
        </>
    );
}

export default DatePicker;