import { createSlice } from '@reduxjs/toolkit';
import { ONBOARDING, LOCATION, AUTHENTICATED, DATAMAP, GENERAL, WITHDRAW, FAVORIS } from './actionName';

const initialState = {
    visit: false,
    onboarding: true,
    location: {
        "longitude": 0,
        "latitude": 0,
    },
    bilan: {
        properties: 0,
        visits: 0,
        all_cash: 0,
        wallet: 0
    },
    withdraw: {
        wallet: 0,
        data: [],
        next: '',
    },
    dataMap: [],
    favoris: []
}

export default function appReducer(state = initialState, {type, payload}){
    let nextState;
    switch (type){
        case ONBOARDING:
            nextState = {
                ...state,
                onboarding: payload
            }
            return nextState || state;

        case AUTHENTICATED:
            nextState = {
                ...state,
                isAuthenticated: payload
            }
            return nextState || state;

        case FAVORIS:
            nextState = {
                ...state,
                favoris: payload
            }
            return nextState || state;

        case LOCATION:
            nextState = {
                ...state,
                location: payload
            }
            return nextState || state; 

        case GENERAL:
            nextState = {
                ...state,
                bilan: payload
            }
            return nextState || state; 

        case WITHDRAW:
            nextState = {
                ...state,
                withdraw: payload
            }
            return nextState || state; 
              
        case DATAMAP:
            nextState = {
                ...state,
                dataMap: payload
            }
            return nextState || state; 
            
        default:
            return state;
    }
}

// export const appSlice = createSlice({
//     name: 'app',
//     initialState,
//     reducers: {
//         // onboarding: () => true,
//         firstTime: (state, action) => {
//             state.first = action.payload
//         }
//     }
// });
// export const { onboarding, firstTime } = appSlice.actions;
// export default appSlice;