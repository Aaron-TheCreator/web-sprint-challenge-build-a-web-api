// Write your "actions" router here!
// X- `[GET] /api/actions` returns an array of actions (or an empty array) as the body of the _response_.
//   X- `[GET] /api/actions/:id` returns an action with the given `id` as the body of the _response_.
//   X- `[POST] /api/actions` returns the newly created action as the body of the _response_.
//   X- `[PUT] /api/actions/:id` returns the updated action as the body of the _response_.
//   X- `[DELETE] /api/actions/:id` returns no _response_ body.


const express = require('express');

const Actions = require('./actions-model.js');

const router = express.Router();

router.get('/', (req, res) => {
    Actions.get()
        .then((actions) => {
            if (actions) {
                res.status(200).json(actions);
            } else {
                res.status(200).json({
                    message: "No actions here to show"
                })
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                message: "error returning actions data"
            });
        });
});

router.get('/:id', (req, res) => {
    Actions.get(req.params.id)
        .then((action) => {
            if (action) {
                res.status(200).json(action);
            } else {
                res.status(404).json({
                    message: "The action youre looking for simply doesnt exist"
                });
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                message: "Error retrieving the action, try again later"
            });
        });
});

router.post('/', (req, res) => {
    Actions.insert(req.body)
        .then((action) => {
            res.status(201).json(action);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                message: "There was an error adding your action"
            });
        });
});

router.put('/:id', (req, res) => {
    Actions.update(req.params.id ,req.body)
        .then((action) => {
            if(!action) {
                res.status(404).json({
                    message: "the action youre trying to update does not exist"
                })
            } else {
                res.status(200).json(action);
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                message: "there was an error updating the action"
            });
        });
});

router.delete('/:id', (req, res) => {
    Actions.remove(req.params.id)
        .then((action) => {
            if (!action) {
                res.status(404).json({
                    message: "the action youre trying to delete does not exist"
                })
            } else {
                res.status(200).json({
                    message: "the action has been deleted"
                });
            }
        });
});

module.exports = router;


// ACTION DATA STRUCTURE
// {
//     "id":3,
//     "project_id":1,
//     "description":"Design and Build API Endpoints",
//     "notes":"This is where the magic happens!",
//     "completed":false
// }