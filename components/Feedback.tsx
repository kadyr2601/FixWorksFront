import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { MdOutlineClose } from 'react-icons/md';
import { FaCloudUploadAlt } from 'react-icons/fa'; // Иконка для загрузки

const FeedbackModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
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
                setEmailError(null); // Очищаем ошибку, если email корректен
            }
        }

        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handle file input changes
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;
        if (selectedFiles) {
            setFormData((prevData) => ({
                ...prevData,
                files: Array.from(selectedFiles)
            }));
        }
    };

    // Form validation
    const validateForm = () => {
        const { name, phone, email, message } = formData;
        if (!name || !phone || !email || !message) {
            return false;
        }
        // Check if email is valid
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
                formDataToSend.append(`files[${index}]`, file); // Attach files to the form data
            });


            const response = await fetch(`${process.env.API_URL}/api/feedback-create`, {
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
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="number"
                            id="phone"
                            name="phone"
                            placeholder="Phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="E-mail"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
                        <textarea
                            id="message"
                            name="message"
                            placeholder="Message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>

                        {/* Кастомный input для файлов с иконкой */}
                        <div className="file-upload">
                            <label htmlFor="file-upload">
                                <FaCloudUploadAlt size={50}/>
                                <p>You can upload up to 10 files</p>
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
                            {loading ? 'Sending...' : 'Send'}
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default FeedbackModal;
