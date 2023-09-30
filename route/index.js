// importing required modules and files
const express = require('express');
const router = express.Router();
const issueTrackerPath = require('./issueTracker')

// importing issue controller
const {home} = require('../controller/issueController');

// routes to get home page
router.get('/',home)

router.use('/issue-tracker', issueTrackerPath)

// exporting the router
module.exports = router;