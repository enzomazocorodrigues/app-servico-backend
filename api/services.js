const { validate } = require('uuid')

module.exports = app => {
  const { syncObject, syncChildObject, getParent } = app.api.sync;
  const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation;

  /// GET
	const get = (req, res) => {
		const search = req.params.search == "*" ? "" : req.params.search;
		const id = validate(search) ? search : null

		app.db('services')
			.select('id', 'idStatus', 'susp', 'description', 'duration', 'price')
			.where(function () {
					this.where('name', 'ilike', `%${search}%`)
					.orWhere('id', id);
			})
			.andWhere('idStatus', '!=', 0)
			.orderBy('name', 'asc')
			.then(services => res.status(200).send([...services]))
			.then(err => res.status(400).send(err))
			// .offset()
			// .limit();
	}

  /// GETBYID
	const fnGetById = async id => {
		try {
			existsOrError(validate(id), 'ID inválido')

			const service = await app.db('services')
			.where({ id })
			.first()

			const result = {
				service
			}

			return result
		} catch(err) {
			return err
		}
	}

  const fnSave = async service => {
		try {
			existsOrError(service.service.idStatus, 'Estado não informado.')
			existsOrError(service.service.description, 'Descrição não informada.')
			existsOrError(service.service.duration, 'Duração não informada.')
			existsOrError(service.service.price, 'Preço não informado.')


			service.service.id = await syncObject(service.service.id, service.service, 19)

      // app.cache.set(`services:${service.id}`, service)

			return service
    } catch(err) {
      throw err
    }
  }

	const getById = async (req, res) => {
		const id = req.params.id
		try {
			// app.cache.get(`products:${id}`)
			// 	.then(async product => {
			// 		if (product) {
			// 			res.status(200).send(product)
			// 		} else {
			// 			product = await fnGetById(id)
			// 			app.cache.set(`products:${id}`, product)
			// 			res.status(200).send(product)
			// 		}
			// 	})
				const service = await fnGetById(id)
				res.status(200).json(service)
		} catch(err) {
			res.status(500).send(err)
		}
	}

	const save = async (req, res) => {
		const service = { ...req.body }
		try {
			const ret = await fnSave(service)
			res.status(200).send(ret)
		} catch(err) {
			console.log(err)
			res.status(500).send(err)
		}
	}

	/// REMOVE
	const remove = async (req, res) => {
		const id = req.params.id

		try {
			const { idStatus } = await app.db('services')
			.select('idStatus')
			.where({ id })
			.first()

			equalsOrError(idStatus == 1 ? 0 : idStatus, 0, 'Serviço não pode ser deletado.')

			await syncObject(id, null, 11)

			const { idStatus: idNewStatus } = await app.db('services')
				.select('idStatus')
				.where({ id })
				.first()

			res.status(200).send(idNewStatus)
		} catch(err) {
			res.status(400).send(err)
		}
  }

  return { fnGetById, fnSave, get, getById, save, remove }
}