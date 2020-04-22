import {configureStore, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { URL} from './components/App'

const loginInfo = createSlice({
    name:'LoginInformation',
    initialState:{
        user:{
            classesAsTutee: [],
            classesAsTutor: [],
            nickname: "",
            password: "",
            point: 0,
            username: "",
            webmail: "",
            __v: 0,
            _id: ""
        },
        class: [],
    },
    reducers:{
        updateUser: (state, action) => {
            return {
                ...state,
                user:action.payload
            }
        },
        logout: (state, action) => {
            axios.get(URL + 'auth/logout');
            return{
                ...state,
                user:{nickname:""}
            }
        },
        addClass: (state, action) => {
            return{
                ...state,
                class : action.payload
            }
        },
        
    }
})

const store = configureStore({reducer: loginInfo.reducer})
store.subscribe(()=>console.log(store.getState()))
export const {login, logout, addClass, updateUser} = loginInfo.actions;
export default store;

// user:{
//     classesAsTutee: ["5e96feb14e204c474c529556"],
//     classesAsTutor: ["5e99d656ec3f5d225abdafb6", "5e99d696ec3f5d225abdafb7", "5e99d74c8c4a1b243d6947f8", "5e99d7908c4a1b243d6947f9", "5e9fd99db1ddaa727bce4d6f", "5e9fda8bb1ddaa727bce4d70", "5e9fdac7b1ddaa727bce4d71", "5e9fde92b1ddaa727bce4d72"],
//     nickname: "jinwoo",
//     password: "asdf",
//     point: 1000,
//     username: "asdf",
//     webmail: "testmail",
//     __v: 9,
//     _id: "5e99d637ec3f5d225abdafb5"
// },