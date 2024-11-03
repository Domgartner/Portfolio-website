import React from 'react';

const MuseumDatabaseDescription = () => (
    <div className='desc'>
        <p className="mb-4">
            In collaboration with two other software engineering students, we developed a Python application interfacing with a MySQL database designed for an art museum. This project, part of the ENSF 300 course at the University of Calgary, involved the creation of an Entity-Relationship Diagram (EERD) to conceptualize the database structure.
        </p>

        <h2 className="text-xl font-semibold mt-6">Database Design</h2>
        <ul className="list-disc list-inside mb-4">
            <li><strong>Entities and Relationships:</strong> The database consists of eleven entities, each representing a data table, defined with appropriate attributes, primary keys, and foreign keys to establish relationships.</li>
            <li><strong>Data Population:</strong> Research was conducted on various art pieces to populate the database.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6">Application Functionality</h2>
        <ul className="list-disc list-inside mb-4">
            <li><strong>Programming Language:</strong> The application is implemented in Python, utilizing the mysql-connector-python library for database connectivity.</li>
            <li><strong>User Access Levels:</strong> Three user roles were created, each with different access permissions:
                <ul className="list-disc ml-8 list-inside">
                    <li><strong>Admin:</strong> Highest clearance; manages users and the database.</li>
                    <li><strong>User:</strong> Mid-level clearance; can manipulate and search the database.</li>
                    <li><strong>Guest:</strong> Lowest clearance; can browse the collection without login.</li>
                </ul>
            </li>
        </ul>

        <h2 className="text-xl font-semibold mt-6">User Interaction</h2>
        <ul className="list-disc list-inside mb-4">
            <li><strong>Login Process:</strong> Upon launching, the application establishes a MySQL connection and prompts users to log in according to their roles. Guests use predefined credentials.</li>
            <li><strong>Menu Options:</strong> The application displays a menu tailored to the user's access level, allowing for relevant database operations.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6">Error Handling</h2>
        <p className="mb-4">
            The application includes exception handling for incorrect queries and connection failures, ensuring robust user interactions.
        </p>
    </div>
);

export default MuseumDatabaseDescription;