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

    createThought({ params, body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                )
            })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No user found with this id!' })
                    return
                }
                res.json(dbThoughtData)
            })
            .catch(err => res.json(err))
    },

    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id' })
                    return
                }
                res.json(dbThoughtData)
            })
            .catch(err => res.json(err))
    },

    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err))
    }

}

module.exports = thoughtController