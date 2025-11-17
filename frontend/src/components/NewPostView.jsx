import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import './PostView.css';

const NewPostView = ({ onCancel, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(title, body);
      setTitle('');
      setBody('');
    } catch (err) {
      console.error(err);
    } 
  }

  const toolbarOptions = [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'code-block'],
    ['clean'],
  ];


  return (
    <div className="NewPostView">
          <textarea
            className="followup-input"
            placeholder="Title of your post"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <ReactQuill
            className="body-input"
            theme="snow"
            value={body}
            onChange={setBody}
            placeholder="Body of your post"
            modules={{ toolbar: toolbarOptions }}
          />

        <button className="submit-followup-btn" onClick={handleSubmit}>
              Post Question
        </button>

        <button type="button" onClick={onCancel}className="cancel-btn">
              Cancel
        </button>
    </div>
  );
};

export default NewPostView;