import React, { useState } from 'react'
import './stylew.css'
import Navbar from '../../components/Navbar'
import image_drash from '../../assets/img/drash.png'
import plusAdd2 from '../../assets/img/plusAdd.png'
import MagicInput from "../../components/Input";
import {v4 as uuidv4} from 'uuid';
import { villaWithoutData} from "./data";
import Calculate from "../../components/calculate";
// import {getData, setData} from "../../components/Utils/getLocalstorage";


const Villa = () => {
    const [villas, setVillas] = useState(villaWithoutData);
    const handleFlatInputChange = (villaIndex, flatIndex, columnIndex, newValue) => {
        if (typeof newValue === 'number') {
            if (!/^0/.test(newValue)) {
                newValue = newValue.toString().replace(/^0+/, '');
            }
            if (!newValue || isNaN(newValue)) {
                newValue = 0;
            } else if (newValue > 1000) {
                newValue = 1000;
            }
        }

        const updatedVillas = [...villas];
        updatedVillas[villaIndex].flats[flatIndex][columnIndex] = newValue;
        setVillas(updatedVillas);
        // setData("villaWithoutData", updatedVillas)
    };


    const addNewItem = (villaIndex) => {
        const newVillas = villas.map(villa => {
            if (villa.name === villaIndex) {
                const newItem = villa.fields.map(item => item.columnValue === "uuid" ? uuidv4() : item.columnValue);
                villa.flats.push(newItem);
            }
            return villa;
        });
        setVillas(newVillas);
        // setData("villaWithoutData", newVillas)
    };

    const deleteItem = (villaId, flatId) => {
        const newVillas = villas.map(villa => {
            if (villa.name === villaId) {
                villa.flats = villa.flats.filter(flat => flat[0] !== flatId);
            }
            return villa;
        })
        setVillas(newVillas)
        // setData("villaWithoutData", newVillas)
    };

    const calculationData = () => {
        return villas.flatMap(villa => {
            const fieldIndex = villa.fields
                .map((field, fieldIndex) => ["Total", "Bedroom", "level"].includes(field.columnTitle) ? fieldIndex : undefined)
                .filter(index => index)
            return villa.flats.map(flat => fieldIndex.map(index => flat[index]))
                .map(flat => {
                    flat.push(villa.name);
                    flat.push(villa.name === 'Without');
                    return flat;
                })
        });
    };


    return (
        <div className='container'>
            <Navbar/>
            <Calculate page={"villa"} title={"villa_without"} isTotalInvalid={true} autoMulti={true} list={calculationData()}/>
            <div className="grid-containe_villa">
                {villas.map((villa, villaIndex) => (
                    <div className="grid-item_villa" key={villaIndex}>
                        <p className="p-style">{villa.name}</p>
                        {villa.flats.map((flat, flatIndex) =>
                            <div className="div-input-style" key={flatIndex}>
                                {flat.map((value, columnIndex) => {
                                    const columnInfo = villa.fields[columnIndex];
                                    return (
                                        <MagicInput
                                            key={columnIndex}
                                            title={columnInfo.columnTitle === 'Total' ? 'Floor' : columnInfo.columnTitle}
                                            type={columnInfo.columnType}
                                            index={columnIndex}
                                            value={value}
                                            setValue={(newValue) =>
                                                handleFlatInputChange(villaIndex, flatIndex, columnIndex, newValue)
                                            }
                                            item={flat}
                                            max={columnInfo.maxValue}
                                            min={columnInfo.minValue}
                                            options={columnInfo.options}
                                        />
                                    );
                                })}
                                <div className="grid_div">
                                    <label className="label-style"> Del </label>
                                    <button className="image-button">
                                        <img
                                            src={image_drash}
                                            alt="Button Icon"
                                            onClick={() => {
                                                deleteItem(villa.name, flat[0])
                                            }}
                                        />
                                    </button>
                                </div>
                            </div>
                        )}
                        <button className="image-button" onClick={() => addNewItem(villa.name)}>
                            <img src={plusAdd2} alt="Button Icon"/>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Villa