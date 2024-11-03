import React from 'react';

const CommUNIcateDescription = () => (
  <div className='desc'>
    <p className="mb-4 text-gray-700">
      For the final project in <strong>SENG 401</strong> at the <strong>University of Calgary</strong>, we developed <strong>CommUNIcate</strong>, a student networking platform designed to enhance communication and foster connections within the university community. The application enables students to create personalized profiles, participate in course-specific discussions, send direct messages, and engage with a general feed for event sharing and promotion.
    </p>

    <h2 className="text-3xl font-semibold mb-3">Key Features</h2>
    <ul className="list-disc pl-8 mb-6 text-gray-700">
      <li><strong>Personalized Profiles:</strong> Students can create and update profiles with their academic details, interests, and courses.</li>
      <li><strong>Connect with Friends:</strong> Students can connect with classmates and grow their social network.</li>
      <li><strong>Course Management:</strong> Users can enroll and manage coursework directly from the app!</li>
      <li><strong>Direct Messaging:</strong> Students can send messages directly to their friends and classmates.</li>
      <li><strong>Event Sharing:</strong> A general feed allows users to share and promote events, fostering a vibrant campus community.</li>
    </ul>

    <h2 className="text-3xl font-semibold mb-3">Backend: Python and AWS</h2>
    <p className="mb-4 text-gray-700">
      The backend was implemented using <strong>Python</strong> alongside various AWS services. We utilized <strong>DynamoDB</strong> to store user profiles, event information, and class information, ensuring efficient and scalable data management. For processing user requests, we implemented <strong>AWS Lambda</strong> functions, which provided a serverless environment, allowing the application to scale effortlessly while minimizing overhead.
    </p>

    <h2 className="text-2xl font-semibold mb-3">Infrastructure Provisioning with Terraform</h2>
    <p className="mb-4 text-gray-700">
      Infrastructure provisioning and management were handled using <strong>Terraform</strong>, enabling us to define the AWS resources as code. This infrastructure-as-code approach ensured consistent and automated deployment, simplifying infrastructure versioning, review, and scalability.
    </p>

    <h2 className="text-2xl font-semibold mb-3">API Gateway for Routing</h2>
    <p className="mb-4 text-gray-700">
      An <strong>API Gateway</strong> was integrated to route requests from the <strong>Next.js</strong> frontend to the appropriate AWS Lambda functions. This allowed the frontend to remain decoupled from the backend, with API Gateway acting as the intermediary. This setup promotes a stateless architecture, where Lambda functions are triggered only when needed, optimizing resource usage and ensuring scalability as the application grows.
    </p>

    <h2 className="text-2xl font-semibold mb-3">Architecture: MVC and Microservices</h2>
    <p className="mb-4 text-gray-700">
      We employed a combination of <strong>MVC (Model-View-Controller)</strong> and <strong>microservices architecture</strong> for the backend. The MVC pattern helped us clearly separate data models, business logic, and presentation layers, enhancing maintainability and clarity of the code. The microservices architecture allowed each Lambda function to handle distinct responsibilities (e.g., managing profiles, discussions, or events), facilitating modularity and independent scalability of different components.
    </p>

    <h2 className="text-2xl font-semibold mb-3">Messaging with Chat Engine</h2>
    <p className="mb-4 text-gray-700">
      For the direct messaging functionality, we used <strong>react-chat-engine</strong>. This provided real-time chat capabilities, allowing users to send and receive messages seamlessly within the platform, promoting collaboration and networking between students.
    </p>
  </div>
);

export default CommUNIcateDescription;