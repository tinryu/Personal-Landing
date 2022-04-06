import React, {useEffect, useState} from 'react';
import { DB_CONFIG } from '../../config/initalFirebase';
import './PlayLists.css';
import firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/firestore';
import 'firebase/database';

function PlayLists(props) {
    if (!firebase.apps.length) {
        firebase.initializeApp(DB_CONFIG);
    }

    const [lists, getLists] = useState([]);

    function openPlaylist(idList) {
        var obj = {
            idList: idList,
            isUpdate: 0
        }
        props.openPlaylist(obj);
    }

    function delPlaylist(id) {
        var obj = {
            idList: id,
            isUpdate: 1
        }
        props.openPlaylist(obj);
    }
    useEffect(() => {
        const interval = setInterval(() => {
            getDatabase()
        },1000);
        return () => clearInterval(interval);

        async function getDatabase() {
            var data = await firebase.database().ref('lists').once('value').then(function (snapshot) {
                return snapshot.val();
            })
            var da = Object.entries(data).map(function(item) {
                item[1].id = item[0];
                return item;
            })
            var arr = da.map((k) => k[1]);
            //Convert Object to Array
            // var arr = Object.keys(data).map((k) => data[k]);
            getLists(arr);
            return arr;
        }
    }, []);

    return (
        <div className="containerList">
            {lists.map(item =>
                <div className="itemList" key={item.listId}>
                    <a href="#hello" onClick={() => openPlaylist(item.listId)}><p>{item.name}</p></a> 
                    <div className="tool-btn">
                        {/* <button onClick={() => this.openPlaylist(item.listId)} className="openPlayList">
                            <img src={process.env.PUBLIC_URL +"assets/icon/open.svg"} alt="open" id="open"/>
                        </button> */}
                        <button onClick={() => delPlaylist(item.id)} className="delPlayList">
                            <img src={process.env.PUBLIC_URL +"assets/icon/trash.png"} alt="del" id="del"/>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PlayLists;