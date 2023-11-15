import express from 'express';

const router = express.Router();

router.get('/user/account/status', (req, res) => {
    console.log(req.cookies);

    res.status(200).json({ msg: 'processing...' });
});

export default router;
