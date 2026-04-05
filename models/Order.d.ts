import * as Yup from "yup";
import { OrderStatus } from "../constants/order";
export declare const AddressSchema: Yup.ObjectSchema<{
    firstName: string;
    lastName: string;
    address: string;
    comment: string;
}, Yup.AnyObject, {
    firstName: "";
    lastName: "";
    address: "";
    comment: "";
}, "">;
export type Address = Yup.InferType<typeof AddressSchema>;
export declare const OrderItemSchema: Yup.ObjectSchema<{
    productId: string;
    count: number;
}, Yup.AnyObject, {
    productId: undefined;
    count: undefined;
}, "">;
export type OrderItem = Yup.InferType<typeof OrderItemSchema>;
export declare const statusHistorySchema: Yup.ObjectSchema<{
    status: NonNullable<OrderStatus | undefined>;
    timestamp: number;
    comment: string;
}, Yup.AnyObject, {
    status: undefined;
    timestamp: undefined;
    comment: undefined;
}, "">;
export type statusHistory = Yup.InferType<typeof statusHistorySchema>;
export declare const OrderSchema: Yup.ObjectSchema<{
    id: string;
    items: {
        count: number;
        productId: string;
    }[];
    address: {
        firstName: string;
        lastName: string;
        address: string;
        comment: string;
    };
    statusHistory: {
        comment: string;
        status: NonNullable<OrderStatus | undefined>;
        timestamp: number;
    }[];
}, Yup.AnyObject, {
    id: undefined;
    items: "";
    address: {
        firstName: "";
        lastName: "";
        address: "";
        comment: "";
    };
    statusHistory: "";
}, "">;
export type Order = Yup.InferType<typeof OrderSchema>;
