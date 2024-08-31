import { useQuery } from "@tanstack/react-query";

import TestimonialList from "@/components/Testimonials/TestimonialList";

const fetchTestimonials = async () => {
  const response = await fetch('/api/testimonials');

  if (!response.ok) {
    throw new Error('Failed to fetch testimonials');
  }

  return response.json();
};

const TestimonialPage = () => {
  const { data: testimonials, isError, isLoading } = useQuery({
    queryKey: ['testimonials'],
    queryFn: fetchTestimonials
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading testimonials...</div>;

  return (
    <div>
      <h1>Testimonials</h1>
      <TestimonialList testimonials={testimonials} />
    </div>
  );
};

export default TestimonialPage;
