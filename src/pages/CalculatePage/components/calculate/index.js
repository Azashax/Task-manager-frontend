import React, {useContext, useEffect, useState} from 'react';
import {getDataList} from "./data";
// import {getData, setData} from "../Utils/getLocalstorage";
import {useParams} from "react-router-dom";
import AuthContext from "../../../../context/AuthContext";

const Index = ({
                   title = "default title",
                   page,
                   isTotalInvalid = false,
                   addCopy = false,
                   list = []
               }) => {
    const [formatted, setFormatted] = useState("00:00:00")
    const [bal, setBal] = useState(0);
    const [inputValue, setInputValue] = useState(0);

    useEffect(() => {
        updateCalculate()
    })
 
    var words = title.split('_');
    var lastWord = words.length > 1 ? words[words.length - 1] : title;

    const [boolAssetValue, setBoolAssetValue] = useState(false);

    const { id } = useParams();
    const { authTokens } = useContext(AuthContext);

    const handleFlatInput3Change = (event) => {

        let newValue1 = event.target.value;

        if (/^0/.test(newValue1)) {
            newValue1 = newValue1.replace(/^0+/, '');
            console.log('A')
        }
        if (!newValue1 || isNaN(newValue1)) {
            newValue1 = 0;
        } else if (newValue1 > 9999) {
            newValue1 = 9999;
        }

        const updatedValue = newValue1;
        setInputValue(updatedValue);
    };

    const handleAssetsChange = (event) => {
        console.log(event);
        setBoolAssetValue(event.target.checked);
    };

    const updateCalculate = () => {
        let total;
        if (isTotalInvalid) {
            total = list.reduce((totalValue, currentValue) =>
                getDataList(page, currentValue[3], currentValue[2])[currentValue[0]] + (currentValue[4] ? isAuto(currentValue[1], currentValue[0]) : currentValue[1]) + totalValue, 0
            );
        } else {
            total = list.reduce((totalValue, currentValue) =>
                getDataList(page, currentValue[3], currentValue[2])[currentValue[0]] * currentValue[1] + (!!currentValue[5] ? getDataList(page, currentValue[3]+'Penthouse', currentValue[2])[currentValue[0]] * currentValue[1] : 0) + totalValue, 0
            );
        }
        updateVariables(total)
    }


    const isAuto = (ver, a) => {
        if (a===0){
            return ver * 0;
        } else if ( a<= 3) {
            return ver * 480;
        } else if ( a<= 6) {
            return ver * 780
        } else {
            return ver * 1080
        }
    };


    const updateVariables = (total) => {
        let a = inputValue
        if (total===0){
            a = 0
        }
        if (boolAssetValue){
            total = total * 2
        }
        console.log(total);
        const timestamp = parseInt(total + a * 300);
        const hours = Math.floor(timestamp / 60 / 60);
        const minutes = Math.floor(timestamp / 60) - (hours * 60);
        const seconds = timestamp % 60;
        const time = [
            hours.toString().padStart(2, '0'),
            minutes.toString().padStart(2, '0'),
            seconds.toString().padStart(2, '0')
        ].join(':');

        const minutes1 = minutes / 60
        const bal1 = hours + parseFloat(minutes1.toFixed(2))
        const bal2 = parseFloat(bal1.toFixed(2))
        setFormatted(time)
        setBal(bal2)
    };


    const handleSaveClick = async () => {
        const ProjectUpdateConfirmed = window.confirm("Вы уверены, что хотите продолжить?");

        if (ProjectUpdateConfirmed) {
            try {
                
                const requestBody = {
                    [`task_${lastWord}`]: {
                        point: bal, // Замените на желаемое значение
                        time_point: formatted, // Замените на желаемое значение
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
        <div>
            <div className="button_btn">
                <button className="button_btn1" onClick={handleSaveClick}>
                    <h1 className="buttons_h1">Сохранить</h1>
                </button>
            </div>

            <h1 className='h1_style'>{title}</h1>
            <div className='sum_calculate'>
                <h1>Time:</h1>
                <h1>{formatted}</h1>
                <h1>Point:</h1>
                <h1>{bal}</h1>
            </div>
            <div className='aa' style={{display: addCopy ? "" : "none"}}>
                <label className="copy-back"> Copy </label>
                <input className="input-style_1" type="number" min={0} value={inputValue} inputMode="numeric"
                       pattern="[0-9]*"
                       onChange={handleFlatInput3Change} />

            </div>

            <div className='aa' style={{display: lastWord === "with" ? "" : "none"}}>
                <div className="">
                    <label style={{color:"#d3a188"}}> Asset </label>
                    <input className="input-style" type="checkbox" checked={boolAssetValue} onChange={handleAssetsChange}/>
                </div>
            </div>
        </div>
    )
};

export default Index;