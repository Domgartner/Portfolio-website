import '../../App.css';
import './Contact.css';
import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLocationDot, faPhone, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

function Contact({ activeSection }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [buttonText, setButtonText] = useState('Send');
    const [buttonColor, setButtonColor] = useState('bg-blue-500');
    const [emailCount, setEmailCount] = useState(0);

    useEffect(() => {
        const storedCount = localStorage.getItem('emailCount');
        const timestamp = localStorage.getItem('emailCountTimestamp');

        if (storedCount && timestamp) {
            const timeElapsed = Date.now() - Number(timestamp);
            const hoursElapsed = timeElapsed / (1000 * 60 * 60);
            
            if (hoursElapsed < 1) {
                setEmailCount(Number(storedCount));
            } else {
                setEmailCount(0);
                localStorage.removeItem('emailCount');
                localStorage.removeItem('emailCountTimestamp');
            }
        }
    }, []);

    const sendEmail = (e) => {
        e.preventDefault();
        if (emailCount < 2) {
            emailjs.sendForm(
                process.env.REACT_APP_EMAILJS_SERVICE_ID,
                process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
                e.target,
                process.env.REACT_APP_EMAILJS_PUBLIC_KEY)
              .then(
                () => {
                  formData.name = '';
                  formData.email = '';
                  formData.subject = '';
                  formData.message = '';
                  const sendBtn = document.getElementById("sendBtn");
                  sendBtn.disabled = true;
                  setButtonText('Sent!');
                  setButtonColor('bg-green-500');
                  setEmailCount(prevCount => {
                      const newCount = prevCount + 1;
                      localStorage.setItem('emailCount', newCount);
                      localStorage.setItem('emailCountTimestamp', Date.now());
                      return newCount;
                  });
                  setTimeout(() => {
                    setButtonText('Send');
                    sendBtn.disabled = false;
                    setButtonColor('bg-blue-500');
                  }, 5000);
                },
                (error) => {
                  console.log('FAILED...', error.text);
                }
              );
        }
    };

    const [errors, setErrors] = useState({
        name: false,
        email: false,
        subject: false,
        message: false
    });

    const validateForm = () => {
        const newErrors = {
            name: !formData.name,
            email: !formData.email,
            subject: !formData.subject,
            message: !formData.message
        };
        setErrors(newErrors);
        
        if (Object.values(newErrors).includes(true)) {
            setTimeout(() => {
                setErrors({
                    name: false,
                    email: false,
                    subject: false,
                    message: false
                });
            }, 10000);
        }
        
        return !Object.values(newErrors).includes(true);
    };
    useEffect(() => {
        const signature = document.getElementById('signatureLine');

        if (activeSection === 'contact') {
                signature.style.animationPlayState = 'running';
        }
    }, [activeSection]);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            sendEmail(e);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <section id="contact" className="flex flex-col md:flex-row items-center justify-center p-8 bg-homeContact dark:bg-[var(--bg-accent)] transition-colors duration-300 ease-in-out">
            <div className="contact-text w-full md:w-1/2 p-6 text-center md:text-left">
                <h2 className="sectionHead text-4xl font-bold text-gray-800 mb-6">Reach Out!</h2>
                <p className="subtext text-lg text-gray-600 mb-4">Feel free to contact me at any time. I am open to opportunities and feedback. I will get back to you as soon as possible!</p>
                <svg className="mb-4" id='signature' width="227" height="147" viewBox="0 0 227 147" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path className="stroke-black dark:stroke-[var(--text-accent)]" id='signatureLine' d="M4.99237 92.9274C-0.203332 93.5768 6.12281 96.5244 8.58946 96.5244C23.4414 96.5244 26.5749 69.6978 26.5749 59.1546C26.5749 53.5757 21.1556 39.0625 21.1793 39.3706C21.6379 45.3331 25.3985 51.5772 26.9746 57.3561C29.9205 68.1577 31.9706 78.9116 31.9706 90.1296C31.9706 94.3775 35.2657 102.809 33.6692 95.6252C32.1588 88.8283 31.481 82.0145 30.5717 74.9419C29.4914 66.5399 20.3733 39.3021 31.1712 34.6744C40.1912 30.8087 48.5743 37.1448 52.7538 44.7663C64.3883 65.9821 52.637 84.727 39.9641 101.021C35.6417 106.578 38.254 103.339 40.9633 100.122C47.6179 92.2193 50.6551 82.5074 61.5467 77.8395C62.9395 77.2426 74.9359 76.994 74.9359 75.8412C74.9359 73.219 65.4673 75.7793 64.3444 76.3408C58.758 79.134 53.5531 79.0991 53.5531 86.6324C53.5531 94.0742 53.9782 104.378 64.7441 100.122C73.1276 96.8071 75.3477 87.8132 73.7368 79.9378C71.9636 71.2689 70.4174 67.5492 71.6385 78.539C73.4054 94.4408 90.394 133.587 74.2364 142.287C61.4265 149.185 55.9083 132.132 57.5499 123.103C58.5926 117.368 61.5604 103.311 67.1422 100.122C74.0465 96.1762 80.5957 94.9055 83.7288 86.1328C85.3698 81.538 84.7115 76.231 86.3267 71.7445C87.8324 67.5619 95.9555 70.1709 99.2162 69.4463C101.001 69.0498 94.3613 69.4258 91.3226 70.9451C82.889 75.1619 77.7374 88.5663 82.5297 97.124C92.9839 115.792 101.369 76.3057 98.9165 68.9467C97.6108 65.0297 96.7183 77.008 96.7183 81.1369C96.7183 84.8002 97.7666 103.261 103.912 102.919C108.667 102.655 112.36 84.3411 112.805 80.3375C113.311 75.785 109.308 62.4677 109.308 67.0483C109.308 74.4527 126.885 64.7968 125.095 62.7517C123.273 60.6692 120.07 74.306 119.999 74.9419C119.466 79.7456 114.428 94.7259 124.096 94.7259C140.261 94.7259 132.689 36.0668 132.689 28.1797C132.689 26.3309 134.127 12.3358 134.488 19.1869C135.135 31.4917 134.13 43.7419 135.387 56.0571C136.487 66.8382 133.946 79.9313 137.985 90.0297C139.903 94.8254 137.561 79.6241 138.485 74.5422C138.944 72.0173 143.286 53.3651 149.775 59.8541C156.199 66.2774 154.272 95.8163 154.272 86.7324C154.272 81.1692 163.027 43.0872 164.963 62.452C165.576 68.5824 164.951 95.9431 175.954 79.4382C177.288 77.4379 196.666 54.3465 181.25 55.1579C163.208 56.1074 179.067 98.7559 188.844 82.1361C191.854 77.0181 195.417 70.7507 195.638 64.5503C195.692 63.0441 193.752 48.7192 192.141 54.3585C188.863 65.8322 216.738 43.0438 209.127 48.9629C202.034 54.4799 198.679 66.4058 199.335 74.9419C200.081 84.6312 206.213 92.6351 213.624 82.1361C218.346 75.4462 224.215 67.9769 224.215 59.3545C224.215 51.5727 222.617 43.7431 222.617 35.8734C222.617 33.1417 222.919 28.4406 222.617 33.5753C222.351 38.0927 207.651 41.1527 205.131 41.7687C177.161 48.6057 151.58 47.9637 123.097 47.9637C116.808 47.9637 97.86 50.733 110.407 42.3682C134.821 26.092 164.393 19.6507 188.444 3"/>
                </svg>
                <div className="space-y-4">
                    <div className="flex items-center text-gray-600">
                        <FontAwesomeIcon icon={faLocationDot} className="fa-icon mr-3 text-xl" />
                        <span className="innertxt text-lg">Calgary, Alberta, Canada</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                        <FontAwesomeIcon icon={faPhone} className="fa-icon mr-3 text-xl" />
                        <span className="innertxt text-lg">403-472-9927</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                        <FontAwesomeIcon icon={faEnvelope} className="fa-icon mr-3 text-xl" />
                        <span className="innertxt text-lg">dominicgartner1@gmail.com</span>
                    </div>
                </div>
                <div className="mt-6 flex space-x-6">
                    <a href="https://github.com/Domgartner" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faGithub} className="fa-icon text-gray-700 hover:text-purple-700 text-5xl transition duration-200 ease-in-out" />
                    </a>
                    <a href="https://www.linkedin.com/in/dominic-gartner/" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faLinkedin} className="fa-icon text-gray-700 hover:text-blue-500 text-5xl transition duration-200 ease-in-out" />
                    </a>
                </div>
            </div>

            <div className="contact-info w-full md:w-1/2 p-6">
                <form onSubmit={handleSubmit} className="form center-items bg-white shadow-lg rounded-lg p-8 space-y-6">
                    <div className="relative">
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`formInput shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline peer ${errors.name && !formData.name ? 'border-red-500' : ''}`}
                        />
                        <label 
                            htmlFor="name" 
                            className={`formLabel absolute left-3 transition-all duration-200 ease-in-out bg-white px-1
                            ${formData.name ? '-top-2 text-xs' : 'top-3 text-sm'} peer-focus:-top-2 peer-focus:text-xs`}>
                            Name:
                        </label>
                    </div>
                    <div className="relative">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`formInput shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline peer ${errors.email && !formData.email ? 'border-red-500' : ''}`}
                        />
                        <label 
                            htmlFor="email" 
                            className={`formLabel absolute left-3 transition-all duration-200 ease-in-out bg-white px-1
                            ${formData.email ? '-top-2 text-xs' : 'top-3 text-sm'} peer-focus:-top-2 peer-focus:text-xs`}>
                            Email:
                        </label>
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className={`formInput shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline peer ${errors.subject && !formData.subject ? 'border-red-500' : ''}`}
                        />
                        <label 
                            htmlFor="subject" 
                            className={`formLabel absolute left-3 transition-all duration-200 ease-in-out bg-white px-1
                            ${formData.subject ? '-top-2 text-xs' : 'top-3 text-sm'} peer-focus:-top-2 peer-focus:text-xs`}>
                            Subject:
                        </label>
                    </div>
                    <div className="relative">
                        <textarea
                            id="message"
                            name="message"
                            placeholder='Message'
                            value={formData.message}
                            onChange={handleChange}
                            className={`formInput shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32 peer ${errors.message && !formData.message ? 'border-red-500' : ''}`}
                        />
                    </div>
                    <div className="flex items-center">
                    <button 
                            type="submit" 
                            id="sendBtn" 
                            className={`${emailCount >= 2 ? 'bg-blue-800' : buttonColor} ${buttonText === 'Sent!' || emailCount >= 2 ? '' : 'hover:bg-blue-700'} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                            disabled={emailCount >= 2}
                        >
                            {buttonText}
                        </button>
                        {emailCount >= 2 && (
                            <span className="text-red-500 ml-8 flex items-center">
                                <FontAwesomeIcon icon={faCircleInfo} className="mr-1" />
                                <p className='innertxt'>Sorry, only 2 emails per hour are allowed.</p>
                            </span>
                        )}
                    </div>
                </form>
            </div>
        </section>
    );
}

export default Contact;
