import React, { FC, useRef, useEffect,useState } from "react";
import axios from "axios";

const initialValues = {
    id: "",
    name: "",
    price: "",
    description: "",
};

const cartInitialValues = {
    id:"",
    items:[
        {
            id: "",
            name: "",
            price: "",
            description: "",
        }
    ],
    total:"",
    user:""
};


export default function Shop(this: any) {
    const [values, setValues] = useState(initialValues);
    const [Name, setName] = useState("")

    const handleChange = (event: { target: { name: any; value: any; }; }) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleItemSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        var postData = {
            name: values.name,
            price: values.price,
            description: values.description
        };

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': localStorage.getItem("REACT-APP-MY-TOKEN")
            }
        };
        //setName(JSON.stringify(postData));
        axios.post('http://localhost:8099/api/item', postData, axiosConfig)
            .then((response) => {
                console.log("RESPONSE RECEIVED: ", response.status);
                //setName(response.data);
                getItems()
            })
            .catch((error) => {
                console.log("AXIOS ERROR: ", postData);
                //setName(error.response);
            })


    };

    const [items, setItems] = useState([initialValues])
    const [cart, setCart] = useState([initialValues])
    const [cartHistory, setCartHistory] = useState([cartInitialValues])
    const [total, setTotal] = useState([initialValues])
    const [loading, setLoading] = useState(false)


    const handleItemFetch = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        getItems()

    }
    function getItems () {
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': localStorage.getItem("REACT-APP-MY-TOKEN")
            }
        };
        //setName(JSON.stringify(postData));
        axios.get('http://localhost:8099/api/item', axiosConfig)
            .then((response) => {
                console.log("RESPONSE RECEIVED: ", response.data);
                setItems(response.data);
            })
            .catch((error) => {
                console.log("AXIOS ERROR: ", axiosConfig);
                //setName(error.response);
            })
    };

    const handleCartFetch = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        getCart()
    }
    function getCart () {

        var postData = {
            username: localStorage.getItem("REACT-APP-MY-USERNAME"),
        };

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': localStorage.getItem("REACT-APP-MY-TOKEN")
            }
        };
        //setName(JSON.stringify(postData));
        axios.post('http://localhost:8099/api/cart/getCart', postData, axiosConfig)
            .then((response) => {
                console.log("RESPONSE RECEIVED: ", response.status);
                setCart(response.data.items);
                setTotal(response.data.total);
            })
            .catch((error) => {
                console.log("AXIOS ERROR: ", postData);
            })
    };

    const handleCartClear = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        clearCart()
    }
    function clearCart () {

        var postData = {
            username: localStorage.getItem("REACT-APP-MY-USERNAME"),
        };

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': localStorage.getItem("REACT-APP-MY-TOKEN")
            }
        };
        //setName(JSON.stringify(postData));
        axios.post('http://localhost:8099/api/cart/clearCart', postData, axiosConfig)
            .then((response) => {
                console.log("RESPONSE RECEIVED: ", response.status);
                setCart(response.data.items);
                setTotal(response.data.total);
            })
            .catch((error) => {
                console.log("AXIOS ERROR: ", postData);
            })
    };

    function addToCart (arg0: { id: string; name: string; price: string; description: string; })  {

        console.log("Row: " + arg0.name);

        var postData = {
            username: localStorage.getItem("REACT-APP-MY-USERNAME"),
            itemId: arg0.id,
            quantity: 1
        };

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': localStorage.getItem("REACT-APP-MY-TOKEN")
            }
        };
        //setName(JSON.stringify(postData));
        axios.post('http://localhost:8099/api/cart/addToCart', postData, axiosConfig)
            .then((response) => {
                console.log("RESPONSE RECEIVED: ", response.status);
                getCart()
            })
            .catch((error) => {
                console.log("AXIOS ERROR: ", postData);
            })

    };

    const handleCartSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': localStorage.getItem("REACT-APP-MY-TOKEN")
            }
        };
        //setName(JSON.stringify(postData));
        axios.post('http://localhost:8099/api/order/submit/' + localStorage.getItem("REACT-APP-MY-USERNAME"), '', axiosConfig)
            .then((response) => {
                console.log("RESPONSE RECEIVED: ", response.status);
                //setName(response.data);
                getItems()
            })
            .catch((error) => {
                console.log("AXIOS ERROR: ", 'http://localhost:8099/api/order/submit/' + localStorage.getItem("REACT-APP-MY-USERNAME"));
                //setName(error.response);
            })

        clearCart()

    };

    const handleOrderHistorySubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        getHistory()
    }
    function getHistory () {

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': localStorage.getItem("REACT-APP-MY-TOKEN")
            }
        };
        //setName(JSON.stringify(postData));
        axios.get('http://localhost:8099/api/order/history/' + localStorage.getItem("REACT-APP-MY-USERNAME"), axiosConfig)
            .then((response) => {
                console.log("RESPONSE RECEIVED: ", response.data);
                setCartHistory(response.data);
            })
            .catch((error) => {
                console.log("AXIOS ERROR: ");
            })
    };

    return (
        <section>
            <article>
                <div>
                    <div className="login-top">
                        <h1>{("Create item")}</h1>
                    </div>
                    <form onSubmit={handleItemSubmit}>
                        <label>
                            Shop name:
                            <input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Enter item name"
                                onChange={handleChange}
                                value={values.name}
                                maxLength={20}
                                required
                            />
                        </label>
                        <label>
                            Price:
                            <input
                                type="number"
                                name="price"
                                id="price"
                                placeholder="Enter price"
                                onChange={handleChange}
                                value={values.price}
                                maxLength={20}
                                required
                            />
                        </label>
                        <label>
                            Description:
                            <input
                                type="text"
                                name="description"
                                id="description"
                                placeholder="Enter description"
                                onChange={handleChange}
                                value={values.description}
                                maxLength={20}
                                required
                            />
                        </label>
                        <input className="itemButton" type="submit" value="Submit"/>
                    </form>
                </div>
                <div>
                <div className="login-top">
                    <h1>{("All items")}</h1>
                </div>
                    <form onSubmit={handleItemFetch}>

                        <input id="fetchButton" type="submit" value="Get all items"/>
                    </form>
                    <div className="Item">
                        {loading ? (
                            <div>Loading...</div>
                        ) : (
                            <>
                                <table>
                                    <tr>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Description</th>
                                    </tr>
                                    {items.map(item => (
                                        <tr key={item.id} >
                                            <td>{item.name}</td>
                                            <td>{item.price}</td>
                                            <td>{item.description}</td>
                                            <button className="cart-button" onClick={() => addToCart(item)}>Add to cart</button>
                                        </tr>
                                    ))}
                                </table>
                            </>
                        )}
                    </div>
                <div className="login-top">
                        <h1>{("Cart contents")}</h1>
                </div>
                    <form onSubmit={handleCartFetch}>
                        <input id="fetchButton" type="submit" value="Get cart contents"/>
                    </form>
                    <form onSubmit={handleCartClear}>
                        <input id="fetchButton" type="submit" value="Clear cart contents"/>
                    </form>
                    <div className="Cart">
                        {loading ? (
                            <div>Loading...</div>
                        ) : (
                            <>
                                <table>
                                    <tr>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Description</th>
                                    </tr>
                                    {cart.map(item => (
                                        <tr key={item.id} >
                                            <td>{item.name}</td>
                                            <td>{item.price}</td>
                                            <td>{item.description}</td>
                                        </tr>
                                    ))}
                                </table>
                            </>
                        )}
                    </div>

                <div className="login-top">
                        <h1>{("Submit cart")}</h1>
                </div>
                    <form onSubmit={handleCartSubmit}>

                        <input id="fetchButton" type="submit" value="Submit cart"/>
                    </form>
                <div className="login-top">
                        <h1>{("Order history")}</h1>
                </div>
                    <form onSubmit={handleOrderHistorySubmit}>

                        <input id="fetchButton" type="submit" value="Get order history"/>
                    </form>

                    <div className="Item">
                        {loading ? (
                            <div>Loading...</div>
                        ) : (
                            <>
                                {cartHistory.map((cart,index) => (

                                    // cart.forEach((index) => {
                                        //console.log("item: ", JSON.stringify(cart.items))
                                    // })

                                            <table>
                                                <tr>
                                                    <th> </th>
                                                    <th> </th>
                                                    <th> </th>
                                                </tr>
                                                <tr>
                                                    <th> Order {index+1} - Total price: {cart.total} </th>
                                                    <th> </th>
                                                    <th> </th>
                                                </tr>
                                                <tr>
                                                    <th> </th>
                                                    <th> </th>
                                                    <th> </th>
                                                </tr>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Price</th>
                                                    <th>Description</th>
                                                </tr>
                                                {cart.items.map(item => (
                                                    <tr key={item.id} >
                                                        <td>{item.name}</td>
                                                        <td>{item.price}</td>
                                                        <td>{item.description}</td>
                                                    </tr>
                                                ))
                                                }
                                            </table>

                                        )
                                )}
                            </>
                        )}
                    </div>
            </div>

            </article>
        </section>

    )
}
