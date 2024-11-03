import React from 'react';

const WordleDescription = () => (
    <div className='desc'>
        <p className="mb-4 text-gray-700">
        This project is a clone of the popular word-guessing game, <strong>Wordle</strong>. It was created using <strong>HTML, CSS, and JavaScript</strong>. The game offers an interactive and engaging experience, where users can guess words by leveraging a dictionary and a hint system.
        </p>
        <h2 className="text-3xl font-semibold mb-3">Main Features</h2>
        <ul className="list-disc pl-8 mb-6 text-gray-700">
        <li><strong>Word Guessing Game:</strong> Users can attempt to guess a word within a limited number of tries.</li>
        <li><strong>Dictionary Integration:</strong> The game reads a dictionary of words from an external endpoint.</li>
        <li><strong>Hints:</strong> Hints are provided through the endpoint to assist users in guessing the correct word.</li>
        </ul>
    </div>
);

export default WordleDescription;