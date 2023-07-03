import React, { FC, useEffect, useRef, useState } from "react"
import {Route, Routes, useLocation, useParams} from "react-router-dom"

import ProductItems from "../product-items/product-items";
import Pagination from "./pagination";
import { Products } from "../../products.model";
import './product-search.scss';

type Props = {
	product : any
};




const ProductSearch : FC = () => {
    const [products, setProducts] = useState<Products>({result: [], totalResults: 0});

	const [currentRecords, setCurrentRecords] = useState<Products>({result: [], totalResults: 0});

	const [isLoading, setIsLoading] = useState(false);

	const { state } = useLocation(); 

	console.log('state: ', state);
	const [searchField, setSearchField] = useState(state?.searchField ? state.searchField : "");

	const [error, setError] = useState<any>(null);

	

	const [currentPage, setCurrentPage] = useState(state?.pageNumber ? state.pageNumber : 1);
	
    const [recordsPerPage] = useState(12);

	const [nPages, setNpages] = useState(0);

	const pageRef = useRef(null);

	const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

	const getApiData = async () => {
		setIsLoading(true);
  		setError(null);

		try {
			const response = await fetch('http://127.0.0.1:4000/products');
			const productData = await response.json() as Products;

			setProducts(productData);

			if(state?.searchField){
				searchProducts(productData, searchField);
			} else {
				setNpages(Math.ceil(productData.result.length / recordsPerPage));

				const currentRecords: Products = {
					result: productData.result.slice(indexOfFirstRecord, indexOfLastRecord),
					totalResults: productData.result.length,
				}

				setCurrentRecords(currentRecords);
			}

			
		}
		catch (error: any) {
			setError(error);
		} finally {
			setIsLoading(false);
		}
	}
	
	const searchProducts = (products: Products, searchField: string) => {
		let result = products.result.filter(product => {
			const res = product.name.toLowerCase().includes(searchField.toLowerCase())
			return res;
		});

		const indexOfLastRecord = 1 * recordsPerPage;
    	const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

		const currentRecords1: Products = {
			result: result.slice(indexOfFirstRecord, indexOfLastRecord),
			totalResults: products.result.length,
		}

		let nPages = Math.ceil(result.length / recordsPerPage);

		setNpages(nPages);
		
		setCurrentRecords(currentRecords1);
	};

	const clearSearch = () => {
		searchProducts(products, "")
		setSearchField("");
		setCurrentPage(1);
	}

	useEffect(() => {
		getApiData();
		
	}, []);

	useEffect(() => {
		const currentRecords: Products = {
			result: products.result.slice(indexOfFirstRecord, indexOfLastRecord),
			totalResults: products.result.length,
		}
		
		setCurrentRecords(currentRecords);
	}, [currentPage]);

	return (
		<div className="App" >

			<div className="search-container">
				<input
					type="text"
					className=""
					placeholder="Search..."
					onChange={(e) => setSearchField(e.target.value)}
				/>
				<button onClick={() => searchProducts(products, searchField)} className="btn btn-primary">
					Submit
				</button>
				<button onClick={clearSearch} className="btn btn-primary">
					Clear
				</button>
			</div>
			
			<Pagination
                nPages={nPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}

            />

			<ProductItems products={currentRecords} currentPage={currentPage} searchField={searchField}/>

			<Pagination
                nPages={nPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />

			{isLoading && <p>Loading...</p>}
    		{error && <p>Error: {error.message}</p>}
		</div>
	);
}


export default ProductSearch