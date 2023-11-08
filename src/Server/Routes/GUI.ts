import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.sendStatus(403);
});

export default router;
