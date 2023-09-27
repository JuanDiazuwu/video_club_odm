const express = require('express');

function create(req, res, next){
    res.send('Users create')
}

function list(req, res, next) {
    res.send('Users list');
}

function index(req, res, next){
    res.send('Users index')
}

function replace(req, res, next){
    res.send('Users replace')
}

function update(req, res, next){
    res.send('Users update')
}

function destroy(req, res, next){
    res.send('Users destroy')
}

module.exports = {
    create, list, index, replace, update, destroy
};

// get list
// get  index
// post create
// put  replace
//patch update
// delete destroy