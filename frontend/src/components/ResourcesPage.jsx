import React, { useState } from 'react';
import './ResourcesPage.css';

const ResourcesPage = () => {
  const [selectedResourceTab, setSelectedResourceTab] = useState('resources');

  // Sample data
  const resources = {
    homework: [
      { id: 1, name: 'Homework 1 - Introduction', date: 'Sep 5, 2025', type: 'pdf' },
      { id: 2, name: 'Homework 2 - Security Basics', date: 'Sep 12, 2025', type: 'pdf' }
    ],
    homeworkSolutions: [],
    lectureNotes: [
      { id: 1, name: '23.system.design.1.md', date: 'Nov 13, 2025', type: 'md' },
      { id: 2, name: 'excalidraw 20251113', date: 'Nov 13, 2025', type: 'excalidraw' },
      { id: 3, name: '21.tracking.md', date: 'Nov 11, 2025', type: 'md' },
      { id: 4, name: 'excalidraw 20251111', date: 'Nov 11, 2025', type: 'excalidraw' },
      { id: 5, name: '22.sop.and.cors.md', date: 'Nov 6, 2025', type: 'md' }
    ]
  };

  const staff = [
    {
      id: 1,
      name: 'Dr. John Smith',
      role: 'Professor',
      email: 'jsmith@uic.edu',
      officeHours: 'Monday 2-4 PM, Wednesday 2-4 PM',
      office: 'SEO 1228'
    },
    {
      id: 2,
      name: 'Imanjot Singh Deol',
      role: 'Teaching Assistant',
      email: 'ideol2@uic.edu',
      officeHours: 'Wednesday 3-5 PM',
      office: 'SEO 401'
    },
    {
      id: 3,
      name: 'Sarah Johnson',
      role: 'Teaching Assistant',
      email: 'sjohn45@uic.edu',
      officeHours: 'Tuesday 1-3 PM, Thursday 1-3 PM',
      office: 'SEO 401'
    }
  ];

  const courseInfo = {
    title: 'CS 484: Secure Web Application Development',
    university: 'University of Illinois at Chicago - Fall 2025',
    syllabus: `# Course Description

This course covers the fundamentals of secure web application development, including common vulnerabilities, security best practices, and modern security frameworks.

## Learning Objectives

- Understand common web security vulnerabilities (XSS, SQL Injection, CSRF, etc.)
- Learn secure coding practices for web applications
- Implement authentication and authorization systems
- Apply security frameworks and tools in real-world projects

## Grading

- Homework Assignments: 40%
- Midterm Exam: 20%
- Final Project: 30%
- Class Participation: 10%

## Course Schedule

Week 1-3: Introduction to Web Security
Week 4-6: Authentication and Authorization
Week 7-9: Common Vulnerabilities
Week 10-12: Security Frameworks
Week 13-15: Final Project

## Required Materials

- Course materials will be posted on Piazza
- Recommended textbook: "Web Application Security" by Andrew Hoffman

## Office Hours

See Staff tab for office hours information.

## Academic Integrity

All work must be your own. Collaboration is allowed on homework but must be disclosed.`
  };

  const handleResourceClick = (resource) => {
    console.log('Opening resource:', resource);
    // In a real app, this would download or open the resource
  };

  return (
    <div className="resources-page">
      <div className="resources-header">
        <h1>{courseInfo.title}</h1>
        <p className="university-info">{courseInfo.university}</p>
      </div>

      <div className="resources-tabs">
        <button 
          className={`resource-tab ${selectedResourceTab === 'info' ? 'active' : ''}`}
          onClick={() => setSelectedResourceTab('info')}
        >
          Course Information
        </button>
        <button 
          className={`resource-tab ${selectedResourceTab === 'staff' ? 'active' : ''}`}
          onClick={() => setSelectedResourceTab('staff')}
        >
          Staff
        </button>
        <button 
          className={`resource-tab ${selectedResourceTab === 'resources' ? 'active' : ''}`}
          onClick={() => setSelectedResourceTab('resources')}
        >
          Resources
        </button>
      </div>

      <div className="resources-content">
        {/* Course Information Tab */}
        {selectedResourceTab === 'info' && (
          <div className="course-info-tab">
            <div className="syllabus-content">
              <pre className="syllabus-text">{courseInfo.syllabus}</pre>
            </div>
          </div>
        )}

        {/* Staff Tab */}
        {selectedResourceTab === 'staff' && (
          <div className="staff-tab">
            <div className="staff-list">
              {staff.map(member => (
                <div key={member.id} className="staff-card">
                  <div className="staff-avatar">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="staff-info">
                    <h3 className="staff-name">{member.name}</h3>
                    <p className="staff-role">{member.role}</p>
                    <div className="staff-details">
                      <div className="detail-row">
                        <span className="detail-label">Email:</span>
                        <a href={`mailto:${member.email}`} className="detail-value">{member.email}</a>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Office Hours:</span>
                        <span className="detail-value">{member.officeHours}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Office:</span>
                        <span className="detail-value">{member.office}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Resources Tab */}
        {selectedResourceTab === 'resources' && (
          <div className="resources-tab">
            {/* Homework Section */}
            <div className="resource-section">
              <h2 className="section-title">Homework</h2>
              {resources.homework.length > 0 ? (
                <div className="resource-list">
                  {resources.homework.map(resource => (
                    <div 
                      key={resource.id} 
                      className="resource-item"
                      onClick={() => handleResourceClick(resource)}
                    >
                      <div className="resource-icon">📄</div>
                      <div className="resource-info">
                        <div className="resource-name">{resource.name}</div>
                        <div className="resource-date">{resource.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-section">
                  <div className="empty-icon">📄</div>
                  <p>Nothing has been added to the Homework section, yet. Stay tuned!</p>
                </div>
              )}
            </div>

            {/* Homework Solutions Section */}
            <div className="resource-section">
              <h2 className="section-title">Homework Solutions</h2>
              {resources.homeworkSolutions.length > 0 ? (
                <div className="resource-list">
                  {resources.homeworkSolutions.map(resource => (
                    <div 
                      key={resource.id} 
                      className="resource-item"
                      onClick={() => handleResourceClick(resource)}
                    >
                      <div className="resource-icon">📄</div>
                      <div className="resource-info">
                        <div className="resource-name">{resource.name}</div>
                        <div className="resource-date">{resource.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-section">
                  <div className="empty-icon">📄</div>
                  <p>Nothing has been added to the Homework Solutions section, yet. Stay tuned!</p>
                </div>
              )}
            </div>

            {/* Lecture Notes Section */}
            <div className="resource-section">
              <h2 className="section-title">Lecture Notes</h2>
              {resources.lectureNotes.length > 0 ? (
                <table className="lecture-notes-table">
                  <thead>
                    <tr>
                      <th>Lecture Notes</th>
                      <th>Lecture Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resources.lectureNotes.map(note => (
                      <tr 
                        key={note.id}
                        className="lecture-note-row"
                        onClick={() => handleResourceClick(note)}
                      >
                        <td>
                          <a href="#" className="lecture-link">{note.name}</a>
                        </td>
                        <td className="lecture-date">{note.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="empty-section">
                  <div className="empty-icon">📄</div>
                  <p>Nothing has been added to the Lecture Notes section, yet. Stay tuned!</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourcesPage;