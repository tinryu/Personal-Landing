import React from 'react';
import firebase from "firebase";
import Swal from 'sweetalert2'
import { DB_CONFIG } from '../../config/initalFirebase';
import "firebase/auth";
import "firebase/firestore";
import './FormSaveList.css';

class FormSaveList extends React.Component {
    constructor(props) {
        super(props);
        if (!firebase.apps.length) {
            this.app = firebase.initializeApp(DB_CONFIG);
        }
        this.state = {
            name: "",
            id: ""
        };
        this.saveForm = this.saveForm.bind(this);
    }

    onchangeName = event => {
        this.setState({
            name: event.target.value
        })
    }
    onchangeId = event => {
        this.setState({
            id: event.target.value
        })
    }
    randString(l) {
        var result = '';
        var char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charLength = char.length;
        for ( var i = 0; i < l; i++ ) {
            result += char.charAt(Math.floor(Math.random() * charLength));
        }
        return result;
    }
    saveForm() {
        firebase.database().ref('lists/' + this.randString(10)).set({
            name: this.state.name,
            listId : this.state.id 
        }, function(error) {
            if(error) {
                Swal.fire("Eww!","We have problems, fail add!","error");
            } else {
                Swal.fire("Good job!", "You added success new list!", "success");
            }
        });
    }

    render() {
        return (
            <div className="addList">
                <input onChange={this.onchangeName} className="inputName" id="inputName" type="text" placeholder="Playlist Name" value={this.state.name}/>
                <input onChange={this.onchangeId} className="inputId" id="inputId" type="text" placeholder="Playlist ID" value={this.state.id}/>
                <button onClick={this.saveForm} className="saveList" id="saveList"><img src={process.env.PUBLIC_URL +"assets/icon/save.svg"} alt=""/></button>
            </div>
        );
    }
}

export default FormSaveList;