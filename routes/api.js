const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const OAuth2Server = require('oauth2-server');

const oauth = new OAuth2Server({
    model: require('../models/model'), // Implement your model here
    grants: ['password', 'client_credentials'],
    debug: true
});


/**
 * @swagger
 * /api/oauth/token:
 *   post:
 *     summary: Get OAuth token
 *     description: Obtain an OAuth token using password or client credentials grant.
 *     tags:
 *       - OAuth
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               grant_type:
 *                 type: string
 *                 enum: [password, client_credentials]
 *               client_id:
 *                 type: string
 *               client_secret:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token obtained successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                 accessTokenExpiresAt:
 *                   type: string
 *                   format: date-time
 *                 client:
 *                   type: object
 *                 user:
 *                   type: object
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Internal server error
 */
router.post('/oauth/token', (req, res, next) => {
    const request = new OAuth2Server.Request(req);
    const response = new OAuth2Server.Response(res);

    oauth.token(request, response)
        .then((token) => {
            res.json(token);
        })
        .catch((err) => {
            res.status(err.code || 500).json(err);
        });
});

/**
 * @swagger
 * /api/validate-token:
 *   get:
 *     summary: Validate OAuth token
 *     description: Validates OAuth token.
 *     tags:
 *       - Secure
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: Bearer dummyAccessToken1
 *         description: Bearer token for authorization
 * 
 *     responses:
 *       200:
 *         description: Secure data accessed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 valid:
 *                   type: boolean
 *                   example: false
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 *     
 */
router.get('/validate-token', (req, res, next) => {
    const request = new OAuth2Server.Request(req);
    const response = new OAuth2Server.Response(res);

    console.log('Request headers:', req.headers);
    oauth.authenticate(request, response)
        .then((token) => {
            res.json({ valid: true, token });
        })
        .catch((err) => {
            res.status(err.code || 500).json(err);
        });
});


module.exports = router;