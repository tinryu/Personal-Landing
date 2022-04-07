import React from 'react';
import Calendar from '../Calendar/Calendar';
import Clock from '../Clock/Clock';
import Player from '../Player/Player';

function Home() {
    return (
        <div className="wrapper">
            <Clock/>
            <Calendar/>
            <Player stringId=''/>
        </div>
    );
}
export default Home;