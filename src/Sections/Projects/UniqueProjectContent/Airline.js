import React from 'react';

const AirlineDescription = () => (
    <div className='desc'>
        <p className="mb-4">The <strong>Java Airline Reservation Application</strong> is a desktop application that enables flight bookings and management through a user-friendly graphical user interface (GUI). It supports four user roles: Guest, User, Admin, and Airline Agent, each with distinct functionalities. The application employs object-oriented programming (OOP) principles and design patterns, specifically Singleton and Strategy, to enhance maintainability.</p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">Key Features and Functionalities</h2>

        <h3 className="text-xl font-semibold mt-4">User Roles:</h3>
        <ul className="list-disc list-inside mb-4">
            <li><strong>Guest:</strong> Browse flights and purchase tickets without an account but cannot manage bookings until logged in.</li>
            <li><strong>User:</strong> Buy and manage flights, opt in or out of promotional emails, and receive email notifications for bookings.</li>
            <li><strong>Admin:</strong> Full control over operations, including managing flight schedules, aircraft, crew assignments, and overall application oversight.</li>
            <li><strong>Airline Agent:</strong> Browse flights and purchase tickets on behalf of users, providing personalized support.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-4">Graphical User Interface (GUI):</h3>
        <p className="mb-4">Developed with Java, the GUI provides an intuitive experience and adapts based on user roles to ensure easy access to relevant features.</p>

        <h3 className="text-xl font-semibold mt-4">Design Patterns:</h3>
        <ul className="list-disc list-inside mb-4">
            <li><strong>Singleton Pattern:</strong> Manages database connections, ensuring a single instance is used throughout the application to optimize performance.</li>
            <li><strong>Strategy Pattern:</strong> Dynamically creates GUIs based on user roles, encapsulating different configurations and behaviors.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-4">OOP Principles:</h3>
        <p className="mb-4">Strong encapsulation restricts internal state access, while inheritance and polymorphism enhance code reuse and maintainability.</p>

        <h3 className="text-xl font-semibold mt-4">UML and Design:</h3>
        <p className="mb-4">A UML diagram was created of the system’s architecture, detailing class structures and interactions, which aided in development and clarity of design.</p>

        <h3 className="text-xl font-semibold mt-4">Email Notification System:</h3>
        <p className="mb-4">Automated email notifications enhance user engagement regarding bookings and promotions.</p>

        <h3 className="text-xl font-semibold mt-4">Database Management:</h3>
        <p className="mb-4">Interacts with a relational database to store user data and flight information, ensuring efficient data retrieval and management.</p>

        <h3 className="text-xl font-semibold mt-4">Security Measures:</h3>
        <p>User authentication protects sensitive information, requiring valid credentials for access to flight management features.</p>
    </div>
);

export default AirlineDescription;