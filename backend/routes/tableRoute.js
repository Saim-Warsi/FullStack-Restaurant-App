import express from "express"
import { addTables, deleteTable, listTables, updateTableStatus } from "../controllers/tableController.js";
const tableRouter = express.Router();


//route for adding new tables
tableRouter.post('/add',addTables)

// route for listing all tables
tableRouter.get('/list',listTables)

// route for deleting table
tableRouter.post('/delete',deleteTable)

// route for updating table status
tableRouter.post('/updatestatus',updateTableStatus)


export default tableRouter