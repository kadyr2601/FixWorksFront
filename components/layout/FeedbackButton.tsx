'use client'
import React, {useState} from 'react';
import FeedbackModal from "@/components/Feedback";

const FeedbackButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className={`feedback-btn`} onClick={openModal}>Leave an application</div>
            <FeedbackModal isOpen={isModalOpen} onClose={closeModal} />
        </>
    );
};

export default FeedbackButton;