import { createSlice } from '@reduxjs/toolkit';
import { ONBOARDING } from './actionName';

const initialState = {
    visit: false,
    onboarding: true,
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