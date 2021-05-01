import { routerReducer, RouterStateSerializer } from "@ngrx/router-store";
import { ROUTER_STATE_NAME } from "./router/router.selector";

export interface AppState {
    [ROUTER_STATE_NAME]: RouterStateSerializer
}

export const appReducer = {
    [ROUTER_STATE_NAME]: routerReducer
}