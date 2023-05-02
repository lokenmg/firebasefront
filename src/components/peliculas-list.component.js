import React, { Component } from "react";
import PeliculaDataService from "../services/pelicula.service";
import Pelicula from "./pelicula.component";

export default class PeliculasList extends Component {
    constructor(props) {
        super(props);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveTutorial = this.setActiveTutorial.bind(this);
        this.onDataChange = this.onDataChange.bind(this);

        this.state = {
            peliculas: [],
            currentPelicula: null,
            currentIndex: -1,
        };

        this.unsubscribe = undefined;
    }

    componentDidMount() {
        this.unsubscribe = PeliculaDataService.getAll().orderBy("title", "asc").onSnapshot(this.onDataChange);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onDataChange(items) {
        let peliculas = [];

        items.forEach((item) => {
            let id = item.id;
            let data = item.data();
            peliculas.push({
                id: id,
                title: data.title,
                description: data.description,
                published: data.published,
                url: data.url,
            });
        });

        this.setState({
            peliculas: peliculas,
        });
    }

    refreshList() {
        this.setState({
            currentPelicula: null,
            currentIndex: -1,
        });
    }

    setActiveTutorial(tutorial, index) {
        this.setState({
            currentPelicula: tutorial,
            currentIndex: index,
        });
    }

    render() {
        const { peliculas, currentPelicula, currentIndex } = this.state;

        return (
            <div className="list row">
                <div className="col-md-6">
                    <h4>peliculas List</h4>

                    <ul className="list-group">
                        {peliculas &&
                            peliculas.map((tutorial, index) => (
                                <li
                                    className={"list-group-item " + (index === currentIndex ? "active" : "")}
                                    onClick={() => this.setActiveTutorial(tutorial, index)}
                                    key={index}
                                >
                                    {tutorial.title}

                                    <div>{tutorial.description}</div>
                                    <div>
                                        <img src={tutorial.url} alt="imagen"></img>
                                    </div>
                                </li>
                            ))}
                    </ul>
                </div>
                <div className="col-md-6">
                    {currentPelicula ? (
                        <Pelicula
                            pelicula={currentPelicula}
                            refreshList={this.refreshList}
                        />
                    ) : (
                        <div>
                            <br />
                            <p>Please click on a Pelicula...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
