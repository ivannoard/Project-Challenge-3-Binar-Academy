const express = require('express');
const routes = express();
const bodyParser = require('body-parser')

// body parser
routes.use(bodyParser.urlencoded({ extended: false }))

// setting ejs
routes.use(express.static('public'))
routes.set('views', './src/views')
routes.set('view engine', 'ejs')

// setting controller
const dashboard_controller = require('./controllers/DashboardController')

routes.get('/', (req, res) => {
  res.redirect('/login')
})

routes.get('/login', dashboard_controller.login)
routes.post('/login', dashboard_controller.dashboard)

routes.get('/dashboard', dashboard_controller.index)

routes.get('/list-cars', dashboard_controller.lists)
// crud
// add
routes.get('/create-car', dashboard_controller.create) // go to form create
routes.post('/create-car', dashboard_controller.save) // post data
// edit
routes.get('/edit-car/:id', dashboard_controller.edit) // go to form edit
routes.post('/edit-car/:id', dashboard_controller.update) // go to form edit
routes.get('/delete-car/:id', dashboard_controller.delete)

module.exports = routes