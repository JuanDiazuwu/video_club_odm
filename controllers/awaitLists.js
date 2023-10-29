const express = require('express');
const AwaitList = require('../models/awaitList');
const Member = require('../models/member');
const Movie = require('../models/movie');

async function create(req, res, next) {
    const memberId = req.body.memberId;
    const movieId = req.body.movieId;

    let member = await Member.findOne({ ":_id": memberId });
    let movie = await Movie.findOne({ "_id": movieId });
    let awaitList = new AwaitList({
        member:member,
        movie:movie,
    });
    awaitList.save().then(obj => res.status(200).json({
        message: "Lista de espera almacenada correctamente",
        obj: obj
    })).catch(ex => res.status(500).json({
        message: "No se puedo crear la lista de espera",
        obj: ex
    }));
}

function list(req, res, next) {
    AwaitList.find().populate(["_member", "_movie"]).then(objs => res.status(200).json({
        message: "Lista de lista de espera",
        obj: objs
    })).catch(ex => res.status(500).json({
        message: "No se puedo obtener la lista de lsita de espera",
        obj: ex
    }));
}

function index(req, res, next){
    const id = req.params.id;
    AwaitList.findOne({ "_id": id }).populate(["_member", "_movie"]).then(obj => res.status(200).json({
        message: `Lista de espera con el id: ${id}`,
        obj: obj
    })).catch(ex => res.status(500).json({
        message: `No se puedo consultar la lista de espera con el id: ${id}`,
        obj: ex
    }));
}

function replace(req, res, next){
    const id = req.params.id;
    let memberId = req.body.memberId ? req.body.memberId : "";
    let movieId = req.body.movieId ? req.body.movieId : "";
    let awaitList = new Object({
        _member:memberId, _movie:movieId
    });
    AwaitList.findOneAndUpdate({ "_id": id }, awaitList, { new: true })
        .then(obj => res.status(200).json({
            message: `Lista de espera reemplazada correctamente, con el id: ${id}`,
            obj: obj
        })).catch(ex => res.status(500).json({
            message: `No se puedo reemplazar la lista de espera con el id: ${id}`,
            obj: ex
        }));
}

function update(req, res, next){
    const id = req.params.id;
    let memberId = req.body.memberId;
    let movieId = req.body.movieId;
    let awaitList = new Object();
    if(memberId) awaitList._number = memberId;
    if(movieId) awaitList._movie = movieId;
    AwaitList.findOneAndUpdate({"_id":id}, awaitList)
            .then(obj => res.status(200).json({
                message:`Lista de espera actualizada corretamente, con el id: ${id}`,
                obj:obj
            })).catch(ex => res.status(500).json({
                message:`No se puedo actualizar la lista de espera con el id: ${id}`,
                obj:ex
            }));
}

function destroy(req, res, next){
    const id = req.params.id;
    AwaitList.findByIdAndRemove({"_id":id}).then(obj => res.status(200).json({
        message:`lista de espera eliminada correctamente, contaba con el id: ${id}`,
        obj:obj
    })).catch(ex => res.status(500).json({
        message:`No se puedo eliminar la lista de espera con el id: ${id}`,
        obj:ex
    }));
}

module.exports = {
    create, list, index, replace, update, destroy
};