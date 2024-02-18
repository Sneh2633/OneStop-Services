import { createSlice } from "@reduxjs/toolkit";

//application state - logged in status
export const loggedSlice = createSlice({
    name: "logged",
    initialState: {
        loggedIn: false
    },
    reducers : {
        login: (state,action)=> {console.log("in login action"); return {loggedIn: true,user: action.payload}},

        logout: (state) => { return {loggedIn: false,user: null}}
    }
})
//component actions - useDispatch
export const {login,logout} = loggedSlice.actions
//will be used in store
export default loggedSlice.reducer;
