// Define schemas as JavaScript objects
const OAuthTokensSchema = {
    accessToken: '',
    accessTokenExpiresAt: null,
    client: '',
    user: ''
};

const OAuthClientsSchema = {
    clientId: '',
    clientSecret: '',
    grants: []
};

const OAuthUsersSchema = {
    username: '',
    password: ''
};

// Create arrays to store the data
const OAuthTokens = [
    {
        accessToken: 'dummyAccessToken1',
        accessTokenExpiresAt: new Date(Date.now() + 1000 * 60 * 60), // 1 hour from now
        client: 'dummyClient1',
        user: 'dummyUser1'
    },
    {
        accessToken: 'dummyAccessToken2',
        accessTokenExpiresAt: new Date(Date.now() + 1000 * 60 * 60 * 2), // 2 hours from now
        client: 'dummyClient2',
        user: 'dummyUser2'
    }
];

const OAuthClients = [
    {
        clientId: 'dummyClient1',
        clientSecret: 'dummySecret1',
        grants: ['password', 'client_credentials']
    },
    {
        clientId: 'dummyClient2',
        clientSecret: 'dummySecret2',
        grants: ['password', 'client_credentials']
    }
];

const OAuthUsers = [
    {
        username: 'dummyUser1',
        password: 'dummyPassword1'
    },
    {
        username: 'dummyUser2',
        password: 'dummyPassword2'
    }
];

// Implement the methods
module.exports = {
    getAccessToken: (token) => {
        console.log(`Searching for token: ${token}`);
        const foundToken = OAuthTokens.find(t => t.accessToken === token);
        console.log(`Found token: ${JSON.stringify(foundToken)}`);
        return foundToken;
    },
    getClient: (clientId, clientSecret) => {
        return OAuthClients.find(c => c.clientId === clientId && c.clientSecret === clientSecret);
    },
    getUser: (username, password) => {
        return OAuthUsers.find(u => u.username === username && u.password === password);
    },
    getUserFromClient: (client) => {
        return OAuthClients.find(c => c.clientId === client.clientId);
    },
    saveToken: (token, client, user) => {
        const accessToken = {
            accessToken: token.accessToken,
            accessTokenExpiresAt: token.accessTokenExpiresAt,
            client: client,
            user: user
        };
        OAuthTokens.push(accessToken);
        console.log('Token saved: ', accessToken);
        console.log('All tokens: ', OAuthTokens);
        return accessToken;
    }
};
