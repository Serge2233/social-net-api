const router = require('express').Router()

const {
    getAllThoughts,
    createThought,
    getThoughtById,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thought-controller')

router
    .route('/')
    .get(getAllThoughts)
    .post(createThought)

    router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought)