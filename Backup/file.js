// import { useEffect, useState } from "react";
// import { Container, Table, Form } from "react-bootstrap";

// function OrderList() {
//   const [orders, setOrders] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     async function fetchOrders() {
//       try {
//         const response = await fetch("/api/orders");
//         if (response.ok) {
//           const data = await response.json();
//           setOrders(data);
//         } else {
//           console.error("Unable to fetch orders");
//         }
//       } catch (err) {
//         console.error(err);
//       }
//     }
//     fetchOrders();
//   }, []);

//   const filteredOrders = orders.filter((order) =>
//     order.address.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <Container>
//       <h1>All Orders</h1>
//       <Form>
//         <Form.Group controlId="formSearch">
//           <Form.Control
//             type="text"
//             placeholder="Search by address"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </Form.Group>
//       </Form>
//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>Order ID</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Address</th>
//             <th>Total Cost</th>
//             <th>Items</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredOrders.map((order) => (
//             <tr key={order.id}>
//               <td>{order.id}</td>
//               <td>{order.name}</td>
//               <td>{order.email}</td>
//               <td>{order.address}</td>
//               <td>
//                 $
//                 {order.cartItems
//                   .reduce(
//                     (total, item) => total + item.price * item.quantity,
//                     0
//                   )
//                   .toFixed(2)}
//               </td>
//               <td>
//                 <Table striped bordered hover>
//                   <thead>
//                     <tr>
//                       <th>Image</th>
//                       <th>Name</th>
//                       <th>Price</th>
//                       <th>Quantity</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {order.cartItems.map((item) => (
//                       <tr key={item.id}>
//                         <td>
//                           <img
//                             src={item.imgSrc}
//                             alt={item.name}
//                             height="50px"
//                           />
//                         </td>
//                         <td>{item.name}</td>
//                         <td>${item.price.toFixed(2)}</td>
//                         <td>{item.quantity}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </Table>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </Container>
//   );
// }

// export default OrderList;

// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const url =
//   "mongodb+srv://Nexo:9456@cluster0.osasaot.mongodb.net/Nexo?retryWrites=true&w=majority";
// const app = express();

// // Connect to MongoDB database
// mongoose
//   .connect(url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error(err));

// // Define schema for order data
// const orderSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   address: {
//     type: String,
//     required: true,
//   },
//   cartItems: {
//     type: Array,
//     required: true,
//   },
// });

// // Create Order model from schema
// const Order = mongoose.model("Order", orderSchema);

// // Parse request body as JSON
// app.use(bodyParser.json());

// // Handle POST request to /api/orders
// app.post("/api/orders", async (req, res) => {
//   const { name, email, address, cartItems, totalCost } = req.body;

//   // Create new Order instance with request data
//   const newOrder = new Order({
//     name,
//     email,
//     address,
//     cartItems,
//   });

//   try {
//     // Save new order to database
//     await newOrder.save();
//     // Send response indicating success
//     res.status(201).json({ message: "Order submitted successfully" });
//   } catch (err) {
//     console.error(err);
//     // Send response indicating error
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Handle GET request to /api/orders
// app.get("/api/orders", async (req, res) => {
//   try {
//     // Fetch all orders from the database
//     const orders = await Order.find();
//     // Send response with orders
//     res.status(200).json(orders);
//   } catch (err) {
//     console.error(err);
//     // Send response indicating error
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Start server
// app.listen(5000, () => {
//   console.log("Server started on port 3000");
// });

// // import React, { useState } from "react";
// import "./Css/ProductList.css";

// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   Button,
//   Modal,
//   Form,
//   Table,
//   Image,
// } from "react-bootstrap";
// import { products } from "./Datajson/electronicsProducts";
// import Cart from "./Cart";
// import { useHistory } from "react-router-dom";

// function ProductList() {
//   const history = useHistory();
//   // State for selected product and cart items
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [cartItems, setCartItems] = useState([]);

//   const handleClearCart = () => {
//     setCartItems([]);
//   };

//   // State for order form data and date/time
//   const [orderFormData, setOrderFormData] = useState({
//     name: "",
//     email: "",
//     address: "",
//   });
//   const [dateTime, setDateTime] = useState("");

//   // Function to handle adding product to cart
//   const handleAddToCart = (product) => {
//     // Check if item is already in cart
//     const index = cartItems.findIndex((item) => item.id === product.id);
//     if (index > -1) {
//       // Item already exists, update quantity
//       const newCartItems = [...cartItems];
//       newCartItems[index].quantity += 1;
//       setCartItems(newCartItems);
//     } else {
//       // Item does not exist, add to cart
//       const newCartItem = { ...product, quantity: 1 };
//       setCartItems([...cartItems, newCartItem]);
//     }
//   };

//   // Function to handle removing product from cart
//   const handleRemoveFromCart = (product) => {
//     // Check if item is in cart
//     const index = cartItems.findIndex((item) => item.id === product.id);
//     if (index > -1) {
//       // Item exists, remove from cart
//       const newCartItems = [...cartItems];
//       if (newCartItems[index].quantity > 1) {
//         // Item quantity > 1, decrement quantity
//         newCartItems[index].quantity -= 1;
//       } else {
//         // Item quantity == 1, remove from cart
//         newCartItems.splice(index, 1);
//       }
//       setCartItems(newCartItems);
//     }
//   };

//   // Function to handle submitting order
//   const handleSubmitOrder = async (e) => {
//     e.preventDefault();
//     const orderData = { ...orderFormData, cartItems, dateTime };
//     try {
//       const response = await fetch("/api/orders", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(orderData),
//       });
//       if (response.ok) {
//         // Order submitted successfully
//         console.log("Order submitted successfully");
//         // Clear cart and order form data
//         setCartItems([]);
//         setOrderFormData({ name: "", email: "", address: "" });
//         setDateTime(new Date().toLocaleString()); // Update date/time state
//         // Redirect to payment page
//         history.push("/pay");
//       } else {
//         // Order submission failed
//         console.log("Failed to submit order");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <Container>
//       <Row>
//         <Col md={8}>
//           <Row>
//             {products.map((product) => (
//               <Col md={4} key={product.id}>
//                 <Card
//                   className="product-card"
//                   style={{
//                     border: "none",
//                     marginBottom: "20px",
//                     boxShadow: "none",
//                   }}
//                 >
//                   <Card.Img variant="top" src={product.imgSrc} />
//                   <Card.Body>
//                     <Card.Title style={{ marginLeft: "50px" }}>
//                       {product.name}
//                     </Card.Title>
//                     <Button
//                       variant="primary"
//                       onClick={() => setSelectedProduct(product)}
//                     >
//                       View Details
//                     </Button>{" "}
//                     <Button
//                       variant="danger"
//                       onClick={() => handleAddToCart(product)}
//                     >
//                       Add to Cart
//                     </Button>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             ))}
//           </Row>
//         </Col>
//         <Col md={4}>
//           <h3>Cart</h3>
//           <Cart
//             handleClearCart={handleClearCart}
//             cartItems={cartItems}
//             handleRemoveFromCart={handleRemoveFromCart}
//             orderFormData={orderFormData}
//             setOrderFormData={setOrderFormData}
//             handleSubmitOrder={handleSubmitOrder}
//           />
//         </Col>
//       </Row>
//       <Modal
//         show={selectedProduct !== null}
//         onHide={() => setSelectedProduct(null)}
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>{selectedProduct?.name}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Image src={selectedProduct?.imgSrc} fluid />
//           <p>{selectedProduct?.description}</p>
//           <p>Price: {selectedProduct?.price}</p>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setSelectedProduct(null)}>
//             Close
//           </Button>
//           <Button
//             variant="success"
//             onClick={() => handleAddToCart(selectedProduct)}
//           >
//             Add to Cart
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// }

// export default ProductList;
// //

// import { useState } from "react";
// import { Container, Table, Button } from "react-bootstrap";
// import "./Css/Cart.css";
// function Cart({ cartItems, handleRemoveFromCart, handleClearCart }) {
//   const [orderFormData, setOrderFormData] = useState({
//     name: "",
//     email: "",
//     address: "",
//     totalPrice: "",
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setOrderFormData((formData) => ({ ...formData, [name]: value }));
//   };

//   const handleSubmitOrder = async (e) => {
//     e.preventDefault();
//     const orderData = { ...orderFormData, cartItems };
//     try {
//       const response = await fetch("/api/orders", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(orderData),
//       });
//       if (response.ok) {
//         // Order submitted successfully
//         console.log("Order submitted successfully");
//         // Clear cart and order form data
//         setOrderFormData({ name: "", email: "", address: "" });
//         // You may also want to update the cart items in the parent component
//         // Clear cart items
//         handleClearCart();
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };
//   const totalPrice = cartItems.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   );
//   return (
//     <Container>
//       <Table striped bordered hover className="my-5">
//         <thead>
//           <tr>
//             <th>id</th>
//             <th>Image</th>
//             <th>Name</th>
//             <th>Price</th>
//             <th>Quantity</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {cartItems.map((item, index) => (
//             <tr key={item.id}>
//               <td>{index + 1}</td>
//               <td>
//                 <img src={item.imgSrc} alt={item.name} height="50px" />
//               </td>
//               <td>{item.name}</td>
//               <td>${item.price.toFixed(2)}</td>
//               <td>{item.quantity}</td>
//               <td>
//                 <Button
//                   variant="danger"
//                   onClick={() => handleRemoveFromCart(item)}
//                 >
//                   Remove
//                 </Button>
//               </td>
//             </tr>
//           ))}
//           <tr>
//             <td colSpan={4}></td>
//             <td>
//               <strong>Total:</strong>
//             </td>
//             <td>${totalPrice.toFixed(2)}</td>
//           </tr>
//         </tbody>
//       </Table>
//       <h3>Order Form</h3>
//       <form onSubmit={handleSubmitOrder}>
//         <div className="form-group">
//           <label htmlFor="name">Name:</label>
//           <input
//             className="form-control"
//             type="text"
//             id="name"
//             name="name"
//             value={orderFormData.name}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="email">Email:</label>
//           <input
//             className="form-control"
//             type="email"
//             id="email"
//             name="email"
//             value={orderFormData.email}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="address">Address:</label>
//           <input
//             className="form-control"
//             type="text"
//             id="address"
//             name="address"
//             value={orderFormData.address}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="totalCost">Total Cost:</label>
//           <input
//             className="form-control"
//             type="text"
//             id="totalCost"
//             name="totalCost"
//             value={totalPrice}
//             readOnly
//           />
//         </div>
//         <Button type="submit" className="btn btn-primary">
//           Submit Order
//         </Button>
//       </form>
//     </Container>
//   );
// }

// export default Cart;
