import {configureStore, createSlice } from '@reduxjs/toolkit'

const loginInfo = createSlice({
    name:'LoginInformation',
    initialState:{
        id:"",
        class:[
            {
                classID : 1,
                title: '자료구조',
                teacher: '고길동',
                description: '자료구조, 제가 알려드릴께요!',
                current: 3,
                maximum : 12,
                type: 'online',
                image: 'img/lect-1.jpg',
            },
            {
                classID : 2,
                title: '창의력 계발',
                teacher: '둘리',
                description: '창의력 부족하신거 제가 알아요! 우리 창의적으로 공부할까요?',
                current: 7,
                maximum : 8,
                type: 'online',
                image: 'img/lect-2.jpg',
            },
            {
                classID : 3,
                title: '생활 원예',
                teacher: '또치',
                description: '같이 원예에 대해서 배워요!',
                current: 5,
                maximum : 7,
                type: 'offline',
                image: 'img/lect-3.jpg',
            },
            {
                classID : 4,
                title: '초급 영어',
                teacher: '마이콜',
                description: 'Do you know english?',
                current: 6,
                maximum : 20,
                type: 'online',
                image: 'img/lect-4.jpg',
            },
            {
                classID : 5,
                title: '선형대수학',
                teacher: '도우너',
                description: '모든 수포자 여기모여라!!',
                current: 2,
                maximum : 6,
                type: 'online',
                image: 'img/lect-5.jpg',
            },
            {
                classID : 6,
                title: '컴퓨터 프로그래밍',
                teacher: '박희동',
                description: '코딩 별거 없어요!',
                current: 7,
                maximum : 10,
                type: 'online',
                image: 'img/lect-6.jpg',
            },

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