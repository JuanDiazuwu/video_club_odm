const express = require('express');
const Director = require('../models/director');

function create(req, res, next){
    const name = req.body.name;
    const lastName = req.body.lastName;
    let director = new Director({
        name:name, lastName:lastName
    });
    director.save().then(obj => res.status(200).json({
        message:"Director creado correctamente", 
        obj:obj
    })).catch(ex => res.status(500).json({
        message:"No se puedo almacenar el director",
        obj:ex
    }));
}

function list(req, res, next) {
    let page = req.params.page ? req.params.page :1;
    const options = {
        page:page,
        limit:5
    };
    Director.paginate({}, options).then(objs => res.status(200).json({
        message:"Lista de directores",
        obj:objs
    })).catch(ex => res.status(500).json({
        message:"No se puedo consultar la lista de directores",
        obj:ex
    }));
}

function index(req, res, next){
    const id = req.params.id;
    Director.findOne({"_id":id}).then(obj => res.status(200).json({
        message:`Director con el id ${id}`,
        obj:obj
    })).catch(ex => res.status(500).json({
        message:`No se puedo consultar el director con el id: ${id}`,
        obj:ex
    }));
}

function replace(req, res, next){
    const id = req.params.id;
    let name = req.body.name ? req.body.name : "";
    let lastName = req.body.lastName ? req.body.lastName : "";
    let director = new Object({
        _name:name, _lastName:lastName
    });
    Director.findOneAndUpdate({"_id":id}, director, {new:true})
            .then(obj => res.status(200).json({
                message:`Director reemplazado correctamente, con el id: ${id}`,
                obj:obj
            })).catch(ex => res.status(500).json({
                message:`No se puedo reemplazar el director con el id: ${id}`,
                obj:ex
            }));
}

function update(req, res, next){
    const id = req.params.id;
    let name = req.body.name;
    let lastName = req.body.lastName;
    let director = new Object();
    if(name) director._name = name;
    if(lastName) director._lastName = lastName;
    Director.findOneAndUpdate({"_id":id}, director)
            .then(obj => res.status(200).json({
                message:`Director actualizado corretamente, con el id: ${id}`,
                obj:obj
            })).catch(ex => res.status(500).json({
                message:`No se puedo actualizar el director con el id: ${id}`,
                obj:ex
            }));
}

function destroy(req, res, next){
    const id = req.params.id;
    Director.findByIdAndRemove({"_id":id}).then(obj => res.status(200).json({
        message:`Director eliminado correctamente, contaba con el id: ${id}`,
        obj:obj
    })).catch(ex => res.status(500).json({
        message:`No se puedo eliminar el director con el id: ${id}`,
        obj:ex
    }));
}

module.exports = {
    create, list, index, replace, update, destroy
};