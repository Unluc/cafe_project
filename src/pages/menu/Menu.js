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
    const [topCategory, setTopCategory] = React.useState("True");
    const [subCategory, setSubCategory] = React.useState("");
    const [cloneData, setClone_Data] = React.useState("");


    // const categ = "";

    // function chooseTOpCategory(input) {
    //     return setTopCategory(input);
    // }

    useEffect(() => {
        setState("Loading");
        axios.get(`api/v1/category/all_categories/`, {responseType: "json"}).then((res) => {
            console.log("Res data");
            if(topCategory === "") {
                setTopCategory(res.data[0]);
            }
            console.log(res.data[0].sub_categories);
            console.log(topCategory);
            console.log("Res data");
            setState("Success");
            // clone_Data = res.data;
            setApiData(res.data);
            setClone_Data(res.data);
            console.log(apiData);
            console.log(cloneData[0].sub_categories);

          }).catch((err) => {
            console.log(err);
          });
    }, []);
    
    // console.log(products);
    // console.log(typeof apiData);
    // console.log("apiData");
    return(
        <div className="menu ">
            <div className="content-section height">
            <h2>All categories</h2>
                <div className="products-container">
                    {state === "Loading" ? (<h1>Loading</h1>) : (
                            Array.prototype.map.call(apiData, (category) => (
                            <div onClick={() => setTopCategory(category)} className="product">
                                <img src={category.preview === null ? "/default-food-image.jpg" : category.preview} alt={category.alt} />
                                <p className="product-title">{category.name}</p>
                            </div>
                        
                        ))
                        
                        
                        // console.log(cloneData)
                        // Array.prototype.map.call(cloneData, (product) => (
                        //     console.log(product)
                        //     // <Link to={"product/" + product.slug + "/"} className="product" params={{slug: product.slug}}>
                        //     //     <img src={product.preview === null ? "/default-food-image.jpg" : product.preview} alt={product.img_alt} />
                        //     //     <p className="product-title">{product.name} £{product.price}</p>
                        //     // </Link>
                        
                        // ))

                        
                    )}
                    {
                    state === "Loading" ? (<h1>Loading</h1>) : (
                        
                        topCategory.sub_categories === undefined ? (<p>Error click on another category</p>) : (
                            Array.prototype.map.call(topCategory.sub_categories, (category) => (
                            // console.log(product)
                                // category.products_set === undefined ? (console.log("Ooops")) : (
                                    <p className="product-title">{category.name}</p>
                                    // console.log(category.products_set)
                                // )
                                
                                // category.products_set.map(product => (
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
                            
            <Footer />
        </div>
        
    );
    
}

export default Menu;