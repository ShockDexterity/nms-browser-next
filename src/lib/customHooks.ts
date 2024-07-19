import { useContext } from "react";
import { DispatchContext, ReducerContext } from "./state/contextReducer";

export const useReducer = () => {
  const reducer = useContext(ReducerContext);

  if (!reducer) {
    throw new Error("reducer has to be used withing <ReducerContext.Provider>");
  }

  return reducer;
};

export const useDispatch = () => {
  const dispatch = useContext(DispatchContext);

  if (!dispatch) {
    throw new Error(
      "dispatch has to be used within <DispatchContext.Provider>",
    );
  }

  return dispatch;
};
