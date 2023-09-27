const express = require('express');

function create(req, res, next){
    res.send('Director create');
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