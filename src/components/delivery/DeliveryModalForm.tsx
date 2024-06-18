import React, { useState } from "react";
import { createNewDelivery } from "../../service/apiFacade";
import { DeliveryProps } from "../../service/DeliveryProps";

interface ModalFormProps {
    refreshDeliveries: () => void;
    totalPrice: number;
    totalWeight: number;
    onDeliveryCreated: (newDelivery: DeliveryProps) => void;
}

function DeliveryModalForm({ refreshDeliveries, totalPrice, totalWeight, onDeliveryCreated }: ModalFormProps) {
    const [distination, setDistination] = useState<string>("");
    const [fromWarehouse, setFromWarehouse] = useState<string>("");
    const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);

    const addToDeliveryList = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        const newDelivery = {
            destination: distination,
            fromWarehouse: fromWarehouse,
            totalPrice: totalPrice,
            totalWeight: totalWeight,
        };

        try {
            await createNewDelivery(newDelivery);
            setShowSuccessMessage(true);
            refreshDeliveries();

            onDeliveryCreated(newDelivery);

            setTimeout(() => {
                setShowSuccessMessage(false);
            }, 3000); // 3 seconds
        } catch (error) {
            console.error("Error in addToDeliveryList:", error);
        }
    };

    return (
        <div className="row">
            <div className="col-12">
                <h5 className="text-center">Tilføj en leverance</h5>
            </div>
            <div className="col-12 p-0">
                <button
                    type="button"
                    className="btn btn-primary w-100"
                    data-bs-toggle="modal"
                    data-bs-target="#addDeliveryModal"
                >
                    Opret leverance
                </button>
            </div>

            <div
                className="modal fade"
                id="addDeliveryModal"
                tabIndex={-1}
                aria-labelledby="addDeliveryModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="addDeliveryModalLabel">
                                Opret en delivery
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
                                        <label htmlFor="inputDeliveryName" className="form-label">
                                            Distination
                                        </label>
                                    </div>
                                    <div className="col-sm-10">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="inputDeliveryName"
                                            placeholder="Navnet på produkt der skal tilføjes..."
                                            value={distination}
                                            onChange={(e) => setDistination(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-sm-2">
                                        <label htmlFor="inputDeliveryWarehouse" className="form-label">
                                            Varehus
                                        </label>
                                    </div>
                                    <div className="col-sm-10">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="inputDeliveryWarehouse"
                                            aria-describedby="warehouseHelp"
                                            placeholder="Varehus navn..."
                                            value={fromWarehouse}
                                            onChange={(e) => setFromWarehouse(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-sm-2">
                                        <label htmlFor="inputTotalPrice" className="form-label">
                                            Total pris
                                        </label>
                                    </div>
                                    <div className="col-sm-10">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="inputTotalPrice"
                                            value={totalPrice}
                                            readOnly
                                        />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-sm-2">
                                        <label htmlFor="inputTotalWeight" className="form-label">
                                            Total vægt
                                        </label>
                                    </div>
                                    <div className="col-sm-10">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="inputTotalWeight"
                                            value={totalWeight}
                                            readOnly
                                        />
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    className="btn btn-primary w-50 rounded-0 rounded-start"
                                    onClick={addToDeliveryList}
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
                        <div>
                            {showSuccessMessage && (
                                <div className="alert alert-success mb-3 mx-5 text-center" role="alert">
                                    Leverancen er blevet tilføjet!
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeliveryModalForm;
