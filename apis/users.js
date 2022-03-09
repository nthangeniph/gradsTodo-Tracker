const express = require("express");
const dboperations = require("../routes/tasks");
const { nanoid } = require("nanoid");

const idLength = 8;

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - Email
 *         - Password
 *       properties:
 *         Id:
 *           type: string
 *           description: The auto-generated id of the user
 *         FirstName:
 *           type: string
 *           description: The firstName of the user
 *         LastName:
 *           type: string
 *           description: lastName of the user
 *         Email:
 *           type:string
 *           description:email of the user
 *         Password:
 *            type:string
 *            description:user's strong password
 *         UserType:
 *           type:string
 *           description:user's role
 *
 *
 *       example:
 *         Id: d5fE_asz
 *         Email: userName
 *         FirstName: Phumudzo
 *         LastName: Nthangeni
 *         UserType: Admin
 *         Password: 123qwe
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: users apis
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Returns the list of all the registered users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the registered users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

router.get("/", (req, res) => {
  dboperations.getAllTasks().then((result) => {
    res.status(200).json(result[0]);
  });
});
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: get the user based on id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user's id
 *     responses:
 *       200:
 *         description: The user description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The task was not found
 */

router.get("/:id", (req, res) => {
  dboperations.getTaskById(req.params.id).then((result) => {
    res.status(200).json(result[0]);
  });
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The task was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */

router.post("/", (req, res) => {
  let task = {
    Id: nanoid(idLength),
    Task: req.body.Task,
    Status: req.body.Status,
    Priority: req.body.Priority,
    IsDeleted: req.body.IsDeleted,
  };

  try {
    dboperations.createTask(task).then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    return res.status(500).send(error);
  }
});

/**
 * @swagger
 * /users/{id}:
 *  put:
 *    summary: Update the user by the id
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The user id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: The user was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      404:
 *        description: The user was not found
 *      500:
 *        description: Some error happened
 */

router.put("/:id", (req, res) => {
  let task = {
    Id: req.params.id,
    Task: req.body.Task,
    Status: req.body.Status,
    Priority: req.body.Priority,
    IsDeleted: req.body.IsDeleted,
  };
  try {
    dboperations.updateTask(task).then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    return res.status(500).send(error);
  }
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Remove the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *
 *     responses:
 *       200:
 *         description: The user was deleted
 *       404:
 *         description: The user was not found
 */

router.delete("/:id", (req, res) => {
  try {
    dboperations.deleteTask(req.params.id).then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
///dep[loy]
