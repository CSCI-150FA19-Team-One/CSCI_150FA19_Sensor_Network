const express = require('express');
const router = express.Router();


//Home directory, i.e Localhost:3000/
router.get('/', (req, res) => {
	res.send(200);
});

module.exports = router;