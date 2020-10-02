const router = require('express').Router();
const noteRoutes = require('../routes/noteRoutes');

router.use(noteRoutes);

module.exports = router;