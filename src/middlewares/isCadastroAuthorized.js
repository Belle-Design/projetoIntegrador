const isAuthorized = (request, response, next) => {
    if (typeof(request.session.userLogged) != "undefined" ) {
        return next();
    }

    return response.redirect('/')
}

module.exports = isAuthorized;