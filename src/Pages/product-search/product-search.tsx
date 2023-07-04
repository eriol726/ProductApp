import React, { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import ProductItems from '../product-items/product-items';
import Pagination from './pagination';
import { LocationState, Products } from '../../products.model';
import './product-search.scss';

type Error = {
  message: string
}

const ProductSearch: FC = () => {
  const [products, setProducts] = useState<Products>({ result: [], totalResults: 0 });

  const [currentProductsInit, setCurrentRecords] = useState<Products>({ result: [], totalResults: 0 });

  const [isLoading, setIsLoading] = useState(false);

  const state = useLocation().state as LocationState;

  const [searchField, setSearchField] = useState(state?.searchField ? state.searchField : '');

  const [error, setError] = useState<Error | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(state?.pageNumber ? state.pageNumber : 1);

  const [recordsPerPage] = useState(12);

  const [nPages, setNpages] = useState(0);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const searchProducts = (_products: Products, _searchField: string): void => {
    const result = _products.result.filter(product => {
      const res = product.name.toLowerCase().includes(_searchField.toLowerCase());
      return res;
    });

    const indexOfLastRecordSearch = 1 * recordsPerPage;
    const indexOfFirstRecordSearch = indexOfLastRecordSearch - recordsPerPage;

    const currentProducts: Products = {
      result: result.slice(indexOfFirstRecordSearch, indexOfLastRecordSearch),
      totalResults: products.result.length,
    };

    const nPagesSearch = Math.ceil(result.length / recordsPerPage);

    setNpages(nPagesSearch);
    setCurrentRecords(currentProducts);
  };

  const getApiData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://127.0.0.1:4000/products');
      const productData = await response.json() as Products;

      setProducts(productData);

      if (state?.searchField) {
        searchProducts(productData, searchField);
      } else {
        setNpages(Math.ceil(productData.result.length / recordsPerPage));

        const currentProducts: Products = {
          result: productData.result.slice(indexOfFirstRecord, indexOfLastRecord),
          totalResults: productData.result.length,
        };

        setCurrentRecords(currentProducts);
      }
    }
    catch (_error: any) {
      setError({ message: (_error as Error).message });
    } finally {
      setIsLoading(false);
    }
  };

  const clearSearch = () => {
    searchProducts(products, '');
    setSearchField('');
    setCurrentPage(1);
  };

  useEffect(() => {
    void getApiData();

  }, []);

  useEffect(() => {
    const currentProducts: Products = {
      result: products.result.slice(indexOfFirstRecord, indexOfLastRecord),
      totalResults: products.result.length,
    };

    setCurrentRecords(currentProducts);
  }, [currentPage]);

  return (
    <div >
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

      <ProductItems products={currentProductsInit} currentPage={currentPage} searchField={searchField} />

      <Pagination
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default ProductSearch;