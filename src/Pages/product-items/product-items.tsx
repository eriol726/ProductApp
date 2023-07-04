import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Products, Result } from '../../products.model';
import './product-items.scss';

type Props = {
  products?: Products,
  currentPage: number,
  searchField: string,
};

/**
 * Child component to product-search. Loop through items from the input prop and render it in a card
 * @param props 
 */
export const ProductItems: FC<Props> = (props: Props) => {
  const navigate = useNavigate();

  const navigatePage = (productItem: Result) => {
    navigate('/product-detail', { state: { 
      productItem: productItem, 
      pageNumber: props.currentPage, 
      searchField: props.searchField 
    } });
  };

  return (
    <div className="cards">
      {props.products && props.products.result.map((productItem) => {
        return (
          <div key={productItem.id} className="cards__card" onClick={() => navigatePage(productItem)}>
            <img
              src={productItem.images['480w']}
              alt="product image"
            />
            <div className="cards__card__header">
              <p>{productItem.name}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductItems;