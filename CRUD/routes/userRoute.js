import express from "express";
import { create, deleteUser, fetch, update } from "../controller/userController.js";


const route = express.Router();

route.get("/fetch", fetch)   // route to get all users from mongodb database
route.post("/create", create);  // route to create a new user
route.put("/update/:id", update)  // route to update a specific user by id
// route.delete("/delete/:id", deleteUser); // route to delete a user from database
route.delete("/delete/:name", deleteUser); // route to delete a user from database based on name

export default route;