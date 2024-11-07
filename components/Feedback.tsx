import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { MdOutlineClose } from 'react-icons/md';
import { FaCloudUploadAlt } from 'react-icons/fa';

const FeedbackModal = ({ isOpen, onClose, lang }: { isOpen: boolean; onClose: () => void, lang: "ru" | "en" }) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: '',
        files: [] as File[]
    });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState<string | null>(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name === 'email') {
            if (!emailRegex.test(value)) {
                setEmailError('Please enter a valid email address');
            } else {
                setEmailError(null);
            }
        }

        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;
        if (selectedFiles) {
            setFormData((prevData) => ({
                ...prevData,
                files: Array.from(selectedFiles)
            }));
        }
    };

    const validateForm = () => {
        const { name, phone, email, message } = formData;
        if (!name || !phone || !email || !message) {
            return false;
        }
        if (!emailRegex.test(email)) {
            setEmailError('Please enter a valid email address');
            return false;
        }

        return true;
    };

    // Handle form submission
    const handleSubmit = async () => {
        if (!validateForm()) {
            setError('Please fill out all required fields.');
            return;
        }

        setError(null);
        setLoading(true);

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('phone', formData.phone);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('message', formData.message);
            formData.files.forEach((file, index) => {
                formDataToSend.append(`files[${index}]`, file);
            });


            const response = await fetch(`${process.env.API_URL}/service/feedback-create`, {
                method: 'POST',
                body: formDataToSend
            });

            if (!response.ok) {
                throw new Error('Failed to submit feedback');
            }

            // Reset form data after successful submission
            setFormData({
                name: '',
                phone: '',
                email: '',
                message: '',
                files: []
            });
            alert('Feedback submitted successfully!');
            onClose(); // Close the modal after submission
        } catch (error) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="feedback-modal">
            <div className="modal">
                <div className="modal-content">
                    <div className="close">
                        <MdOutlineClose onClick={onClose} className="icon" />
                    </div>

                    <div className="form">
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder={lang == 'en' ? "Name" : "Имя"}
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="number"
                            id="phone"
                            name="phone"
                            placeholder={lang == 'en' ? "Phone": "Номер телефона"}
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder={lang == 'en' ? "E-mail" : "Электронная почта"}
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
                        <textarea
                            id="message"
                            name="message"
                            placeholder={lang == 'en' ? "Message" : "Сообщение"}
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>

                        <div className="file-upload">
                            <label htmlFor="file-upload">
                                <FaCloudUploadAlt size={50}/>
                                <p>
                                    {
                                    lang == 'en' ? "You can upload up to 10 files" : "Вы можете загрузить до 10 файлов"
                                    }
                                </p>
                            </label>
                            <input
                                type="file"
                                id="file-upload"
                                name="file"
                                multiple
                                onChange={handleFileChange}
                                style={{display: 'none'}} // Скрываем стандартный input
                            />
                        </div>

                        {error && <p style={{color: 'red'}}>{error}</p>}

                        <div className="btn" onClick={handleSubmit}>
                            {loading ? 'Sending...' : lang == 'en' ? 'Send' : 'Отправить'}
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default FeedbackModal;
