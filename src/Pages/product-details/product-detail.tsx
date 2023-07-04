import React, { FC } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LocationState } from '../../products.model';
import './product-detail.scss';

/**
 * Displays details about clicked product. 
 * Properties in the grid are fetched from backend
 */
const ProductDetail: FC = () => {

  const state = useLocation().state as LocationState;
  const { productItem, pageNumber, searchField } = state; // Read values passed on state

  const navigate = useNavigate();

  const navigatePage = () => {
    navigate('/product-search', { state: { pageNumber: pageNumber, searchField: searchField } });
  };

  const backUrl = '/product-search';
  return (
    <div>
      <a className="header" onClick={() => navigatePage()} href='/product-search'>
        Back
      </a>

      <Link to={{ pathname: `/${1}`, search: `?backUrl=${backUrl}` }} />

      <div className='detail-container'>
        <div>
          <img
            src={productItem.images['480w']}
            srcSet={`${productItem.images['240w']} 600w, ${productItem.images['480w']} 900w, ${productItem.images['640w']} 1280w`}
            sizes="(max-width: 600wpx) 600wpx, (max-width: 900px) 900px, 1280px"
            alt=""
          />
        </div>
        <div className='detail-container__info-text'>
          <div className='detail-container__info-text__grid-item'><strong>Name:</strong></div>
          <div className='detail-container__info-text__grid-item'>{productItem.name}</div>
          <div className='detail-container__info-text__grid-item'><strong>Demo Product Id:</strong></div>
          <div className='detail-container__info-text__grid-item'>{productItem.demoProductId}</div>
          <div className='detail-container__info-text__grid-item'><strong>Description:</strong></div>
          <div className='detail-container__info-text__grid-item'>{productItem.description}</div>
          <div className='detail-container__info-text__grid-item'><strong>Feature Highlight:</strong></div>
          <div className='detail-container__info-text__grid-item'>{productItem.featureHighlight}</div>
          {Array.isArray(productItem?.includedPlugins) &&
            <>
              <div className='detail-container__info-text__grid-item'><strong>Included Plugins:</strong></div>
              <div className='detail-container__info-text__grid-item'>{productItem?.includedPlugins.length && productItem.includedPlugins.map((item, i) => {
                return (<span key={i}>{item}</span>);
              })}</div>
            </>
          }
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;