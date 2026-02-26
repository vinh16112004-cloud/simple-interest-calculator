import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import './ProductList.css';

function ProductList() {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    
    // Danh sách thực vật mẫu (Plants data)
    const plantsArray = [
        {
            category: "Air Purifying",
            plants: [
                { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Produces oxygen at night.", cost: "$15" },
                { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Filters formaldehyde and xylene.", cost: "$12" }
            ]
        }
    ];

    const handleAddToCart = (plant) => {
        dispatch(addItem(plant));
    };

    return (
        <div className="product-grid">
            {plantsArray.map((category, index) => (
                <div key={index}>
                    <h1>{category.category}</h1>
                    <div className="plant-list">
                        {category.plants.map((plant, plantIndex) => (
                            <div className="plant-card" key={plantIndex}>
                                <img src={plant.image} alt={plant.name} />
                                <div className="plant-name">{plant.name}</div>
                                <div className="plant-cost">{plant.cost}</div>
                                <button 
                                    disabled={cartItems.some(item => item.name === plant.name)}
                                    onClick={() => handleAddToCart(plant)}>
                                    {cartItems.some(item => item.name === plant.name) ? "Added" : "Add to Cart"}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ProductList;
