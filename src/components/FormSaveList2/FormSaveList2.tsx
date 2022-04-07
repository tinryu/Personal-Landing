import React from 'react';
import database from '../../firebase/firebase';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './FormSaveList2.css';

const MySwal = withReactContent(Swal);

class FormSaveList2 extends React.Component {
    constructor(props: any) {
        super(props);
        this.openFormAdd = this.openFormAdd.bind(this);
    }
    randString(l: number) {
        var result = '';
        var char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charLength = char.length;
        for ( var i = 0; i < l; i++ ) {
            result += char.charAt(Math.floor(Math.random() * charLength));
        }
        return result;
    }
    convertLink = (str: string) => {
        var res = '';
        var arr = str.split("list=");
        arr.forEach(el => {
            if(el.indexOf('https:') === -1 || el.indexOf('http:') === -1)
                res = el
        });
        return res;
    }

    openFormAdd = () => {
        const addLsit = async () => {
            const inputNameVal = (document.getElementById('inputName') as HTMLInputElement)? (document.getElementById('inputName') as HTMLInputElement).value : null;
            const inputIdVal = (document.getElementById('inputId') as HTMLInputElement)? (document.getElementById('inputId') as HTMLInputElement).value : null;
            
            let addForm = {
                title: 'Create PlayList Youtube List',
                showCloseButton: true,
                // allowOutsideClick: true,
                // allowEscapeKey: true,
                showClass: {
                    popup: 'swal2-show',
                    backdrop: 'swal2-backdrop-show',
                    icon: 'swal2-icon-show'
                },
                hideClass: {
                    popup: 'swal2-hide',
                    backdrop: 'swal2-backdrop-hide',
                    icon: 'swal2-icon-hide'
                },
                html:
                    "<div class='addList'>" +
                        "<input class='inputName' id='inputName' type='text' placeholder='Playlist Name'/>" +
                        "<input class='inputId' id='inputId' type='text' placeholder='Playlist ID'/>" +
                    "</div>",
                focusConfirm: false,
                preConfirm: () => ({
                    inputName: inputNameVal,
                    inputId: inputIdVal
                })
            }
            const swalval = await MySwal.fire(addForm);
            let v: any = (swalval && swalval.value) || swalval.dismiss; // eslint-disable-next-line
            if(v === 'close' || v === 'backdrop' || v === 'esc') {
                await MySwal.DismissReason.close
            }
            else {
                if (v && v.inputName && v.inputId || v === 'cancel') { // eslint-disable-line
                    if (v !== 'cancel') {
                        database.ref('lists/' + this.randString(10)).set({
                            name: v.inputName,
                            listId : this.convertLink(v.inputId)
                        }, function(error: any) {
                            if(error) {
                                MySwal.fire({ title: 'Eww!', text: 'Have error' + error, icon: "error" });
                            } else {
                                MySwal.fire({ title: 'Good job!', text: 'You added success new list!', icon: "success" });
                            }
                        });
                    }
                } 
                else {
                    await MySwal.fire({ text: 'All fields are required!!', icon: "warning" });
                    addLsit();
                }
            }
        }
        addLsit();
    }

    render() {
        return (
            <div className="addList">
                <button onClick={this.openFormAdd} className="btn-add">
                    <img src={process.env.PUBLIC_URL +"assets/icon/plus.svg"} alt="" id="icon"/>
                </button>
            </div>
        );
    }
}

export default FormSaveList2;