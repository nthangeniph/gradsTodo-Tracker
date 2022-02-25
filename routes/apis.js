const express = require("express");
const dboperations = require("./tasks");
const { nanoid } = require("nanoid");

const idLength = 8;

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - Task
 *         - Priority
 *       properties:
 *         Id:
 *           type: string
 *           description: The auto-generated id of the task
 *         Task:
 *           type: string
 *           description: The task title
 *         Status:
 *           type: int
 *           description: progress of the task
 *         Priority:
 *           type:int
 *           description:level of urgency
 *         IsDeleted:
 *            type:int
 *            description:check if soft deleted
 *
 *       example:
 *         Id: d5fE_asz
 *         Task: azure labs new todo on the list
 *         Priority: 1
 *         Status: 3
 *         IsDeleted: 0
 */

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Todo List Tracker Api
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Returns the list of all the Activities
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: The list of the activities
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */

router.get("/", (req, res) => {
  dboperations.getAllTasks().then((result) => {
    res.status(200).json(result[0]);
  });
});
/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: get the task based on id
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The task id
 *     responses:
 *       200:
 *         description: The task description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
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
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: The task was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
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
 * /tasks/{id}:
 *  put:
 *    summary: Update the task by the id
 *    tags: [Tasks]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The task id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Task'
 *    responses:
 *      200:
 *        description: The task was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Task'
 *      404:
 *        description: The task was not found
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
 * /tasks/{id}:
 *   delete:
 *     summary: Remove the task by id
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The task id
 *
 *     responses:
 *       200:
 *         description: The task was deleted
 *       404:
 *         description: The task was not found
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
