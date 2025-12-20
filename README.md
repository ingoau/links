# links
a minimal, no bs, link shortener for your domain, that shortens links and nothing more

written in next.js, uses auth.js to log in with github, which is by far the best social login, and links are stored in redis for fast retrieval

## usage
1. set up an oauth app with github. set the redirect url to `yourdomain.com/api/auth/callback/github`

2. set the following env vars

`AUTH_GITHUB_ID` - your github client id

`AUTH_GITHUB_SECRET` - your github client secret

`ALLOWED_EMAIL` - your github email

`BASE_REDIRECT_URL` - where to redirect when no link is provided. you don't need to do this if you want it to redirect to the admin page

`AUTH_SECRET` - generate this with `openssl rand -hex 32`

`REDIS_URL` - url of a redis instance

3. deploy somewhere like vercel
