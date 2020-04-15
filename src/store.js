import {configureStore, createSlice } from '@reduxjs/toolkit'

const loginInfo = createSlice({
    name:'LoginInformation',
    initialState:{
        id:"",
        class:[
            {
                classId:132,
                classTeacher:'고길동',
            }
        ],
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
        }
    }
})

const store = configureStore({reducer: loginInfo.reducer})

store.subscribe(()=>console.log(store.getState()))

export const {login, logout} = loginInfo.actions;

export default store;