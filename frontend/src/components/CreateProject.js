import React, { Component } from 'react';
import axios from 'axios';

export default class CreateProject extends Component {
  constructor(props) {
    super(props);

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeImageUrl = this.onChangeImageUrl.bind(this);
    this.onChangeProjectUrl = this.onChangeProjectUrl.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      title: '',
      description: '',
      imageUrl: '',
      projectUrl: ''
    }
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeImageUrl(e) {
    this.setState({
      imageUrl: e.target.value
    })
  }

    onChangeProjectUrl(e) {
    this.setState({
        projectUrl: e.target.value
    })
    }

  onSubmit(e) {
    e.preventDefault();

    const project = {
      title: this.state.title,
      description: this.state.description,
      imageUrl: this.state.imageUrl,
      projectUrl: this.state.projectUrl
    }

    console.log(project);

    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
    axios.post(`${apiUrl}/projects/add`, project)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Create New Project</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Title: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.title}
              onChange={this.onChangeTitle}
              />
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Image URL: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.imageUrl}
              onChange={this.onChangeImageUrl}
              />
        </div>
        <div className="form-group">
          <label>Project URL: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.projectUrl}
              onChange={this.onChangeProjectUrl}
              />
        </div>

        <div className="form-group">
          <input type="submit" value="Create Project" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}
