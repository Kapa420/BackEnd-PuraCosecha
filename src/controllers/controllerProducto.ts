import executeQuery from "../services/mysql.service";

const obtenerProductoAdmins = async(req, res, next) => {
    const {id} = req.params;
    try{
    const response = await executeQuery(`SELECT * FROM producto where id_producto = ${id}`);
    const data = {
      message: `${response.length} datos encontrados`,
      data: response.length > 0 ? response[0] : null
        };
        res.json(data);
    }catch(error){
        next(error);
    }
}

const obtenerProductosAdmins = async(req, res, next) => {
    await executeQuery('SELECT * FROM producto').then(response => {
        const data = {
            message: `${response.length} datos encontrados`,
            data: response.length > 0 ? response : null
        };
        res.json(data);
    }).catch(error => {
        next(error);
    });
}

const actualizarProductoAdmins = async(req, res, next) => {
  const {nombre_producto, categoria_producto, precio, id_productor } = req.body;
  const {id} = req.params;
  executeQuery(`UPDATE producto SET nombre_producto = '${nombre_producto}',
                                    categoria_producto = '${categoria_producto}'
                                    precio = '${precio}',
                                    id_productor = '${id_productor}'
                                    WHERE id_producto = '${id}'`)
                                   .then((response) => {
  console.log(response);
  res.json({message: response.affectedRows > 0 ? 'updated' : `No existe registro con id: ${req.params.id}`});
  }).catch((error) => {
    next(error);
  });
}


const agregarProductoAdmins = async (req, res, next) => {
  const {nombre_producto, categoria_producto, precio, id_productor} = req.body;
  try {
    const response = await executeQuery(`INSERT INTO producto
      (
        nombre_producto,
        categoria_producto,
        precio,
        id_productor
      ) VALUES
      (
        '${nombre_producto}',
        '${categoria_producto}',
        '${precio}',
        '${id_productor}'
      )
        `);
      res.status(201).json({
        message: 'created',
        id: response.insertId
      });
  }catch (error) {
    next(error);
}}

const eliminarProducto = async (req, res, next) => {
  executeQuery(`DELETE FROM producto WHERE id_producto = '${req.params.id}'`).then((response) => {res
.json({
      message: response.affectedRows > 0 ? `deleted`: 'No existe registro con id: ${req.params.id}'}
);
    }).catch((error) => {
      next(error)
    });
}

export {
  eliminarProducto,
  agregarProductoAdmins,
  actualizarProductoAdmins,
  obtenerProductosAdmins,
  obtenerProductoAdmins}
