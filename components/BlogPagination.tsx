'use client'
import React from 'react';
import { useRouter } from 'next/navigation'
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";


interface PaginationProps {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    lang: string;
}

const BlogPagination: React.FC<PaginationProps> = ({currentPage,totalItems,itemsPerPage,lang}) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const router = useRouter()

    const onPageChange = (page: number) => {
        router.push(`/${lang}/blog?page=${page}`);
    }

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const handlePageClick = (page: number) => {
        onPageChange(page);
    };

    const renderPageNumbers = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <div key={i} onClick={() => handlePageClick(i)} className={i === currentPage ? 'btn active' : 'btn'}>
                    {i}
                </div>
            );
        }
        return pages;
    };

    return (
        <div className="pagination">
            <div className={`btn-left ${currentPage === 1 && "disabled"}`} onClick={handlePrevious} >
                <HiChevronLeft className={'icon'}/>
            </div>
            {renderPageNumbers()}
            <div className={`btn-right ${currentPage === totalPages && "disabled"}`} onClick={handleNext}>
                <HiChevronRight className={'icon'}/>
            </div>
        </div>
    );
};

export default BlogPagination;
