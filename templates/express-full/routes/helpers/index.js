module.exports = {

    verifyAuthorized: asyncWrap(async (req, res, next) => {

        if (!req.user) {
            return res.redirect('/auth/login');
        } else {
            next();
        }
    }),

    verifyUnauthorized: asyncWrap(async (req, res, next) => {

        if (req.user) {
            //already logged in, send to dashboard
            return res.redirect('/user/dashboard');
        } else {
            next();
        }
    })
};
