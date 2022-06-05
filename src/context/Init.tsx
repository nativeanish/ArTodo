import React from "react";
import reducer, { initialState, ACTIONTYPE } from "../reducer/init";
type Interface = {
  state: typeof initialState;
  dispatch: (dec: ACTIONTYPE) => void;
};
export const AppCtx = React.createContext<Interface | null>(null);
const Context = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <AppCtx.Provider value={{ state, dispatch }}>{children}</AppCtx.Provider>
  );
};
export default Context;
