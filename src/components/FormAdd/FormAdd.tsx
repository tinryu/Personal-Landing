import React, {useState} from 'react';
import './FormAdd.css';


function FormAdd(props: any){
    const [playListId, setPlayListId] = useState('');
    
    function changeList() {
        props.changeInput(playListId);
    }
    function onchangeValue(event: any) {
        setPlayListId(event.target.value)
    }

    return (
        <div className="formAddlistId">
            <div className="switch">
                <button id="btn2"><img src={process.env.PUBLIC_URL +"assets/icon/menu.svg"} id="icon2" alt=""/></button>
            </div>
            <div className="form">
                <input onChange={onchangeValue} className="input" type="text" placeholder="New Playlist ID" value={playListId}/>
                <button onClick={changeList} className="ok"><img src={process.env.PUBLIC_URL +"assets/icon/check.svg"} alt=""/></button>
            </div>
        </div>
    );
}

export default FormAdd;