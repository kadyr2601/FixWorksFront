'use client'
import React, {useState} from 'react';
import FeedbackModal from "@/components/Feedback";

const FeedbackButton = ({lang} : {lang: "ru" | "en"}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className={`feedback-btn`} onClick={openModal}>{lang == "en" ? "Leave an application" : "Оставить заявку"}</div>
            <FeedbackModal isOpen={isModalOpen} onClose={closeModal} lang={lang} />
        </>
    );
};

export default FeedbackButton;