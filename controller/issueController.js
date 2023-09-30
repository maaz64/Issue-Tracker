// importing Project and Issue Model
const Project = require('../Models/project');
const Issue = require('../Models/Issue');

// function to render the Home page
module.exports.home = async(req,res)=>{
    const projects = await Project.find({});
    return res.render('home',{
        title:'Issue Tracker | Home',
        projects
    })
}

// function to render the form to create project
module.exports.addProjectPage = (req,res)=>{
    return res.render('addProjectForm',{
        title:'Issue Tracker | Add Project'
    })
}

// function to create project
module.exports.createProject = async(req,res)=>{

    try {

        // destructuring project form data
        const {name, author, description} = req.body;

        // check for empty input
        if(!name || !author || !description){
            // console.log("Input can't be empty");
            return res.redirect('/issue-tracker/add-project');
        }

        // creating the project in database
        const createdProject = await Project.create({
            name,
            author,
            description
        })
    

        if(createdProject){
            // console.log('project added successfully ', createdProject);
            return res.redirect('/')
        }
        
    } catch (error) {
        // console.log('something went wrong while creating project ', error)
        res.redirect('/issue-tracker/add-project');
    }
}

// function to render issues related to a project
module.exports.projectIssue = async(req,res)=>{

    // destructuring id from params
    const {id} = req.params;

    // populating the issues realted to the project with the project id
    const project = await Project.findById(id).
        populate({
            path:'issues'
        }).
        exec();

    const issues = project.issues; 

    // rendering the page and passing the required data
    return res.render('projectIssues',{
        title:'Issue Tracker | Project Issue',
        id,
        issues,
        project_name : project.name,
    })
}

// function to render the form to create Issue
module.exports.createIssuePage=(req,res)=>{
    const {id} = req.params;
    res.render('addIssueForm',{
        title:'Issue Tracker | Create Issue',
        id,
    })
}

// function to create issue related to a project
module.exports.createIssue = async(req,res)=>{
    try {

        // destructuring issue form data
        const {title,author, description, bugs, UI, documentation, other} = req.body;

        // destructuring project id from params
        const {id} = req.params;

        // check for empty input
        if(!title || !author || !description){
            // console.log("Input can't be empty");
            return res.redirect('back');
        }
        
        // creating labels array
        let labelInput = [bugs,UI,documentation,other];

        // filtering out the checked labels
        let label = labelInput.filter((inp)=>inp!=null);
    
        // creating the issue in database
        const createdIssue = await Issue.create({
            title,
            author,
            description,
            label
        });
        
        // finding the project that has above created issue and adding it in its issues array in database 
        const projectToBeUpdated = await Project.findById(id);
        let issues = [...projectToBeUpdated.issues, createdIssue._id];
        const updatedProject = await Project.findByIdAndUpdate(id,{issues},{new:true});
        // console.log('Issue created successfully');
        return res.redirect(`/issue-tracker/project-issues/${id}`);
        // return res.redirect(`back`);
        
    } catch (error) {
        // console.log('something went wrong while creating Issue ', error);
        return res.redirect(`back`);    
    }

}

// function to filter the issue based on the its cateogry
module.exports.filterIssue = async(req,res)=>{
    
    // destructuring the body
    const {search_input, category} = req.body;
    // destructuring the params
    const {id} = req.params;
    
    // populating the project so that we can get all the issue details realted the project
    const project = await Project.findById(id).
    populate({
        path:'issues'
    }).
    exec();


    let issues = project.issues;

    // filtering the issue based on title of issue if their is no category
    if(!category){
        const filteredIssues = issues.filter((issue)=>issue.title.toLowerCase().includes(search_input.toLowerCase()));
        return res.render('projectIssues',{
            title:'Issue Tracker |Filtered Issue',
            id,
            issues:filteredIssues,
            project_name : project.name,
        })
    }

    // filtering the issue based on the category and search input
    const filteredIssues = issues.filter((issue)=>issue[category].toLowerCase().includes(search_input.toLowerCase()));
    return res.render('projectIssues',{
        title:'Issue Tracker |Filtered Issue',
        id,
        issues:filteredIssues,
        project_name : project.name,
    })
}

