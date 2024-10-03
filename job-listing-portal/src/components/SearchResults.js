import React, { useState, useEffect } from 'react';
import './SearchResultsPage.css'; // Add styles for search results
import axios from 'axios';

const SearchResultsPage = ({ query }) => {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    jobType: '',
    location: '',
    salaryRange: ''
  });

  useEffect(() => {
    // Fetch jobs based on search query and filters
    axios.get('/api/jobs/search', { params: { query, ...filters } })
      .then(response => setJobs(response.data))
      .catch(error => console.error('Error fetching search results:', error));
  }, [query, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div className="search-results-page">
      {/* Filter Sidebar */}
      <section className="filter-sidebar">
        <h3>Filter Jobs</h3>
        <div>
          <label>Job Type</label>
          <select name="jobType" value={filters.jobType} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="full-time">Full-Time</option>
            <option value="part-time">Part-Time</option>
            <option value="freelance">Freelance</option>
          </select>
        </div>
        <div>
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
          />
        </div>
        <div>
          <label>Salary Range</label>
          <input
            type="text"
            name="salaryRange"
            value={filters.salaryRange}
            onChange={handleFilterChange}
          />
        </div>
        <button onClick={() => { /* Trigger new search with filters */ }}>
          Apply Filters
        </button>
      </section>

      {/* Search Results */}
      <section className="search-results">
        <h3>Search Results for "{query}"</h3>
        <ul>
          {jobs.map(job => (
            <li key={job.id}>
              {job.title} - {job.company} - {job.location}
              <p>{job.description}</p>
              <button>View Details</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default SearchResultsPage;
