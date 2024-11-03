import React from 'react';

const ObituarySiteDescription = () => (
    <div className='desc'>
       <p className="mb-4">
            For the final project in <strong>ENSF 381</strong> at the <strong>University of Calgary</strong>, we developed an obituary application that allows users to create, store, and listen to obituaries for the deceased. This web application leverages <strong>AWS cloud infrastructure</strong> and the <strong>ChatGPT API</strong> to generate personalized obituaries based on user inputs.
        </p>

        <h3 className="text-xl font-semibold mt-6">Frontend: React</h3>
        <p className="mb-4">
            The frontend of the application was built using <strong>React</strong>, providing a user-friendly interface where users can input details about the deceased, manage obituary entries, and interact with other functionalities like text-to-speech playback.
        </p>

        <h3 className="text-xl font-semibold mt-6">Backend: Python and AWS Infrastructure Managed with Terraform</h3>
        <p className="mb-4">
            The backend was implemented using <strong>Python</strong> to interact with <strong>AWS services</strong>, handling user data and requests. The infrastructure was configured via <strong>Terraform</strong> for infrastructure-as-code automation, ensuring scalable, secure, and maintainable cloud operations.
        </p>

        <h3 className="text-xl font-semibold mt-6">AWS Services Used:</h3>
        <ul className="list-disc list-inside mb-4">
            <li><strong>AWS Lambda:</strong> For serverless execution of backend logic, including data processing and interaction with external APIs (like ChatGPT).</li>
            <li><strong>Cloudinary:</strong> For handling media assets, such as images uploaded for each obituary.</li>
            <li><strong>AWS Systems Manager Parameter Store:</strong> Ensures secure storage of sensitive information, including API keys for ChatGPT and other AWS functions.</li>
            <li><strong>Amazon Polly:</strong> Converts obituary text into speech, allowing users to listen to the obituary being read aloud.</li>
            <li><strong>DynamoDB:</strong> Serves as the primary database, storing obituary data such as user inputs, generated text, and metadata.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6">Core Functionality:</h3>
        <ul className="list-disc list-inside mb-4">
            <li><strong>Obituary Creation:</strong> Users are prompted to enter personal information about the deceased (e.g., name, date of birth, life details). This information is sent to the <strong>ChatGPT API</strong>, which generates a unique obituary narrative based on the provided inputs.</li>
            <li><strong>Audio Playback:</strong> Using <strong>Amazon Polly</strong>, users can listen to the obituary text, which is synthesized into lifelike speech.</li>
            <li><strong>Obituary Management:</strong> Users can store, access, and manage their obituaries, all securely handled via the AWS backend.</li>
        </ul>
    </div>
);

export default ObituarySiteDescription;
