import { Reducer } from "react";

export type ActionCreator<T extends string = string, C extends object = {}> = {
  type: T;
} & C;

export function createAction<T extends string, C extends object = {}>(
  type: T,
  config?: C,
): ActionCreator<T, C> {
  return { type, ...(config ?? ({} as any)) };
}

export const props = <C extends object = {}>(): C => ({} as any);

export function createReducer<TState, TAction extends ActionCreator = any>(
  ...reducerTypes: {
    actionCreator: TAction;
    reducer: Reducer<TState, TAction>;
  }[]
): Reducer<TState, TAction> {
  return function (state: TState, action: TAction) {
    const reducerType = reducerTypes.find(
      ({ actionCreator }) => actionCreator.type === action.type,
    );

    return reducerType?.reducer(state, action) ?? state;
  };
}

export function on<TState, TActionCreator extends ActionCreator>(
  actionCreator: TActionCreator,
  reducer: Reducer<TState, TActionCreator>,
) {
  return { actionCreator, reducer };
}
