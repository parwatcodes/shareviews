// app/testimonials/TestimonialForm.tsx
'use client';

import React from 'react';
import ReactQuery from '@tanstack/react-query';

interface TestimonialData {
  title: string;
  description: string;
}

interface SubmitResponse {
  message: string;
}

const TestimonialForm: React.FC = () => {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState('');

  const mutation: ReactQuery.UseMutationResult<SubmitResponse, Error, TestimonialData> = ReactQuery.useMutation<
    SubmitResponse,
    Error,
    TestimonialData
  >(async (testimonialData: TestimonialData) => {
    const response = await fetch('/api/testimonials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testimonialData)
    });

    if (!response.ok) {
      throw new Error('Failed to submit the testimonial');
    }

    return response.json() as Promise<SubmitResponse>;

  }, {
    onSuccess: () => {
      setTitle('');
      setDescription('');
      alert('Testimonial submitted successfully!');
    },
    onError: (error: Error) => {
      setError(error.message || 'Failed to submit the testimonial');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate form fields
    if (!title || !description) {
      setError('All fields are required');
      return;
    }

    // Call the mutation function to submit the form
    mutation.mutate({ title, description });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      {error && <p className="text-red-500 text-xs italic">{error}</p>}
      {success && <p className="text-green-500 text-xs italic">Testimonial submitted successfully!</p>}

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
          Testimonial
        </label>
        <textarea
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          rows={4}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
          Testimonial
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => description(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          rows={4}
          required
        />
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default TestimonialForm;
