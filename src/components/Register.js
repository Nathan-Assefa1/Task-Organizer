import React, {useState} from "react";
import axios from "axios";
import './Static/Register.css'
export const Register = ()  => {
	const [username, setUsername] = useState('')
    const [pass, setPass] = useState('')
    const [secpass, setSecPass] = useState('')
	
	const handleSubmit = async e => {
        e.preventDefault()
        var pattern = /(?=.+[a-zA-Z])(?=.+[a-zA-Z])(?=.+[0-9])(?=.+[_!$@#])/
        if (pass.length < 8 || pass.length > 15) {
            alert("Password is not within character range")
            return;
        }
        if (pattern.test(pass) === false) {
            alert("Password does not satisfy contraints")
            return;
        }
        if (secpass !== pass) {
            alert("Please make sure the passwords match")
            return;
        }
		const user = {
			username: username,
			password: pass
		};
		
        const response = await axios.post('https://taskorganizer.net/api/users/', user, {headers: 
            { 'Content-Type': 'application/json' }, 'Access-Control-Allow-Origin': '*'});
		
		try{
            const { data } = await axios.post('https://taskorganizer.net/api/token/', user ,{headers: 
                { 'Content-Type': 'application/json' }, 'Access-Control-Allow-Origin': '*'
          });
         localStorage.clear();
         localStorage.setItem('access_token', data.access);
         localStorage.setItem('refresh_token', data.refresh);
         window.location.href = '/home';
           
}
		  catch(e){
			  alert(response)
        }
          
			
    }

	return (
		   <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign Up</h3>
            <div class="input-group">
            <div id="first-group">
            <div className="form-group my-3">
                <label>First Name</label>
                <input className="form-control mt-1" 
                placeholder="Enter First Name" 
                name='Name'
                type='text'
                 />
            </div>
            <div className="form-group my-3">
                <label>Last Name</label>
                <input className="form-control mt-1" 
                placeholder="Enter Last Name" 
                name='Name'
                type='text'
                />
            </div>
            <div className="form-group my-3">
                <label>Email</label>
                <input className="form-control mt-1" 
                placeholder="Enter Email" 
                name='Email'  
                type='text'
                 />
            </div>
            </div>
            <span class="input-group-addon"></span>
            <div id="second-group">
            <div className="form-group mt-3">
              <label>Username</label>
              <input className="form-control mt-1" 
                placeholder="Enter Username" 
                name='username'  
                type='text' value={username}
                required 
                onChange={e => setUsername(e.target.value)}/>
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input name='pass' 
                type="pass"     
                className="form-control mt-1"
                placeholder="Enter Password"
                value={pass}
                required
                onChange={e => setPass(e.target.value)}/>
            </div>
             <div className="form-group mt-3">
              <label>Re-enter Password</label>
              <input name='second pass' 
                type="pass"     
                className="form-control mt-1"
                placeholder="Re-enter Password"
                value={secpass}
                required
                onChange={e => setSecPass(e.target.value)}/>
            </div>
            <div class="input-group-append">
                <p id="requirements"><br/>
                Password must satisfy the following requirements: <br/>
                1. Must be between 8-15 characters long <br/>
                2. Must contain uppercase, lowercase, numbers, and special characters (allowed: _!$@#)
                </p>
            </div>
            </div>
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" 
                 className="btn btn-primary">Submit</button>
            </div>
            <div class="py-3 text-center"><small>Have an account? <a href="/login"> Sign In </a></small></div>
          </div>
       </form>
     </div>
	)
}