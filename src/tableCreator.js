import React from 'react';
import styles from "./styles.js";
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import './App.css';

function Table(props){
    const classes = styles();
    const {members, getAge, memberDeleter, editMode, sortById, sortByName, sortBySurname, ageSortFunc, sortByGender, sortByEmail} = props;
    return (
        <>
        {
            members.length ? <>
                <table className = {classes.table}>
            <tr>
                <th onClick = {sortById}>
                    ID
                </th>
                <th onClick = {sortByName}>
                    Name
                </th>
                <th onClick = {sortBySurname}>
                    Surname
                </th>
                <th onClick = {sortByEmail}>
                    Email
                </th>
                <th onClick = {sortByGender}>
                    Gender
                </th>
                <th onClick = {ageSortFunc}>
                    Age
                </th>
                <th>
                    Actions
                </th>
            </tr>
            {
                members.map(member => <>
                    <tr>
                        <td>
                            {member.id}
                        </td>
                        <td>
                            {member.name}
                        </td>
                        <td>
                            {member.surname}
                        </td>
                        <td>
                            {member.email}
                        </td>
                        <td>
                            {member.gender === 'male' ? 'Male' : 'Female'}
                        </td>
                        <td>
                            {getAge(member.birthday)}
                        </td>
                        <td>
                            <Fab 
                                color="primary" 
                                aria-label="edit" 
                                size = 'small'
                                style={{backgroundColor:'white'}}
                                onClick = {() => editMode(member)}
                            >
                                <EditIcon 
                                    style={{color:'rgb(255, 134, 74)'}}
                                />
                            </Fab>
                            <IconButton 
                                aria-label="delete" 
                                color="primary" 
                                size="medium"
                                onClick = {() => memberDeleter(member)}
                            >
                                <DeleteIcon 
                                    fontSize='large'
                                    style={{color:'white'}}
                                />
                            </IconButton>
                        </td>
                    </tr>
                </>)
            }
        </table>
            </> : false
        }
        </>
    );
}

export default Table;