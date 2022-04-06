import React from 'react';
import { useState } from 'react/cjs/react.production.min';
import './FormAdd.css';

// class FormAdd extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             playListId: ''
//         }
//         this.onchangeValue = this.onchangeValue.bind(this);
//         this.changeList = this.changeList.bind(this);
//     }

//     changeList() {
//         this.props.changeInput(this.state.playListId);
//     }
//     onchangeValue = event => {
//         this.setState({
//             playListId: event.target.value
//         })
//     }
    
//     render() {
//         return (
//             <div className="formAddlistId">
//                 <div className="switch">
//                     <button id="btn2"><img src={process.env.PUBLIC_URL +"assets/icon/menu.svg"} id="icon2" alt=""/></button>
//                 </div>
//                 <div className="form">
//                     <input onChange={this.onchangeValue} className="input" type="text" placeholder="New Playlist ID" value={this.state.playListId}/>
//                     <button onClick={this.changeList} className="ok"><img src={process.env.PUBLIC_URL +"assets/icon/check.svg"} alt=""/></button>
//                 </div>
//             </div>
//         );
//     }
    
// }

function FormAdd(props){
    const [playListId, onchangeValue] = useState('');
    
    function changeList() {
        props.changeInput(playListId);
    }
    function onchangeValue(event) {
        console.log('evv', event);
        onchangeValue(event.target.value)
    }

    return (
        <div className="formAddlistId">
            <div className="switch">
                <button id="btn2"><img src={process.env.PUBLIC_URL +"assets/icon/menu.svg"} id="icon2" alt=""/></button>
            </div>
            <div className="form">
                <input onChange={onchangeValue} className="input" type="text" placeholder="New Playlist ID" value={this.state.playListId}/>
                <button onClick={changeList} className="ok"><img src={process.env.PUBLIC_URL +"assets/icon/check.svg"} alt=""/></button>
            </div>
        </div>
    );
}

export default FormAdd;