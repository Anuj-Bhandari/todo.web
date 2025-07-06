 
const {Router} = require('express');

const todoRouter = Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {z} = require('zod');

const {auth} = require('./auth');

const secretkey = process.env.SECRET_KEY;

const {todoModel} = require('../db');

todoRouter.post('/add', auth , async (req, res) => {
 
    const requireBody = z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        status: z.string()
    });

    const parsedata = requireBody.safeParse(req.body);

    if (!parsedata.success) {
        return res.json({
            message: "Incorrect data",
            error: parsedata.error
        });
    }

    const {title, description, status} = req.body;

    try {

        await todoModel.create({
            title,
            description,
            status,
            userId: req.user.id
        });
    } catch (error) {
            console.error("Error adding todo:", error); 
        return res.status(400).json({
            message: "Error adding todo",
        });
    }

    res.status(201).json({
        message: "Todo added successfully"
    });
})

    todoRouter.put('/update/:id', auth, async (req, res) => {

        const requireBody = z.object({
            title: z.string().min(1).optional(),
            description: z.string().min(1).optional(),
            status: z.string()
        });

        const parsedata = requireBody.safeParse(req.body);

        if (!parsedata.success) {
            return res.json({
                message: "Incorrect data",
                error: parsedata.error
            });
        }

        const {title, description, status} = req.body;

        try {
            const todo = await todoModel.findById(req.params.id);
            if (!todo || todo.userId.toString() !== req.user.id) {
                return res.status(404).json({message: "Todo not found"});
            }

            if (title) todo.title = title;
            if (description) todo.description = description;
            if (status) todo.status = status;

            await todo.save();
        } catch (error) {
            return res.status(400).json({
                message: "Error updating todo",
            });
        }

        res.status(200).json({
            message: "Todo updated successfully"
        });
    })

todoRouter.delete('/delete/:id', auth, async (req, res) => {

    try {
        const todo = await todoModel.findById(req.params.id);
        if (!todo || todo.userId.toString() !== req.user.id) {
            return res.status(404).json({message: "Todo not found"});
        }

        await todoModel.findByIdAndDelete(req.params.id);
    } catch (error) {
        return res.status(400).json({
            message: "Error deleting todo",
        });
    }

    res.status(200).json({
        message: "Todo deleted successfully"
    });
})

module.exports= {
    todoRouter
}