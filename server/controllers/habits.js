const Habit = require('../models').Habit;
const Action = require('../models').Action;

module.exports = {
    create(req, res){
        return Habit
        .create({
            title: req.body.title,
        })
        .then(habit => {
            res.status(201).send(habit);
        })
        .catch(error => {
            console.log(error);
            res.status(400).send(error)
        });
    },
    list(req,res){
        return Habit
        .findAll({
            include: [{
                model: Action,
                as: 'actions'
            }]
        })
        .then(habits => res.status(200).send(habits))
        .catch(error => {
            res.status(400).send(error)
        });
    },
    retrieve(req, res) {
        return Habit
        .findById(req.params.habitId, {
            include: [{
                model: Action,
                as: 'actions'
            }]
        })
        .then(habit => {
            if(!habit){
                return res.status(404).send({
                    message: 'Habit not found'
                });
            }

            return res.status(200).send(habit);
        })
        .catch(error => res.status(400).send(error));
    },
    update(req, res){
        return Habit.findById(req.params.habitId, {
            include: [{
                model: Action,
                as: 'actions'
            }]
        })
        .then( habit => {
            if(!habit){
                return res.status(404).send({
                    message: 'Habit Not Found'
                });
            }
            return habit.update({
                title: req.body.title || habit.title,
            })
            .then(() => {
                res.status(200).send(habit);
            })
            .catch((error) => res.status(400).send(error));
        })
        .catch((error) => res.status(400).send(error));
    },
    destroy(req, res){
        return Habit
        .findById(req.params.habit)
        .then(habit => {
            if(!habit){
                return res.status(400).send({
                    message: "Habit Not Found"
                });
            }

            return habit
            .destroy()
            .then(()=> res.status(204).send({message: 'Habit Successfully deleted.'}))
            .catch( error => res.status(400).send(error));
        })
    }
}