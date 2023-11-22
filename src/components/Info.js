import Navbar from "react-bootstrap/Navbar"
import Nav from 'react-bootstrap/Nav'
import Container from "react-bootstrap/Container"
import Image from 'react-bootstrap/Image'
import React from 'react'
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';


export const Info = () => {
    const handleClick = () => {
        window.location.href = '/register'
    }

    return (
        <div >
                <Navbar bg="light"  class="d-flex">
                    <Container>
                    <Navbar.Brand style={{ marginLeft: "-50px" }} href="/"> Task Organizer </Navbar.Brand>
                    <Nav>
                        <Nav.Link href="/login">Login</Nav.Link>
                        <Nav.Link href="/register">Register</Nav.Link>
                    </Nav>
                    </Container>
                </Navbar>
                <div class="card text-bg-primary mb-3 py-5 text-center" >
                   <h3>Task Organizer makes it possible to create and manage tasks for daily tasks</h3>
                   <p class="lead"> Simple and easy. All it takes is a clear idea of what needs to get done. </p>
                   <span>
                  <img src="https://i.ibb.co/7vpMp5D/download.png"  width="300px" class="rounded float-left mx-5" alt="checklist"/>
                  <img src="https://i.ibb.co/WfsGTXT/tasks.jpg"  width="200px" class="rounded float-right mx-5" alt="checklist"/>
                  </span>
                </div>
            <div class="text-left mx-5 " >
                   <h2>Manage tasks with ease</h2>
                <ul class="mb-5 mt-3">
                    <h3><li><b>Listing: </b> Easily write out your tasks for projects, chores, or any plan you have</li></h3>
                    <br/>
                    <h3><li><b>Management: </b> It's easy to mark your tasks as complete, edit existing tasks, and delete finished tasks</li></h3>
                    <br />
                    <h3><li><b>Secrity: </b> Creating an account secures your tasks, making it private only to you!</li></h3>
                </ul>
                </div>
                <div class="card text-bg-primary mb-3 py-5 text-center" >
                    <h3>Sign up and get started with Task Organizer today. A world of produtive work awaits!</h3>
                <span class="text"><Button variant="secondary" onClick={handleClick}> Sign up - it's free! </Button></span>
                </div>
                <footer class="text-center text-lg-start bg-light text-muted">
                <section class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
                    <div class="me-5 d-none d-lg-block">
                        <p>What to know more about me? Check out my <a href="https://www.linkedin.com/in/nathan-assefa-profile2023/" variant="light" target="_blank" rel="noreferrer"><Badge bg="primary" width="100px">Linkedln</Badge></a> and my <a href="https://drive.google.com/file/d/1mf7q-182OoLjoCAiEjh-1O7pBzpAWHUQ/view?usp=sharing" variant="light" target="_blank" rel="noreferrer"><Badge bg="secondary" width="100px">Resume</Badge></a></p>
                    </div>
                </section>
                </footer>
        </div>
    )
} 