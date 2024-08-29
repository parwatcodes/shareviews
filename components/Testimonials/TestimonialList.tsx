import React from 'react';

type Testimonial = {
  id: number;
  content: string;
  author: string;
};

interface TestimonialListProps {
  testimonials: Testimonial[];
}

const TestimonialList: React.FC<TestimonialListProps> = ({ testimonials }) => {

  return (
    <div>
      <ul>
        {testimonials.length === 0 ? (
          <li>No testimonials yet.</li>
        ) : (
          testimonials.map((testimonial) => (
            <li key={testimonial.id} className="testimonial-item">
              <blockquote className="testimonial-content">
                {testimonial.content}
              </blockquote>
              <p className="testimonial-author">— {testimonial.author}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TestimonialList;
