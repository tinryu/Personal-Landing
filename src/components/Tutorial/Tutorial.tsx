import React from 'react';
import Swal from 'sweetalert2';
import './Tutorial.css';

let Form = {
    title: 'Hướng dẫn thêm playlist',
    showCloseButton: true,
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
        "<div class='form-tutorial'>" +
            "<ol>" +
                "<li>Truy cập playlist youtube, copy link trên đường dẫn</li>" +
                "<li>Link Mẫu: <i>https://www.youtube.com/playlist?list=PL336BQzT35NpG3eXaPEK60DZhwav0ZFIS</i></li>" +
                "<li>Thêm Link youtube và tên playlist để tạo playlist mới</li>" +
            "</ol>" +            
        "</div>",
    focusConfirm: false,
}
function Tutorial(){
    function openForm(){
        Swal.fire(Form)
    }
    return (
        <div className="tutorial">
            <button onClick={openForm} className="btn-form">
                <img src={process.env.PUBLIC_URL +"assets/icon/noel/santa.svg"} alt="" id="icon"/>
            </button>
        </div>
    );
}

export default Tutorial;