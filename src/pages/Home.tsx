import { useState, useEffect } from "react";
import { fetchProducts, fetchDeliveries, createProductOrder } from "../service/apiFacade";
import { ProductProps } from "../service/ProductProps";
import { DeliveryProps, ProductOrderProps } from "../service/DeliveryProps";
import ModalForm from "../components/product/ModalForm";
import DeliveryModalForm from "../components/delivery/DeliveryModalForm";

function Home() {
    const [products, setProducts] = useState<ProductProps[]>([]);
    const [deliveries, setDeliveries] = useState<DeliveryProps[]>([]);
    const [productOrders, setProductOrders] = useState<ProductProps[]>([]);
    const [searchTermProd, setSearchTermProd] = useState("");
    const [searchTermDelv, setSearchTermDelv] = useState("");

    const fetchProductData = async () => {
        try {
            const productsData = await fetchProducts();
            setProducts(productsData);
        } catch (error) {
            console.error("Error fetching products: ", error);
        }
    };

    const fetchDeliveryData = async () => {
        try {
            const deliveriesData = await fetchDeliveries();
            setDeliveries(deliveriesData);
            console.log("Deliveries: ", deliveriesData);
        } catch (error) {
            console.error("Error fetching deliveries: ", error);
        }
    };

    useEffect(() => {
        fetchProductData();
        fetchDeliveryData();
    }, []);

    const handleSearchProducts = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTermProd(event.target.value);
    };

    const handleSearchDeliveries = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTermDelv(event.target.value);
    };

    const formatProductOrders = (productOrders: ProductOrderProps[] | undefined) => {
        return (productOrders ?? []).map((order) => `${order.product?.name} : ${order.quantity}`).join(", ");
    };

    const addToProductOrder = (product: ProductProps) => {
        const existingProduct = productOrders.find((p) => p.id === product.id);
        if (existingProduct) {
            const updatedProduct = {
                ...existingProduct,
                price: existingProduct.price + product.price,
                weight: existingProduct.weight + product.weight,
                quantity: existingProduct.quantity + 1,
            };
            setProductOrders((prevOrders) => prevOrders.map((p) => (p.id === product.id ? updatedProduct : p)));
        } else {
            setProductOrders((prevOrders) => [...prevOrders, { ...product, quantity: 1 }]);
        }
    };

    const removeFromProductOrder = (product: ProductProps) => {
        const existingProduct = productOrders.find((p) => p.id === product.id);
        if (existingProduct?.quantity && existingProduct.quantity > 1) {
            const updatedProduct = {
                ...existingProduct,
                price: existingProduct.price - product.price,
                weight: existingProduct.weight - product.weight,
                quantity: existingProduct.quantity - 1,
            };
            setProductOrders((prevOrders) => prevOrders.map((p) => (p.id === product.id ? updatedProduct : p)));
        } else if (existingProduct?.quantity === 1) {
            setProductOrders((prevOrders) => prevOrders.filter((p) => p.id !== product.id));
        } else {
            setProductOrders((prevOrders) => [...prevOrders, { ...product, quantity: 1 }]);
        }
    };

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTermProd.toLowerCase())
    );

    const filteredDeliveries = deliveries.filter((delivery) =>
        delivery.destination.toLowerCase().includes(searchTermDelv.toLowerCase())
    );

    const totalOrderPrice = productOrders.reduce((total, product) => total + product.price, 0);
    const totalOrderWeight = productOrders.reduce((total, product) => total + product.weight, 0);

    const handleDeliveryCreated = async (newDelivery: DeliveryProps) => {
        try {
            // Fetch the latest deliveries to find the newly created one
            const updatedDeliveries = await fetchDeliveries();
            const createdDelivery = updatedDeliveries.find(
                (delivery) =>
                    delivery.destination === newDelivery.destination &&
                    delivery.fromWarehouse === newDelivery.fromWarehouse &&
                    delivery.totalPrice === newDelivery.totalPrice &&
                    delivery.totalWeight === newDelivery.totalWeight
            );

            if (createdDelivery) {
                // Create product orders for each product in the order
                for (const product of productOrders) {
                    const productOrder = {
                        quantity: product.quantity,
                        product: { id: product.id },
                        delivery: { id: createdDelivery.id },
                    };
                    await createProductOrder(productOrder, createdDelivery.id);
                }
            }
            setProductOrders([]);
        } catch (error) {
            console.error("Error handling delivery creation:", error);
        }
    };

    return (
        <div className="container">
            <div className="row">
                {/* Products */}
                <div className="col-lg-12">
                    <div className="row">
                        <div className="col-6 col-sm-6 col-md-4 ms-auto mt-4">
                            <ModalForm refreshProducts={fetchProductData} />
                        </div>
                        <div className="col-6 col-sm-6 col-md-4 mx-auto mt-auto">
                            <input
                                className="form-control me-2"
                                type="text"
                                placeholder="Products..."
                                aria-label="ProductSearch"
                                value={searchTermProd}
                                onChange={handleSearchProducts}
                            />
                        </div>
                    </div>

                    <div className="mt-5 px-0 border border-bottom-0">
                        <table className="table table-striped mb-0">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Weight</th>
                                    <th>Add to Order</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.map((product) => (
                                    <tr key={product.id}>
                                        <td>{product.name}</td>
                                        <td>{product.price} ddk</td>
                                        <td>{product.weight} gram</td>
                                        <td>
                                            <button onClick={() => addToProductOrder(product)}>Add to Order</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Product Orders */}
                <div className="col-lg-12 mt-5">
                    <h2>Product Orders</h2>
                    <table className="table table-striped mb-0">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Weight</th>
                                <th>Quantity</th>
                                <th>Fjern fra ordre</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productOrders.map((product, index) => (
                                <tr key={index}>
                                    <td>{product.name}</td>
                                    <td>{product.price} ddk</td>
                                    <td>{product.weight} gram</td>
                                    <td>{product.quantity}</td>
                                    <td>
                                        <button onClick={() => removeFromProductOrder(product)}>
                                            remove from Order
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Delivery(ies) */}
                <div className="col-lg-12">
                    <div className="row">
                        <div className="col-6 col-sm-6 col-md-4 ms-auto mt-4">
                            <DeliveryModalForm
                                refreshDeliveries={fetchDeliveryData}
                                totalPrice={totalOrderPrice}
                                totalWeight={totalOrderWeight}
                                onDeliveryCreated={handleDeliveryCreated}
                            />
                        </div>
                        <div className="col-6 col-sm-6 col-md-4 mx-auto mt-auto">
                            <input
                                className="form-control me-2"
                                type="text"
                                placeholder="Leverancer..."
                                aria-label="DeliveriesSearch"
                                value={searchTermDelv}
                                onChange={handleSearchDeliveries}
                            />
                        </div>
                    </div>
                    <div className="mt-5 px-0 border border-bottom-0">
                        <table className="table table-striped mb-0">
                            <thead>
                                <tr>
                                    <th>Leverings adresse</th>
                                    <th>Varehus</th>
                                    <th>Total pris</th>
                                    <th>Total vægt</th>
                                    <th>Produkter</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredDeliveries.map((delivery: DeliveryProps) => (
                                    <tr key={delivery.id}>
                                        <td>{delivery.destination}</td>
                                        <td>{delivery.fromWarehouse}</td>
                                        <td>{delivery.totalPrice} ddk</td>
                                        <td>{delivery.totalWeight} gram</td>
                                        <td>{formatProductOrders(delivery.productOrders)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
