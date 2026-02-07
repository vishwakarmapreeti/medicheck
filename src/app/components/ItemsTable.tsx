import "@/styles/items-table.css";

export default function ItemsTable({ items }: any) {
    return (
        <section className="items-card">
            <h3 className="items-title">Items</h3>

            <table className="items-table">
                <thead>
                    <tr>
                        <th>S.N</th>

                        <th>HSN</th>

                        <th>Product Name</th>
                        <th>Pack</th>
                        <th>Qty</th>
                        <th>Free</th>
                        <th>Batch</th>
                        <th>MFG</th>
                        <th>EXP</th>
                        <th>MRP</th>
                        <th>Rate</th>

                        <th>Dis</th>
                        <th>SGST</th>
                        <th>SGST Value</th>
                        <th>CGST</th>
                        <th>CGST Value</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item: any, index: number) => (
                        <tr key={index}>

                            <td>{item.sn}</td>
                            <td>{item.hsn}</td>

                            <td>{item.productName}</td>
                            <td>{item.pack}</td>

                            <td>{item.qty}</td>
                            <td>{item.free}</td>
                            <td>{item.batch}</td>
                            <td>{item.mfg}</td>
                            <td>{item.exp}</td>




                            <td>₹{item.rate}</td>
                            <td>{item.dis}</td>
                            <td>{item.sgst}</td>
                            <td>{item.sgstValue}</td>
                            <td>{item.cgst}</td>
                            <td>{item.cgstValue}</td>


                            <td>₹{item.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}
