import { Action } from "src/redux";

export interface UserState {
  isLoggedIn: boolean;
  name: string;
}

const initialState: UserState = {
  isLoggedIn: !!localStorage.getItem("name"),
  name: localStorage.getItem("name") || "",
};

export const user = (
  state: UserState = initialState,
  action: Action<UserState>,
) => {
  switch (action.type) {
    case "USER_LOGIN":
      if (action.payload.name)
        localStorage.setItem("name", action.payload.name);
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
