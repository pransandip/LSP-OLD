import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import Navbars from './Navbars';
import { SubUrl } from './../Contants';


const AddUser = () => {

    const notify = () => toast("Password and confirm password did not match.");
    const history = useHistory();
    const { id } = useParams();
    const [rows, setRow] = useState([]);
    const [action, setAction] = useState('hinzufügen'); //add user 

    useEffect(() => {
        if (id != undefined) { getData(); setAction('aktualisieren'); } // update user
        else { setRow([]); setAction('hinzufügen'); }
    }, []);

    const getData = () => {
        //setRow({ name:'ankit', email:'ankit@mail.com', role:'Pforte' , id:'2' });
        console.log(rows);
        let url = SubUrl.viewUser + id + '/';
        let token = localStorage.getItem("auth_token");
        axios.get(url, {
            headers: {
                Authorization: `Token ${token}`
            }
        }).then((response) => {
            if (response.status == 200) {
                console.log('user', response.data);
                setRow(response.data);
            }
        });
    }


    const submit = (e) => {
        e.preventDefault();
        let target = e.target.elements;
        let name = target.name.value;
        let email = target.email.value;
        let password = target.password.value;
        let confirmPassword = target.confirmPassword.value;
        let role = target.role.value;

        const token = localStorage.getItem("auth_token");

        let valid = true;
        if (name == '') { toast("Name is required."); valid = false; }
        if (email == '') { toast("Email is required."); valid = false; }
        else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) { toast("Inccorect email."); valid = false; }
        if (role == '') { toast("Role is required."); valid = false; }
        if (id == undefined && password == '') { toast("Password is required."); valid = false; }
        if (password !== '' && confirmPassword == '') { toast("Confirm Password is required."); valid = false; }
        if (confirmPassword !== '' && password !== confirmPassword) { toast("Password and confirm password did not match."); valid = false; }

        if (!valid) return;

        // console.log('name=',name);
        // console.log('email=',email);
        // console.log('role=',role);
        // console.log('password=',password);return;

        let data = {
            password: password != '' ? password : rows.password,
            is_superuser: false,
            name: name,
            email: email,
            is_active: true,
            is_staff: true,
            role: role,
        }

        const headers = {
            Authorization: 'Token ' + token
        }

        if (id != undefined) {
            console.log('edit');
            const url = SubUrl.addUser + id + '/';
            axios.put(url, data, {
                headers: headers
            }).then((response) => {
                if (response.status == 200) {
                    history.push("/view-user");
                } else {
                    toast("Something went wrong with the Api.")
                }
            });
        } else {
            console.log('add');
            const url = SubUrl.addUser;
            axios.post(url, data, {
                headers: headers
            }).then((response) => {
                if (response.status == 201) {
                    history.push("/view-user");
                } else {
                    toast("Something went wrong with the Api.")
                }
            });
        }
    }

    return (
        <>
            <Navbars />
            <div className="container">
                <br />
                <br />
                <div className="card">
                    <div className="card-header">
                        <h4> {action} Benutzer </h4>
                        {/* add update user  */}
                    </div>
                    <div className="card-body">
                        <form onSubmit={submit}>
                            <div className="row">
                                <div className="col-md-6">
                                    <label> Name  </label>
                                    <input type="text" name="name" className="form-control" defaultValue={rows ? rows.name : ''} />
                                </div>
                                <div className="col-md-6">
                                    <label>  E-Mail  </label>
                                    <input type="text" name="email" className="form-control" defaultValue={rows ? rows.email : ''} />
                                </div>
                                <div className="col-md-6">
                                    <label> Passwort  </label>
                                    <input type="password" name="password" className="form-control" />
                                </div>
                                <div className="col-md-6">
                                    <label> Bestätige das Passwort  </label>
                                    <input type="password" name="confirmPassword" className="form-control" />
                                </div>
                                <div className="col-md-6">
                                    <label> Benutzerrollen {rows ? rows.role : ''} </label>
                                    <select className="form-control" name="role" defaultValue={rows ? rows.role : ''}>
                                        <option value="">Please Select..</option>
                                        <option value="Admin" selected={rows && rows.role == 'Admin' ? true : false} >Admin</option>
                                        <option value="Pforte" selected={rows && rows.role == 'Pforte' ? true : false}> Pforte </option>
                                        <option value="Schrott" selected={rows && rows.role == 'Schrott' ? true : false}>Schrott </option>
                                    </select>
                                </div>
                                <br />
                                <div className="col-md-12">
                                    <br />
                                    {/* <button className="btn btn-default" style={{background: "rgba(0,0,0,.03)"}}>
                                        cancel
                                    </button> */}
                                    <button className="btn btn-primary">
                                        speichern
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )

}

export default AddUser;