import { ProductProps } from "./ProductProps";
import { ProductOrderProps } from "./ProductOrderProps";
import { DeliveryProps } from "./DeliveryProps";

const endpoint = "http://localhost:8080";

// ----- Products ----- //
async function fetchProducts() {
    const url = `${endpoint}/api/products`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        return data;
    } catch (error) {
        console.error("An error occured: ", error);
        throw error;
    }
}

async function fetchSpecificProductId(id: number) {
    const url = `${endpoint}/api/products/${id}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching product:", error);
        throw error;
    }
}

async function fetchSpecificProductName(name: string) {
    const url = `${endpoint}/api/products/search/${name}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching product:", error);
        throw error;
    }
}

async function createNewProduct(products: ProductProps) {
    const url = `${endpoint}/api/products`;
    try {
        console.log("Creating product:", products);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(products),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log("Product created successfully!");
    } catch (error) {
        console.error("Error creating product:", error);
        throw error;
    }
}

async function updateProduct(id: number, products: ProductProps) {
    const url = `${endpoint}/api/products/${id}`;
    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(products),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log("Product updated successfully!");
    } catch (error) {
        console.error("Error updating product:", error);
        throw error;
    }
}

// ----- Delivery ----- //

async function fetchDeliveries() {
    const url = `${endpoint}/api/deliveries`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("An error occured: ", error);
        throw error;
    }
}

async function fetchSpecificDeliveryId(id: number) {
    const url = `${endpoint}/api/deliveries/${id}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching delivery:", error);
        throw error;
    }
}

async function createNewDelivery(delivery: DeliveryProps) {
    const url = `${endpoint}/api/deliveries`;
    try {
        console.log("Creating delivery:", delivery);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(delivery),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log("Delivery created successfully!");
    } catch (error) {
        console.error("Error creating delivery:", error);
        throw error;
    }
}

async function createProductOrder(productOrder: ProductOrderProps, id: number) {
    const url = `${endpoint}/api/deliveries/${id}/productOrders`;
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(productOrder),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log("Product order created successfully!");
    } catch (error) {
        console.error("Error creating product order:", error);
        throw error;
    }
}

// ----- Van ----- //

// ----- Export ----- //
export { fetchProducts, fetchSpecificProductId, fetchSpecificProductName, createNewProduct, updateProduct };
export { fetchDeliveries, fetchSpecificDeliveryId, createNewDelivery, createProductOrder };
