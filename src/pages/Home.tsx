import { useState, useEffect } from "react";
import { fetchProducts } from "../service/apiFacade";
import { ProductProps } from "../service/ProductProps";
import ModalForm from "../components/product/ModalForm";

function Home() {
    const [products, setProducts] = useState<ProductProps[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchData = async () => {
        try {
            const productsData = await fetchProducts();
            setProducts(productsData);
        } catch (error) {
            console.error("Error fetching products: ", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container">
            <div className="row ">
                <div className="col-6 col-sm-6 col-md-4 ms-auto mt-4">
                    <ModalForm refreshProducts={fetchData} />
                </div>
                <div className="col-6 col-sm-6 col-md-4 mx-auto my-auto">
                    <input
                        type="text"
                        placeholder="Search by product name"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
            </div>

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
                        {filteredProducts.map((product) => (
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
