import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function EditProject() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [projectUrl, setProjectUrl] = useState('');

  const { id } = useParams();

  useEffect(() => {
    axios.get('http://localhost:5000/projects/' + id)
      .then(response => {
        setTitle(response.data.title);
        setDescription(response.data.description);
        setImageUrl(response.data.imageUrl);
        setProjectUrl(response.data.projectUrl);
      })
      .catch(function (error) {
        console.log(error);
      })
  }, [id]);

  const onSubmit = (e) => {
    e.preventDefault();

    const project = {
      title: title,
      description: description,
      imageUrl: imageUrl,
      projectUrl: projectUrl
    }

    console.log(project);

    axios.post('http://localhost:5000/projects/update/' + id, project)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  return (
    <div>
      <h3>Edit Project</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title: </label>
          <input type="text"
            required
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input type="text"
            required
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Image URL: </label>
          <input
            type="text"
            className="form-control"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Project URL: </label>
          <input
            type="text"
            className="form-control"
            value={projectUrl}
            onChange={(e) => setProjectUrl(e.target.value)}
          />
        </div>

        <div className="form-group">
          <input type="submit" value="Edit Project" className="btn btn-primary" />
        </div>
      </form>
    </div>
  )
}

export default EditProject;
