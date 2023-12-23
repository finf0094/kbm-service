import React from 'react';
import './UI/Pagination.css'

interface PaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({totalPages, currentPage, onPageChange}) => {
    const getPaginationNumbers = () => {
        if (totalPages <= 5) {
            return Array.from({length: totalPages}, (_, i) => i + 1);
        } else {
            const start = Math.max(2, currentPage - 2);
            const end = Math.min(totalPages - 1, currentPage + 2);
            const numbers = [1, ...Array.from({length: end - start + 1}, (_, i) => i + start), totalPages];
            return numbers[1] > 2 ? [numbers[0], '...', ...numbers.slice(1)] : numbers;
        }
    };

    return (
        <div className="pagination">
            {getPaginationNumbers().map((num, index) => (
                <button
                    key={index}
                    onClick={() => typeof num === 'number' && onPageChange(num - 1)}
                    disabled={typeof num !== 'number' || num - 1 === currentPage}
                >
                    {num}
                </button>
            ))}
        </div>
    );
};

export default Pagination;