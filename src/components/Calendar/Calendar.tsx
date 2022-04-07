import React, { useState } from 'react';
import './Calendar.css';

function Calendar() {
	const [date, setDate] = useState(new Date());
	let d = date;
	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	return (
		<div className = "calendar" >
			<div id = "days" >{("0" + d.getUTCDate()).slice(-2)}</div> 
			<div id = "months" >{months[d.getUTCMonth()]}</div> 
			<div id = "years" >{d.getUTCFullYear()}</div> 
		</div>
	)
}

export default Calendar;