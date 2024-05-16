import React, { useContext } from 'react';
import { context1 } from '../src/App';

const Cart = () => {
    const[data,setData]=useContext(context1);
    const totalPrice=data.reduce((preTotal,data)=>preTotal+data.price*(data.quantity || 1),0);
    const totalQuantity=data.reduce((preTotal,data)=>preTotal+(data.quantity||1),0);
    
    const handleInc=(id,quantity)=>{
        setData(curr=>{
            return curr.map((element)=>{
                if(element.id==id){
                    return {...element,quantity:(element.quantity+1||quantity+1)}
                }
                return element;
            })
        })
    }

    const handleDec = (id, initialQuantity) => {
        setData(curr => {
            return curr.map(element => {
                if (element.id === id) {
                    const newQuantity = (element.quantity || initialQuantity) - 1;
                    return { ...element, quantity: Math.max(newQuantity, 0) }; 
                }
                return element;
            });
        });
    };
    
    const handleRemove=(id)=>{
        setData(curr=>curr.filter((item)=>item.id!==id));
    }
    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4 one">Your Cart Awaits: Let's Shop! <i class="fa-solid fa-cart-shopping"></i></h1>
            <h3 className="text-center mb-4 one">Enjoy Free Shipping <i class="fa-regular fa-face-laugh-wink"></i></h3>
            <div className="d-flex justify-content-between mb-3 one">
                <h3>Total Quantity:{totalQuantity}</h3>
                <h3>Total Price:{totalPrice}</h3>  
            </div>

            {data.map((item,index)=>{
                return(
                    <div key={index} className="card mb-3" style={{ maxWidth: '800px' }}>
                        <div id={`carouselExampleControls-${index}`} className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-inner">
                                {item.images.map((image, imgIndex) => (
                                    <div className={`carousel-item ${imgIndex === 0 ? 'active' : ''}`} key={imgIndex}>
                                        <img src={image} className="d-block mx-auto" alt={`Slide ${imgIndex + 1}`} style={{ maxHeight: '200px', objectFit: 'cover' }} />
                                    </div>
                                ))}
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target={`#carouselExampleControls-${index}`} data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target={`#carouselExampleControls-${index}`} data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>

                        <div className="card-body">
                            <h5 className="card-title">{item.title}</h5>
                            <h6 className="card-text">{item.description}</h6>
                            <h6 className="card-text">Price: ${item.price}</h6>
                            <h6 className="card-text">Discount: {item.discountPercentage}%</h6>
                            <h6 className="card-text">Rating: {item.rating}</h6>
                            <h6 className="card-text">Stock: {item.stock}</h6>
                            <h6 className="card-text">Brand: {item.brand}</h6>
                            <div className="d-flex align-items-center">
                                <button className="btn btn-primary me-2" onClick={() => handleDec(item.id, item.quantity || 1)}>-</button>
                                <div>{item.quantity || 1}</div>
                                <button className="btn btn-primary ms-2" onClick={() => handleInc(item.id, item.quantity || 1)}>+</button>
                                <button className="btn btn-danger ms-auto" onClick={() => handleRemove(item.id)}>Remove</button>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default Cart;