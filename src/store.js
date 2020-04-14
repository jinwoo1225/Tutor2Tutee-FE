import {configureStore, createSlice } from '@reduxjs/toolkit'

const loginInfo = createSlice({
    name:'LoginInformation',
    initialState:[],
    reducers:{
        //로그인시에 저장되어있어야하는것
        login: (state, action) => {
            state.push(action.payload)
        },
        logout: (state, action) => {
            state.pop()
        }
    }
})

const store = configureStore({reducer: loginInfo.reducer})

export const {login, logout} = loginInfo.actions;

export default store;