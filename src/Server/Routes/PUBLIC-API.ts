import express from 'express';

const router = express.Router();

// v1
router.get('/v1', (req, res) => {
    res.status(400).json({
        msg: "/api/v1 is not a valid endpoint. Try '/api/ping' to test your connection!",
    });
});

// v2
router.get('/v2', (req, res) => {
    res.status(503).json({ msg: 'aOS Web API v2 is not available yet' });
});

export default router;
