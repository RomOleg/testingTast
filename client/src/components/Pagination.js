import React from 'react';

const Pagination = ({ routPerPage, totalRout, paginate }) => {
    const pageNumber = [];
    for (let i = 1; i <= Math.ceil(totalRout / routPerPage); i++) {
        pageNumber.push(i)
    }

    return (
        <div>
            <ul className='pagination'>
                {
                    pageNumber.map(number => (
                        <li className='page-item' key={number}>
                            <a href='!#' className='page-link' onClick={() => paginate(number)}>
                            {number}
                        </a>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
    
}

export default Pagination;