import * as Yup from "yup";
export declare const ProductSchema: Yup.ObjectSchema<{
    id: string | undefined;
    title: string;
    description: string;
    price: number;
}, Yup.AnyObject, {
    id: undefined;
    title: "";
    description: "";
    price: 0;
}, "">;
export declare const AvailableProductSchema: Yup.ObjectSchema<{
    id: string | undefined;
    title: string;
    description: string;
    price: number;
    count: number;
}, Yup.AnyObject, {
    id: undefined;
    title: "";
    description: "";
    price: 0;
    count: 0;
}, "">;
export type Product = Yup.InferType<typeof ProductSchema>;
export type AvailableProduct = Yup.InferType<typeof AvailableProductSchema>;
