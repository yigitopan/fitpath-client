import React from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import classes from './WorkoutCard.module.scss'

function SortableItem(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: props.id});
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const deleteClickHandler = () => {
      console.log("click")
    props.deleteSetHandler(props.mapIndex)
  }

  return (
    <tr ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <td onClick={deleteClickHandler} className={classes.DeleteX}>X</td>
        <td className={classes.Exercise}>{!props.isTouch &&<span className={classes.setCount}>{props.mapIndex+1} - </span>}<span>{props.set.exercise}</span></td>
        <td className={classes.Weight}> {props.set.weight}</td>
        <td className={classes.Rep}> {props.set.rep}</td>
    </tr>
  );
}

export default SortableItem