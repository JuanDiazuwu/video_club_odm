const express = require('express');
const Director = require('../models/director')

function create(req, res, next){
    const name = req.body.name;
    const lastName = req.body.lastName;
    let director = new Director({
        name:name,
        lastName:lastName
    });
}

function list(req, res, next) {
    res.send('Directors list');
}

function index(req, res, next){
    res.send('Director index')
}

function replace(req, res, next){
    res.send('Director replace')
}

function update(req, res, next){
    res.send('Director update')
}

function destroy(req, res, next){
    res.send('Director destroy')
}

module.exports = {
    create, list, index, replace, update, destroy
};