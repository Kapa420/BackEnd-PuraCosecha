import executeQuery from "../services/mysql.service";

const obtenerFactura = async (req, res, next) => {
  const {id} = req.params;
  try {
    const response = await executeQuery(
      `SELECT factura.id_factura,
              cliente.nombre,
              cliente.apellido,
              factura.fecha as Fecha_compra
      FROM factura
      INNER JOIN cliente
      ON factura.id_cliente = cliente.id_cliente
      WHERE id_factura = ${id}
      ORDER BY factura.id_factura`
    );
    const data = {
      message: `${response.length} datos encontrados`,
      data: response.length > 0 ? response[0] : null
    };
    res.json(data);
  }catch (error){
    next(error);
  }
}

const obtenerFacturas = async (req, res, next) => {
  await executeQuery(
    `SELECT factura.id_factura,
            cliente.nombre,
            cliente.apellido,
            factura.fecha as Fecha_compra
    FROM factura
    INNER JOIN cliente
    ON factura.id_cliente = cliente.id_cliente
    ORDER BY factura.id_factura`
  ).then(response => {
    const data = {
      message: `${response.length} datos encontrados`,
      data: response.length > 0 ? response : null
    };
    res.json(data);
  }).catch(error => {
    next(error);
  });
  }

const eliminarFactura = async (req, res, next) =>{
  executeQuery(`DELETE FROM factura
                WHERE id_factura = '${req.params.id}'`).then((response) => {
    res.json({
    message: response.affectedRows > 0 ? `deleted`: 'No existe registro con id: ${req.params.id}'});
  }).catch((error) => {
    next(error)
  });
}

const agregarFactura = async (req, res, next) => {
  const {id_cliente, fecha} = req.body;
  try {
    const response = await executeQuery(
      `INSERT INTO factura(id_factura, id_cliente, fecha)
      VALUES (NULL,'${id_cliente}','${fecha}')
      `);
      res.status(201).json({
        message: "created",
        id: response.insertId});
  }catch (error){
    next(error);
  }
}

const actualizarFactura = async (req, res, next) => {
  const {id} = req.params;
  const {id_cliente, fecha} = req.body;
  executeQuery(`
    UPDATE factura SET id_cliente = '${id_cliente}',
                       fecha = '${fecha}'
    WHERE id_factura = ${id}`).then((response) => {
      console.log(response);
      res.json({
        message: response.affectedRows > 0 ? 'updated' : `No existe registro con id: ${req.params.id}`});
      }).catch((error) => {
        next(error);
      });
    }
export{
  obtenerFactura,
  obtenerFacturas,
  eliminarFactura,
  agregarFactura,
  actualizarFactura
}
