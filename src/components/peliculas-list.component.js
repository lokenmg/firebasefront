import React, { Component } from "react";
import PeliculaDataService from "../services/pelicula.service";
import Pelicula from "./pelicula.component";

import LikeButton from "./reactions/LikeButton.component";
import LoveButton from "./reactions/LoveButton.component";
import SadButton from "./reactions/SadButton.component";
import WowButton from "./reactions/WowButton.component";
import AngryButton from "./reactions/AngryButton.component";
import HahaButton from "./reactions/HahaButton.component";
import CareButton from "./reactions/CareButton.component";
import CommentComponent from "./comment.component";

import { Container, ListGroup, Col, Row, Card } from "react-bootstrap";



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
        const { peliculas, currentPelicula} = this.state;

        return (
            <Container className="mx-auto">
            <Row>
                <Col md="auto">
                    <h4>Peliculas List</h4>

                    <ListGroup>
                        <Card style={ {backgroundColor:'rgba(0, 0, 0, 0.391)'} } >
                            {peliculas &&
                                peliculas.map((tutorial, index) => (
                                    <ListGroup.Item
                                        style={{ margin: '10px' }}
                                        onClick={() => this.setActiveTutorial(tutorial, index)}
                                        key={index}
                                    >
                                        <Card.Body style={{ borderRadius: 10, boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', transition: '0.3s' }} > 
                                        <Card.Header>
                                            <Card.Title>
                                                {tutorial.title}
                                            </Card.Title>
                                        </Card.Header>
                                        <Card.Body >
                                            <Card.Subtitle>
                                                {tutorial.description}
                                            </Card.Subtitle>
                                            <Card.Img style={{border: '1px solid black', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', transition: '0.3s' }} className="m-3" variant="top" src={tutorial.url} alt="img" fluid />
                                            
                                            <div className="d-flex  align-items-auto m-1">
                                                <LikeButton />
                                                <LoveButton />
                                                <SadButton />
                                                <WowButton />
                                                <AngryButton />
                                                <HahaButton />
                                                <CareButton />
                                            </div>
                                            <Card.Footer>
                                                <Card.Title>Agregar comentarios</Card.Title>
                                                <CommentComponent />
                                                </Card.Footer>                                            
                                        </Card.Body>
                                        <Card.Body >
                                                {currentPelicula ? (
                                                    <Pelicula pelicula={currentPelicula} refreshList={this.refreshList} />
                                                ) : (
                                                    <div>
                                                    </div>
                                                )}
                                            
                                        </Card.Body>
                                        </Card.Body>
                                    </ListGroup.Item>
                                ))}

                        </Card>
                    </ListGroup>
                </Col>

            </Row>
            </Container>
        );
    }
}
