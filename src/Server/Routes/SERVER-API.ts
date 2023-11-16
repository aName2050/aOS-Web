import express from 'express';

const router = express.Router();

router.get('/user/account/status', (req, res) => {
    res.status(200).send(req.cookies);
});

router.get('/user/preferences/cookies', (req, res) => {});

export default router;
