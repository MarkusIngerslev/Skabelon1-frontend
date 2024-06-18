import React, { useState } from "react";
import { createNewProduct } from "../../service/apiFacade";

interface ModalFormProps {
    refreshProducts: () => void;
}

function ModalForm({ refreshProducts }: ModalFormProps) {
    const [name, setName] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [weight, setWeight] = useState<number>(0);
    const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);

    const addToProductList = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        const newProduct = {
            name: name,
            price: price,
            weight: weight,
        };

        try {
            await createNewProduct(newProduct);
            setShowSuccessMessage(true);
            refreshProducts();

            setTimeout(() => {
                setShowSuccessMessage(false);
            }, 3000); // 3 seconds
        } catch (error) {
            console.error("Error in addToProductList:", error);
        }
    };

    return (
        <div>
            <h2>Add a product</h2>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addProductModal">
                Opret produkt
            </button>

            <div
                className="modal fade"
                id="addProductModal"
                tabIndex={-1}
                aria-labelledby="addProductModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="addProductModalLabel">
                                Tilføj et produkt
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="row mb-3">
                                    <div className="col-sm-2">
                                        <label htmlFor="inputProductName" className="form-label">
                                            Name
                                        </label>
                                    </div>
                                    <div className="col-sm-10">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="inputProductName"
                                            placeholder="Navnet på produkt der skal tilføjes..."
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-sm-2">
                                        <label htmlFor="inputProductPrice" className="form-label">
                                            Price
                                        </label>
                                    </div>
                                    <div className="col-sm-10">
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="inputProductPrice"
                                            placeholder="Pris for produkt i DDK..."
                                            value={price}
                                            onChange={(e) => setPrice(Number(e.target.value))}
                                        />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-sm-2">
                                        <label htmlFor="inputProductWeight" className="form-label">
                                            Vægt
                                        </label>
                                    </div>
                                    <div className="col-sm-10">
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="inputProductWeight"
                                            placeholder="Vægt for produkt i gram..."
                                            value={weight}
                                            onChange={(e) => setWeight(Number(e.target.value))}
                                        />
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    className="btn btn-primary w-50 rounded-0 rounded-start"
                                    onClick={addToProductList}
                                >
                                    Submit
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger w-50 rounded-0 rounded-end"
                                    data-bs-dismiss="modal"
                                >
                                    Close
                                </button>
                            </form>
                        </div>
                        <div className="modal-footer">
                            {showSuccessMessage && (
                                <div className="alert alert-success" role="alert">
                                    Produktet er blevet tilføjet!
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalForm;
