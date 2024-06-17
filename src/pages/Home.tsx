import { useState, useEffect } from "react";
import { fetchProducts } from "../service/apiFacade";
import { ProductProps } from "../service/ProductProps";

function Home() {
    const [products, setProducts] = useState<ProductProps[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productsData = await fetchProducts();
                // console.log("Products:", productsData);
                setProducts(productsData);
            } catch (error) {
                console.error("An fetching products: ", error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            {/* tilføj et produkt */}
            {/* hent alle produkter */}
            {/* find enkelt produkt */}
            <div className="container">
                <div className="row mt-5 border">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Weight</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.name}</td>
                                    <td>{product.price} ddk</td>
                                    <td>{product.weight} gram</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Home;
