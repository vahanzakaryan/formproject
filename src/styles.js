import {makeStyles} from '@material-ui/core/styles';

const styles = makeStyles({
    mainDiv:{
        paddingBottom: '0px',
        backgroundColor: "white",
        opacity: "0.9",
        width: "70%",
        borderRadius: "10px",
        padding: "2% 5% 5% 5%",
        marginLeft: "14.3%",
        marginTop: "4%",
        boxShadow: "5px 3px 20px black",
        
    },
    mainText:{
        textAlign: "center",
        fontSize: '150%',
        fontWeight: 'bold'
    },
    textFieldDiv:{
        marginTop: "4%",
        marginLeft: "17%",
        paddingBottom: '3.6%'
    },
    emailDiv:{
        marginLeft: '17%',
        marginTop: '1%'
    },
    datePicker:{
        width:'29.5%', 
        height: '54px', 
        fontSize:"130%", 
        textAlign:'center',
        marginLeft: '20%',
    },
    genderDiv:{
        marginTop: '4%',
        marginLeft: '45.5%'
    },
    submitDiv:{
        marginTop: '3%',
        marginLeft: '48.5%'
    },
    genderSpan:{
        marginLeft: '10%'
    },
    birthdaySpan:{
        marginLeft: '60%'
    },
    tableDiv:{
        marginTop: '5%',
    },
    table:{
        width: '100%',
        textAlign:'center',
        borderCollapse: 'collapse',
        color:'white'
    },
    birthDayError:{
        marginLeft:'4%',
        color:'red'
    },

});

export default styles;