import React, {useState} from 'react'
import Navbar from '../../components/Navbar'
import image_drash from '../../assets/img/drash.png'
import plusAdd2 from '../../assets/img/plusAdd.png'
// import {getData, setData} from "../../components/Utils/getLocalstorage";
import {v4 as uuidv4} from "uuid";
import Calculate from "../../components/calculate";
import MagicInput from "../../components/Input";
import {withData} from "../with/data";



const With = () => {
    const [categories, setCategories] = useState(withData);

    const handleFlatInputChange = (categoryIndex, flatIndex, columnIndex, newValue) => {
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
        const updatedCategories = [...categories];
        updatedCategories[categoryIndex].flats[flatIndex][columnIndex] = newValue;
        setCategories(updatedCategories);
        // setData("categoryWithData", updatedCategories)
    };


    const addNewItem = (categoryIndex) => {
        const newCategories = categories.map(category => {
            if (category.name === categoryIndex) {
                const newItem = category.fields.map(item => item.columnValue === "uuid" ? uuidv4() : item.columnValue);
                category.flats.push(newItem);
            }
            return category;
        });
        setCategories(newCategories);
        // setData("categoryWithData", newCategories)
    };

    const deleteItem = (categoryId, flatId) => {
        const newCategories = categories.map(category => {
            if (category.name === categoryId) {
                category.flats = category.flats.filter(flat => flat[0] !== flatId);
            }
            return category;
        })
        setCategories(newCategories)
        // setData("categoryWithData", newCategories)
    };

    const calculationData = () => {
        return categories.flatMap(category => {
            const fieldIndex = category.fields
                .map((field, fieldIndex) => ["Total", "Bedroom", "level", "penthouse"].includes(field.columnTitle) ? fieldIndex : undefined)
                .filter(index => index)
            return category.flats.map(flat => fieldIndex.map(index => flat[index]))
                .map(flat => {
                    const item = flat[flat.length - 1];
                    if (typeof item == 'boolean') {
                        flat[flat.length - 1] = category.name;
                        flat.push(false)
                        flat.push(item)
                    } else {
                        flat.push(category.name)
                        flat.push(false)
                    }
                    return flat;
                });
        });
    };

    return (
        <div className="container">
            <Navbar/>
            <Calculate page={"with"} title={"with"} autoMulti={true} list={calculationData()}/>

            <div className="grid-container-without">
                {categories.map((category, categoryIndex) => (
                    <div className="grid-item-without" key={categoryIndex}>
                        <p className="p-style-without">{category.name}</p>
                        {category.flats.map((flat, flatIndex) =>
                            <div className="div-input-style-without" key={flatIndex}>
                                {flat.map((value, columnIndex) => {
                                    const columnInfo = category.fields[columnIndex];
                                    return (
                                        <MagicInput
                                            key={columnIndex}
                                            title={columnInfo.columnTitle}
                                            type={columnInfo.columnType}
                                            index={columnIndex}
                                            value={value}
                                            setValue={(newValue) =>
                                                handleFlatInputChange(categoryIndex, flatIndex, columnIndex, newValue)
                                            }
                                            item={flat}
                                            max={columnInfo.maxValue}
                                            min={columnInfo.minValue}
                                            options={columnInfo.options}
                                        />
                                    );
                                })}
                                <div className="grid-div-without">
                                    <label className="label-style-without"> Del </label>
                                    <button className="image-button">
                                        <img
                                            src={image_drash}
                                            alt="Button Icon"
                                            onClick={() => {
                                                deleteItem(category.name, flat[0])
                                            }}
                                        />
                                    </button>
                                </div>
                            </div>
                        )}
                        <button className="image-button-without" onClick={() => addNewItem(category.name)}>
                            <img src={plusAdd2} alt="Button Icon"/>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default With