import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import TodoList from "./TodoList"
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import axios from "axios";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Modal from 'react-bootstrap/Modal';



export default function TodoForm({ todos, setTodos }) {
	const [name, setName] = useState("");
	const [show, setShow] = useState(false);
	const [date, setDate] = useState(new Date());

	//const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAzNjEzNzQxLCJpYXQiOjE2OTQ5NzM3NDEsImp0aSI6ImFjMWI1ZDYyMzVhMTRlZDU4YzdkMDM4YTFhNGQyYzgyIiwidXNlcl9pZCI6MX0.5FbL7LBbzZ_WduYouslTJpyPI4Wtv98IAYkrrpd-CD8"

	const handleChange = e => {
		setName(e.target.value);
	}

	const handleAdd = () => {
		setShow(true)
	}

	const handleClose = () => {
        setShow(false);
    }

	const handleSubmit = e => {
		e.preventDefault()
		console.log(date.toISOString().split('T')[0])
		if (!name) {
			alert("Please provide a valid value for todo");
			return;
		}

		axios.post("https://taskorganizer.net/api/todos/", {
			name: name, date: date.toISOString().split('T')[0]
		},{
			  headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('access_token')
			  }
			}).then((res) => {
			const { data } = res;
			setTodos([
				...todos,
				data
			])
			setShow(false)
		}).catch(() => {
				alert("Something went wrong");
			})
	}

	return <div style={{ display: 'block', position: 'initial' }}>
	<div className="d-grid gap-2 my-3">
	<Button size="lg" type="submit" onClick={handleAdd}> Add Task </Button></div>
	<Modal show={show} onHide={handleClose}>
		<Modal.Header closeButton>
			<Modal.Title> Add Task </Modal.Title>
		</Modal.Header>

		<Modal.Body>
			<Form>
					<FormControl placeholder="New Todo"
						onChange={handleChange}
					/> <br />
					<label className="mx-2"> Date: </label>
					<DatePicker selected={date} onChange={(date) => setDate(date)} /> 
					<small className="mx-2 mt-2">According to UTC Timezone </small>
			</Form>
		</Modal.Body>
		<Modal.Footer>
			<Button type="submit" onClick={handleSubmit}> Add </Button>
		</Modal.Footer>
	</Modal>
		<TodoList todos={todos} setTodos={setTodos} date={date} setDate={setDate} />

	</div>
}