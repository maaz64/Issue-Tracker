const Project = require('../Models/project');
const Issue = require('../Models/Issue');

module.exports.home = async(req,res)=>{
    const projects = await Project.find({});
    return res.render('home',{
        title:'Issue Tracker | Home',
        projects
    })
}

module.exports.addProjectPage = (req,res)=>{
    return res.render('addProjectForm',{
        title:'Issue Tracker | Add Project'
    })
}

module.exports.createProject = async(req,res)=>{

    try {
        const {name, author, description} = req.body;
        console.log(name + "  " + author + "  " + description);

        if(!name || !author || !description){
            console.log("Input can't be empty");
            return res.redirect('/issue-tracker/add-project');
        }

        const createdProject = await Project.create({
            name,
            author,
            description
        })
    

        if(createdProject){
            console.log('project added successfully ', createdProject)
            return res.redirect('/')
        }
        
    } catch (error) {
        console.log('something went wrong while creating project ', error)
        res.redirect('/issue-tracker/add-project');
    }
}

module.exports.projectIssue = async(req,res)=>{
    const {id} = req.params;
    const project = await Project.findById(id).
        populate({
            path:'issues'
        }).
        exec();

    const issues = project.issues; 
    return res.render('projectIssues',{
        title:'Issue Tracker | Project Issue',
        id,
        issues,
        project_name : project.name,
    })
}

module.exports.createIssuePage=(req,res)=>{
    const {id} = req.params;
    res.render('addIssueForm',{
        title:'Issue Tracker | Create Issue',
        id,
    })
}

module.exports.createIssue = async(req,res)=>{
    try {
        const {title,author, description, bugs, UI, documentation, other} = req.body;
        const {id} = req.params;
        console.log('bugs ',bugs);
        console.log('UI ',UI);
        console.log('documentation ',documentation);
        console.log('other ',other);
        console.log(req.body);
        if(!title || !author || !description){
            return res.redirect('back');
        }
    
        let labelInput = [bugs,UI,documentation,other];
        let label = labelInput.filter((inp)=>inp!=null);
        console.log(label);
    
    
        const createdIssue = await Issue.create({
            title,
            author,
            description,
            label
        });
    
        const projectToBeUpdated = await Project.findById(id);
        console.log('ProjectToBeUpdated ',projectToBeUpdated);
        let issues = [...projectToBeUpdated.issues, createdIssue._id];
        console.log("Issue array in the project",issues);
        const updatedProject = await Project.findByIdAndUpdate(id,{issues},{new:true});
        console.log('updatedProject ',updatedProject);
        // return res.redirect(`/issue-tracker/create-issue/${id}`);
        return res.redirect(`back`);
        
    } catch (error) {
        return res.redirect(`back`);
        
    }

}

