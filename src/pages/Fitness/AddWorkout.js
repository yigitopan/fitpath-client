import classes from './AddWorkout.module.css'
import Select from 'react-select'
import workouts from "../../data/exercises.json"
import WorkoutCardT from '../../UI/WorkoutCard/WorkoutCardT'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import { workoutActions } from '../../store/workout-slice'
import { addWorkout } from '../../store/auth-action'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const options = workouts

const AddWorkout = (props) => {
    const [tarih, setStartDate] = useState(new Date());
    const [saved, setSaved] = useState(false);
    const [cw, setCw] = useState(false);

    const sure = useRef(0);
    const hareket = useRef("");
    const tekrar = useRef(0);
    const agirlik = useRef(0);

    const dispatch = useDispatch();

    const currentWorkout = useSelector(state => state.sWorkout.workoutToSave)
    const userId = useSelector(state => state.sLogin.userIdSlice)

    const addSetHandler = (e) => {
        console.log(currentWorkout)
        e.preventDefault();
        if(
            hareket.current.props.value &&
            agirlik.current.value.length !== 0 &&
            tekrar.current.value.length !== 0 
        ) 
        {
            dispatch(workoutActions.update(
                {
                    hareket:hareket.current.props.value.label,
                    agirlik:agirlik.current.value,
                    tekrar:tekrar.current.value,
                }
            ))
        }
        else {
            alert("Inputs are missing")
        }
    }

    const saveWorkoutHandler = (e) => {
        e.preventDefault()
        if(
            tarih.toLocaleDateString("en-UK").length !== 0 &&
            sure.current.value.length !== 0
        ){
            e.preventDefault();
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            dispatch(workoutActions.save({
                id: props.idToEdit,
                tarih:tarih.toLocaleDateString("en-UK", options),
                sure:sure.current.value
            }))
            setSaved(true);
        }

        else {
            alert("Date - Time missing")
        }
    }

    useEffect(()=>{
        if(saved) {
          saveToDb()
        }
    },[saved])

    const saveToDb = () => {
        dispatch(addWorkout(userId, currentWorkout))
        props.clickAddHandler();
    }

    return (
        <div className={classes.addWorkout}>
            <form className={classes.addSetForm}>
                <Select ref={hareket} className={classes.Select} options={options} />
                <div className={classes.inputContainer}>
                    <input ref={agirlik} placeholder="Weight" type="number"></input>     
                    <input ref={tekrar} placeholder="Reps" type="number"></input>
                </div>
                <button onClick={addSetHandler} className={classes.addSetButton}>Insert Set</button>
            </form>

            <WorkoutCardT adding={true} isList={false} workout={currentWorkout}></WorkoutCardT>

            <form className={classes.addWorkoutForm}>
            <div className={classes.inputContainer}>
                <DatePicker dateFormat="dd/MM/yyyy" selected={tarih} onChange={date => setStartDate(date)}/> 
                <input ref={sure} placeholder="Duration" type="number"></input>
            </div>
                <button onClick={saveWorkoutHandler} className={classes.addSetButton}>Save</button>
            </form>


            
        </div>
    )
}
export default AddWorkout