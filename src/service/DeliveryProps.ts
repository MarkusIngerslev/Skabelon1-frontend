export interface DeliveryProps {
    id?: number;
    fromWarehouse: string;
    destination: string;
    totalWeight?: number;
    totalPrice?: number;
}
