const pool = require("../connections/db");


const getAllTasks = async(req, res) => {
    try {
        const [response] = await pool.query(`SELECT * FROM tasks`);
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send({message: "Internal server Error", error: error})
    }
}



const getTaskById = async(req, res) => {
    const {id} = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ?', [id]);
        res.status(200).send(rows);
    } catch (error) {
        res.status(500).send({message: "Internal server Error", error: error})
    }
}



const createTask = async(req, res) => {
    const {title, description} = req.body;
    try {
        const [result] = await pool.query('INSERT INTO tasks (title, description) VALUES (?, ?)', [title, description]);
        const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ?', [result.insertId]);
        res.status(201).send(rows[0]);
    } catch (error) {
        console.log(error)
        res.status(500).send({message: "Internal server Error", error: error})
    }
}



const updateTask = async(req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    
    try {
        const [result] = await pool.query(
            'UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?', 
            [title, description, completed, id]
        );
        console.log(result)

        if (result.affectedRows === 0){
            return res.status(404).send({message: "Task was not found !!"});
        }

        const [rows] = await pool.query("SELECT * FROM tasks WHERE id = ?", [id])
        return res.status(200).send(rows[0]) 
    } catch (error) {
        res.status(500).send({message: "Internal server Error", error: error})
    }
}



const deleteTaskById = async(req, res) => {
    const {id} = req.params;
    try {
        const [result] = await pool.query('DELETE FROM tasks WHERE id = ?', [id]); 
        
        if (result.affectedRows === 0) {
            return res.status(404).send({ message: "Task was not found !!" });
        }

        return res.status(200).json({ message: "Task Deleted Successfully !!" });
    } catch (error) {
        res.status(500).send({message: "Internal server Error", error: error})
    }
}


module.exports = {getAllTasks, getTaskById, createTask, updateTask, deleteTaskById}