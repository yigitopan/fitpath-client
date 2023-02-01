import {configureStore} from '@reduxjs/toolkit';
import AuthReducer from './auth-slice'
import WorkoutReducer from "./workout-slice"

const store = configureStore({
    reducer: {sLogin: AuthReducer, sWorkout: WorkoutReducer}
});

export default store;