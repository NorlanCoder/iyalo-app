import { AUTHENTICATED, USER, ISADMIN, SETTOKEN, LOGOUT, NOTIFICATION } from './actionName';

const userState = {
    user: {
        "id": 0,
        "name": "",
        "email": "",
        "phone": 0,
        "image_url": "",
        "birthday": "",
        "token_notify": "",
        "solde": 0,
        "email_verified_at": null,
        "password": null,
        "status": null,
        "role": null,
        "adress": null,
        "card_image": null,
        "logo": null,
        "remember_token": null,
        "created_at": null,
        "updated_at": null
    },
    isAuthenticated: false,
    isLoading: false,
    isAdmin: false,
    accessLocation: false,
    token: "",
    position: {
        longitude: Number(0),
        latitude: Number(0),
    },
    notifications: [],
    googleSignin: false
}

export default function userReducer(state = userState, {type, payload}){
    let nextState;
    switch (type){
        case AUTHENTICATED:
            nextState = {
                ...state,
                isAuthenticated: payload
            }
            return nextState || state;

        case USER:
            nextState = {
                ...state,
                user: payload
            }
            return nextState || state;

        case ISADMIN:
            nextState = {
                ...state,
                isAdmin: payload
            }
            return nextState || state;

        case NOTIFICATION:
            nextState = {
                ...state,
                notifications: payload
            }
            return nextState || state;

        case SETTOKEN:
            nextState = {
                ...state,
                token: payload
            }
            return nextState || state;

        case LOGOUT:
            nextState = {
                ...state,
                user: {
                    "id": 0,
                    "name": "",
                    "email": "",
                    "phone": 0,
                    "image_url": "",
                    "birthday": "",
                    "token_notify": "",
                    "solde": 0,
                    "email_verified_at": null,
                    "password": null,
                    "status": null,
                    "role": null,
                    "adress": null,
                    "card_image": null,
                    "logo": null,
                    "remember_token": null,
                    "created_at": null,
                    "updated_at": null
                },
                isAuthenticated: false,
                isLoading: false,
                isAdmin: false,
                accessLocation: false,
                token: "",
                position: {
                    longitude: Number(0),
                    latitude: Number(0),
                },
                notifications: [],
                googleSignin: false
            }
            return nextState || state;

        default:
            return state;
    }
}