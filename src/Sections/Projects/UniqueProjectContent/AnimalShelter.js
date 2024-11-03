import React from 'react';

const AnimalShelterDescription = () => (
    <div className='desc'>
        <p className="mb-4">
            This project was developed by a team of four software engineering students at the <strong>University of Calgary</strong> as part of the final project for <strong>ENSF 380</strong> in <strong>2023</strong>. The goal was to create a fully functional schedule creation software tailored for an imaginary animal shelter client. The software effectively interacts with a database to generate the most optimized daily schedules while providing alerts when scheduling conflicts arise. Additionally, it offers functionality for users to download the generated schedules.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Design and Architecture</h2>
        <p className="mb-4">
            The design process began with the creation of a <strong>UML diagram</strong> to model all necessary relationships and functionalities of the software. This diagram serves as a blueprint for the software’s architecture, illustrating the different classes, their relationships, and inheritance structures.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Class Structure</h2>
        <p className="mb-4">
            The software was organized into <strong>nine distinct classes</strong>, each dedicated to specific tasks. This modular design adheres to the principles of <strong>Object-Oriented Programming (OOP)</strong>, specifically encapsulation and inheritance. Each class is accompanied by a corresponding test class to validate functionality across a wide range of scenarios and boundary conditions, ensuring robust performance.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Functionality Overview</h2>
        <h3 className="font-semibold mt-4">Data Input:</h3>
        <p className="mb-4">The software begins by reading data from an <strong>SQL database</strong>. This data includes various tasks and their associated time requirements.</p>

        <h3 className="font-semibold mt-4">Schedule Creation:</h3>
        <p className="mb-4">The program parses the input data and generates a schedule based on priority:</p>
        <ul className="list-disc list-inside mb-4">
            <li><strong>High Priority:</strong> Medical-related tasks are prioritized for scheduling.</li>
            <li><strong>Time-Sensitive Tasks:</strong> Tasks with specific time constraints follow.</li>
            <li><strong>Low Priority:</strong> Remaining tasks are filled into available slots within the daily schedule.</li>
        </ul>

        <h3 className="font-semibold mt-4">Conflict Handling:</h3>
        <ul className="list-disc list-inside mb-4">
            <li>If the duration of tasks within an hour exceeds <strong>60 minutes</strong>, a backup volunteer is automatically added to the schedule.</li>
            <li>If tasks exceed <strong>120 minutes</strong>, the software throws an exception, indicating that the schedule cannot be created. The user is then prompted to manually adjust task priorities and reschedule.</li>
        </ul>

        <h3 className="font-semibold mt-4">User Interaction:</h3>
        <p className="mb-4">Users have the capability to modify task priorities directly through the interface. Any changes made are updated in the database, ensuring consistency.</p>

        <h3 className="font-semibold mt-4">Finalization and Download:</h3>
        <p>Once users confirm that all necessary volunteers are scheduled, they can download the final schedule to their local computers.</p>
    </div>
);

export default AnimalShelterDescription;