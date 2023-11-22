import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from 'react-bootstrap/Nav';
import Container from "react-bootstrap/Container";
import axios from "axios";
import './Static/Home.css'
import TodoForm from "./TodoForm";

export const Home = () => {
    const [todos, setTodos] = useState([]);
    const [isAuth, setIsAuth] = useState(false);
//    const access = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk5OTIwODkwLCJpYXQiOjE2OTk2NjE2OTAsImp0aSI6IjAxYWZiNTVlNThlYTQ2NGU4ZTkwNDBiZWY1OGUzMjIzIiwidXNlcl9pZCI6MX0.n0jxpECUbSatRCZhe5eECggfEA95jyUFMHdvdFEWzMg"

    //As long as isAuth doesn't change, it won't activate (except in the first time the page loads)
    //By doing this, you can use a ternary conditional to show which components you want to show
    //depending on whether the user is authorized
    useEffect(() => {
        if (localStorage.getItem('access_token') !== null) {
            setIsAuth(true);
        }
    }, [isAuth]);

    //This either redirects unauthorized users or gets a users saved todos
    useEffect(() => {
        if (localStorage.getItem('access_token') === null) {
             window.location.href = '/login'
        }
        else {
            //This call returns a response object that contains data
            axios.get("https://taskorganizer.net/api/todos/", {
                headers: {
                    'Content-Type': 'applicaton/json',
                    Authorization: 'Bearer ' + localStorage.getItem("access_token")
                    //Authorization: 'Bearer ' + access
                }
            })
                .then((res) => {
                    setTodos(res.data)
                }).catch(() => {
                    alert('not auth')
                })

        };
    }, [])


    return (
        <div>

            <Navbar bg="light" style={{ marginBottom: "20px" }}>
                <Container>
                    <Navbar.Brand href="/">Todo Task Manager</Navbar.Brand>
                    <Nav >
                        <Nav.Link href="/logout">Logout</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <Container>
                <TodoForm todos={todos} setTodos={setTodos} />
            </Container>

        </div>
    );
}


