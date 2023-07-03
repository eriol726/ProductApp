import React, { FC } from "react"
import {Link, Route, useLocation, useNavigate, useParams} from "react-router-dom"

type Props = {
	product : any
};

const ProductDetail : FC = () => {
    const {productId} = useParams();

	const {state} = useLocation();
	const { productItem, pageNumber, searchField } = state; // Read values passed on state

	const navigate = useNavigate();
	
	const navigatePage = () => {
		navigate('/product-search', { state: {pageNumber: pageNumber, searchField: searchField} });
	}

	console.log('pageNumber: ', pageNumber);
    
	const backUrl = '/product-search';
    return (
        <div>


			<a className="header" onClick={() => navigatePage()} href='/product-search'>
				Back
			</a>

			<Link to={{pathname: `/${1}`, search: `?backUrl=${backUrl}`}} />
			<div>{productItem.name}</div>
			<img 
				src={productItem.images['480w']} 
				srcSet={`${productItem.images['240w']} 600w, ${productItem.images['480w']} 900w, ${productItem.images['640w']} 1280w`}
				sizes="(max-width: 600wpx) 600wpx, (max-width: 900px) 900px, 1280px"
				alt="" 
			/>
        </div>
    )
}

export default ProductDetail