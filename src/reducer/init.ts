import { done, add } from "../util/init";
export const initialState: undefined = undefined;
export type ACTIONTYPE =
  | { type: "add"; payload: { task: string; arweave_id: string } }
  | { type: "done"; payload: string };

function reducer(_: typeof initialState, action: ACTIONTYPE) {
  switch (action.type) {
    case "add":
      add(action.payload.task, action.payload.arweave_id)
        .then()
        .catch((err) => console.log(err));
      return undefined;
    case "done":
      done(action.payload)
        .then()
        .catch((err) => console.log(err));
      return undefined;
    default:
      return undefined;
  }
}
export default reducer;
