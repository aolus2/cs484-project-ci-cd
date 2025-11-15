import React, { useState } from 'react';
import './StudentDashboard.css';
import PostView from './PostView';
import ResourcesPage from './ResourcesPage';
import JoinClassModel from './JoinClassModel';
import UserDropdown from './UserDropDown';
import AccountSettings from './AccountSettings';

const StudentDashboard = () => {
  const [selectedTab, setSelectedTab] = useState('qa');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('all'); // for hw0, hw1, etc filters
  const [showCourseDropdown, setShowCourseDropdown] = useState(false);
  const [showJoinClassModel, setShowJoinClassModel] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showAccountSettings, setShowAccountSettings] = useState(false);

  // Sample courses data
  const courses = [
    {
      id: 1,
      code: 'CS 484',
      name: 'Secure Web Application Development',
      term: 'Fall 2025',
      isActive: true
    },
    {
      id: 2,
      code: 'CS 421',
      name: 'Natural Language Processing',
      term: 'Fall 2025',
      isActive: false
    }
  ];
  const [posts, setPosts] = useState([
    {
      id: 'pinned-1',
      number: 1,
      type: 'note',
      title: 'TA Office Hours',
      preview: "Hi everyone, I am Imanjot Singh Deol (you can call me Iman). TA for this course. My office hours will be on Wedne",
      content: "Hi everyone, I am Imanjot Singh Deol (you can call me Iman). TA for this course. My office hours will be on Wednesday from 3-5 PM in the CS building, room 401. Feel free to drop by with any questions!",
      time: '9/2/25',
      updatedAt: 'September 2',
      author: 'Imanjot Singh Deol',
      tag: 'logistics',
      tags: ['logistics'],
      isPinned: true,
      isUnread: false,
      upvotes: 12,
      views: 150,
      studentAnswer: null,
      followups: []
    },
    {
      id: 'pinned-2',
      number: 2,
      type: 'note',
      title: 'Search for Teammates!',
      preview: '',
      content: "Use this thread to find teammates for the group project. Post your interests, skills, and availability!",
      time: '8/1/25',
      updatedAt: 'August 1',
      author: 'Professor Smith',
      tag: 'project',
      tags: ['project'],
      isPinned: true,
      isUnread: false,
      upvotes: 25,
      views: 200,
      studentAnswer: null,
      followups: []
    },
    {
      id: 122,
      number: 122,
      type: 'question',
      title: 'Exam 2 and 3 Statistics',
      preview: "Are the statistics for exam 2 and 3 scores posted somewhere? We had a post for exam 1 statistics but I can't seem to find anything for the other two exams.",
      content: "Are the statistics for exam 2 and 3 scores posted somewhere? We had a post for exam 1 statistics but I can't seem to find anything for the other two exams.",
      time: '10:15 AM',
      updatedAt: '2 days ago',
      author: 'Anonymous Helix',
      tag: 'exam',
      tags: ['exam'],
      isPinned: false,
      isUnread: false,
      upvotes: 6,
      views: 55,
      studentAnswer: null,
      followups: []
    },
    {
      id: 2,
      number: 121,
      type: 'question',
      title: 'Has the grading system for hw4 been ...',
      preview: 'I just did like 4 more challenges but went down 4 points. Let me know if its just me maybe I\'m doing something wrong o',
      content: 'I just did like 4 more challenges but went down 4 points. Let me know if its just me maybe I\'m doing something wrong',
      time: '03:15 PM',
      updatedAt: 'yesterday',
      author: 'Anonymous Student',
      tag: 'hw4',
      tags: ['hw4'],
      isPinned: false,
      isUnread: true,
      upvotes: 3,
      views: 28,
      studentAnswer: null,
      followups: []
    },
    {
      id: 3,
      number: 120,
      type: 'question',
      title: 'Homework 4 passcode reset',
      preview: 'I was working on homework 4 few days ago Now when I entered my netid, it gave me a new pass code. I didn\'t save it. My',
      content: 'I was working on homework 4 few days ago. Now when I entered my netid, it gave me a new pass code. I didn\'t save it. My old passcode doesn\'t work anymore. What should I do?',
      time: '02:17 PM',
      updatedAt: '3 days ago',
      author: 'Anonymous Tiger',
      tag: 'hw4',
      tags: ['hw4'],
      isPinned: false,
      isUnread: true,
      upvotes: 2,
      views: 15,
      studentAnswer: null,
      followups: [
        {
          author: 'TA Sarah',
          time: '2 days ago',
          content: 'Please email the course staff with your NetID and we can help you reset your passcode.'
        }
      ]
    }
  ]);

  // Sample statistics
  const stats = {
    allCaughtUp: true,
    unreadPosts: 0,
    unansweredQuestions: 2,
    unansweredFollowups: 5,
    totalPosts: 93,
    totalContributions: 214,
    studentsEnrolled: 76,
    instructorEngagement: 51,
    instructorResponses: 51,
    studentParticipation: 8,
    studentResponses: 8
  };

  const handleNewPost = () => {
    console.log('Creating new post');
  };

  const handlePostClick = (postId) => {
    const post = posts.find(p => p.id === postId);
    setSelectedPost(post);
  };

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
  };

  const handleLogoClick = () => {
    setSelectedPost(null); // Return to main dashboard
  };

  const handleCourseSelect = (courseId) => {
    console.log('Selected course:', courseId);
    setShowCourseDropdown(false);
    // In a real app, this would switch to the selected course
  };

  const toggleCourseDropdown = () => {
    setShowCourseDropdown(!showCourseDropdown);
  };

  const handleJoinAnotherClass = () => {
    setShowCourseDropdown(false);
    setShowJoinClassModel(true);
  };

  const handleAccountSettings = () => {
    setShowAccountSettings(true);
  };

  const handleLogout = () => {
    console.log('Logging out');
    // In a real app, this would clear session and redirect to login
    window.location.reload();
  };

  // Filter posts based on selected filter
  const filteredPosts = selectedFilter === 'all' 
    ? posts 
    : posts.filter(post => post.tags && post.tags.includes(selectedFilter));

  // Get pinned posts from main posts array
  const pinnedPosts = posts.filter(post => post.isPinned);
  
  // Get non-pinned posts for the Today section
  const regularPosts = filteredPosts.filter(post => !post.isPinned);

  return (
    <div className="student-dashboard">
      {showAccountSettings ? (
        <AccountSettings onBack={() => setShowAccountSettings(false)} />
      ) : (
        <>
          {/* Header */}
          <header className="dashboard-header">
        <div className="header-left">
          <div className="logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>piazza</div>
          <div className="course-dropdown-container">
            <div className="course-dropdown" onClick={toggleCourseDropdown}>
              CS 484
              <span className="dropdown-icon">▼</span>
            </div>
            {showCourseDropdown && (
              <div className="course-dropdown-menu">
                <div className="dropdown-header">
                  <h3>CS 484 Secure Web Application Development</h3>
                  <span className="course-term">Fall 2025</span>
                </div>
                <div className="dropdown-divider"></div>
                <div className="course-list">
                  {courses.map(course => (
                    <div 
                      key={course.id}
                      className={`course-item ${course.isActive ? 'active' : ''}`}
                      onClick={() => handleCourseSelect(course.id)}
                    >
                      <div className="course-info">
                        <div className="course-code">{course.code}</div>
                        <div className="course-name">{course.name}</div>
                      </div>
                      <span className="course-term-badge">{course.term}</span>
                    </div>
                  ))}
                </div>
                <div className="dropdown-divider"></div>
                <div className="dropdown-footer">
                  <button className="dropdown-link">Show inactive classes</button>
                  <button className="dropdown-link">Manage class dropdown</button>
                </div>
                <div className="dropdown-divider"></div>
                <button className="join-class-btn" onClick={handleJoinAnotherClass}>→ Join Another Class</button>
              </div>
            )}
          </div>
        </div>
        <div className="header-center">
          <div className="nav-tabs">
            <button className={selectedTab === 'qa' ? 'active' : ''} onClick={() => setSelectedTab('qa')}>
              Q & A
            </button>
            <button className={selectedTab === 'resources' ? 'active' : ''} onClick={() => setSelectedTab('resources')}>
              Resources
            </button>
          </div>
        </div>
        <div className="header-right">
          <div className="user-info" style={{ position: 'relative' }}>
            <span>Tommy Kang</span>
            <div 
              className="user-avatar" 
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              style={{ cursor: 'pointer' }}
            >
              TK
            </div>
            <UserDropdown 
              isOpen={showUserDropdown}
              onClose={() => setShowUserDropdown(false)}
              onAccountSettings={handleAccountSettings}
              onJoinClass={handleJoinAnotherClass}
              onLogout={handleLogout}
              userName="Tommy Kang"
            />
          </div>
        </div>
      </header>

      {/* Sub-navigation */}
      <nav className="sub-nav">
        <button 
          className={`nav-item ${selectedFilter === 'all' ? 'active' : ''}`}
          onClick={() => handleFilterClick('all')}
        >
          hw0
        </button>
        <button 
          className={`nav-item ${selectedFilter === 'hw1' ? 'active' : ''}`}
          onClick={() => handleFilterClick('hw1')}
        >
          hw1
        </button>
        <button 
          className={`nav-item ${selectedFilter === 'hw2' ? 'active' : ''}`}
          onClick={() => handleFilterClick('hw2')}
        >
          hw2
        </button>
        <button 
          className={`nav-item ${selectedFilter === 'hw3' ? 'active' : ''}`}
          onClick={() => handleFilterClick('hw3')}
        >
          hw3
        </button>
        <button 
          className={`nav-item ${selectedFilter === 'hw4' ? 'active' : ''}`}
          onClick={() => handleFilterClick('hw4')}
        >
          hw4
        </button>
        <button 
          className={`nav-item ${selectedFilter === 'project' ? 'active' : ''}`}
          onClick={() => handleFilterClick('project')}
        >
          project
        </button>
        <button 
          className={`nav-item ${selectedFilter === 'exam' ? 'active' : ''}`}
          onClick={() => handleFilterClick('exam')}
        >
          exam
        </button>
        <button 
          className={`nav-item ${selectedFilter === 'logistics' ? 'active' : ''}`}
          onClick={() => handleFilterClick('logistics')}
        >
          logistics
        </button>
        <button 
          className={`nav-item ${selectedFilter === 'topics' ? 'active' : ''}`}
          onClick={() => handleFilterClick('topics')}
        >
          topics
        </button>
        <button 
          className={`nav-item ${selectedFilter === 'hw5' ? 'active' : ''}`}
          onClick={() => handleFilterClick('hw5')}
        >
          hw5
        </button>
      </nav>

      <div className="dashboard-content">
        {/* Sidebar */}
        <aside className="sidebar">
          <button className="new-post-btn" onClick={handleNewPost}>
            <span className="plus-icon">⊕</span> New Post
          </button>
          
          <div className="search-box">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="posts-section">
            <div className="posts-header">
              <button className="all-posts-btn">
                <span className="filter-icon">☰</span> All Posts
              </button>
              <button className="menu-icon">⋮</button>
            </div>

            <div className="pinned-section">
              <div className="section-header">
                <span className="dropdown-icon">▼</span>
                <span>Pinned</span>
              </div>
              {pinnedPosts.map(post => (
                <div 
                  key={post.id} 
                  className="pinned-post"
                  onClick={() => handlePostClick(post.id)}
                >
                  <span className="pin-icon">📌</span>
                  <div className="post-info">
                    <div className="post-title">{post.title}</div>
                    {post.preview && (
                      <div className="post-preview">{post.preview}</div>
                    )}
                  </div>
                  <div className="post-date">{post.time}</div>
                </div>
              ))}
            </div>

            <div className="posts-list">
              <div className="section-header">
                <span className="dropdown-icon">▼</span>
                <span>Today</span>
              </div>
              {regularPosts.map(post => (
                <div
                  key={post.id}
                  className={`post-item ${post.isUnread ? 'unread' : ''}`}
                  onClick={() => handlePostClick(post.id)}
                >
                  <div className="post-content">
                    <div className="post-title">{post.title}</div>
                    <div className="post-preview">{post.preview}</div>
                  </div>
                  <div className="post-meta">
                    <div className="post-time">{post.time}</div>
                    {post.isUnread && <div className="unread-badge">📋</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {selectedTab === 'resources' ? (
            <ResourcesPage />
          ) : selectedPost ? (
            <PostView 
              post={selectedPost} 
              currentUser="Tommy Kang"
              onBack={() => setSelectedPost(null)}
            />
          ) : (
            <>
              <div className="terms-notice">
                <a href="#">Terms of Service</a>: In the event of a conflict between these Payment Terms and the Terms of Service, these Payment Terms shall govern.
              </div>

              <h2 className="section-title">Class at a Glance</h2>

              <div className="glance-cards">
                <div className="status-row">
                  <div className={`status-card ${stats.allCaughtUp ? 'success' : 'warning'}`}>
                    <div className="status-icon">
                      {stats.allCaughtUp ? '✓' : '!'}
                    </div>
                    <div className="status-content">
                      <div className="status-title">
                        {stats.allCaughtUp ? 'All caught up' : 'Unread Posts'}
                      </div>
                      <div className="status-subtitle">
                        {stats.allCaughtUp ? 'No unread posts' : `${stats.unreadPosts} unread posts`}
                      </div>
                    </div>
                  </div>

                  <div className="status-card warning">
                    <div className="status-icon">!</div>
                    <div className="status-content">
                      <div className="status-title">Needs Attention</div>
                      <div className="status-subtitle">{stats.unansweredQuestions} unanswered questions</div>
                    </div>
                  </div>

                  <div className="status-card warning">
                    <div className="status-icon">!</div>
                    <div className="status-content">
                      <div className="status-title">Needs Attention</div>
                      <div className="status-subtitle">{stats.unansweredFollowups} unanswered followups</div>
                    </div>
                  </div>
                </div>

                <div className="stats-row">
                  <div className="stat-card">
                    <div className="stat-icon">👥</div>
                    <div className="stat-value">{stats.totalPosts}</div>
                    <div className="stat-label">Total Posts</div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-icon">📊</div>
                    <div className="stat-value">{stats.totalContributions}</div>
                    <div className="stat-label">Total Contributions</div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-icon">🎓</div>
                    <div className="stat-value">{stats.studentsEnrolled}</div>
                    <div className="stat-label">Students Enrolled</div>
                  </div>

                  <div className="stat-card license">
                    <div className="stat-label">License Status</div>
                    <div className="license-value">contribution-supported</div>
                    <div className="license-icon">🏫</div>
                  </div>
                </div>

                <div className="engagement-row">
                  <div className="engagement-card">
                    <div className="engagement-header">
                      <div>
                        <div className="engagement-title">Instructor Engagement</div>
                        <div className="engagement-value">{stats.instructorEngagement}</div>
                        <div className="engagement-subtitle">instructor responses</div>
                      </div>
                      <div className="engagement-icon">🍎</div>
                    </div>
                  </div>

                  <div className="engagement-card">
                    <div className="engagement-header">
                      <div>
                        <div className="engagement-title">Student Participation</div>
                        <div className="engagement-value">{stats.studentParticipation}</div>
                        <div className="engagement-subtitle">student responses</div>
                      </div>
                      <div className="engagement-icon">👥</div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </main>
      </div>

      {/* Join Class Model */}
      <JoinClassModel 
        isOpen={showJoinClassModel}
        onClose={() => setShowJoinClassModel(false)}
      />
        </>
      )}
    </div>
  );
};

export default StudentDashboard;