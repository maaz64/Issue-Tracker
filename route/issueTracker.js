const express = require('express');
const {addProjectPage, createProject,projectIssue,createIssuePage,createIssue} = require('../controller/issueController');
const router = express.Router();

router.get('/add-project', addProjectPage);
router.post('/create-project',createProject);
router.get('/create-issue/:id', createIssuePage);
router.post('/create-issue/:id',createIssue);
router.get('/project-issues/:id',projectIssue);
// router.get('/', issueTrackerPage)
// router.get('/createProject', createProject)
// router.post('/addProject',addProjectToMongoDB)
// router.get('/projectDetails', projectDetails)
// router.post('/filterProjectDetails', filterProjectDetails)
// router.get('/createAnIssue/:id', createAnIssue)
// router.post('/createAnIssue/:id/addIssue', addAnIssue)

module.exports = router;