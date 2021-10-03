import React from 'react';
import axios from 'axios';

const URL = "http://localhost:2001"

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dbUser: [],
            selectedId: null
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        axios.get(`${URL}/users`)
            .then((response) => {
                console.log(response.data)
                this.setState({ dbUser: response.data })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    printUser = () => {
        return this.state.dbUser.map((value, index) => {
            if (this.state.selectedId == value.id) {
                return (
                    <tr>
                        <th>{index + 1}</th>
                        <td><input type="text" ref="editName" defaultValue={value.name}></input></td>
                        <td><input type="text" ref="editEmail" defaultValue={value.email}></input></td>
                        <td><input type="text" ref="editPassword" defaultValue={value.password}></input></td>
                        <td>{value.role}</td>
                        <td><button type="button" onClick={this.btnSave}>Save</button>
                            <button type="button" onClick={this.btnCancel}>Cancel</button></td>
                    </tr>
                )
            } else {
                return (
                    <tr>
                        <th>{index + 1}</th>
                        <td>{value.name}</td>
                        <td>{value.email}</td>
                        <td>{value.password}</td>
                        <td>{value.role}</td>
                        <td><button type="button" onClick={() => this.btnDelete(value.id)}>Delete</button>
                            <button type="button" onClick={() => this.btnEdit(value.id)}>Edit</button></td>
                    </tr>
                )

            }
        })
    }

    btnAdd = () => {
        let name = this.refs.name.value
        let email = this.refs.email.value
        let password = this.refs.password.value
        let role = "users"

        axios.post(`${URL}/users`, {
            name,
            email,
            password,
            role
        }).then((response) => {
            this.getData()
        }).catch((error) => {
            console.log(error)
        })
    }

    btnDelete = (id) => {
        axios.delete(`${URL}/users/${id}`)
            .then((res) => {
                this.getData()
            }).catch((err) => {
                console.log(err)
            })
    }

    btnEdit = (id) => {
        this.setState({ selectedId: id })
    }

    btnCancel = () => {
        this.setState({ selectedId: null })
    }

    btnSave = () => {
        let name = this.refs.editName.value
        let email = this.refs.editEmail.value
        let password = this.refs.editPassword.value

        axios.patch(`${URL}/users/${this.state.selectedId}`, {
            name,
            email,
            password
        }).then((res) => {
            this.getData()
            this.setState({ selectedId: null })
        }).catch((err) => {
            console.log(err)
        })
    }

    render() {
        return (
            <div>
                <div>
                    <label>Name</label>
                    <input type="text" ref="name" placeholder="Your name here"></input>
                    <label>Email</label>
                    <input type="text" ref="email" placeholder="Your email here"></input>
                    <label>Password</label>
                    <input type="text" ref="password" placeholder="Your password here"></input>
                    <button className="btn btn-outline-primary" type="button" onClick={this.btnAdd}>Register</button>
                </div>
                <div>
                    <h2 style={{ textAlign: "center" }}>Users Data</h2>
                    <table className="table table-dark" style={{margin:"auto"}}>
                        <thead>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Role</th>
                            <th>Action</th>
                        </thead>
                        <tbody>
                            {this.printUser()}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default User;