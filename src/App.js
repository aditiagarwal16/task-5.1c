import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes instead of Switch
import PostTypeSelector from './components/PostTypeSelector'; // Import PostTypeSelector
import FindQuestionPage from './components/FindQuestionPage'; // Import FindQuestionPage

function App() {
  return (
    <Router>
      <div className="App">
        {/* Simple Navigation Links */}
        <nav>
          <ul>
            <li>
              <a href="/">Create Post</a> {/* Link to Post Creation Page */}
            </li>
            <li>
              <a href="/find-questions">Find Questions</a> {/* Link to Find Questions Page */}
            </li>
          </ul>
        </nav>

        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<PostTypeSelector />} /> {/* Route for Post Creation */}
          <Route path="/find-questions" element={<FindQuestionPage />} /> {/* Route for Find Questions */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
