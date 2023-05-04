import React, { Component } from "react";
import PeliculaDataService from "../services/pelicula.service";
import "firebase/compat/storage";
import firebase from "firebase/compat/app";
import { Button, Form} from "react-bootstrap";
export const storage = firebase.storage();

export default class AddPelicula extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.savePelicula = this.savePelicula.bind(this);
    this.newPelicula = this.newPelicula.bind(this);
    this.onChangeFile = this.onChangeFile.bind(this);
    this.handleUpload = this.handleUpload.bind(this);

    this.state = {
      title: "",
      description: "",
      published: false,
      submitted: false,
      url: "",
      file: null
    };
  }

  onChangeFile(e) {
    this.setState({
      file: e.target.files[0]
    });
  }

  handleUpload(e, file) {
    const acceptedImageTypes = ['image/jpeg', 'image/png'];
    e.preventDefault();
    console.log(file.type, this.state.title, this.state.description);
    alert(file.name);

    if (!acceptedImageTypes.includes(file.type)) {
      alert('Solo se permiten archivos de imagen JPEG o PNG.');
      return;
    }

    const uploadTask = storage.ref(`/images/${file.name}`).put(file);

    uploadTask.on("state_changed", console.log, console.error, () => {
      storage
        .ref("images")
        .child(file.name)
        .getDownloadURL()
        .then((myurl) => {
          this.setState({
            url: myurl
          });
        });
    });
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  savePelicula() {
    console.log(this.state.url, this.state.title, this.state.description);
    if (this.state.url === "" || this.state.title === "" || this.state.description === "") {
      alert('algun campo esta vacio');
      return;
    }
    console.log(this.state.url);
    let data = {
      title: this.state.title,
      description: this.state.description,
      published: false,
      url: this.state.url
    };

    PeliculaDataService.create(data)
      .then(() => {
        console.log("Created new item successfully!");
        this.setState({
          submitted: true,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newPelicula() {
    this.setState({
      title: "",
      description: "",
      url: "",
      file: null,
      published: false,
      submitted: false,
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <Button variant="success" onClick={this.newPelicula}>
              Add
            </Button>
          </div>
        ) : (
          <div>
            <Form>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  required
                  value={this.state.title}
                  onChange={this.onChangeTitle}
                  name="title"
                />
              </Form.Group>

              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  required
                  value={this.state.description}
                  onChange={this.onChangeDescription}
                  name="description"
                />
              </Form.Group>
              <Form.Group controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => this.onChangeFile(e)}
              name="image"
            />
          </Form.Group>

          <Button className="2-m" variant="primary" onClick={(e) => this.handleUpload(e, this.state.file)}>
            Upload
          </Button>

          <Button variant="success" onClick={this.savePelicula}>
            Submit
          </Button>
        </Form>
      </div>
    )}
  </div>
);
  }
}