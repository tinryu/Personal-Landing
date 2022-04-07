import React, {useEffect, useState} from 'react';
import database from '../../firebase/firebase';
import './PlayLists.css';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})
function PlayLists(props: any) {
    const [lists, getLists] = useState<any[]>([]);

    function openPlaylist(idList: number) {
        var obj = {
            idList: idList,
            isUpdate: 0
        }
        props.openPlaylist(obj);
    }
    function delPlaylist(id: number) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                var obj = {
                    idList: id,
                    isUpdate: 1
                }
                props.openPlaylist(obj);
                Toast.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
    }
    async function getDatabase() {
        let data = await database.ref('lists').once('value').then(function (snapshot) {
            return snapshot.val();
        })
        let da = Object.entries(data).map(function(item: any[]) {
            item[1].id = item[0];
            return item;
        })
        let arr: any = da.map((k) => k[1]);
        //Convert Object to Array
        // var arr = Object.keys(data).map((k) => data[k]);
        getLists(arr);
        return arr;
    }
    useEffect(() => {
        const interval = setInterval(() => {
            getDatabase()
        },1000);
        return () => clearInterval(interval);
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