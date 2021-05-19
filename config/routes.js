module.exports = app => {
	app.route('/signin')
		.post(app.api.auth.signin)

	app.route('/signup')
		.post(app.api.auth.signup)

		
	app.route('/people')
		.all(app.config.passport.authenticate())
		.post(app.api.people.save)

	app.route('/people/:search/:idFilter')
		.all(app.config.passport.authenticate())
		.get(app.api.people.get)

	app.route('/people/:id')
		.all(app.config.passport.authenticate())
		.get(app.api.people.getById)
		.delete(app.api.people.remove)

	app.route('/products')
		.all(app.config.passport.authenticate())
		.post(app.api.product.save)

	app.route('/products/:search/:idFilter')
		.all(app.config.passport.authenticate())
		.get(app.api.product.get)

	app.route('/products/:id')
		.all(app.config.passport.authenticate())
		.get(app.api.product.getById)
		.delete(app.api.product.remove)
		
	// app.route('/products')
	// 	.all(app.config.passport.authenticate())
	// 	.get(app.api.product.get)
	// 	.post(app.api.product.save)

	// app.route('/products/:id')
	// 	.all(app.config.passport.authenticate())
	// 	.get(app.api.product.getById)
	// 	.delete(app.api.product.remove)

	// app.route('/orders')
	// 	.all(app.config.passport.authenticate())
	// 	.get(app.api.order.get)
	// 	.post(app.api.order.save)

	// app.route('/orders/:id')
	// 	.all(app.config.passport.authenticate())
	// 	.get(app.api.order.getById)
	// 	.delete(app.api.order.remove)

}