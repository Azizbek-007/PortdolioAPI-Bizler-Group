const { project, category } = require('../models/')

exports.create = async ( req, res ) => {
    await project.create({
        name: req.body.name,
        category_id: req.body.category_id,
        image: req.file.filename,
        link: req.body.link
    }).then(newProject => {
        return res.status(201).json({
            success: true,
            message: 'Project created',
            data: newProject
        })
    }).catch(err => {
        return res.status(400).json({
            success: false,
            message: 'Project not created',
            error: err.parent.sqlMessage
        })
    })
}

exports.getAll = ( req, res ) => {
    project.findAll()
    .then(projects => {
        if (projects.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No projects found'
            })
        }
        let data = []
        projects.forEach(project => {
            category.findOne({
                attributes: ['id', 'name'],
                where: {
                    id: project.category_id
                }
            }).then(Cat => {
                console.log(Cat.dataValues)
                console.log(project.id)
                data.push({
                    id: project.id,
                    name: project.name,
                    category: Cat.dataValues,
                    image: project.image,
                    link: project.link 
                })
            })
            
        })
        setTimeout(() => {
            return res.status(200).json({
                success: true,
                message: 'Projects found',
                data: data
            })
        }, 30)
    
    })
}

exports.all = async ( req, res ) => {
    const projects = await project.findAll()
    if (projects.length === 0) {
        return res.status(400).json({
            success: false,
            message: 'No projects found'
        })
    }
    return res.status(200).json({
        success: true,
        message: 'Projects found',
        data: projects
    })
}

exports.destroy = async ( req, res ) => {
    findProject = await project.findOne({
        where: {
            id: req.params.id
        }
    })
    if (!findProject) {
        return res.status(400).json({
            success: false,
            message: 'Project not found'
        })
    }
    await findProject.destroy()
    res.status(200).json({
        success: true,
        message: 'Project deleted'
    })
}
