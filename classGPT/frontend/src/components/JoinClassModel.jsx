import React, { useState } from 'react';
import './JoinClassModel.css';

const JoinClassModel = ({ isOpen, onClose }) => {
  const [selectedTerm, setSelectedTerm] = useState('Fall 2025');
  const [classInputs, setClassInputs] = useState(['', '', '', '', '']);

  const handleClassInputChange = (index, value) => {
    const newInputs = [...classInputs];
    newInputs[index] = value;
    setClassInputs(newInputs);
  };

  const handleRemoveClass = (index) => {
    const newInputs = [...classInputs];
    newInputs[index] = '';
    setClassInputs(newInputs);
  };

  const handleAddAnotherClass = () => {
    setClassInputs([...classInputs, '']);
  };

  const handleJoinClasses = () => {
    const classesToJoin = classInputs.filter(input => input.trim() !== '');
    console.log('Joining classes:', classesToJoin);
    // In a real app, this would send the request to the backend
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="modal-header">
          <h1>University of Illinois at Chicago</h1>
          <button className="change-school-btn">(change school)</button>
        </div>

        <div className="modal-body">
          <div className="term-selector">
            <label htmlFor="term-select">Selected Term:</label>
            <select 
              id="term-select"
              value={selectedTerm}
              onChange={(e) => setSelectedTerm(e.target.value)}
              className="term-dropdown"
            >
              <option>Fall 2025</option>
              <option>Spring 2025</option>
              <option>Fall 2024</option>
              <option>Spring 2024</option>
            </select>
          </div>

          <div className="enrolled-classes">
            <h3>{selectedTerm}</h3>
            
            <div className="enrolled-class">
              <div className="class-header">Class 1:</div>
              <div className="class-info">
                <strong>CS 421: Natural Language Processing</strong>
                <div className="class-meta">
                  Instructors: Shweta Yadav, Rohan Salvi, Siddhant Agarwal · 95 Enrolled
                </div>
                <div className="enrollment-status">✓ Already joined as Student</div>
              </div>
            </div>

            <div className="enrolled-class">
              <div className="class-header">Class 2:</div>
              <div className="class-info">
                <strong>CS 421 (CRN 43946, 43947): CS 421: Natural Language Processing (Parde)</strong>
                <div className="class-meta">
                  Instructors: Natalie Parde, Khushboo Gupta, Lei Jiang · 90 Enrolled
                </div>
                <div className="enrollment-status">✓ Already joined as Student</div>
              </div>
            </div>

            <div className="enrolled-class">
              <div className="class-header">Class 3:</div>
              <div className="class-info">
                <strong>CS 484: Secure Web Application Development</strong>
                <div className="class-meta">
                  Instructors: Chris Kanich, ChrysApp, Imanjot Singh Deol · 81 Enrolled
                </div>
                <div className="enrollment-status">✓ Already joined as Student</div>
              </div>
            </div>

            {classInputs.map((input, index) => (
              <div key={index} className="new-class-input">
                <div className="class-header">Class {4 + index}:</div>
                <div className="input-wrapper">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => handleClassInputChange(index, e.target.value)}
                    placeholder=""
                    className="class-input"
                  />
                  {input && (
                    <button 
                      className="remove-class-btn"
                      onClick={() => handleRemoveClass(index)}
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
            ))}

            <button className="add-class-btn" onClick={handleAddAnotherClass}>
              Add Another Class
            </button>
          </div>

          <div className="modal-footer">
            <button className="join-btn" onClick={handleJoinClasses}>
              Join Classes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinClassModel;