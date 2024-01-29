import React from "react";
import './style.css';
import {Link, useLocation, useNavigate, useParams} from 'react-router-dom';

function Navbar() {
    const { id } = useParams();
    const location = useLocation();
    // Определите функцию, которая будет проверять, является ли маршрут активным
    const isButtonActive = (path) => {
        return location.pathname === `/project/${id}/${towerSegment}/${path}`;
    };
    const currentURL = location.pathname;
    const segments = currentURL.split('/');
    const towerSegment = segments[3];
    const navigate = useNavigate();
    const handleButtonClick = (path) => {
        navigate(`/project/${id}/${towerSegment}/${path}`);
    };

    const tower = ["assemble", "without", "with", "gltf", "upload", "render"]
    const villa = ["without", "with", "gltf", "upload", "render"]


    return (

        <div className="App">
                        
            {/* <div className="div-title">
                <h1 className="title"><Link to={`/project/${id}`}> Вернутся </Link></h1>
            </div> */}
            <div className="buttons">
                {
                    towerSegment === "tower" ? (
                        tower.map((item) => (
                                <button
                                    key={item}
                                    className={isButtonActive(item) ? "button-active" : ""}
                                    onClick={() => handleButtonClick(item)}
                                >
                                    <h1 className="buttons_h1_2">{item}</h1>
                                </button>
                            ))
                    ):(
                        villa.map((item) => (
                                <button
                                    key={item}
                                    className={isButtonActive(item) ? "button-active" : ""}
                                    onClick={() => handleButtonClick(item)}
                                >
                                    <h1 className="buttons_h1_2">{item}</h1>
                                </button>
                            ))
                    )
                }

            </div>
        </div>
    )
}

export default Navbar
