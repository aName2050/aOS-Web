import express from 'express';

const router = express.Router();

router.get('/user/account/status', (req, res) => {
    console.log(req.session);

    res.status(200).json({ msg: 'processing...' });
});

export default router;
