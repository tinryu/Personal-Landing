import React from 'react';
import './Nav.css';

class Nav extends React.Component {
    render() {
        return (
            <nav role="navigation">
                <div id="menuToggle">
                    <input className="checkbox" type="checkbox" />
                    <span></span><span></span><span></span>
                    <div className="rightMenu">
                        <ul>
                            <li>Home</li>
                            <li>About Us</li>
                            <li>Gallery</li>
                            <li>Skills</li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
    
}

export default Nav;