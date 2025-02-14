const {Router } = require("express");
const Authntication  = require("../middleware/isAuthnticated")
const { sendMessege, getMessage, getAllMessege } = require("../controller/messege.controller");
const messgeRouter = Router();
messgeRouter.use(Authntication)
messgeRouter.post('/sendmessege/:id',sendMessege);
messgeRouter.get('/allmessage',getAllMessege);
messgeRouter.get('/:id',getMessage);

module.exports = messgeRouter;