import classes from './EditWorkout.module.css'
import Select from 'react-select'
import workouts from "../../data/exercises.json"
import WorkoutCard from '../../UI/WorkoutCard/WorkoutCard'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import { workoutActions } from '../../store/workout-slice'
import {replaceWorkout, deleteWorkout} from "../../store/auth-action"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const options = workouts

const AddWorkout = (props) => {
    const [readyToReplace, setReadyToReplace] = useState(false);
    const dispatch = useDispatch();

    const sure = useRef(0);
    const hareket = useRef("");
    const tekrar = useRef(0);
    const agirlik = useRef(0);

    
    const workoutToEdit = useSelector(state => state.sWorkout.workouts.find( ({ _id }) => _id === props.idToEdit ));
    console.log(workoutToEdit.date)
    const [tarih, setStartDate] = useState(new Date());

    const userId = useSelector(state => state.sLogin.userIdSlice)

    const addSetHandler = (e) => {
        console.log(workoutToEdit.sets)
        e.preventDefault();
        if(
            hareket.current.props.value &&
            agirlik.current.value.length !== 0 &&
            tekrar.current.value.length !== 0 
        ) 
        {
            dispatch(workoutActions.updateExisting(
                {   
                    id: props.idToEdit,
                    hareket:hareket.current.props.value.label,
                    agirlik:agirlik.current.value,
                    tekrar:tekrar.current.value,
                }
            ))
        }
        else {
            alert("Eksik girdi")
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
            dispatch(workoutActions.overwrite({
                id: props.idToEdit,
                tarih:tarih.toLocaleDateString("en-UK", options),
                sure:sure.current.value
            }))
            setReadyToReplace(true)
        }

        else {
            alert("Tarih - Sure eksik")
        }
    }

    useEffect(()=>{
        if(readyToReplace){
            dispatch(replaceWorkout(userId, props.idToEdit, workoutToEdit))
            props.clickAddHandler();
        }
    },[readyToReplace])

    const deleteWorkoutHandler = (e) => {
        e.preventDefault();
        dispatch(workoutActions.deleteWorkout({
            id: props.idToEdit
        }))

        dispatch(deleteWorkout(userId, props.idToEdit))
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

            <WorkoutCard isList={false} workout={workoutToEdit}></WorkoutCard>

            <form className={classes.addWorkoutForm}>
            <div className={classes.inputContainer}>
                <DatePicker dateFormat="dd/MM/yyyy" selected={tarih} onChange={date => setStartDate(date)}/> 
                <input ref={sure} placeholder="Duration" type="number" defaultValue={workoutToEdit.duration}></input>
            </div>
            <button onClick={saveWorkoutHandler} className={classes.addSetButton}>Save</button>
            <button onClick={deleteWorkoutHandler} className={classes.addSetButton}>Delete</button>
            </form>
        </div>
    )
}
export default AddWorkout