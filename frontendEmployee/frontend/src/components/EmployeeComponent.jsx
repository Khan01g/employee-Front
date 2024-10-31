import React, { useEffect, useState } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService'
import { useNavigate, useParams} from 'react-router-dom'

const EmployeeComponent = () => {

  const [firstName, setFirstName] =useState('')
  const [lastName, setLastName] =useState('')
  const [email, setEmail] =useState('')

  const {id} = useParams();
  const [error,setErrors] = useState({
    firstName:'',
    lastName:'',
    email:''
  })

  const navigator = useNavigate();

   useEffect(() => {
    if(id){
      getEmployee(id).then((reponse) => {
        setFirstName(reponse.data.firstName);
        setLastName(reponse.data.lastName);
        setEmail(reponse.data.email);
      }).catch(error => {
        console.error(error)
      })
    }
   }, [id])

function handleFirstName(e){
  setFirstName(e.target.value);
}
function handleLastName(e){
  setLastName(e.target.value);
}
function handleEmail(e){
  setEmail(e.target.value);
}
function saveOrUpdateEmployee(e){

  e.preventDefault();

  if(validateForm()){
    const employee ={firstName, lastName, email}
  console.log(employee)

    if(id){
      updateEmployee(id, employee).then((response) => {
        console.log(response.data)
        navigator('/employees')}).catch(error => console.error(error));
    }else{
      createEmployee(employee).then((response) => {
        console.log(response.data);
        navigator('/employees').catch(error => console.error(error));
      })
    }
  
  }
  
}

function validateForm(){
  let valid =  true
  
  const errorCopy = {...error};  // Spread function
  if(firstName.trim()){
    errorCopy.firstName='';
  }else{
    errorCopy.firstName = 'First name is required';
    valid = false;
  }
  if(lastName.trim()){
    errorCopy.lastName='';
  }else{
    errorCopy.lastName = 'Last name is required';
    valid = false;
  }
  if(email.trim()){
    errorCopy.email='';
  }else{
    errorCopy.email = 'Email is required';
    valid = false;
  }

  setErrors(errorCopy);
  return valid;
}

function pageTitle(){
  if(id){
    return <h2 className='text-center'>Update Employee</h2>
  }else{
    return <h2 className='text-center'>Add Employee</h2>
  }
}

  return (
    <div className='container'>
      <br/> <br/>
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          {pageTitle()}
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label htmlFor="form-label">First Name</label>
                <input type="text" name="firstName" id="" value={firstName}
                  placeholder='Enter Employee first name'
                  className={`form-control ${error.firstName ? 'is-invalid':''}`}
                  onChange={handleFirstName}
                >
                </input>
                {error.firstName && <div className='invalid-feedback'>{error.firstName}</div>}
              </div>

              <div className="form-group mb-2">
                <label htmlFor="form-label">Last Name</label>
                <input type="text" name="lastName" id="" value={lastName}
                 placeholder='Enter Employee last name'
                 className={`form-control ${error.lastName ? 'is-invalid':''}`} 
                 onChange={handleLastName}
                 />
                {error.lastName && <div className='invalid-feedback'>{error.lastName}</div>}
              </div>

              <div className="form-group mb-2">
                <label htmlFor="form-label">Enter the employee Email</label>
                <input type="email" name="email" id="" value={email}
                 placeholder='Enter Employee email'
                 className={`form-control ${error.email ? 'is-invalid':''}`} 
                 onChange={handleEmail}
                />
                {error.email && <div className='invalid-feedback'>{error.email}</div>}
              </div>
              <button className='btn btn-success' onClick={saveOrUpdateEmployee}>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeComponent
