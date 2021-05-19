module.exports = app => {
  /// GET
  const get = (req, res) => {
    const limit = 100;

    app.db('status')
      .select('id', 'name', 'action, observations')
      .where('idEstado', 2)
      .andWhere('susp', false)
      .orderBy('id', 'asc')
      .limit(limit)
      .then(ret => {
        res.status(200).json(ret);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  };

  return { get };
};