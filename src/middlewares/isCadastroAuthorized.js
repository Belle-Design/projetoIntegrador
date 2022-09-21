const isAuthorized = (request, response, next) => {
    if (!request.session.userLogged) {
        return next();
    }

    return response.redirect('/')
}

module.exports = isAuthorized;