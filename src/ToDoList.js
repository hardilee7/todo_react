import React from 'react';
import axios from 'axios'; //import library axios untuk mengambil data ke API server

const URL = "http://localhost:2001"

class ToDoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dbTodo: [],
            selectedId: null
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        axios.get(`${URL}/toDo`)
            .then((response) => {
                console.log(response.data)
                this.setState({ dbTodo: response.data })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    printToDo = () => {
        return this.state.dbTodo.map((value, index) => {
            if (this.state.selectedId == value.id) {
                return (
                    <tr>
                        <th>{index + 1}</th>
                        <td><input type="text" ref="editKegiatan" defaultValue={value.kegiatan}></input></td>
                        <td><input type="text" ref="editDetail" defaultValue={value.detail}></input></td>
                        <td><button className="btn btn-outline-primary btn-sm" type="button" onClick={this.btnSave}>Save</button>
                            <button className="btn btn-outline-warning btn-sm" type="button" onClick={this.btnCancel}>Cancel</button></td>
                    </tr>
                )
            }
            else {
                return (
                    <tr>
                        <th>{index + 1}</th>
                        <td>{value.kegiatan}</td>
                        <td>{value.detail}</td>
                        <td><button className="btn btn-danger btn-sm" type="button" onClick={() => this.btnDelete(value.id)}>Delete</button>
                            <button className="btn btn-primary btn-sm" type="button" onClick={() => this.btnEdit(value.id)}>Edit</button></td>
                    </tr>
                )
            }

        })
    }

    btnAdd = () => {
        let kegiatan = this.refs.addKegiatan.value
        let detail = this.refs.addDetail.value

        axios.post(`${URL}/toDo`, {
            kegiatan,
            detail
        }).then((response) => {
            this.getData()
        }).catch((error) => {
            console.log(error)
        })
        // this.state.dbTodo.push({ kegiatan, detail })
        // this.setState({ dbTodo: this.state.dbTodo })
        // let temp = [...this.state.dbTodo]

        // temp.push({ kegiatan, detail })

        // this.setState({ dbTodo: temp })
    }

    btnDelete = (id) => {
        axios.delete(`${URL}/toDo/${id}`)
            .then((res) => {
                this.getData()
            }).catch((err) => {
                console.log(err)
            })
        // let temp = [...this.state.dbTodo]
        // temp.splice(idx,1)
        // this.setState({dbTodo: temp})

        // this.state.dbTodo.splice(idx, 1)
        // this.setState({ dbTodo: this.state.dbTodo })

    }

    btnEdit = (id) => {
        this.setState({ selectedId: id })
    }

    btnCancel = () => {
        this.setState({ selectedId: null })
    }

    btnSave = () => {
        let kegiatan = this.refs.editKegiatan.value
        let detail = this.refs.editDetail.value

        axios.patch(`${URL}/toDo/${this.state.selectedId}`, {
            kegiatan,
            detail
        }).then((res) => {
            this.getData()
            this.setState({ selectedId: null })
        }).catch((err) => {
            console.log(err)
        })

        // this.state.dbTodo[this.state.selectedIndex].kegiatan = this.refs.editKegiatan.value
        // this.state.dbTodo[this.state.selectedIndex].detail = this.refs.editDetail.value
        // this.setState({ dbTodo: this.state.dbTodo, selectedIndex: null })
    }

    render() {
        return (
            <div style={{ width: "70vw", margin: "auto", border: "1px solid gray", overflow:"auto"}}>
                <h2 style={{ textAlign: "center" }}>To Do List</h2>
                <table className="table" style={{ margin: "auto" }}>
                    <thead className="thead-dark">
                        <th>No</th>
                        <th>Kegiatan</th>
                        <th>Detail</th>
                        <th>Button</th>
                    </thead>
                    <tbody>
                        {this.printToDo()}
                    </tbody>
                    <tfoot>
                        <th>#</th>
                        <th><input type="text" placeholder="Kegiatan Baru" ref="addKegiatan" /></th>
                        <th><input type="text" placeholder="Detail" ref="addDetail" /></th>
                        <th><button className="btn btn-outline-success btn-sm" type="button" onClick={this.btnAdd}>Add</button></th>
                    </tfoot>
                </table>
            </div>
        );
    }
}

export default ToDoList;