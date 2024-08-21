import { createSlice } from '@reduxjs/toolkit';
import { ONBOARDING, LOCATION, AUTHENTICATED, DATAMAP } from './actionName';

const initialState = {
    visit: false,
    onboarding: true,
    location: {
        "longitude": 0,
        "latitude": 0,
    },
    dataMap: [],
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

        case LOCATION:
            nextState = {
                ...state,
                location: payload
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