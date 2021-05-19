const { v4: uuid } = require('uuid')

module.exports = app => {
  const syncObject = async (id, obj, idTable) => {
    const { name: table, key } = await app.db('tables')
      .select('name', 'key')
      .where({ id: idTable })
      .andWhere('idStatus', '>', 0)
      .first();

    if (id) {
        const { idStatus } = await app.db(table)
				.select('idStatus')
        .where({ id })
        .first();

      if (obj) {
        // ALTERAÇÃO
        if (obj.idStatus > 0) {
          await app.db(table)
            .update(obj)
            .where({ id })
            .then()
            .catch(err => {
              console.log(err)
            });

						return id
        };
      } else {
        if (idStatus > 0) {
          // DELEÇÃO
          await app.db(table)
            .update({ idStatus: 0 })
            .where({ id })
            .then();
        } else {
          // RECUPERAÇÃO
          const { idStatusTo } = await app.db({ a: 'tables' })
            .leftOuterJoin({ b: 'statusGroups_transitions' }, 'a.idStatusGroup', 'b.idParent')
            .select('b.idStatusTo')
            .where('a.id', idTable)
            .andWhere('b.idStatusFrom', 0)
            .andWhere('b.idStatusTo', '!=', 0)
            .first();

          await app.db(table)
            .update({ idStatus: idStatusTo })
            .where({ id })
            .then();

						return id
        };
      };
    } else {
      // INCLUSÃO
      obj.id = uuid()

      await app.db(table)
        .insert(obj)
        .returning('id')

			return obj.id
    }
  };

  const syncChildObject = async (id, obj, idTable) => {
    const { name: table, key } = await app.db('tables')
      .select('name', 'key')
      .where({ id: idTable })
      .andWhere('idStatus', '>', 0)
      .first();

    if (obj) {
      obj[key] = id;

      if (obj.id) {
        if (!obj.del) {
          // ALTERAÇÃO
          app.db(table)
            .update(obj)
            .where({ id: obj.id })
            .then();
        } else {
          // DELEÇÃO
          app.db(table)
            .where({ id: obj.id })
            .del()
            .then();
        };
      } else {
        if (!obj.del) {
          // INCLUSÃO
          obj.id = uuid()
          await app.db(table)
            .insert(obj)
            .then();
        };
      };
    };
  };

  return { syncObject, syncChildObject, getParent };
};
