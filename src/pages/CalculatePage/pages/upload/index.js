import React, {useContext, useState} from 'react';
import Navbar from '../../components/Navbar';
import './styleu.css';
// import { getData, setData } from '../../components/Utils/getLocalstorage';
import {useParams} from "react-router-dom";
import AuthContext from "../../../../context/AuthContext";

const Upload = () => {
    const [inputValue10, setInputValue10] = useState(0);
    const { id } = useParams();
    const { authTokens } = useContext(AuthContext);

    const handleInputChange = (event) => {
        let newValue = event.target.value;
        if (/^0/.test(newValue)) {
            // Удаляем начальные нули
            newValue = newValue.replace(/^0+/, '');
        }

        if (!newValue || isNaN(newValue)) {
            newValue = 0;
        } else if (newValue > 1000) {
            newValue = 1000;
        }

        setInputValue10(newValue);
        // setData('inputValue10', newValue);
    };



    const calculateResult = () => {
        let result = parseInt(inputValue10);

        result *= 90;

        let timestamp = result;
        let hours = Math.floor(timestamp / 60 / 60);
        let minutes = Math.floor(timestamp / 60) - hours * 60;
        let seconds = timestamp % 60;
        var formatted = [
            hours.toString().padStart(2, '0'),
            minutes.toString().padStart(2, '0'),
            seconds.toString().padStart(2, '0'),
        ].join(':');

        const minutes1 = minutes / 60;
        const bal1 = hours + parseFloat(minutes1.toFixed(2));
        const bal = parseFloat(bal1.toFixed(2));

        const qwerty = [formatted, bal];

        return qwerty;
    };
    const handleSaveClick = async () => {
        const ProjectUpdateConfirmed = window.confirm("Вы уверены, что хотите продолжить?");

        if (ProjectUpdateConfirmed) {
            try {
                const result = calculateResult();
                const requestBody = {
                    task_upload: {
                        point: result[1], // Замените на желаемое значение
                        time_point: result[0],    // Замените на желаемое значение
                    }
                };

                const response = await fetch(`${process.env.REACT_APP_URL}/api/project/${id}/`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + String(authTokens.access),
                    },
                    body: JSON.stringify(requestBody),
                });

                if (response.status === 200) {
                    // Обработка успешного обновления
                    // Можете показать сообщение об успешном обновлении здесь
                }
            } catch (error) {
                console.error("Ошибка при обновлении информации о проекте:", error);
            }
        }
    };

    return (
        <div className='container'>
            <Navbar/>
            <div className="button_btn">
                <button className="button_btn1" onClick={handleSaveClick}>
                    <h1 className="buttons_h1">Сохранить</h1>
                </button>
            </div>
            <h1 className="h1_style">Upload</h1>

            <div className="sum_calculate">
                <h1>Time:</h1>
                <h1>{calculateResult()[0]}</h1>
                <h1>Point:</h1>
                <h1>
                    {calculateResult()[1]} {calculateResult()[3]}
                </h1>
            </div>

            <div className="grid-container-upload">
                {/* Normal */}
                <div className="grid-item-upload">
                    <div className="grid_div">
                        <label className="label-style">
                            Number of apartments
                        </label>
                        <input
                            type="number"
                            className="input-style"
                            min={0}
                            max={1000}
                            id="inputValue10"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            value={inputValue10}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Upload;
