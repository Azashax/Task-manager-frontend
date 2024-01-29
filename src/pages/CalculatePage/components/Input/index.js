import React from 'react';

const Index = ({index, title, max = 9999, min = 0, options = [], type, item, value, setValue}) => {
    switch (type) {
        case "number":
            return (
                // onChange={(e) => handleInputChanges(Math.min(parseInt(e.target.value), 999), 'total', bedroom)}
                <div className="grid_div">
                    <label className="label-style"> {title} </label>
                    <input className="input-style" type="number" min={min} max={max} inputMode="numeric" pattern="[0-9]*"
                           value={value} onChange={(e) => setValue(Math.min(parseInt(e.target.value), max), index, item)}
                    />
                </div>
            )

        case "checkbox":
            return (
                <div className="grid_div">
                    <label className="label-style"> {title} </label>
                    <input className="input-style" type="checkbox" checked={value} onChange={(e) => setValue(e.target.checked, index, item)}/>
                </div>
            );
        case "hidden":
            return "";
        case "select":
            return (
                <div className="grid_div">
                    <label className="label-style"> {title} </label>
                    <select className="select-style" value={value} onChange={(e) => setValue(e.target.value, index, item)}>
                        {options.map((option, index) =>
                            <option value={option.value} key={index}>{option.title}</option>
                        )}
                    </select>
                </div>
            )
        default:
            return (<h1>give my type fool</h1>)
    }
};

export default Index;