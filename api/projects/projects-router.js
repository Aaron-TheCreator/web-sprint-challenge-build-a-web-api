// - [ ] Inside `api/projects/projects-router.js` build endpoints for performing CRUD operations on _projects_:
//   X- `[GET] /api/projects` returns an array of projects (or an empty array) as the body of the response.
//   X- `[GET] /api/projects/:id` returns a project with the given `id` as the body of the _response_.
//   X- `[POST] /api/projects` returns the newly created project as the body of the _response_.
//   X- `[PUT] /api/projects/:id` returns the updated project as the body of the _response_.
//   X- `[DELETE] /api/projects/:id` returns no _response_ body.

// - [ ] Inside `api/projects/projects-router.js` add an endpoint for retrieving the list of actions for a project:
//   - `[GET] /api/projects/:id/actions` sends an array of actions (or an empty array) as the body of the response.

const express = require('express');

const Projects = require('./projects-model.js');

const router = express.Router();

router.get('/', (req, res) => {
    Projects.get()
        .then((projects) => {
            if (projects) {
                res.status(200).json(projects);
            } else {
                res.status(200).json({
                    message: "There arent any projects to show"
                });
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                message: "Error retrieving projects"
            });
        });
});

router.get('/:id', (req, res) => {
    Projects.get(req.params.id)
        .then((project) => {
            if (project) {
                res.status(200).json(project);
            } else {
                res.status(404).json({
                    message: "the project you are looking for does not exist"
                });
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                message: "there was an error retrieving your data"
            });
        });
});

router.post('/', (req, res) => {
    Projects.insert(req.body)
        .then((project) => {
            res.status(201).json(project);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                message: "there was an error adding your data"
            });
        });
});

router.put('/:id', (req, res) => {
    Projects.update(req.params.id, req.body)
        .then((project) => {
            if (project) {
                res.status(200).json(project);
            } else {
                res.status(404).json({
                    message: "the project you are trying to update does not exist"
                });
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                message: "there was an error updating your data"
            });
        });
});

router.delete('/:id', (req,res) => {
    Projects.remove(req.params.id)
        .then((project) => {
            if (project) {
                res.status(200);
            } else {
                res.status(404).json({
                    message: "the project you are trying to delete does not exist"
                });
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                message: "there was an error deleting your project"
            });
        });
});

router.get('/:id/actions', (req, res) => {
    Projects.getProjectActions(req.params.id)
        .then((actions) => {
            if (actions) {
                res.status(200).json(actions);
            } else {
                res.status(404).json({
                    message: "this project does not exist"
                });
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                message: "there was an error retrieving those actions"
            });
        });
});

module.exports = router;


