import { useState } from "react";

const ShopSubTable = ({ customers }) => {

const [ display, setDisplay ] = useState(false);

return (
    <div className="subTable">
        <button onClick={() => setDisplay(!display)}>{ display ? 
            <span className="material-symbols-outlined">visibility_off</span> : 
            <span className="material-symbols-outlined">visibility</span> }</button>
        {display && <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Amount</th>
                    <th>Date Added</th>
                </tr>
            </thead>
            <tbody>
                {customers.map((customer, index) => {
                    return <tr key={ index }>
                        <td>{ customer.name }</td>
                        <td>{ customer.Quantity }</td>
                        <td>{ customer.pullDate }</td>
                    </tr>
                })}
            </tbody>
        </table>}
    </div>)
}
    export default ShopSubTable;