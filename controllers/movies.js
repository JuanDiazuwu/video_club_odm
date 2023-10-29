const express = require('express');
const Director = require('../models/director');
const Movie = require('../models/movie');
const Genre = require('../models/genre');

async function create(req, res, next){
    const title = req.body.title;
    const directorId = req.body.directorId;
    const genreId = req.body.genreId;

    let director = await Director.findOne({"_id":directorId});
    let genre = await Genre.findOne({"_id":genreId});
    let movie = new Movie({
        title:title,
        director:director,
        genre:genre
    });
    movie.save().then(obj => res.status(200).json({
        message: "Pelicula almacenada correctamente",
        obj: obj
    })).catch(ex => res.status(500).json({
        message: "No se puedo crear la pelicula",
        obj:ex
    }));
}

function list(req, res, next) {
    Movie.find().populate(["_director", "_genre"]).then(objs => res.status(200).json({
        message: "Lista de peliculas",
        obj: objs
    })).catch(ex => res.status(500).json({
        message: "No se puedo obtener la pelicula",
        obj:ex
    }));
}

function index(req, res, next){
    const id = req.params.id;
    Movie.findOne({"_id":id}).populate(["_director", "_genre"]).then(obj => res.status(200).json({
        message:`Pelicula con el id ${id}`,
        obj:obj
    })).catch(ex => res.status(500).json({
        message:`No se puedo consultar la pelicula con el id: ${id}`,
        obj:ex
    }));
}

function replace(req, res, next){
    const id = req.params.id;
    let title = req.body.title ? req.body.title : "";
    let directorId = req.body.directorId ? req.body.directorId : ""; // No funciona si esta vacio
    let genreId = req.body.genreId ? req.body.genreId: "";
    let movie = new Object({
        _title:title, _director:directorId, _genre:genreId
    });
    Movie.findOneAndUpdate({"_id":id}, movie, {new:true})
            .then(obj => res.status(200).json({
                message:`Pelicula reemplazada correctamente, con el id: ${id}`,
                obj:obj
            })).catch(ex => res.status(500).json({
                message:`No se puedo reemplazar la pelicula con el id: ${id}`,
                obj:ex
            }));
}

function update(req, res, next){
    const id = req.params.id;
    let title = req.body.title;
    let directorId = req.body.directorId;
    let genreId = req.body.genreId;
    let movie = new Object();
    if(title) movie._title = title;
    if(directorId) movie._director = directorId;
    if(genreId) movie._genre = genreId;
    Movie.findOneAndUpdate({"_id":id}, movie)
            .then(obj => res.status(200).json({
                message:`Pelicula actualizada corretamente, con el id: ${id}`,
                obj:obj
            })).catch(ex => res.status(500).json({
                message:`No se puedo actualizar la pelicula con el id: ${id}`,
                obj:ex
            }));
}

function destroy(req, res, next){
    const id = req.params.id;
    Movie.findByIdAndRemove({"_id":id}).then(obj => res.status(200).json({
        message:`Pelicula eliminada correctamente, contaba con el id: ${id}`,
        obj:obj
    })).catch(ex => res.status(500).json({
        message:`No se puedo eliminar la pelicula con el id: ${id}`,
        obj:ex
    }));
}

module.exports = {
    create, list, index, replace, update, destroy
};