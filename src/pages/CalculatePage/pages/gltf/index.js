import React, { useContext, useState } from 'react';
import Navbar from '../../components/Navbar';
import './styleg.css';
// import { getData, setData } from '../../components/Utils/getLocalstorage';
import AuthContext from "../../../../context/AuthContext";
import { useParams } from "react-router-dom";

const Gltf = () => {
    const { id } = useParams();
    const { authTokens } = useContext(AuthContext);
    const [inputValue, setInputValue] = useState(0);
    const [inputValue1, setInputValue1] = useState( 0);
    const [inputValue2, setInputValue2] = useState(0);

    const handleInputChange = (event) => {
        let newValue = event.target.value;
        newValue = newValue.replace(/^0+/, ''); // Удаляем начальные нули
        newValue = newValue || 0; // Проверка на NaN
        newValue = Math.min(newValue, 1000); // Ограничение до 1000

        setInputValue(newValue);
        // setData('inputValue1', newValue);
    };

    const handleInputChange2 = (event) => {
        let newValue = event.target.value;
        newValue = newValue.replace(/^0+/, ''); // Удаляем начальные нули
        newValue = newValue || 0; // Проверка на NaN
        newValue = Math.min(newValue, 1000); // Ограничение до 1000

        setInputValue2(newValue);
        // setData('inputValue3', newValue);
    };

    const handleInputChange1 = (event) => {
        let newValue = event.target.value;
        newValue = newValue.replace(/^0+/, ''); // Удаляем начальные нули
        newValue = newValue || 0; // Проверка на NaN
        newValue = Math.min(newValue, 1000); // Ограничение до 1000

        setInputValue1(newValue);
        // setData('inputValue2', newValue);
    };

    const calculateResult = () => {
        let result = parseInt(inputValue);
        let result1 = parseInt(inputValue1);
        let result2 = parseInt(inputValue2);

        result *= 840;
        result1 *= 1800;
        result2 *= 1320;

        let timestamp = result + result1 + result2;
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
                    task_gltf: {
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
            <Navbar />
            <div className="button_btn">
                <button className="button_btn1" onClick={handleSaveClick}>
                    <h1 className="buttons_h1">Сохранить</h1>
                </button>
            </div>
            <h1 className="h1_style">Gltf</h1>

            <div className="sum_calculate">
                <h1>Time:</h1>
                <h1>{calculateResult()[0]}</h1>
                <h1>Point:</h1>
                <h1>
                    {calculateResult()[1]}
                </h1>
            </div>

            <div className="grid-container-gltf">
                {/* Нормальные */}
                <div className="grid-item-gltf">
                    <div className="grid_div">
                        <label className="label-style">
                            Легкое количество квартир
                        </label>
                        <input
                            type="number"
                            className="input-style"
                            min={0}
                            max={1000}
                            id="inputValue"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            value={inputValue}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="grid-item-gltf">
                    <div className="grid_div">
                        <label className="label-style">
                            Среднее количество квартир
                        </label>
                        <input
                            type="number"
                            className="input-style"
                            min={0}
                            max={1000}
                            id="inputValue2"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            value={inputValue2}
                            onChange={handleInputChange2}
                        />
                    </div>
                </div>

                <div className="grid-item-gltf">
                    <div className="grid_div">
                        <label className="label-style">
                            Сложное количество квартир
                        </label>
                        <input
                            type="number"
                            className="input-style"
                            min={0}
                            max={1000}
                            id="inputValue1"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            value={inputValue1}
                            onChange={handleInputChange1}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Gltf;
