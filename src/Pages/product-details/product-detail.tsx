import React, { FC } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LocationState } from '../../products.model';
import './product-detail.scss';


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
        <div className='info-text'>
          <div className='grid-item'><strong>Name:</strong></div>
          <div className='grid-item'>{productItem.name}</div>
          <div className='grid-item'><strong>demoProductId:</strong></div>
          <div className='grid-item'>{productItem.demoProductId}</div>
          <div className='grid-item'><strong>description:</strong></div>
          <div className='grid-item'>{productItem.description}</div>
          <div className='grid-item'><strong>featureHighlight:</strong></div>
          <div className='grid-item'>{productItem.featureHighlight}</div>
          {Array.isArray(productItem?.includedPlugins) &&
            <>
              <div className='grid-item'><strong>includedPlugins:</strong></div>
              <div className='grid-item'>{productItem?.includedPlugins.length && productItem.includedPlugins.map((item) => {
                return (<>{item}</>);
              })}</div>
            </>
          }

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;