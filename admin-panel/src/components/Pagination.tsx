import React from 'react';

interface IPaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<IPaginationProps> = ({totalPages, currentPage, onPageChange}) => {
    const pages = [...Array(totalPages).keys()];

    return (
        <div>
            {pages.map(page => (
                <button
                    key={page}
                    disabled={page === currentPage}
                    onClick={() => onPageChange(page)}
                >
                    {page + 1}
                </button>
            ))}

            <p>{totalPages} страницы</p>
        </div>
    );
}

export default Pagination;