import React, {useState} from 'react';
import ChangeDate from "./ChangeDate.jsx"

function App() {

  const [endDate, setEndDate] = useState(""); //Add Time
  const [startDate, setStartDate] = useState(""); //Subtract Time
  const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const [dates, setDates] = useState({ 
    start:"",
    stop:""
  }); 
  const [timeDiff, setTimeDiff] = useState({
    weeks: "",
    days: ""
  })

  //------ Add/Subtract Time
  function addDays(date, weeks, days) {
    const copy = new Date(Number(date))
    copy.setDate(date.getDate() + weeks*7 + days)
    return copy
  }

    function addTime(inputs){
      const {date,weeks,days} = inputs;
      const numDays = parseInt(days,10);
      const numWeeks = parseInt(weeks,10);
      const newDate = new Date(date+" 00:00:00");

      console.log(newDate);
      const result = addDays(newDate,numWeeks, numDays)
      setEndDate(result.toLocaleDateString()+ ", "+ dayOfWeek[result.getDay()] );
      console.log(result); 
    }

    function subtractTime(inputs){
      const {date,weeks,days} = inputs;
      console.log(date);
      
      const numDays = parseInt(days,10)*(-1);
      const numWeeks = parseInt(weeks,10)*(-1);
      const newDate = new Date(date + " 00:00:00");

      console.log(newDate);
      const result = addDays(newDate,numWeeks, numDays)
      setStartDate(result.toLocaleDateString() + ", "+ dayOfWeek[result.getDay()] );
      console.log(result); 
    }
    
    // ----- Time Between Dates
    function handleChange(event){
      const {name,value} = event.target;
        setDates(prevInput => {
            return{
                ...prevInput,
                [name]: value
            }        
        });
    }

    function calcDifference(){
      console.log(dates);   
      const startDate = new Date(dates.start + " 00:00:00");
      const stopDate = new Date(dates.stop + " 00:00:00");
      const diff =  Math.floor(( stopDate - startDate ) / 86400000); 
      const weeks = Math.floor(diff/7);
      const days = Math.floor(diff-weeks*7);
      setTimeDiff({weeks: weeks, days: days});
      
    }

    return(
    <div>
      <div className="px-4 mt-2">
        <h1>Add Time</h1>
        <ChangeDate 
          onAdd={addTime}
          result={endDate}
        />
      </div>

      <br></br>

      <div className="px-4 mt-2">
        <h1>Subtract Time</h1>
        <ChangeDate 
          onAdd={subtractTime}
          result={startDate}
        />
      </div>

      <br></br>
      
      <div className="px-4 mt-2">
        <h1>Time Between Dates</h1>
        <div className="form-group row">
          <div className="col-2">
              <label className="control-label">Start Date</label>
              <input onChange={handleChange} className="form-control" type="date" placeholder="Start Date" name="start"></input>
          </div>
          <div className="col-2">
              <label className="control-label">End Date</label>
              <input onChange={handleChange} className="form-control" type="date" placeholder="Stop Date" name="stop"></input>
          </div>
          <div className="col-2 mt-auto">
                <button onClick={calcDifference} type="button" className="btn btn-info">Calculate</button>
            </div>
            <div className="col-1 mt-auto">
                <label className="control-label">Weeks</label>
                <input value={timeDiff.weeks} className="form-control" readOnly style={{color: "green"}}></input>
            </div>
            <div className="col-1 mt-auto">
                <label className="control-label">Days</label>
                <input value={timeDiff.days} className="form-control" readOnly style={{color: "green"}}></input>
            </div>
        </div>
          
      </div>

    </div>
    

    )

}

export default App;
