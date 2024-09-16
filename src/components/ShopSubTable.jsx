import { useState, useRef, useEffect } from "react";

const ShopSubTable = ({ customers }) => {
    const [ display, setDisplay ] = useState(false);
    const subTableRef = useRef(null);
    const handleOutsideClick = (event) => {
        if (subTableRef.current && !subTableRef.current.contains(event.target)) {
            setDisplay(false);
        }
    }
    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        }
    }, []);


    return (
        <div className="subTable" ref={subTableRef}>
            <button onClick={() => setDisplay(!display)}>{ display ? 
                <span className="material-symbols-outlined">visibility_off</span> : 
                <span className="material-symbols-outlined">visibility</span> }</button>
            {display && <table className="customerTable">
                <thead>
                    <tr>
                        <th>Box Number</th>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Date Added</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer, index) => {
                        return <tr key={ index }>
                            <td>{ customer.boxNumber }</td>
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