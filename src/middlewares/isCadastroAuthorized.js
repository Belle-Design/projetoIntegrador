const isAuthorized = (request, response, next) => {
    if (request.session.isAuthorized) {
        return next();
    }

    return response.redirect('/')
}

module.exports = isAuthorized;