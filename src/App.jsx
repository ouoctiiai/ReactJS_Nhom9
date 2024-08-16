import React from 'react'
import './App.css';
import AddQuestionCard from './Components/addQuestionCard';

function App() {
  return (
    <>  
      <div >
        <Header/>
        <div>
          <MainBody/>
          <AddQuestionCard />
        </div>
        <Footer />
      </div>  
    </>
  )
}

export default App