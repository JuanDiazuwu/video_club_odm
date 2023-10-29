const express = require('express');
const Booking = require('../models/booking');
const Member = require('../models/member');
const Copy = require('../models/copy');

async function create(req, res, next){
    const date = req.body.date;
    const memberId = req.body.memberId;
    const copyId = req.body.copyId;

    let member = await Member.findOne({"_id":memberId});
    let copy = await Copy.findOne({"_id":copyId});
    let booking = new Booking({
        date:date,
        member:member,
        copy:copy
    });
    booking.save().then(obj => res.status(200).json({
        message: "Reserva almacenada correctamente",
        obj: obj
    })).catch(ex => res.status(500).json({
        message: "No se puedo realizar la reservación",
        obj:ex
    }));
}

function list(req, res, next) {
    Booking.find().populate(["_member", "_copy"]).then(objs => res.status(200).json({
        message: "Lista de reservaciones",
        obj:objs
    })).catch(ex => res.status(500).json({
        message: "No se puedo obtener las reservaciones",
        obj:ex
    }));
}

function index(req, res, next){
    const id = req.params.id;
    Booking.findOne({"_id":id}).populate(["_member", "_copy"]).then(obj => res.status(200).json({
        message:`Reservacion con el id ${id}`,
        obj:obj
    })).catch(ex => res.status(500).json({
        message:`No se puedo consultar la reservacion con el id: ${id}`,
        obj:ex
    }));  
}

function replace(req, res, next){
    const id = req.params.id;
    let date = req.body.date ? req.body.date : "";
    let memberId = req.body.memberId ? req.body.memberId : ""; 
    let copyId = req.body.copyId ? req.body.copyId: "";
    let booking = new Object({
        _date:date, _member:memberId, _copy:copyId
    });
    Booking.findOneAndUpdate({"_id":id}, booking, {new:true})
            .then(obj => res.status(200).json({
                message:`Reservacion reemplazada correctamente, con el id: ${id}`,
                obj:obj
            })).catch(ex => res.status(500).json({
                message:`No se puedo reemplazar la reservacion con el id: ${id}`,
                obj:ex
            }));
}

function update(req, res, next){
    const id = req.params.id;
    let date = req.body.date;
    let memberId = req.body.memberId;
    let copyId = req.body.copyId;
    let booking = new Object();
    if(date) booking._date = date;
    if(memberId) booking._member = memberId;
    if(copyId) booking._copy = copyId;
    Booking.findOneAndUpdate({"_id":id}, booking)
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
    Booking.findByIdAndRemove({"_id":id}).then(obj => res.status(200).json({
        message:`Reservacion eliminada correctamente, contaba con el id: ${id}`,
        obj:obj
    })).catch(ex => res.status(500).json({
        message:`No se puedo eliminar la reservacion con el id: ${id}`,
        obj:ex
    }));
}

module.exports = {
    create, list, index, replace, update, destroy
};