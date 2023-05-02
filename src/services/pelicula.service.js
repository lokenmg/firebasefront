import firebase from "../firebase";

const db = firebase.collection("/Peliculas");

class PeliculaDataService {
  getAll() {
    return db;
  }

  create(pelicula) {
    return db.add(pelicula);
  }

  update(id, value) {
    return db.doc(id).update(value);
  }

  delete(id) {
    return db.doc(id).delete();
  }
}

const peliculaDataService = new PeliculaDataService();


export default new peliculaDataService;
