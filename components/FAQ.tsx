'use client'
import { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

interface FAQItem {
    question_en: string;
    question_ru: string;
    answer_en: string;
    answer_ru: string;
}

interface FAQProps {
    restoration: {
        faqs: FAQItem[];
    };
    params: {
        lang: 'en' | 'ru';
    };
}

export default function FAQ({ restoration, params }: FAQProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="faq-cont">
            {restoration.faqs.map((faq, i) => (
                <div key={i} className="faq">
                    <div className="title" onClick={() => toggleFAQ(i)}>
                        <h4>{faq[`question_${params.lang}` as keyof FAQItem]}</h4>
                        {openIndex === i ? (
                            <FaMinus className="iconMinus" />
                        ) : (
                            <FaPlus className="iconPlus" />
                        )}
                    </div>
                    <p className={`answer ${openIndex === i ? 'open' : ''}`}>
                        {faq[`answer_${params.lang}` as keyof FAQItem]}
                    </p>
                </div>
            ))}
        </div>
    );
}
