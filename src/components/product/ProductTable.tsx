type Props = {
    name: string;
    price: number;
    weight: number;
};

function ProductTable({ name, price, weight }: Props) {
    return (
        <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Weight</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{name}</td>
                        <td>{price}</td>
                        <td>{weight}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default ProductTable;
