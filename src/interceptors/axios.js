import axios from "axios";
let refresh = false;
axios.interceptors.response.use(resp => resp, async error => {
  if (error.response.status === 401 && !refresh) {
     refresh = true;
     const response = await   
         axios.post('https://taskorganizer.net/api/refresh/', {      
                      refresh:localStorage.getItem('refresh_token')
           }, {
               headers: {
                   'Content-Type': 'application/json'
               },
             'Access-Control-Allow-Origin': '*'
           });
    if (response.status === 200) {
       localStorage.setItem('access_token', response.data.access);
       localStorage.setItem('refresh_token', response.data.refresh);
       return axios(error.config);
    }
  }
refresh = false;
return error;
});