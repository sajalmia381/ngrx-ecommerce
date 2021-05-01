import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { Product } from "./product";

export interface ProductState extends EntityState<Product> {
    // add extra fields
}

export const productAdaptar = createEntityAdapter<Product>({
    // adds extra
})

export const initialState = productAdaptar.getInitialState({});