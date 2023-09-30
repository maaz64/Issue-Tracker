// importing required modules and files
const express = require('express');
const {addProjectPage, createProject,projectIssue,createIssuePage,createIssue,filterIssue} = require('../controller/issueController');
const router = express.Router();


// creating get routes 
router.get('/add-project', addProjectPage);
router.get('/create-issue/:id', createIssuePage);
router.get('/project-issues/:id',projectIssue);

// creating post routes for creating project and creating issue
router.post('/create-project',createProject);
router.post('/create-issue/:id',createIssue);
router.post('/project-issues/:id/filter',filterIssue);

// exporting the router
module.exports = router;