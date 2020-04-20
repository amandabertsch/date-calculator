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
      alert("numDays: " + numDays)
      const numWeeks = parseInt(weeks,10);
      alert("numWeeks: " + numWeeks)
      alert("date: " + date)
      alert("date + 00:00:00: " + date+" 00:00:00")
      const newDate = new Date(date+" 00:00:00");
      alert("newDate: " + newDate)
      // alert(date.length)

      // console.log(newDate);
      const result = addDays(newDate,numWeeks, numDays)
      setEndDate(result.toLocaleDateString()+ ", "+ dayOfWeek[result.getDay()] );
      // console.log(result); 
    }

    function subtractTime(inputs){
      const {date,weeks,days} = inputs;
      // console.log(date);
      
      const numDays = parseInt(days,10)*(-1);
      const numWeeks = parseInt(weeks,10)*(-1);
      const newDate = new Date(date + " 00:00:00");

      // console.log(newDate);
      const result = addDays(newDate,numWeeks, numDays)
      setStartDate(result.toLocaleDateString() + ", "+ dayOfWeek[result.getDay()] );
      // console.log(result); 
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
    <div id="page-container" className="pl-4 pt-4">
      <div id="content-wrap">
        <div className="px-4 mt-2">
          <h2>Add Time</h2>
          <ChangeDate 
            firstLabel="Start Date"
            lastLabel="End Date"
            onAdd={addTime}
            result={endDate}
          />
        </div>

        <br></br>

        <div className="px-4 mt-2">
          <h2>Subtract Time</h2>
          <ChangeDate 
            firstLabel="End Date"
            lastLabel="Start Date"
            onAdd={subtractTime}
            result={startDate}
          />
        </div>

        <br></br>
        
        <div className="px-4 mt-2">
          <h2>Time Between Dates</h2>
          <div className="form-group row px-md-0 px-4">

            <div className="col-md-2">
                <label className="control-label">Start Date</label>
                <input id="date-picker" onChange={handleChange} className="form-control" type="date" placeholder="MM/DD/YYYY" name="start"></input>
            </div>
            <div className="col-md-2">
                <label className="control-label">End Date</label>
                <input id="date-picker" onChange={handleChange} className="form-control" type="date" placeholder="MM/DD/YYYY" name="stop"></input>
            </div>
            <div className="col-md-2 mt-auto">
                  <button onClick={calcDifference} type="button" className="btn btn-info my-4 my-md-0">Calculate</button>
            </div>

            <div className="col-md-1 mt-auto">
                <label className="control-label">Weeks</label>
                <input value={timeDiff.weeks} className="form-control" readOnly style={{color: "green"}}></input>
            </div>
            <div className="col-md-1 mt-auto">
                <label className="control-label">Days</label>
                <input value={timeDiff.days} className="form-control" readOnly style={{color: "green"}}></input>
            </div>
          </div> 
        </div>
      </div> 

      <footer>
      <p>Made by <a href="https://www.amandabertsch.com"  target="_blank">Amanda Bertsch</a> </p>
      </footer>

      
    </div>
    

    )

}

export default App;
