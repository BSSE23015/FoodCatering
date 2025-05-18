import express from "express";
import{
  createDish,
  getAllDishes,
  getDishById,
  updateDish,
  deleteDish,
}from "../controllers/foodController.js";

const router = express.Router();

router.route("/").get(getAllDishes).post(createDish);

router.route("/:id").get(getDishById).put(updateDish).delete(deleteDish);

export default router;
