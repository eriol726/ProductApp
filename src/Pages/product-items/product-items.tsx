import React, { FC, useEffect } from 'react';
import App from '../../App';
import { useNavigate, Routes, Route, useSearchParams } from "react-router-dom";
import ProductDetail from '../product-details/product-detail';
import { Products } from '../../products.model';
import './product-items.scss';

type Props = {
	products?: Products,
	currentPage: number,
	searchField: string,
};

export const ProductItems: FC<Props> = (props: Props) => {

	const navigate = useNavigate();
	
	const navigatePage = (productItem: any) => {
		navigate('/product-detail', { state: {productItem: productItem, pageNumber: props.currentPage, searchField: props.searchField} });
	}

	const [searchParams, setSearchParams] = useSearchParams();

	let search = window.location.search;
	let params = new URLSearchParams(search);
	let foo = params.get('query');

	searchParams.get('page'); // 10


	useEffect(() => {
		console.log('searchParams: ', searchParams);
		console.log('foo: ', foo);
	},[])

	return( 
		<div className="cards">
			{props.products && props.products.result.map((productItem) => {
				return (
					<div key={productItem.id} className="card">
						<img 
							src={productItem.images['480w']} 
							//srcSet={`${productItem.images['640w']} 600w, ${productItem.images['480w']} 900w, ${productItem.images['240w']} 1280w`}
							//sizes="(max-width: 600wpx) 600wpx, (max-width: 900px) 900px, 1280px"
							alt="" 
						/>
						<div className="header" onClick={() => navigatePage(productItem)}>
							<p>{productItem.name}</p>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default ProductItems;