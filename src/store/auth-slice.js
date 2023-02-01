import { createSlice} from '@reduxjs/toolkit';

const loginInitial = {
    userIdSlice:"",
    isAuthenticated:false,
    invalidAttempt:false,
    errorMessage:"",
    user:""
};

const loginSlice = createSlice({
    name:'sLogin', 
    initialState: loginInitial,
    reducers: {
        login(state, action, payload) {
              if(action.payload.loggedin) { //girdi
                  state.invalidAttempt = false;
                  state.isAuthenticated = true;
                  state.user = action.payload.user;
                  state.userIdSlice = action.payload.userIdSlice
              }

              else { //girmedi
                const errorString = action.payload.errorMessage.split(":")[1];
                state.errorMessage = errorString;
                state.invalidAttempt = true ;
                state.isAuthenticated = false;
                if(action.payload.errorMessage.indexOf("Şifreniz") !== -1){
                    state.errorType ="pass"
                }
                else {
                    state.errorType ="both"
                }
              }
        },

        logout(state) {
            state.isAuthenticated = false;
            localStorage.setItem("token","loggedout")
        }
    }
});

export const loginActions = loginSlice.actions;
export default loginSlice.reducer;
