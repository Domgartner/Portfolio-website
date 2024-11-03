import React from 'react';

const DSADescription = () => (
    <div className='desc'>
         <p className="mb-4">
            This project involves the development of a fully importable and usable data structures module in Java, 
            designed to serve as an alternative to built-in data structure libraries. The module, created as the final 
            assignment for <strong>ENSF 338</strong> at the University of Calgary, showcases various data structures, 
            each with complete functionality and extensive user-facing methods.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">Key Features and Functionalities</h2>

        <h3 className="font-semibold">Language and Build Tool:</h3>
        <p className="mb-4">
            The module is written in Java and utilizes <strong>Apache Maven</strong> for project management and build 
            automation. This allows for easy integration and packaging of the data structures for use in other Java applications.
        </p>

        <h3 className="font-semibold">Implemented Data Structures:</h3>
        <ul className="list-disc list-inside mb-4">
            <li><strong>Singly Linked List:</strong> A linear collection of elements where each element points to the next.</li>
            <li><strong>Circular Singly Linked List:</strong> A variation of the singly linked list where the last element points back to the first.</li>
            <li><strong>Doubly Linked List:</strong> A linked list where each node contains references to both the next and previous nodes.</li>
            <li><strong>Circular Doubly Linked List:</strong> A doubly linked list in which the last node points to the first node, and the first node points to the last node.</li>
            <li><strong>Stack:</strong> A collection following the Last In First Out (LIFO) principle, supporting push and pop operations.</li>
            <li><strong>Queue:</strong> A collection adhering to the First In First Out (FIFO) principle, supporting enqueue and dequeue operations.</li>
            <li><strong>AVL Tree:</strong> A self-balancing binary search tree that maintains its balance through rotations during insertions and deletions.</li>
            <li><strong>Binary Search Tree:</strong> A tree data structure where each node has at most two children, and the left child's value is less than the parent's while the right child's value is greater.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">Functionality</h2>
        <p className="mb-4">
            Each data structure is equipped with a set of public functions that allow users to perform various operations, 
            such as adding, removing, and traversing elements. Each data structure class includes a main function that 
            contains comprehensive test cases to validate functionality across a range of boundary conditions.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Usage</h2>
        <p className="mb-4">
            The data structures module can be easily integrated into Java projects by importing the package created with 
            Apache Maven. This module serves as a practical alternative to Java's built-in data structures, providing 
            developers with flexible and customizable options for managing data.
        </p>
    </div>
);

export default DSADescription;