import { useState, useEffect } from "react";
import { fetchProducts } from "../service/apiFacade";
import { ProductProps } from "../service/ProductProps";
import ProductTable from "../components/product/ProductTable";

function Home() {
    const [products, setProducts] = useState<ProductProps[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productsData = await fetchProducts();
                console.log("Products:", productsData);

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
            <div className="row">
                {/* Tabel for alle produkter */}
                {products.map((product) => (
                    <div key={product.id}>
                        <ProductTable name={product.name} price={product.price} weight={product.weight} />
                    </div>
                ))}
            </div>
            <div className="text-center">
                <h1>Home</h1>
                <p>Welcome to the home page!</p>
            </div>
        </>
    );
}

export default Home;
