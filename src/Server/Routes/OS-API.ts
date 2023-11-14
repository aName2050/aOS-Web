import express from 'express';

const router = express.Router();

router.get('/ping', (req, res) => {
    res.json({ message: `Pong!` }).status(200);
});

export default router;
