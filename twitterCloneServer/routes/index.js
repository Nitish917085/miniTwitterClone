const { userRegistration, userLogin } = require("../controllers/user");

const router = require("express").Router();

router.post('/userRegistration',userRegistration)
router.post('/userLogin',userLogin)


module.exports = router;
