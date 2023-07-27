import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// enum Roles {
//     USER = "USER",
//     ADMIN = "ADMIN" // add more roles as needed here...
// }

export interface UserState {
    id: string;
    username: string;
    role: string
}

const initialState: UserState = {
    id: "",
    username: "",
    role: ""
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<UserState>) => {
            state.id = action.payload.id
            state.username = action.payload.username
            state.role = action.payload.role
        },
        logout: (state) => {
            state.id = ""
            state.username = ""
            state.role = ""
        }
    },
})

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions

export default userSlice.reducer
