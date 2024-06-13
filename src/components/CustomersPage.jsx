import { useState } from "react";

function CustomersPage() {
    const customerList = [
        { boxnumber: 1, name: 'John Doe', email: 'email@emailprovider.com', phone: "(709) 555-5555", userID: 0, customer: true, subList: ['Batman', 'Poison Ivy', 'Shazam', 'World Finest',],},
        { boxnumber: 2, name: 'Geoff Deal', email: 'test@email.com', phone: '(709) 555-6666', userID: 2, customer: true, subList: ['Radiant Black', 'Rogue Sun', 'Dead Lucky', 'No/One',],},
        { boxnumber: 3, name: 'James', email: 'james@yipee.com', phone: '(709) 555-7777', userID: 3, customer: true, subList: ['Hulk', 'Wolverine', 'X-Men'],},
        { boxnumber: 4, name: 'Mike Singer', email: 'singer@test.ca', phone: '(709) 555-8888', userID: 4, customer: true, subList: ['W0rldtr33', 'Conan'],},
        { boxnumber: 5, name: 'Clayton Smith', email: 'clay@email.com', phone: '(709) 555-9999', userID: 5, customer: true, subList: ['Looney Tunes', 'Scooby Doo'],},
    ]
    const pendingList = [
        { name: 'Mark Smith', email: 'marks@yipee.com', phone: '(709) 555-1111', },
        { name: 'Hal', email: 'HalJ@yipee.com', phone: '(709) 555-2222', },
    ]

const [customers, setCustomers] = useState(customerList);
const [pendingCustomers, setPendingCustomer] = useState(pendingList);

    return (
        <>
            <h1>Customers</h1>
            <h3>Current Customers:</h3>
            <div id="customerList" className="customerLists">
                { customers.map((customer) => 
                    <li key={ customer.userID }><div className="customerRow"><div className="customerInnerDiv">
                        <p>{customer.name}</p><p>{customer.boxnumber}</p></div>
                        <button className="customerOptions"><span className="material-symbols-outlined">more_horiz</span></button>
                    </div></li>)}
            </div>
            <h3>Pending Customers:</h3>
            <div id="wouldbeCustomers" className="customerLists">
                { pendingCustomers.map((customer) => 
                        <li key={ customer.email }><div className="customerRow">
                            <p>{customer.name}</p>
                            <button className="customerOptions"><span className="material-symbols-outlined">more_horiz</span></button>
                        </div></li>)}
            </div>
        </>
    )
}

export default CustomersPage;