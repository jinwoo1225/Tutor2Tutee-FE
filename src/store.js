import {configureStore, createSlice } from '@reduxjs/toolkit'

const loginInfo = createSlice({
    name:'LoginInformation',
    initialState:{
        id:"",
        class:[],
    },
    reducers:{
        //로그인시에 저장되어있어야하는것
        login: (state, action) => {
            return{
                id:action.payload,
                class:state.class,
            }
        },
        logout: (state, action) => {
            return{
                id:"",
                class:state.class,
            }
        },
        addClass: (state, action) => {
            return{
                id : state.id,
                class : action.payload
            }
        }
    }
})

const store = configureStore({reducer: loginInfo.reducer})

store.subscribe(()=>console.log(store.getState()))

export const {login, logout, addClass} = loginInfo.actions;

export default store;