import { ProductProps } from "./ProductProps";

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

async function fetchSpecificProduct(id: number) {
    const url = `${endpoint}/api/products/${id}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // console.log("Product:", data);
        return data;
    } catch (error) {
        console.error("Error fetching product:", error);
        throw error;
    }
}

async function createNewProduct(products: ProductProps) {
    const url = `${endpoint}/api/products/`;
    try {
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

// ----- Van ----- //

// ----- Export ----- //
export { fetchProducts, fetchSpecificProduct, createNewProduct, updateProduct };
