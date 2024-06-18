import { useState, useEffect } from "react";
import { fetchProducts } from "../service/apiFacade";
import { ProductProps } from "../service/ProductProps";
import ModalForm from "../components/product/ModalForm";

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
        <div className="container">
            {/* Tilføj et produkt */}
            {/* find enkelt produkt */}
            <div className="row ">
                <div className="col-6 col-sm-6 col-md-4 ms-auto mt-4">
                    <ModalForm />
                </div>
                <div className="col-6 col-sm-6 col-md-4 mx-auto"></div>
            </div>

            {/* Tabel for alle produkter */}
            <div className="row mt-5 border border-bottom-0 ">
                <table className="table table-striped mb-0 ">
                    <thead className="">
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
    );
}

export default Home;
