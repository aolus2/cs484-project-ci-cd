import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PostView.css';

const PostView = ({
  post,
  currentUser,
  onBack,
  onLLMReply,
  onFollowupSubmit,

  }) => {
  const [upvoted, setUpvoted] = useState(false);
  const [starred, setStarred] = useState(false);
  const [followupText, setFollowupText] = useState('');

  const isMyPost = post.author === currentUser;
  const followups = post.followups || []; 

  const handleUpvote = () => {
    setUpvoted(!upvoted);
  };

  const handleStar = () => {
    setStarred(!starred);
  };

  const handleCopyLink = () => {
    const postUrl = `${window.location.origin}/post/${post.id}`;
    navigator.clipboard.writeText(postUrl);
    alert('Link copied to clipboard!');
  };

  const handleEdit = () => {
    console.log('Edit post:', post.id);
  };

  const handleAIAssist = async () => {
    try {
      await onLLMReply(post.id, followupText);
      setFollowupText('');
    } catch (err) {
      console.error(err);
    }
  };


  const handleFollowupSubmit = async () => {
    try {
      await onFollowupSubmit(post.id, followupText);
      setFollowupText('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="post-view">
      {/* Breadcrumb Navigation */}
      <div className="post-nav">
        <button className="back-btn" onClick={onBack}>←</button>
        <button className="history-btn">
          <span className="clock-icon">🕐</span> Question History
        </button>
        <span className="nav-divider">|</span>
        <span className="no-history">No history yet</span>
      </div>

      {/* Post Header */}
      <div className="post-header">
        <div className="post-header-left">
          <div className="post-number">
            <span className="question-icon">?</span>
            <span className="post-type">{post.type}</span>
            <span className="post-id">@{post.number}</span>
          </div>
          <button className="more-options">⋮</button>
        </div>
      </div>

      {/* Post Title */}
      <h1 className="post-title">{post.title}</h1>

      {/* Post Meta */}
      <div className="post-meta-info">
        <span className="post-updated">Updated {post.updatedAt} by {post.author}</span>
      </div>

      {/* Post Content */}
      <div className="post-content-body">
        <p>{post.content}</p>
      </div>

      {/* Post Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="post-tags">
          {post.tags.map((tag, index) => (
            <span key={index} className="post-tag">{tag}</span>
          ))}
        </div>
      )}

      {/* Post Actions */}
      <div className="post-actions">
        {isMyPost && (
          <button className="action-btn edit-btn" onClick={handleEdit}>
            <span className="edit-icon">✎</span> Edit
          </button>
        )}
        <button 
          className={`action-btn upvote-btn ${upvoted ? 'active' : ''}`} 
          onClick={handleUpvote}
        >
          <span className="thumbs-up-icon">👍</span> {post.upvotes + (upvoted ? 1 : 0)}
        </button>
        <button 
          className={`action-btn star-btn ${starred ? 'active' : ''}`} 
          onClick={handleStar}
        >
          <span className="star-icon">{starred ? '★' : '☆'}</span>
        </button>
        <button 
          className="action-btn bookmark-btn"
        >
          <span className="bookmark-icon">🔖</span>
        </button>
        <button className="action-btn link-btn" onClick={handleCopyLink}>
          <span className="link-icon">🔗</span>
        </button>
        <button className="action-btn ai-btn" onClick={handleAIAssist}>
          <span className="ai-icon">🤖</span> AI
        </button>
        <div className="post-views">
          <span className="views-count">{post.views} views</span>
        </div>
      </div>


      {/* Followup Discussions Section */}
      <div className="followup-section">
        <div className="section-header followup-header">
          <div className="section-icon followup-icon">💬</div>
          <h2 className="section-title">
            {followups.length} Followup Discussion{followups.length !== 1 ? 's' : ''}
          </h2>        
        </div>
        
        {/* Existing Followups */}
      {followups.length > 0 ? (
      <div className="followups-list">
        {followups.map((followup, index) => (
          <div key={index} className="followup-item">
            <div className="followup-meta">
              <span className="followup-author">{followup.author}</span>
              <span className="followup-time">{followup.time}</span>
            </div>
            <div className="followup-content">{followup.content}</div>
          </div>
        ))}
      </div>
    ) : (
      <div className="no-followups">No followup discussions yet</div>
    )}

        {/* New Followup Input */}
        <div className="new-followup">
          <textarea
            className="followup-input"
            placeholder="Compose a new followup discussion"
            value={followupText}
            onChange={(e) => setFollowupText(e.target.value)}
          />
          {followupText && (
            <button className="submit-followup-btn" onClick={handleFollowupSubmit}>
              Post Followup
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostView;