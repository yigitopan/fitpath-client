import { createSlice} from '@reduxjs/toolkit';

const workoutInitial = {
  renderer: 0,
  workouts:  [], 
  workoutToSave: {
    date: "Tarih",
    duration:0,
    sets: [
      //{
        //exercise: "",
        //weight: 15,
        //rep:8
      //}
    ]
  }
};

const workoutSlice = createSlice({
    name:'sWorkout',
    initialState: workoutInitial,
    reducers: {
        update(state, action, payload) {
                state.workoutToSave.sets.push({
                exercise: action.payload.hareket,
                weight: action.payload.agirlik,
                rep: action.payload.tekrar
            })
        },


        updateExisting(state, action, payload) {
            const index = state.workouts.indexOf( state.workouts.find( ({ _id }) => _id === action.payload.id));

            state.workouts[index].date = action.payload.tarih;
            state.workouts[index].duration = action.payload.sure;

            state.workouts[index].sets.push({
                exercise: action.payload.hareket,
                weight: action.payload.agirlik,
                rep: action.payload.tekrar
          })
        },

        overwrite(state, action, paylaod) {
            state.workoutToSave = workoutInitial.workoutToSave
            const index = state.workouts.indexOf( state.workouts.find( ({ _id }) => _id === action.payload.id));
            state.workouts[index].date = action.payload.tarih;
            state.workouts[index].duration = action.payload.sure;
        },
         
        save(state, action, payload) {

            state.workoutToSave.date = action.payload.tarih
            state.workoutToSave.duration = action.payload.sure
            state.workouts.push(state.workoutToSave)
            //state.workoutToSave = workoutInitial.workoutToSave
            // const index = state.workouts.indexOf( state.workouts.find( ({ id }) => id === action.payload.id));
            // state.workouts[index].date = action.payload.tarih;
            // state.workouts[index].duration = action.payload.sure;
        },

        reset(state, action, payload){
          state.workouts = [];
        },

        set(state, action, payload) {
          state.workouts.push(action.payload.w)
        },
        
        deleteWorkout(state, action, payload) {
          const index = state.workouts.indexOf( state.workouts.find( ({ _id }) => _id === action.payload.id));
          state.workouts.splice(index, 1)
        },

        renderer(state, action, payload) {
         state.renderer = action.payload.renderer
        },

        replaceSets(state, action, payload) {
          if(action.payload.id){
            const index = state.workouts.indexOf( state.workouts.find( ({ _id }) => _id === action.payload.id));
            state.workouts[index].sets = action.payload.sets;
            console.log("id")
          }
          else {
            state.workoutToSave.sets = action.payload.sets;
          }

         },

         deleteSet(state, action, payload) {
          const indexW = state.workouts.indexOf( state.workouts.find( ({ _id }) => _id === action.payload.id));
          state.workouts[indexW].sets.splice(action.payload.indexS, 1); // 2nd parameter means remove one item only
         },
    }
});

export const workoutActions = workoutSlice.actions;
export default workoutSlice.reducer;
