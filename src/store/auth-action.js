import { loginActions } from "./auth-slice";
import { workoutActions } from "./workout-slice";

export const testAuth = (login) => {
    return async (dispatch) => {
        try {
          //var noError = true;
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          myHeaders.append("Authorization", localStorage.getItem("token"));
          
            if(login) {
              var raw = JSON.stringify({ "loginArkasi": true });
            }
            
            else {
              var raw = JSON.stringify({});
            }
            
            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
            };

        const response = await fetch("https://fitpath-server.herokuapp.com/api/users/isAuth", requestOptions)
        const responseData = await response.json();
        
        console.log(responseData)

        if(responseData.auth!==true){
            dispatch(loginActions.logout());
        }
        else {
            dispatch(loginActions.login({loggedin:true, user:responseData.userLoggedIn, userIdSlice:responseData.userLoggedIn.userId}))
            return true;
        }
        }
        catch(err){
          console.log(err);
        }
    }
}



export const getWorkouts = (userId) => {
  return async (dispatch) => {
    try {
      var myHeaders = new Headers();
    myHeaders.append("Authorization", localStorage.getItem("token"));


    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
      const response = await fetch(`https://fitpath-server.herokuapp.com/api/workouts/${userId}/`, requestOptions)
      const responseData = await response.json();
      
      dispatch(workoutActions.reset())

      responseData.map((w)=>{
        return dispatch(workoutActions.set({w}))
      })
    } 

    catch (error) {
      console.log(error);
    }
  }
}


export const addWorkout = (userId, workout) => {
  return async (dispatch) => {
    try {
      var myHeaders = new Headers();
    myHeaders.append("Authorization", localStorage.getItem("token"));
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "userID": userId,
      "workout": workout
    });

    console.log(workout)
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
     /* const response = await fetch("http://localhost:5000/api/workouts/ekle", requestOptions)
      const responseData = await response.json().then(()=>{
        dispatch(workoutActions.renderer({renderer:Math.random()}))
      });
      */
      await fetch("https://fitpath-server.herokuapp.com/api/workouts/ekle", requestOptions).then(()=>{
        dispatch(workoutActions.renderer({renderer:Math.random()}))
      });
    } 
    
    catch (error) {
      console.log(error);
    }
  }
}

export const replaceWorkout = (userId, workoutId, workout) => {
  return async (dispatch) => {
    try {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", localStorage.getItem("token"));
      myHeaders.append("Content-Type", "application/json");
      
      var raw = JSON.stringify({
        "userID": userId,
        "workoutId": workoutId,
        "workout": workout
      });
      
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
    
      await fetch("https://fitpath-server.herokuapp.com/api/workouts/duzenle", requestOptions)
      //const response = await fetch("http://localhost:5000/api/workouts/duzenle", requestOptions)
      //const responseData = await response.json();
    } 
    
    catch (error) {
      console.log(error);
    }
  }
}

    export const deleteWorkout = (userId, workoutId) => {
      return async (dispatch) => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          "userID": userId,
          "workoutId": workoutId
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      
      await fetch("https://fitpath-server.herokuapp.com/api/workouts/sil", requestOptions)
      //const response = await fetch("http://localhost:5000/api/workouts/sil", requestOptions)
      //const responseData = await response.json();
     
    } catch (error) {
      
    }
      }
    }