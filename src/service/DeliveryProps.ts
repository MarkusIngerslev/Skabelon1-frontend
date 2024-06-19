import { ProductProps } from "./ProductProps";

export interface DeliveryProps {
    id?: number;
    fromWarehouse: string;
    destination: string;
    totalWeight?: number;
    totalPrice?: number;
    productOrders?: ProductOrderProps[];
}

export interface ProductOrderProps {
    map(arg0: (order: { product: { name: string; }; quantity: number; }) => string): unknown;
    id?: number;
    quantity: number;
    product?: ProductProps;
}
