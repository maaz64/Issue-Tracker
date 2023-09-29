const express = require('express');
const router = express.Router();
const issueTrackerPath = require('./issueTracker')

const {home} = require('../controller/issueController');

router.get('/',home)
router.use('/issue-tracker', issueTrackerPath)

module.exports = router;