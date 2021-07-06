import { Octokit } from '@octokit/rest';
import { createAppAuth } from '@octokit/auth-app';

import { readFileToString, initGithubMiddleware } from '../helpers';

export const githubApp = (): Octokit => {
    // Initialize Github app connection
    const app = new Octokit({
        authStrategy: createAppAuth,
        auth: {
            type: 'app',
            appId: process.env.GITHUB_APP_ID,
            privateKey: readFileToString(
                process.env.GITHUB_PRIVATE_KEY as string
            ),
            installationId: process.env.GITHUB_INSTALLATION_ID,
        },
    });

    initGithubMiddleware(app);

    return app;
};
