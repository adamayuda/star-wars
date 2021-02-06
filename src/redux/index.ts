import { applyMiddleware, compose, createStore } from "redux";
import { mainReducer } from "src/redux/reducers";
import thunk from "redux-thunk";

const composeEnhancers =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const mainStore = createStore(
  mainReducer,
  composeEnhancers(applyMiddleware(thunk)),
);

export const createMainStore = () => {
  return createStore(mainReducer, composeEnhancers(applyMiddleware(thunk)));
};

export type StateInterface = ReturnType<typeof mainStore.getState>;

export type ActionType = "USER_LOGIN";

export interface Action<T> {
  type: ActionType;
  payload: Partial<T>;
}
