import React, {useState} from 'react';
import styles from "./styles.js";
import {withStyles} from '@material-ui/core/styles';
import CreateTextfield from "./textfieldCreator";
import DatePicker from './datePicker.js';
import GenderForm from './genderFormMaker.js';
import SubmitButton from './submitButton.js';
import Table from './tableCreator.js'
import './App.css';

function App() {
  const classes = styles();
  document.body.style = 'background: radial-gradient(circle at 50%, #FFDD94 30%, #EAAD5A 90%)';
  const [name, setName] = useState(localStorage.getItem('name'));
  const [surname, setSurname] = useState(localStorage.getItem('surname'));
  const [email, setEmail] = useState(localStorage.getItem('email'));
  const [gender, setGender] = useState(localStorage.getItem('gender'));
  const [birthday, setBirthday] = useState(localStorage.getItem('birthday'));
  const [editMode, setEditMode] = useState(false);
  const [editArray, setEditArray] = useState(false);
  const [editItem, setEditItem] = useState({});
  const [error, setError] = useState({});
  const [activeElem, setActiveElem] = useState('id');
  const [members, setMembers] = useState([
    {id: 1, name: "Aram", surname: "Hovhannisyan", email: "aramhovhannisyan@gmail.com", gender: "male", birthday:'1997-04-16'},
    {id: 4, name: "David", surname: "Sargsyan", email: "davidsargsyan@gmail.com", gender: "male", birthday:'1994-04-04'},
    {id: 5, name: "Ani", surname: "Davtyan", email: "anidavtyan@gmail.com", gender: "female", birthday:'1995-04-16'},
    {id: 0, name: "Mariam", surname: "Hakobyan", email: "mariamhakobyan@gmail.com", gender: "female", birthday:'1999-07-19'},
    {id: 2, name: "Narek", surname: "Khachatryan", email: "narekkhachatryan@gmail.com", gender: "male", birthday:'1990-02-11'}
  ]);

  const nameUpdater = event => (
    setName(event.target.value),
    localStorage.setItem('name', event.target.value)
  );
  const genderUpdater = event => (
    setGender(event.target.value),
    localStorage.setItem('gender', event.target.value)
  );
  const surnameUpdater = event => (
    setSurname(event.target.value),
    localStorage.setItem('surname', event.target.value)
  );
  const emailUpdater = event => (
    setEmail(event.target.value),
    localStorage.setItem('email', event.target.value)
  );
  const birthdayUpdater = event => (
    setBirthday(event.target.value),
    localStorage.setItem('birthday', event.target.value)
  )
  function daysBetweenDates(firstDate, secondDate){
    firstDate = new Date(firstDate);
    secondDate = new Date(secondDate);
    let differenceInTime = secondDate.getTime() - firstDate.getTime();
    let differenceInDays = differenceInTime / (1000 * 3600 * 24);
    return differenceInDays;
  }
  function getCurrentDate(){
    let date = new Date();
    let dateString = date.getFullYear() + "-" + date.getMonth() +1 + "-" + date.getDate();
    return dateString;
  }
  function getAge(birthdayDate){
    let today = getCurrentDate();
    let daysPassed = daysBetweenDates(birthdayDate, today);
    let daysInYear = 365;
    let currentYear = today.slice(0,4);
    let startingYears = -1;
    while(daysInYear < 366){
      daysInYear = daysBetweenDates(currentYear + '-01-01', currentYear + 1 + '-01-01');
      currentYear--;
      startingYears++;
    }
    let daysOfTheYear, age = 0;
    while(daysPassed >= 365){
      daysOfTheYear = 365;
      if(!startingYears){
        daysOfTheYear = 366;
        startingYears = 3;
      }else{
        startingYears--;
      }
      startingYears === 0 ? daysOfTheYear = 366 : daysOfTheYear = 365
      daysPassed = daysPassed - daysOfTheYear;
      age++;
    }
    return age;
  }
  function deleteMember(memberToDelete){
    let newMembers = [];
    members.map(member => {
      if(member.id !== memberToDelete.id){
        newMembers.push(member);
      }
    })
    setMembers(newMembers);
  }
  function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  function addMember(){
    let isFailed = false;
    if(name.length > 12 || name.length < 3){
      error.name = true;
      isFailed = true;
    }else{
      error.name = false;
    }
    if(surname.length > 15 || surname.length < 3){
      error.surname = true;
      isFailed = true;
    }else{
      error.surname = false;
    }
    if(!birthday || getAge(birthday) < 18){
      error.birthday = true;
      isFailed = true;
    }else{
      error.birthday = false;
    }
    if(!validateEmail(email)){
      error.email = true;
      isFailed = true;
    }else{
      error.email = false;
    }
    setEditArray(!editArray);
    setError(error);

    if(!localStorage.getItem('id')){
      localStorage.setItem('id',6);
    }
    if(!isFailed){
      if(!editMode){
        localStorage.setItem('name','');
        localStorage.setItem('surname','');
        localStorage.setItem('email','');
        localStorage.setItem('birthday','');
        localStorage.setItem('gender','');
        members.push({id: localStorage.getItem('id'), name: name, surname: surname, email: email, birthday: birthday, gender: gender});
        setMembers(members);
        setEditArray(!editArray);
        let nextId = +localStorage.getItem('id') + 1;
        localStorage.setItem('id', nextId);
      }else{
        let newMembers = members.map(function(member){
          if(member.id === editItem.id){
            member.name = name;
            member.surname = surname;
            member.birthday = birthday;
            member.gender = gender;
          }
          return member;
        });
        setMembers(newMembers);
        setEditMode(false);
      }
      setName('');
      setSurname('');
      setBirthday('');
      setGender('');
      setEmail('');
    }
  }
  document.body.onkeydown = (event) => {
    if(event.keyCode === 13){
      addMember();
    }
  }
  function enterEditMode(member){
    setEditItem(member);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if(!editMode){
      setName(member.name);
      setSurname(member.surname);
      setEmail(member.email);
      setGender(member.gender);
      setBirthday(member.birthday);
    }
    error.name = error.surname = error.email = error.birthday = error.gender = false;
    setError(error);
    setName(member.name);
    setSurname(member.surname);
    setBirthday(member.birthday);
    setEmail(member.email);
    setGender(member.gender);
    setEditMode(true);
  }
  function cancelEditing(){
    setEditMode(false);
    setName(localStorage.getItem('name'));
    setSurname(localStorage.getItem('surname'));
    setBirthday(localStorage.getItem('birthday'));
    setEmail(localStorage.getItem('email'));
    setGender(localStorage.getItem('gender'));
  }
  function idSortFunc(){
    members.sort(function(a,b){
      return a.id - b.id;
    })
    setMembers(members);
    setActiveElem('id');
  }
  function nameSortFunc(){
    members.sort(function(a,b){
      if(a.name > b.name){
        return 1;
      }else if(a.name < b.name){
        return -1;
      }
      return 0;
    })
    setMembers(members);
    setActiveElem('name');
  }
  function surnameSortFunc(){
    members.sort(function(a,b){
      if(a.surname > b.surname){
        return 1;
      }else if(a.surname < b.surname){
        return -1;
      }
      return 0;
    })
    setMembers(members);
    setActiveElem('surname');
  }
  function emailSortFunc(){
    members.sort(function(a,b){
      if(a.email > b.email){
        return 1;
      }else if(a.email < b.email){
        return -1;
      }
      return 0;
    })
    setMembers(members);
    setActiveElem('email');
  }
  function genderSortFunc(){
    members.sort(function(a,b){
      if(a.gender > b.gender){
        return 1;
      }else if(a.gender < b.gender){
        return -1;
      }
      return 0;
    })
    setMembers(members);
    setActiveElem('gender');
  }
  function ageSortFunc(){
    members.sort(function(a,b){
      return getAge(b.birthday) - getAge(a.birthday);
    })
    setMembers(members);
    setActiveElem('age');
  }
  return (
    <div className = {classes.mainDiv}>
      <p className={classes.mainText}>
        {
          editMode ? "Edit user info" : "Add new user"
        }
      </p>
      <div className={classes.textFieldDiv}>
        <CreateTextfield outline="Name" text = {name} onChangeEvent = {nameUpdater} error = {error.name} helpertext = {"From 3 to 12 characters"}/>
        <CreateTextfield outline="Surname" text = {surname} onChangeEvent = {surnameUpdater} error = {error.surname} helpertext = {"From 3 to 15 characters"}/>
      </div>
      <div>
        <span className = {classes.birthdaySpan}>
          Birthday
        </span>
        <span className={classes.birthDayError}>
          {error.birthday ? "Age starting from 18" : ""}
        </span>
      </div>
      <div className={classes.emailDiv}>
        <CreateTextfield outline="E-mail" text={email} onChangeEvent = {emailUpdater} error = {error.email} helpertext = {"Enter valid email"}/>
        <DatePicker value = {birthday} updater = {birthdayUpdater} maxDate = {getCurrentDate()}/>
      </div>
      <div className={classes.genderDiv}>
        <GenderForm value = {gender} updater = {genderUpdater}/>
      </div>
      <div className={classes.submitDiv}>
        <SubmitButton isDisabled={!(name && surname && birthday && gender && email)} name = {editMode ? "Save" : "Add"} buttFunc = {addMember}/>
      </div>
      {editMode ? <>
        <div className={classes.submitDiv}>
          <SubmitButton isDisabled={!(name && surname && birthday && gender && email)} name = "Cancel" buttFunc = {cancelEditing}/>
        </div>
      </> : false}
      <div className = {classes.tableDiv}>
        <Table members = {members} getAge = {getAge} memberDeleter = {deleteMember} editMode = {enterEditMode} sortById = {idSortFunc} sortByName = {nameSortFunc} sortBySurname = {surnameSortFunc} ageSortFunc = {ageSortFunc} sortByGender = {genderSortFunc} sortByEmail = {emailSortFunc} activeElem = {activeElem}/>
      </div>
    </div>
  );
}

export default withStyles(styles)(App);
