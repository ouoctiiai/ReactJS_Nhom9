import React, { useState } from 'react';
import MainBody from './MainBody/MainBody';

const FilterQuestion = ({ questions }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [noAnswerOnly, setNoAnswerOnly] = useState(true);
    const [filteredPosts, setFilteredPosts] = useState([...questions]);
    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };
    const handleNoAnswerChange = (event) => {
        setNoAnswerOnly(event.target.checked);
    };

    const applyFilters = () => {
        let updatedPosts = [...questions];
        if (!startDate || !endDate || new Date(startDate) > new Date(endDate)) {
            alert('Ngày nhập chưa hợp lệ. Vui lòng kiểm tra lại.');
            return; 
        }
        if (startDate) {
            updatedPosts = updatedPosts.filter(question => new Date(question.date) >= new Date(startDate));
        }

        if (endDate) {
            console.log('do duoc end');
            
            updatedPosts = updatedPosts.filter(question => new Date(question.date) <= new Date(endDate));
        }

        if (noAnswerOnly) {
            updatedPosts = updatedPosts.filter(question => question.answer || question.answer.trim() !== '');
        }
        setFilteredPosts(updatedPosts);
    };
    console.log(filteredPosts,questions);
    
    return (
        <div className='flex flex-col justify-center items-center'>
            <div className="filter-container  w-[30%] mt-3  space-y-4 p-4 bg-white shadow-md rounded-lg">
                <div className="filter-group flex flex-col space-y-2">
                    <label htmlFor="start-date-filter" className=" text-left font-medium text-gray-700">Start Date:</label>
                    <input
                        type="date"
                        id="start-date-filter"
                        value={startDate}
                        onChange={handleStartDateChange}
                        className="border border-gray-300 rounded-md p-2"
                    />
                </div>
                <div className="filter-group flex flex-col space-y-2">
                    <label htmlFor="end-date-filter" className=" text-left font-medium text-gray-700">End Date:</label>
                    <input
                        type="date"
                        id="end-date-filter"
                        value={endDate}
                        onChange={handleEndDateChange}
                        className="border border-gray-300 rounded-md p-2"
                    />
                </div>
                <div className="filter-group flex gap-2 justify-center items-center space-y-2">
                    <label htmlFor="no-answer-filter" className="font-medium text-gray-700">Questions with answers only:</label>
                    <input
                        type="checkbox"
                        id="no-answer-filter"
                        checked={noAnswerOnly}
                        onChange={handleNoAnswerChange}
                        className="cursor-pointer"
                    />
                </div>
                <button
                    onClick={applyFilters}
                    className="bg-blue-500 text-white p-2 rounded-md mt-4 hover:bg-blue-600"
                >
                    Apply Filters
                </button>
            </div>
            <div>
                <MainBody posts = {filteredPosts} searchQuery={''} />
            </div>

        </div>
      
    );
};

export default FilterQuestion;
