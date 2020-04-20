import React, {useState} from 'react';

function App(props) {
    const [inputs, setInputs] = useState({
        date: "",
        weeks: 0,
        days: 0
    });

    function handleChange(event){
        const {name,value} = event.target;
        setInputs(prevInput => {
            return{
                ...prevInput,
                [name]: value
            }        
        });  
         
    }

    function submitDate(event){
        props.onAdd(inputs);
        event.preventDefault();
    }

    return(

    <div>
        <div className="form-group row px-md-0 px-4">
            <div className="col-md-2">
                <label className="control-label">{props.firstLabel}</label>
                <input onChange={handleChange} className="form-control" type="date" placeholder="Start Date" name="date"></input>
            </div>
            <div className="col-md-1">
                <label className="control-label">Week(s)</label>
                <input onChange={handleChange} className="form-control" type="number" placeholder="0" name="weeks"></input>
            </div>
            <div className="col-md-1">
                <label className="control-label">Day(s)</label>
                <input onChange={handleChange} className="form-control" type="number" placeholder="0" name="days"></input>
            </div>
            <div className="col-md-2 mt-auto">
                <button onClick={submitDate} type="button" className="btn btn-info my-4 my-md-0">Calculate</button>
            </div>
            <div className="col-md-2 mt-auto">
                <label className="control-label">{props.lastLabel}</label>
                <input value={props.result} className="form-control" readOnly style={{color: "green"}}></input>
            </div>
        </div>
            
    </div>
            
    )

}

export default App;
