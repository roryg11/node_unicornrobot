const Action = require('../models').Action;

module.exports = {
    create(req, res){
        console.log(req.body);
        console.log(req.params);
        return Action.create({
            content: req.body.content,
            habitId: req.params.habitId,
        })
        .then(action => res.status(201).send(action))
        .catch(error => res.status(400).send(error));
    },
    update(req, res){
        return Action
        .find({
            where: {
                id: req.params.actionId,
                habitId: req.params.habitId
            }
        })
        .then(action => {
            if (!action){
                return res.status(404).send({
                    message: 'Action not found'
                });
            }

            //  do this form of updating to scale with lots of fields being updated
            return action.update(req.body, {fields: Object.keys(req.body)})
            .then( updatedAction => res.status(200).send(updatedAction))
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    },
    destroy(req, res){
        return Action
        .find({
            where: {
                id: req.params.actionId,
                habitId: req.params.habitId
            },
        })
        .then( action => {
            if(!action){
                return res.status(404).send({
                    message: 'Action not found'
                });
            }

            return action
            .destroy()
            .then(()=> res.status(204).send({message: 'Action successfully deleted'}))
            .catch(error => re.sstatus(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    }
}