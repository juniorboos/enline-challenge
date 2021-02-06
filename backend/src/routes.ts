import express from "express";

// import PointsCrontroller from './controllers/PointsController';
import MathController from "./controllers/MathController";

const routes = express.Router();
const mathController = new MathController();
// const itemsController = new ItemsController();

// routes.get('/items', itemsController.index);

routes.post("/resolve", mathController.create);
// routes.get('/points', pointsController.index);
// routes.get('/points/:id', pointsController.show);

export default routes;
