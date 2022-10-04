import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../../typings";
import { RootState } from "../../app/store";

interface CartState {
	user: User | null;
	isAuthenticated: boolean;
}

const initialState: CartState = {
	user: null,
	isAuthenticated: false,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		loginUser: (state, action: PayloadAction<User>) => {
			const user = action.payload;
			if (state.user === null && state.isAuthenticated === false) {
				state.user = user;
				state.isAuthenticated = true;
			} else return;
		},
		logoutUser: (state) => {
			if (state.isAuthenticated) {
				state.isAuthenticated = false;
				state.user = null;
			} else return;
		},
	},
});

export const { loginUser, logoutUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;
export const selectIsAuthenticated = (state: RootState) =>
	state.user.isAuthenticated;

export default userSlice.reducer;
