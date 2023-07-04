import React, { FC } from 'react';

type Props = {
  nPages: number,
  currentPage: number,
  setCurrentPage: (val: number) => void,
};

const Pagination: FC<Props> = (props: Props) => {

  const pageNumbers = [...Array(props.nPages + 1).keys()].slice(1);

  const nextPage = () => {
    if (props.currentPage !== props.nPages) props.setCurrentPage(props.currentPage + 1);
  };

  const prevPage = () => {
    if (props.currentPage !== 1) props.setCurrentPage(props.currentPage - 1);
  };

  const paginationRender = (pgNumber: number) => {
    if (pgNumber === 11) {
      return <li key={pgNumber} className='page-item'>...</li>;
    } else if (pgNumber === pageNumbers.length || pgNumber < 11) {
      return <li key={pgNumber}
        className={`page-item ${props.currentPage === pgNumber ? 'page-item--active' : ''} `} >

        <a onClick={() => props.setCurrentPage(pgNumber)} className='page-link' href={`/product-search#${pgNumber}`}>
          {pgNumber}
        </a>
      </li>;
    } else if (pgNumber >= 11) {
      return;
    }
  };

  return (
    <nav>
      {props.nPages !== 0 &&
        <ul className='pagination'>
          {props.currentPage !== 1 &&
            <li className="page-item" key={'previous'} >
              <a className="page-link" onClick={prevPage} href='/product-search#'>
                Previous
              </a>
            </li>
          }

          {pageNumbers.map(pgNumber => (
            paginationRender(pgNumber)
          ))}

          {props.currentPage !== props.nPages &&
            <li className="page-item" key={'next'} >
              <a className="page-link" onClick={nextPage} href='/product-search#'>
                Next
              </a>
            </li>
          }
        </ul>
      }

    </nav>
  );
};

export default Pagination;