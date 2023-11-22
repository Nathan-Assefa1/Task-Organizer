import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import ListGroup from "react-bootstrap/ListGroup";
import Modal from "react-bootstrap/Modal";
import { MdCheckBox, MdCheckBoxOutlineBlank, MdDelete, MdEdit } from "react-icons/md";
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
export default function TodoList({ todos = [], setTodos, date, setDate }) {
    const [show, setShow] = useState(false);
    const [record, setRecord] = useState(null);
	//const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAzNjEzNzQxLCJpYXQiOjE2OTQ5NzM3NDEsImp0aSI6ImFjMWI1ZDYyMzVhMTRlZDU4YzdkMDM4YTFhNGQyYzgyIiwidXNlcl9pZCI6MX0.5FbL7LBbzZ_WduYouslTJpyPI4Wtv98IAYkrrpd-CD8"
    const handleClose = () => {
        setShow(false);
    }

    const handleDelete = (id) => {
        axios.delete(`https://taskorganizer.net/api/todos/${id}/`, {
			  headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('access_token')
			  }
			})
            .then(() => {
                const newTodos = todos.filter(t => {
                    console.log(t.id !== id)
                    return t.id !== id
                });
                setTodos(newTodos);
            }).catch(() => {
                alert("Something went wrong");
            })
    }

    const handleUpdate = async (id, value) => {
        return axios.patch(`https://taskorganizer.net/api/todos/${id}/`, value,{
			  headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('access_token')
			  }
			})
            .then((res) => {
                const { data } = res;
                const newTodos = todos.map(t => {
                    if (t.id === id) {
                        return data;
                    }
                    return t;
                })
                setTodos(newTodos);
            }).catch(() => {
                alert("Something went wrong");
            })
    }

    const renderListGroupItem = (t) => {
        return <ListGroup.Item key={t.id} className="d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-center">
                <span style={{
                    marginRight: "12px", cursor: "pointer"
                }} onClick={() => {
                    handleUpdate(t.id, {
                        completed: !t.completed
                    })
                }}>
                    {t.completed === true ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
                </span>
                <span>
                    {t.name}
                </span>
            </div>
            <div>
                <span className="mx-3">
                    {t.date}
                </span>
                <MdEdit style={{
                    cursor: "pointer",
                    marginRight: "12px"
                }} onClick={() => {
                    setRecord(t);
                    setShow(true);
                }} />
                <MdDelete style={{
                    cursor: "pointer"
                }} onClick={() => {
                    handleDelete(t.id);
                }} />
            </div>
        </ListGroup.Item>
    }

    const handleChange = (e) => {
        setRecord({
            ...record,
            name: e.target.value
        })
    }

    const handleSaveChanges = async () => {
        await handleUpdate(record.id, { name: record.name, date: date.toISOString().split('T')[0] }, );
        handleClose();
    }

    let current_date = new Date().toISOString().split('T')[0]
    const inbox_incompleteTodos = todos.filter(t => t.completed === false && t.date <= current_date);
    const inbox_completedTodos = todos.filter(t => t.completed === true && t.date <= current_date);
    const future_completedTodos = todos.filter(t => t.completed === true && t.date > current_date);
    const future_incompleteTodos = todos.filter(t => t.completed === false && t.date > current_date);
   
    return <div>
        <Tab.Container defaultActiveKey="inbox">
        <Nav fill variant="pills" id="Pills">
            <Nav.Item>
                <Nav.Link eventKey="inbox" >Inbox</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="upcoming">Upcoming</Nav.Link>
            </Nav.Item>
        </Nav>
        <Tab.Content>
            <Tab.Pane eventKey="inbox">
                    <div className="mb-2 mt-4">
                        Incomplete Todos ({inbox_incompleteTodos.length})
                    </div>
                    <ListGroup>
                        {inbox_incompleteTodos.map(renderListGroupItem)}
                    </ListGroup>
                    <div className="mb-2 mt-4">
                        Completed Todos ({inbox_completedTodos.length})
                    </div>
                    <ListGroup>
                        {inbox_completedTodos.map(renderListGroupItem)}
                    </ListGroup>
            </Tab.Pane>
            <Tab.Pane eventKey="upcoming">
                    <div className="mb-2 mt-4">
                        Incomplete Todos ({future_incompleteTodos.length})
                    </div>
                    <ListGroup>
                        {future_incompleteTodos.map(renderListGroupItem)}
                    </ListGroup>
                    <div className="mb-2 mt-4">
                        Completed Todos ({future_completedTodos.length})
                    </div>
                    <ListGroup>
                        {future_completedTodos.map(renderListGroupItem)}
                    </ListGroup>
                   
            </Tab.Pane>
            </Tab.Content>
        </Tab.Container>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Todo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormControl value={record ? record.name : ""}
                    onChange={handleChange}
                />
                <label className="mx-2"> Date: </label>
                <DatePicker className="my-3" timeZoneName={'America/Cancun'} selected={date} onChange={(date) => setDate(date)} />
                <small className="mx-2 mt-2">According to UTC Timezone </small>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSaveChanges}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
        
    </div>
}