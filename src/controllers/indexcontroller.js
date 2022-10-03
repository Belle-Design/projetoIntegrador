const indexcontroller = {
    index: (request, response) => {
        response.render ('index.ejs');
    }
}

module.exports = indexcontroller;