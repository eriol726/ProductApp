import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.scss';

export interface Products {
    totalResults: number;

	result: Result[];
}

export interface Result {
    id: number;

	name: string;

	featureHighlight: string;

	images: {
		'240w': string,
		'480w': string,
		'640w': string,
	};
}

function App() {

	const [products, setProducts] = useState<Products>();

	const [searchFilter, setSearchFilter] = useState("");

	const getApiData = async () => {
		const headers = {"Access-Control-Allow-Origin": "*"};
		const productData = await axios.get('http://127.0.0.1:4000/products').then(response => response.data as Products);

		console.log('productData: ', productData);

		setProducts(productData);

	}

	const search = (kewyWord: string) => {

	}

	const getProducts = () => {

	}

	const filteredProducts = products?.result.filter(product => {
		const res = product.name.toLowerCase().includes(searchFilter.toLowerCase())
		return res;

	});
	
	const handleChange = (e: any) => {
		setSearchFilter(e.target.value);
	};



	useEffect(() => {
		getApiData();
	}, []);

	return (
		<div className="App">

			<input
                type="text"
                className=""
                placeholder="Search..."
                onChange={handleChange}
            />
            <button onClick={getProducts} className="btn btn-primary">
                Submit
            </button>

			<div className="cards">
				{filteredProducts && filteredProducts.map((productItem) => {
					return (
						<div key={productItem.id} className="card">
							<img 
								src={productItem.images['480w']} 
								//srcSet={`${productItem.images['640w']} 600w, ${productItem.images['480w']} 900w, ${productItem.images['240w']} 1280w`}
								//sizes="(max-width: 600wpx) 600wpx, (max-width: 900px) 900px, 1280px"
								alt="" 
							/>
							<div className="header">{productItem.name}</div>
						</div>
					);
				})}
			</div>
			
		</div>
	);
}

export default App;
