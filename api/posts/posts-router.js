// implement your posts router here
const express = require('express')

 const router = express.Router()

 const Post = require('./posts-model')


 router.get('/', (req, res) => {
     Post.find()
        .then(post => {
            res.status(200).json(post)
        })
        .catch(err => {
            res.status(500).json({ message: "The posts information could not be retrieved" })
        })
 })

 router.get('/:id', (req, res) => {
     Post.findById(req.params.id)
        .then(post =>{
            if(!post)
            {res.status(404).json({ message: "The post with the specified ID does not exist" })}
            else{res.status(200).json(post)}
        })
        .catch(err =>{
            res.status(500).json({ message: "The posts information could not be retrieved" })
        })
 })

 router.post('/', (req, res) => {
    const {title, contents} = req.body
    const newPost = {title: title, contents: contents}
    
    if(!title || !contents){
        res.status(400).json({ message: "Please provide title and contents for the post" })
    }else{
        Post.insert(newPost)
            .then(post => {
                res.status(201).json(post)
            })
            .catch(err => {
                res.status(500).json({ message: "There was an error while saving the post to the database" })
            })
    }
 })

 router.put('/:id', (req, res) => {
    const {title, contents} = req.body
    const changes = {title: title, contents: contents}

    if(!title || !contents){
       return res.status(400).json({ message: "Please provide title and contents for the post" })}
    
       Post.update(req.params.id, changes)
        .then(post =>{
            if(!post)
            {res.status(404).json({ message: "The post with the specified ID does not exist" })}
            else{res.status(200).json(post)}
        })
        .catch(err =>{
            res.status(500).json({ message: "The posts information could not be retrieved" })
        })
 })

 router.delete('/:id', (req, res) => {
    Post.remove(req.params.id)
    .then(post =>{
        if(!post)
        {res.status(404).json({ message: "The post with the specified ID does not exist" })}
        else{res.status(200).json(post)}
    })
    .catch(err =>{
        res.status(500).json({ message: "The post could not be removed" })
    })
 })

 router.get('/:id/comments', (req, res) => {
    Post.findPostComments(req.params.id)
    .then(post =>{
        if(!post)
        {res.status(404).json({ message: "The post with the specified ID does not exist" })}
        else{res.status(200).json(post)}
    })
    .catch(err =>{
        res.status(500).json({ message: "The comments information could not be retrieved" })
    })
 })

 module.exports = router