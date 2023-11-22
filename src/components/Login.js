// Import the react JS packages 
import axios from "axios";
import { useState } from "react";
import "./Static/Login.css"
import Container from "react-bootstrap/Container"

// Define the Login function.

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
     // Create the submit method.
     const submit = async e => {
          e.preventDefault();
          const user = {
                username: username,
                password: password
         };
          // Create the POST requuest
		  try{
              const { data } = await axios.post('https://taskorganizer.net/api/token/', user ,{headers: 
                  { 'Content-Type': 'application/json' }, 'Access-Control-Allow-Origin': '*'
});
         localStorage.clear();
         localStorage.setItem('access_token', data.access);
         localStorage.setItem('refresh_token', data.refresh);
		  window.location.href = '/home'}
		  catch(e){
			  alert("Wrong Username")
		  }
    }

    return(
        <div className="Auth-form-container ">
        <Container>
        <form className="Auth-form" onSubmit={submit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title text-center">Sign In</h3>
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
              <input name='password' 
                type="password"     
                className="form-control mt-1"
                placeholder="Enter Password"
                value={password}
                required
                onChange={e => setPassword(e.target.value)}/>
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" 
                 className="btn btn-primary">Submit</button>
            </div>
            <div class="py-3 text-center"><small>Don't have an account? <a href="/register"> Sign Up </a></small></div>
          </div>
       </form>
       </Container>
     </div>
     )
}