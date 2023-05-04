import React, { Component } from "react";
import PeliculaDataService from "../services/pelicula.service";
import Button from 'react-bootstrap/Button';

import "firebase/compat/storage";
import firebase from "firebase/compat/app";
export const storage = firebase.storage;

export default class Pelicula extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updatePelicula = this.updatePelicula.bind(this);
    this.deletePelicula = this.deletePelicula.bind(this);

    this.state = {
      currentPelicula: {
        id: null,
        title: "",
        description: "",
        published: false,
        submitted: false,
        file: null,
        url: ""
      },
      message: "",
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { pelicula } = nextProps;
    if (prevState.currentPelicula.id !== pelicula.id) {
      return {
        currentPelicula: pelicula,
        message: ""
      };
    }

    return prevState.currentPelicula;
  }

  onChangeFile(e){
    this.setState({
      file: e.target.files[0]
    });
  }
  componentDidMount() {
    this.setState({
      currentPelicula: this.props.pelicula,
    });
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function (prevState) {
      return {
        currentPelicula: {
          ...prevState.currentPelicula,
          title: title,
        },
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState((prevState) => ({
      currentPelicula: {
        ...prevState.currentPelicula,
        description: description,
      },
    }));
  }

  updatePublished(status) {
    PeliculaDataService.update(this.state.currentPelicula.id, {
      published: status,
    })
      .then(() => {
        this.setState((prevState) => ({
          currentPelicula: {
            ...prevState.currentPelicula,
            published: status,
          },
          message: "The status was updated successfully!",
        }));
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updatePelicula() {
    const data = {
      title: this.state.currentPelicula.title,
      description: this.state.currentPelicula.description,
    };

    PeliculaDataService.update(this.state.currentPelicula.id, data)
      .then(() => {
        this.setState({
          message: "The Pelicula was updated successfully!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deletePelicula() {
    PeliculaDataService.delete(this.state.currentPelicula.id)
      .then(() => {
        this.props.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }


  render() {
    const { currentPelicula } = this.state;

    return (
      <div>
        <h4>Tutorial</h4>
        {currentPelicula ? (
          <div className="edit-form">
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentPelicula.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentPelicula.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentPelicula.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentPelicula.published ? (
              <Button variant="outline-success"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </Button> 
            ) : (
              <Button
              variant="outline-warning"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </Button> 
            )}

            <Button variant="outline-danger"
              onClick={this.deletePelicula}
            >
              Delete
            </Button>

            <Button
              Button variant="outline-success"
              onClick={this.updatePelicula}
            >
              Update
            </Button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Pelicula...</p>
          </div>
        )}
      </div>
    );
  }
}