import React from 'react';
import Banner from '../components/Banner';
import Slider from '../components/Slider';
import JobList from '../components/JobList';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Banner />
      <Slider />
      <JobList />
    </div>
  );
};

export default HomePage;