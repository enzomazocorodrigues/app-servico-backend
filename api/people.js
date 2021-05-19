const { validate } = require('uuid')

module.exports = app => {
  const { syncObject, syncChildObject } = app.api.sync;
  const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation;

  /// GET
	const get = (req, res) => {
		const search = req.params.search == "*" ? "" : req.params.search;
		const id = validate(search) ? search : null

		app.db({ a: 'people' })
			.leftOuterJoin({ b: 'people_adresses' }, 'a.id', 'b.idParent')
			.leftOuterJoin({ c: 'people_documents' }, 'a.id', 'c.idParent')
			.leftOuterJoin({ d: 'people_telephones' }, 'a.id', 'd.idParent')
			.leftOuterJoin({ e: 'people_urls' }, 'a.id', 'e.idParent')
			.select('a.id', 'a.idStatus', 'a.susp', 'a.idType', 'a.name', 'a.altName', 'a.birthDate', 'a.idGender', 'a.observations')
			.where(function () {
				// this.whereRaw('unaccent(a.name) ilike unaccent(?)', [`%${search}%`])
					// .orWhereRaw('unaccent(a."altName") ilike unaccent(?)', [`%${search}%`])
					// .orWhereRaw('unaccent(b.district) ilike unaccent(?)', [`%${search}%`])
					// .orWhereRaw('unaccent(b.address) ilike unaccent(?)', [`%${search}%`])
					// .orWhere('b.cep', 'ilike', `%${search}%`)
					this.where('b.district', 'ilike', `%${search}%`)
					.orWhere('b.number', 'ilike', `%${search}%`)
					.orWhere('c.number', 'ilike', `%${search}%`)
					.orWhere('d.number', 'ilike', `%${search}%`)
					.orWhere('e.url', 'ilike', `%${search}%`)
					.orWhere('a.id', id);
			})
			.andWhere('a.idStatus', '!=', 0)
			.orderBy('a.name', 'asc')
			.then(people => res.status(200).send([...people]))
			.then(err => res.status(400).send(err))
			// .offset()
			// .limit();
	}

  /// GETBYID
	const fnGetById = async id => {
		try {
			existsOrError(validate(id), 'ID inválido')

			const person = await app.db('people')
			.where({ id })
			.first()

			const adresses = await app.db('people_adresses')
			.where({ idParent: id })
			.orderBy([{ column: 'default', order: 'desc' }, { column: 'id', order: 'asc' }])
			
			const documents = await app.db('people_documents')
			.where({ idParent: id })
			.orderBy([{ column: 'idType', order: 'asc' }, { column: 'id', order: 'asc' }])

			const telephones = await app.db('people_telephones')
			.where({ idParent: id })
			.orderBy('id', 'asc')

			const roles = await app.db('people_roles')
			.where({ idParent: id })
			.orderBy('id', 'asc')

			const urls = await app.db('people_urls')
			.where({ idParent: id })
			.orderBy([{ column: 'idType', order: 'asc' }, { column: 'id', order: 'asc' }])

			const result = {
				person,
				adresses: adresses || [],
				telephones: telephones || [],
				documents: documents || [],
				roles: roles || [],
				urls: urls || []
			}

			return { ...result }
		} catch(err) {
			return err
		}
	}

  const fnSave = async person => {
    try {
			existsOrError(person.person.idStatus, 'Estado não informado.')
			existsOrError(person.person.idType, 'Tipo de pessoa não informado.')
			existsOrError(person.person.name, 'Nome não informado.')
			existsOrError(
				person.urls 
				&& person.urls.find(url => url.idType == 71)
				&& person.urls.find(url => url.idType == 71).url,
				'Email não informado.'
			)

			const registeredEmail = await app.db('people_urls')
				.where({ url: person.urls.find(url => url.idType == 71).url })
				.andWhere(function () {
					!person.person.id || this.andWhere('idParent', '!=', person.person.id)
				})
				.first()

			notExistsOrError(registeredEmail, 'Email já cadastrado.')

			if (person.documents) {
				person.documents.forEach(async document => {
					const registeredDocument = await app.db('people_documents')
						.where({ number: document.number })
						.andWhere(function () {
							!person.person.id || this.andWhere('idParent', '!=', person.id)
						})
						.first()
		
					notExistsOrError(registeredDocument, 'Documento já cadastrado.')
				});
			}

			person.person.id = await syncObject(person.person.id, person.person, 6)

			if (person.adresses) {
				person.address.forEach(async address => {
					existsOrError(address.idType, 'Tipo de endereço não informado.')
					existsOrError(address.country, 'Pais não informado.')
					existsOrError(address.zipcode, 'CEP não informado.')
					existsOrError(address.city, 'Cidade não informada.')
					existsOrError(address.address, 'Endereço não informado.')
					
					await syncChildObject(person.person.id, address, 7)
				})
			} 
			if (person.documents) {
				person.documents.forEach(async document => {
					existsOrError(document.idType, 'Tipo de documento não informado.')
					existsOrError(document.number, 'Número não informado.')

					await syncChildObject(person.person.id, document, 8)
				})
			}
			if (person.telephones) {
				person.telephones.forEach(async telephone => {
					existsOrError(telephone.idType, 'Tipo de telefone não informado.')
					existsOrError(telephone.number, 'Número não informado.')
					
					await syncChildObject(person.person.id, telephone, 9)
				})
			}
			if (person.roles) {
				person.roles.forEach(async role => {
					existsOrError(role.idRole, 'Função não informado.')

					await syncChildObject(person.person.id, role, 10)
				})
			}
			if (person.urls) {
				person.urls.forEach(async url => {
					existsOrError(url.idType, 'Tipo de URL não informado.')
					existsOrError(url.url, 'URL não informada.')

					await syncChildObject(person.person.id, url, 11)
				})
			}

      // app.cache.set(`people:${person.id}`, person)

			return person
    } catch(err) {
      throw err
    }
  }

	const getById = async (req, res) => {
		const id = req.params.id
		try {
			// await app.cache.get(`people:${id}`)
			// 	.then(async person => {
			// 		if (person) {
			// 			res.status(200).json(person)
			// 		} else {
			// 			person = await fnGetById(id)
			// 			app.cache.set(`people:${id}`, person)
			// 			res.status(200).json(person)
			// 		}
			// 	})
			const person = await fnGetById(id)
			res.status(200).json(person)
		} catch(err) {
			res.status(500).send(err)
		}
	}

	const save = async (req, res) => {
		const person = { ...req.body }
		try {
			const ret = await fnSave(person)
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
			const { idStatus } = await app.db('people')
			.select('idStatus')
			.where({ id })
			.first()

			equalsOrError(idStatus == 1 ? 0 : idStatus, 0, 'Pessoa não pode ser deletada.')

			await syncObject(id, null, 6)

			const { idStatus: idNewStatus } = await app.db('people')
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