const { category } = require('../models/')

exports.create = async (req, res) => {
    const newCategory = await category.create({
        name: req.body.name
    })
    if (!newCategory) {
        return res.status(400).json({
            success: false,
            message: 'Category not created'
        })
    }
    return res.status(201).json({
        success: true,
        message: 'Category created',
        data: newCategory
    })
}

exports.getAll = async (req, res) => {
    const categories = await category.findAll({
        attributes: ['id', 'name']
    })
    if (categories.length === 0) {
        return res.status(400).json({
            success: false,
            message: 'No categories found'
        })
    }
    return res.status(200).json({
        success: true,
        message: 'Categories found',
        data: categories
    })
}
exports.destroy = async (req, res) => {
    const Category = await category.findOne({
        where: {
            id: req.params.id
        }
    })
    if (!Category) {
        return res.status(400).json({
            success: false,
            message: 'Category not found'
        })
    }
    await Category.destroy()
    res.status(200).json({
        success: true,
        message: 'Category deleted'
    })
}