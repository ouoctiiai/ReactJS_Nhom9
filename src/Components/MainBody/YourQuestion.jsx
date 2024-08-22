import React, { useEffect, useState } from 'react';
import MainBody from './MainBody';

const YourQuestion = ({ questions, writer }) => {
    const [yourQuestion,setYourQuestion] = useState([...questions]);
    const [noAnswerOnly, setNoAnswerOnly] = useState(false);
    const [YournoAnswerOnly, setYournoAnswerOnly] = useState([...yourQuestion]);
    useEffect(()=>{
        setYourQuestion(questions.filter(questions=> questions.writer=== writer))
        setYournoAnswerOnly(questions.filter(questions => questions.writer === writer));
    })
    useEffect(()=>{
        let updatedPosts = [...yourQuestion];
        if (noAnswerOnly) {
            updatedPosts = updatedPosts.filter(question => !question.answer || question.answer.trim() === '');
        }
       
        setYournoAnswerOnly(updatedPosts)
    },[noAnswerOnly])
    const handleNoAnswerChange = (event) => {
        setNoAnswerOnly(event.target.checked);
    };
    
    return (
        <div>
            <div className='text-slate-800'>
               
                <div className="filter-group flex gap-2 justify-center items-center space-y-2">
                    <h2 htmlFor="no-answer-filter" className="font-medium">The question still has no answer:</h2>
                    <input
                        type="checkbox"
                        id="no-answer-filter"
                        checked={noAnswerOnly}
                        onChange={handleNoAnswerChange}
                        className="cursor-pointer"
                    />
                </div>
            </div>
            
            <MainBody posts={YournoAnswerOnly} searchQuery={''} />
            </div>
    );
};

export default YourQuestion;
