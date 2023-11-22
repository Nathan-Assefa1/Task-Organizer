import {useEffect, useState} from "react"
import axios from "axios";

export const Logout = () => {
	
	useEffect(() => {
		try{
			axios.post('https://taskorganizer.net/logout/',{},{
				headers: 
			{'Content-Type': 'applicatin/json'}},
			{withCredentials: true});
			localStorage.clear();
			window.location.href = '/login'
		}catch(e){
			alert('Something went wrong')
		}
	},[]);
	
	return(
		<div></div>
		)
}