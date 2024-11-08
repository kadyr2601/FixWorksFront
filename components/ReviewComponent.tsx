'use client';
import React, { useState } from 'react';
import { ReviewList } from "@/components/ReviewsPageDTO";
import Image from "next/image";
import { MdOutlineClose } from "react-icons/md";

interface ReviewComponentProps {
    reviews: ReviewList;
    lang: string;
}

const  ReviewComponent: React.FC<ReviewComponentProps> = ({ reviews, lang }) => {
    const [selectedComment, setSelectedComment] = useState<string | null>(null);

    const handleCommentClick = (comment: string) => {
        setSelectedComment(comment);
    };

    const closeModal = () => {
        setSelectedComment(null);
    };

    if (!reviews || !reviews.results) return <div>No results found.</div>;

    function getPathFromUrl(url: string) {
        const urlObj = new URL(url);
        return process.env.HostName + urlObj.pathname;
    }

    return (
        <div>
            <div className="reviews container">
                {reviews.results.map(r => (
                    <div key={r.id} className={'review'} onClick={() => handleCommentClick(lang === 'en' ? r.comment_en : r.comment_ru)}>
                        <span className={'comment'} >
                            {lang === 'en' ? r.comment_en : r.comment_ru}
                        </span>
                        <div className={'review-content'}>
                            <div className={'image'}>
                                <Image src={getPathFromUrl(r.image)} alt={r.fullname} fill={true} />
                            </div>
                            <div className={'text'}>
                                <div>{r.fullname}</div>
                                <p>{r.location}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {selectedComment && (
                <div className="modal">
                    <div className="modal-content">
                        <div className="close">
                            <MdOutlineClose onClick={closeModal} className='icon'/>
                        </div>
                        <p>{selectedComment}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReviewComponent;
