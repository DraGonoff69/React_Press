import React from 'react'
import { Link } from "react-router-dom";

const NavBar = () => {

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{
                paddingLeft: '5px'
            }}>
                <a className="navbar-brand" href="/General">ReactPress</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/Business">Business</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/Health">Health</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/Entertainment">Entertainment</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/Science">Science</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/Sports">Sports</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/Technology">Technology</a>
                        </li>
                    </ul>
                </div>
                <ul className="nav justify-content-end">
                    <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
                    <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
                </ul>
            </nav>
        </div>
    )

}

export default NavBar
