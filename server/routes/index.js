const habitsController = require('../controllers').habits;
const actionsController = require('../controllers').actions;
// seems like we should be able to do the import {habits} from '../controllers' here

module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'WELCOME TO THE HABITS API'
    }));

    app.post('/api/habits', habitsController.create);
    app.get('/api/habits', habitsController.list);
    app.get('/api/habits/:habitId', habitsController.retrieve);
    app.put('/api/habits/:habitId', habitsController.update);
    app.delete('/api/habits/:habitId', habitsController.destroy);

     app.post('/api/habits/:habitId/actions', actionsController.create);
     app.put('/api/habits/:habitId/actions/:actionId', actionsController.update);
     app.delete('/api/habits/:habitId/actions/:actionId', actionsController.destroy);

     app.all('/api/habits/:habitId/actions', (req, res) => {
         res.status(405).send({
             message: 'Method not allowed'
         });
     });

    
}