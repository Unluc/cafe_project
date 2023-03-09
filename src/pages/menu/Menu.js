import React, { useEffect } from "react";
import axios from "axios";
import Footer from "../../components/footer/Footer.js";
import "./Menu.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import { addAbortSignal } from "form-data";



function Menu() {
    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';

    const [apiData, setApiData] = React.useState("");
    const [state, setState] = React.useState("");
    const [topCategory, setTopCategory] = React.useState({product_set: [], sub_categories: []});
    const [subCategory, setSubCategory] = React.useState("");
    const [cloneData, setClone_Data] = React.useState("");


    useEffect(() => {
        setState("Loading");
        axios.get(`api/v1/category/all_categories/`, {responseType: "json"}).then((res) => {
            console.log("Res data");
            setTopCategory(res.data[0]);
            console.log(topCategory);
            console.log("Res data");
            setState("Success");
            setApiData(res.data);
            setClone_Data(res.data);
            console.log(apiData);

          }).catch((err) => {
            console.log(err);
          });
    }, []);
    
    return(
        <div className="menu ">
            <div className="content-section height">
            <h2>All categories</h2>
                <div className="gallery-container">
                    {state === "Loading" ? (<h1>Loading</h1>) : (
                        Array.prototype.map.call(apiData, (category) => (
                            // category.sub_categories === undefined ? (console.log("Top category has no desendents")) : (
                            <div onClick={() => setTopCategory(category)} className="gallery-card">
                                <img src={category.preview === null ? "/default-food-image.jpg" : category.preview} alt={category.alt} />
                                <p className="product-title">{category.name}</p>
                            </div>
                        ))                        
                        
                    )}
                    {
                    state === "Loading" ? (<h1>Loading</h1>) : (
                        Object.keys(topCategory.product_set).length === 0 ? (console.log("Top category has no products")) : (
                            <>
                            {console.log(typeof(topCategory.product_set))} 
                            <div className="gallery-container">
                            <h2 className="product-title category-title">{topCategory.name}</h2>
                            {
                                    
                                Array.prototype.map.call(topCategory.product_set, (product) => (
                                <Link to={`${product.slug}/`} className="gallery-card" params={{slug: product.slug}}>
                                    <img src={product.preview === null ? "/default-food-image.jpg" : product.preview} alt={product.img_alt} />
                                    <p className="product-title">{product.name} £{product.price}</p>
                                </Link>
                            ))
                            }
                            </div>
                            </> 
                        )
                    )
                        }
                    {
                    state === "Loading" ? (<h1>Loading</h1>) : (
                        
                        
                        Object.keys(topCategory.sub_categories).length === 0 ? (console.log("Error click on another category")) : (
                            Array.prototype.map.call(topCategory.sub_categories, (category) => (
                            // console.log(product)
                                // category.products_set === undefined ? (console.log("Ooops")) : (
                                    <>
                                        <h2 className="product-title category-title">{category.name}</h2>
                                        {
                                        category.product_set === undefined ? (<p className="product-title">No product in that category</p>) : (
                                            // console.log(category)
                                            // Object.entries(category.product_set).map(product => (
                                                Array.prototype.map.call(category.product_set, (product) => (
                                                <Link to={`${product.slug}/`} className="gallery-card" params={{slug: product.slug}}>
                                                    <img src={product.preview === null ? "/default-food-image.jpg" : product.preview} alt={product.img_alt} />
                                                    <p className="product-title">{product.name} £{product.price}</p>
                                                </Link>
                                            ))
                                        )
                                        }
                                    </>
                                    
                                    // console.log(category.products_set)
                                // )
                                // console.log(category)
                                // category.products_set === undefined ? (console.log("Ooops")) : (<h1>Something</h1>)
                                // Object.entries(category.products_set).map(product => (
                                //     <Link to={"product/" + product.slug + "/"} className="product" params={{slug: product.slug}}>
                                //         <img src={product.preview === null ? "/default-food-image.jpg" : product.preview} alt={product.img_alt} />
                                //         <p className="product-title">{product.name} £{product.price}</p>
                                //     </Link>
                                // ))
                        
                        )))
                            
                        //     Array.prototype.map.call(apiData, (category) => (
                        //     <div onClick={() => setTopCategory(category)} className="product">
                        //         <img src={category.preview === null ? "/default-food-image.jpg" : category.preview} alt={category.alt} />
                        //         <p className="product-title">{category.name}</p>
                        //     </div>
                        
                        // )),
                        
                        
                        // console.log(topCategory.product_set)
                        

                        
                    )
                    }
                </div> 
            </div>
                            
        </div>
        
    );
    
}

export default Menu;