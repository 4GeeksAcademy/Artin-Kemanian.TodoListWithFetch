import React, { useState, useEffect } from "react";

//create your first component
const Home = () => {
	const [input1, setInput1] = useState("")
	const [listelements, setListelements] = useState([])
	const addTask = (e) => {
		e.preventDefault();
		let tempList = [...listelements];
		tempList.push({label: input1, done: false});
		setListelements(tempList);
		setInput1("");
		
		fetch('https://assets.breatheco.de/apis/fake/todos/user/ak-tlf', {
			method: "PUT",
			body: JSON.stringify(tempList),
			headers: {
				"Content-Type": "application/json"
			}
			})
			.then(resp => {
				console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
				console.log(resp.status); // el código de estado = 200 o código = 400 etc.
				console.log(resp.text()); // Intentará devolver el resultado exacto como cadena (string)
				return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => {
				//Aquí es donde debe comenzar tu código después de que finalice la búsqueda
				console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
			})
			.catch(error => {
				//manejo de errores
				console.log(error);
    		});
	}
	const deleteTask = (index) => {
		let tempList = listelements.filter((item,indice) => indice !== index);
		setListelements(tempList)

		fetch('https://assets.breatheco.de/apis/fake/todos/user/ak-tlf', {
			method: "PUT",
			body: JSON.stringify(tempList),
			headers: {
				"Content-Type": "application/json"
			}
			})
			.then(resp => {
				console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
				console.log(resp.status); // el código de estado = 200 o código = 400 etc.
				console.log(resp.text()); // Intentará devolver el resultado exacto como cadena (string)
				return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => {
				//Aquí es donde debe comenzar tu código después de que finalice la búsqueda
				console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
			})
			.catch(error => {
				//manejo de errores
				console.log(error);
    		})
	}
	useEffect(()=>{
		fetch('https://assets.breatheco.de/apis/fake/todos/user/ak-tlf', {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
		})
		.then(resp => {
			return resp.json(); //regresa una promesa
		})
		.then(data => {
			//Aquí es donde debe comenzar tu código después de que finalice la búsqueda
			console.log(data)
			setListelements(data)
			
		})
		.catch(error => {
			//manejo de errores
			console.log(error);
		})}, [])

	return (
		<div className="container container-fluid ">
			<div className="header">
				<h1 className="display-2 text-center">todos</h1>
			</div>
			<div className="d-flex justify-content-center">
				<div className="card col-4">
					<ul className="list-group list-group-flush">
						<li className="list-group-item">
							<form onSubmit={addTask} ><input className="border-0 w-100" type="text" onChange={(e) => setInput1(e.target.value)} value={input1}  /></form>
							{listelements.map((item, index) =>
							<li className="list-group-item" key={index} >
								<div className="row">
									<div className="col-9">{item.label}</div>
									<div className="col-3 d-flex justify-content-end"><a className="link-primary" onClick={() => deleteTask(index)}>Borrar</a></div>
								</div>
							</li> )}
						</li>
					</ul>
					<div className="card-footer">
						<p className="numberOfTasks">{listelements.length} tareas</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;