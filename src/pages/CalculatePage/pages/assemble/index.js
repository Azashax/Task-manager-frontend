import React, {useContext, useState} from 'react';
import Navbar from '../../components/Navbar';
import './stylea.css'
// import {getData, setData} from "../../components/Utils/getLocalstorage";
import {useParams} from "react-router-dom";
import AuthContext from "../../../../context/AuthContext";

const Assemble = () => {
    const { id } = useParams();
    const { authTokens } = useContext(AuthContext);
    const [inputValue, setInputValue] = useState(0);
    const [radioValue, setRadioValue] = useState('NotCollect');//todo be should to lookup here

    const handleInputChange = (event) => {
        let newValue = event.target.value;
        if (/^0/.test(newValue)) {
            // Удаляем начальные нули
            newValue = newValue.replace(/^0+/, '');
        }
        if (!newValue || isNaN(newValue)) {
            newValue = 0;
        } else if (newValue > 9999) {
            newValue = 9999;
        }
        setInputValue(newValue);
        // setData("inputValue", newValue);//todo be should to lookup here
    };

    const handleRadioChange = (value) => {
        setRadioValue(value);
        // setData("radioValue", value);

    };

    const calculateResult = () => {
        let result = parseFloat(inputValue);

        if (radioValue === 'Collect') {
            result *= 78;
        } else if (radioValue === 'NotCollect') {
            result *= 300;
        }
        let totalsum = 0;
        let timestamp = result
        let hours = Math.floor(timestamp / 60 / 60);
        let minutes = Math.floor(timestamp / 60) - (hours * 60);
        let seconds = timestamp % 60;
        var formatted = [
            hours.toString().padStart(2, '0'),
            minutes.toString().padStart(2, '0'),
            seconds.toString().padStart(2, '0')
        ].join(':');

        const minutes1 = minutes / 60
        const bal1 = hours + parseFloat(minutes1.toFixed(2))
        const bal = parseFloat(bal1.toFixed(2))
        totalsum = (bal * (2)).toFixed(0)
        const qwerty = [formatted, bal, totalsum]

        return qwerty;

    };

    const handleSaveClick = async () => {
        const ProjectUpdateConfirmed = window.confirm("Вы уверены, что хотите продолжить?");

        if (ProjectUpdateConfirmed) {
            try {
                const result = calculateResult();
                const requestBody = {
                    task_assemble: {
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
            <h1 className='h1_style'>Assemble</h1>
            <div className='sum_calculate'>
                <h1>Time:</h1>
                <h1>{calculateResult()[0]}</h1>
                <h1>Point:</h1>
                <h1>{calculateResult()[1]} {calculateResult()[3]}</h1>
            </div>

            <div className="grid-container-assemble">
                {/* Normal */}
                <div className="grid-item-assemble">
                    <div className="grid_div_10">
                        <label className="label-style" htmlFor="inputValue">
                            Number of apartments
                        </label>
                        <input
                            type="number"
                            className="input-style"
                            min={0}
                            max={9999}
                            id="inputValue"
                            value={inputValue}
                            onChange={handleInputChange}

                        />
                        <h1 className='h1_style_2'>Floor Plate</h1>
                        <div className="grid_div_1">
                            <div className="grid_div_2">
                                <label className="label-style">Collected</label>
                                <label className="radio-button">
                                    <input
                                        className="radio-button-input"
                                        type="radio"
                                        value="Collect"
                                        name="inputValue1"
                                        checked={radioValue === 'Collect'}
                                        onChange={() => handleRadioChange('Collect')}
                                    />
                                    {/* Collect */}
                                    <span className="custom-radio"></span>
                                </label>
                            </div>
                            <div className="grid_div_2">
                                <label className="label-style">Not Collected</label>
                                <label className="radio-button">
                                    <input
                                        className="radio-button-input"
                                        type="radio"
                                        value="NotCollect"
                                        name="inputValue1"
                                        checked={radioValue === 'NotCollect'}
                                        onChange={() => handleRadioChange('NotCollect')}
                                    />
                                    <span className="custom-radio"></span>
                                    {/* NoCollect */}
                                </label>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
export default Assemble