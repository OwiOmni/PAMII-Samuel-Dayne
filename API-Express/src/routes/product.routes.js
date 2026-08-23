const { Router } = require("express");
const controller = require("../controllers/product.controller");

const router = Router();

router.get("/product", controller.findAll);       // 200
router.get("/product/:id", controller.findById);  // 200 | 404
router.post("/product", controller.create);       // 201 | 400
router.put("/product/:id", controller.replace);   // 200 | 400 | 404
router.patch("/product/:id", controller.update);  // 200 | 400 | 404
router.delete("/product/:id", controller.remove); // 204 | 404

module.exports = router;