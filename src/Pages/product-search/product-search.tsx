import React, { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import ProductItems from '../product-items/product-items';
import Pagination from './pagination';
import { LocationState, Products } from '../../products.model';
import './product-search.scss';

type Error = {
	message: string;
};

/**
 * Fetching data from server endpoint http://127.0.0.1:4000/products on init
 *
 * Renders 12 products per page
 * Preserve search result. If user enters the product detail page and go back
 * to search page. Same items will be displayed as the search result returned.
 */
const ProductSearch: FC = () => {
	const [isLoading, setIsLoading] = useState(false);

	const state = useLocation().state as LocationState;

	const [products, setProducts] = useState<Products>({
		result: state?.products?.result ? state.products.result : [],
		totalResults: state?.products?.totalResults ? state.products.totalResults : 0,
	});

	const [currentProductsInit, setCurrentRecords] = useState<Products>({
		result: state?.currentProducts ? state.currentProducts : [],
		totalResults: state?.currentProducts ? state.currentProducts.length : 0,
	});

	const [searchField, setSearchField] = useState(state?.searchField ? state.searchField : '');

	const [error, setError] = useState<Error | null>(null);

	const [currentPage, setCurrentPage] = useState<number>(state?.pageNumber ? state.pageNumber : 1);

	const [productsPerPage] = useState(12);

	const [nPages, setNpages] = useState(
		state?.products?.result ? Math.ceil(state.products.result.length / productsPerPage) : 0
	);

	const indexOfLastProduct = currentPage * productsPerPage;
	const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

	const sliceProductResult = (_products: Products, _indexOfFirstRecord: number, _indexOfLastRecord: number) => {
		const currentProducts: Products = {
			result: _products.result.slice(_indexOfFirstRecord, _indexOfLastRecord),
			totalResults: _products.result.length,
		};

		return currentProducts;
	};

	const searchProducts = (_products: Products, _searchField: string): void => {
		const result = _products.result.filter((product) => {
			return product.name.toLowerCase().includes(_searchField.toLowerCase());
		});

		const indexOfLastRecordSearch = 1 * productsPerPage;
		const indexOfFirstRecordSearch = indexOfLastRecordSearch - productsPerPage;

		const currentProducts: Products = {
			result: result.slice(indexOfFirstRecordSearch, indexOfLastRecordSearch),
			totalResults: result.length,
		};

		const nPagesSearch = Math.ceil(result.length / productsPerPage);

		setNpages(nPagesSearch);
		setCurrentRecords(currentProducts);
	};

	const getApiData = async () => {
		setIsLoading(true);
		setError(null);

		try {
			const response = await fetch('http://127.0.0.1:4000/products');
			const productData = (await response.json()) as Products;

			setProducts(productData);

			setNpages(Math.ceil(productData.result.length / productsPerPage));

			setCurrentRecords(sliceProductResult(productData, indexOfFirstProduct, indexOfLastProduct));
		} catch (_error: any) {
			setError({ message: (_error as Error).message });
		} finally {
			setIsLoading(false);
		}
	};

	const clearSearch = () => {
		// What is the proper way to clear location state with react-router-dom v6?
		// navigate(location.pathname, {});
		// window.history.replaceState({}, '');
		state.currentProducts = [];
		state.searchField = '';

		const currentProducts = sliceProductResult(products, indexOfFirstProduct, indexOfLastProduct);
		setCurrentRecords(currentProducts);
		setSearchField('');
		const nPagesSearch = Math.ceil(state.products.result.length / productsPerPage);

		setNpages(nPagesSearch);
		setCurrentPage(1);
	};

	useEffect(() => {
		if (state?.searchField || state?.currentProducts) {
			return;
		} else {
			void getApiData();
		}
	}, []);

	useEffect(() => {
		if (!state?.searchField) {
			const currentProducts = sliceProductResult(products, indexOfFirstProduct, indexOfLastProduct);

			setCurrentRecords(currentProducts);
		} else {
			const nPagesSearch = Math.ceil(state.currentProducts.length / productsPerPage);

			setNpages(nPagesSearch);
		}
	}, [currentPage]);

	return (
		<div>
			<div className="search-container">
				<input type="text" placeholder="Search..." onChange={(e) => setSearchField(e.target.value)} />
				<button onClick={() => searchProducts(products, searchField)} className="btn btn-primary">
					Search
				</button>
				<button onClick={clearSearch} className="btn btn-primary">
					Clear
				</button>
			</div>

			<Pagination nPages={nPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />

			<ProductItems
				currentProducts={currentProductsInit.result}
				currentPage={currentPage}
				searchField={searchField}
				allProducts={products}
			/>

			<Pagination nPages={nPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />

			{isLoading && <p>Loading...</p>}
			{error && <p>Error: {error.message}</p>}
		</div>
	);
};

export default ProductSearch;
