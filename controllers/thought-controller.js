const { Thought, User } = require('../models')

const thoughtController = {

    getAllThoughts(req, res) {
        Thought.find({})
            .select('-__v')
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err)
                res.sendStatus(400)
            })
    },

    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .select('-__v')
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err)
                res.sendStatus(400)
            })
    },

    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $addToSet: { reactions: body } },
            { new: true }
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id'})
                return
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.json(err))
    },

    deleteReaction({ params}, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId}} },
            { new: true}
            )
            .then(dbThoughtData => {
                console.log(dbThoughtData)
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No reaction found with this id!'})
                    return
                }
                res.json(dbThoughtData)
            })
            .catch(err => res.json(err))
    },