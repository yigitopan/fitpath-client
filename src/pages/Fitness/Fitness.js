import classes from './Fitness.module.css'
import WorkoutCard from "../../UI/WorkoutCard/WorkoutCard"
import React, { useEffect, useState } from 'react'
import AddWorkout from './AddWorkout'
import EditWorkout from "./EditWorkout"
import { useSelector, useDispatch } from 'react-redux'
import { getWorkouts } from '../../store/auth-action';

const Fitness = () => {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.sLogin.userIdSlice)
    const renderer = useSelector(state => state.sWorkout.renderer)
    
    useEffect(()=>{
        dispatch(getWorkouts(userId))
    },[])

    useEffect(()=>{
        dispatch(getWorkouts(userId))
    },[renderer])

    const workouts = useSelector(state => state.sWorkout.workouts)

    const [adding, setAdding] = useState(false);
    const [editing, setEditing] = useState(false);
    const [editID, setEditID] = useState("");

    
    const addWorkoutHandler = () => {
        setAdding(true)
    }

    const exitAdding = () => {
        setAdding(false)
    }

    const enterEditing = (id) => {
        setEditID(id)
         //id yi state e esitle. sonra workoutcarda vermesi icin editworkouta ver
        setEditing(true)
    }

    const exitEditing = () => {
        setEditing(false)
    }



    return (
            <div className={classes.fitnessWrapper}>
               {!adding && !editing &&
                <React.Fragment>
                    <div className={classes.addButtonContainer}>
                        <button onClick={addWorkoutHandler} className={classes.addWorkoutButton}>Add Workout</button>
                    </div>
                    
                    {workouts.slice(0).reverse().map((workout,i) => {
                        return <WorkoutCard isList={true} enterEditing={enterEditing} key={workout._id} id={workout._id} workout={workout}/>
                    })}
                </React.Fragment>
               }
                {adding &&
                <React.Fragment>
                    <button onClick={()=>{setAdding(false)}} className={classes.backButton}>Back</button>
                    <AddWorkout clickAddHandler={exitAdding}></AddWorkout>
                </React.Fragment>
                }

                {editing &&
                <React.Fragment>
                    <button onClick={()=>{setEditing(false)}} className={classes.backButton}>Back</button>
                    <EditWorkout clickAddHandler={exitEditing} idToEdit={editID}></EditWorkout>
                </React.Fragment>
                }
            </div>
    )
}
export default Fitness