import React from 'react';
import './UI/Pagination.css'

interface IPaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<IPaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
    const pages = [...Array(totalPages).keys()];

    return (
        <div className='pagination'>
            <div className="pagination__content">
                {pages.map(page => (
                    <button
                        key={page}
                        disabled={page === currentPage}
                        className='pagination__item'
                        onClick={() => onPageChange(page)}
                    >
                        {page + 1}
                    </button>
                ))}
            </div>
            <div className='pagination__total'><span>{totalPages}</span> страницы</div>
        </div>
    );
}

export default Pagination;