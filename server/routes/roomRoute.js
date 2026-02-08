import { getRooms,createRoom } from "../controllers/roomController.js";
import express from 'express'

const router = express.Router()

router.get('/getrooms',getRooms)
router.post('/createroom',createRoom)

export default router