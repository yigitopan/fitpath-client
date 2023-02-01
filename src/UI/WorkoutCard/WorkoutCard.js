import React, {useEffect, useState} from 'react'
import classes from './WorkoutCard.module.scss'
import { workoutActions } from '../../store/workout-slice'
import { useSelector, useDispatch } from 'react-redux'
import {
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';

import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import SortableItem from './SortableItem';;

function isTouchDevice() {
  return (('ontouchstart' in window) ||
     (navigator.maxTouchPoints > 0) ||
     (navigator.msMaxTouchPoints > 0));
}

const isTouch = isTouchDevice();

const WorkoutCard = (props) => {
const workoutToEdit = useSelector(state => state.sWorkout.workouts.find( ({ _id }) => _id === props.workout._id ));
  
  const dispatch = useDispatch();

  const editHandler = () => {
    props.enterEditing(props.id)
  }

  const deleteSetHandler = (index) => {
    console.log(index)
    setSets(sets.filter(set => sets.indexOf(set) !== index));
  }

  const [sets, setSets] = useState(props.workout.sets);

  const TouchOrPointer = isTouch ? TouchSensor : PointerSensor
  const parameter = [useSensor(TouchOrPointer, {activationConstraint: {distance:8}}), useSensor(KeyboardSensor, {coordinateGetter: sortableKeyboardCoordinates,})]
  const sensors = useSensors(parameter[0], parameter[1]);

  useEffect(()=>{
    if(!props.adding){
      dispatch(workoutActions.replaceSets({id:props.workout._id, sets:sets}))
    }
  },[sets])

  useEffect(()=>{
    if(!props.adding){
    setSets(workoutToEdit.sets)
    }
  },[workoutToEdit])

        return (
        
        <div className={classes.WorkoutCard} id={props.id}>
            {props.isList && <button onClick={editHandler} className={classes.button}>Duzenle</button>}
            
            <h3 className={classes.Date}>{props.workout.date}</h3>
            <p className={classes.Duration}>{props.workout.duration} Dakika</p>

            {props.isList &&
                        <table className={classes.Table}>
                        <thead>
                            <tr>
                            <th className={classes.SetPart} scope="col">Set - Hareket</th>
                            <th scope="col">Kilo</th>
                            <th scope="col">Rep</th>
                            </tr>
                        </thead>
                        <tbody>
            
                        {props.workout.sets.map((set, i)=>{
                            return (
                              <tr key={i} className={classes.Set}>
                                <td className={classes.Exercise}><span className={classes.setCount}>{i+1} - </span><span>{set.exercise}</span></td>
                                <td className={classes.Weight}> {set.weight}</td>
                                <td className={classes.Rep}> {set.rep}</td>
                              </tr>
                            )
                        })}
                        </tbody>
                        </table>
            }

            {!props.isList &&
                        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <table className={classes.Table}>
                            <thead>
                                <tr>
                                    <th className={classes.Delete} scope="col">Sil</th>
                                    <th scope="col" className={classes.SetPart}>Set - Hareket</th>
                                    <th scope="col">Kilo</th>
                                    <th scope="col">Rep</th>
                                 </tr>
                            </thead>
            
                                <tbody>
                                    <SortableContext items={sets} strategy={verticalListSortingStrategy}>
                                        {sets.map((set,i) => <SortableItem isTouch={isTouch} deleteSetHandler={deleteSetHandler} mapIndex={i} key={Math.random()} set={set} id={set}/>)}
                                    </SortableContext>
                                </tbody>
                        </table>
                        </DndContext>
            }


</div>      
    )

    function handleDragEnd(event) {
      const {active, over} = event;
      
      if (active.id !== over.id) {
        setSets((sets) => {
          const oldIndex = sets.indexOf(active.id);
          const newIndex = sets.indexOf(over.id);
          
          return arrayMove(sets, oldIndex, newIndex);
        });
      }
    }
}

export default WorkoutCard

