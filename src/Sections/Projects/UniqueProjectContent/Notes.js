import React from "react";

const NotesDescription = () =>
(
    <div className='desc'>
        <p className="mb-4">
            The <strong>Notes app</strong> was created as part of the ENSF 381 course at the University of Calgary. It is a fully functional, cloud-hosted web application deployed on <strong>Netlify</strong>, providing users with a seamless experience for creating, managing, and saving their personal notes. The app integrates <strong>Google OAuth</strong> for secure login, allowing users to manage their notes from anywhere with ease. It supports rich-text formatting for creating beautiful and well-organized notes, and the app backend uses <strong>AWS</strong> for scalable storage and querying of notes.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">Frontend: React</h3>
        <p className="mb-4">
            The frontend, built using <strong>React</strong>, provides a responsive interface for creating, editing, and deleting notes. Key features include:
        </p>
        
        <ul className="list-disc list-inside mb-4">
            <li><strong>Rich-Text Formatting:</strong> Using <strong>ReactQuill</strong>, users can format notes with options like bold, italics, lists, and headings.</li>
            <li><strong>Google OAuth:</strong> Authentication is handled via <strong>React-oauth</strong>, enabling easy and secure login with Google accounts.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-2">Backend: AWS Lambda & Python</h3>
        <p className="mb-4">
            The backend is serverless, utilizing <strong>AWS Lambda</strong> and <strong>Python</strong> to handle:
        </p>
        
        <ul className="list-disc list-inside mb-4">
            <li><strong>Storing & Querying Notes:</strong> Notes are processed and stored in <strong>AWS DynamoDB</strong>, ensuring fast and scalable access to user data.</li>
            <li><strong>On-Demand Execution:</strong> The serverless architecture reduces cost and ensures resources are only used when needed.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-2">Infrastructure: Terraform</h3>
        <p className="mb-4">
            Infrastructure is managed with <strong>Terraform</strong>, automating the deployment of AWS services like Lambda, DynamoDB, and API Gateway. This ensures consistent and scalable management of cloud resources.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">Key Features</h3>
        <ul className="list-disc list-inside mb-4">
            <li><strong>Rich-Text Notes:</strong> With ReactQuill, users can create visually appealing notes.</li>
            <li><strong>Google Integration:</strong> React-oauth secures user login and ties notes to individual Google accounts.</li>
            <li><strong>Cloud Storage:</strong> DynamoDB provides reliable and scalable storage for user data.</li>
            <li><strong>Serverless Architecture:</strong> AWS Lambda ensures efficient backend operations that scale with demand.</li>
        </ul>
    </div>
);

export default NotesDescription;