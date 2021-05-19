const { v4: uuid } = require('uuid')

module.exports = app => {
  const { existsOrError } = app.api.validation;

	/// SAVEITEMS
	const saveItem = async item => {
		try {
			existsOrError(item.idProduct, 'Produto não informado.')

			if (item.id) {
				return await app.db('orders_items')
					.update({ ...item })
					.where({ id: item.id })
					.returning('*')
			} else {
				item.id = uuid()
				return await app.db('orders_items')
					.insert({ ...item })
					.returning('*')
			}
		} catch(err) {
			return err
		}
	}

  /// GET
	const get = (req, res) => {
		app.db({ a: 'orders' })
			.leftOuterJoin({ b: 'people' }, 'a.idPerson', 'b.id')
			.select('a.id', 'a.susp', 'b.name  as person', 'a.date')
			.where('a.deletedAt', null)
			.then(orders => res.status(200).json(orders))
			.catch(err => res.status(500).send(err))
	}

  /// GETBYID
	const getById = async (req, res) => {
		const id = req.params.id
		try {
			const order = await	app.db('orders')
				.select()
				.where({ id })
				.first()
	
			const items = await	app.db({ a: 'orders_items' })
				.leftOuterJoin({ b: 'services' }, 'a.idService', 'b.id')
				.select('a.id', 'a.susp', 'a.idService', 'b.description')
				.where({ idOrder: id })
	
			order.items = [...items]

			res.status(200).json(order)
		} catch(err) {
			res.status(500).send(err)
		}
	}

  /// SAVE
  const save = async (req, res) => {
    let order = { ...req.body }
		
    try {
			existsOrError(order.idUser, 'Usuário não informado.')
      existsOrError(order.items, 'Itens não informados.')

			const items = order.items
			delete order.items

			if (order.id) {
				order = await app.db('orders')
					.update({ ...order })
					.where({ id: order.id })
					.returning(['id', 'susp', 'date', 'idUser'])
			} else {
				order.id = uuid()
				order = await app.db('orders')
					.insert({ ...order })
					.returning(['id', 'susp', 'date', 'idUser'])
			}

			items.forEach(async item => {
				item.idOrder = order[0].id
				return await saveItem(item)
			})
			
			order = {
				...order[0],
				items
			}

			app.cache.set(`orders:${order.id}`, order)
			res.status(200).json(order)
    } catch(err) {
      res.status(400).send(err)
    }
  }

	/// REMOVE
	const remove = async (req, res) => {
		const id = req.params.id
		app.db('orders')
			.update({ deletedAt: new Date().toISOString() })
			.where({ id })
			.then(() => {
				app.cache.del(`orders:${id}`)
				app.db('orders_items')
					.where({ idOrder: id })
					.del()
					.then(() => {
						res.status(200).send()
					})
					.catch(err => res.status(400).send(err))
			})
			.catch(err => res.status(400).send(err))

  }

  return { get, getById, save, remove }
}