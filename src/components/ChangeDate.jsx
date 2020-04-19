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
        <div className="form-group row">
            <div className="col-2">
                <label className="control-label">Start Date</label>
                <input onChange={handleChange} className="form-control" type="date" placeholder="Start Date" name="date"></input>
            </div>
            <div className="col-1">
                <label className="control-label">Week(s)</label>
                <input onChange={handleChange} className="form-control" type="number" placeholder="0" name="weeks"></input>
            </div>
            <div className="col-1">
                <label className="control-label">Day(s)</label>
                <input onChange={handleChange} className="form-control" type="number" placeholder="0" name="days"></input>
            </div>
            <div className="col-2 mt-auto">
                <button onClick={submitDate} type="button" className="btn btn-info">Calculate</button>
            </div>
            <div className="col-2 mt-auto">
                <label className="control-label">End Date</label>
                <input value={props.result} className="form-control" readOnly style={{color: "green"}}></input>
            </div>
        </div>
            
    </div>
            
    )

}

export default App;
