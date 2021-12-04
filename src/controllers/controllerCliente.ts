import executeQuery from "../services/mysql.service";
import jwt from 'jsonwebtoken';

const obtenerClienteId = async(req, res, next) => {
  const {id} = req.params;
  try{
    const response = await executeQuery(`
      SELECT * FROM cliente WHERE id_cliente = ${id}`);
      const data = {
      message: `${response.length} datos encontrados`,
      data: response.length > 0 ? response[0] : null
        };
        res.json(data);
    }catch(error){
      next(error);
    }
}

const obtenerClienteEmail = async(req, res, next) => {
  const {email} = req.params;
  try{
    const response = await executeQuery(`
    SELECT * FROM cliente WHERE email = "${email}"`);
      const data = {
      message: `${response.length} datos encontrados`,
      data: response.length > 0 ? response[0] : null
        };
        res.json(data);
    }catch(error){
      next(error);
    }
}

const obtenerClientes = async(req, res, next) => {
  await executeQuery(
      `SELECT id_cliente,
              nombre,
              apellido,
              direccion,
              telefono,
              email,
              password
        FROM cliente`).then(response => {
  const data = {
    message: `${response.length} datos encontrados`,
    data: response.length > 0 ? response : null
  };
  res.json(data);
}).catch(error => {
  next(error);
});
}

const actualizarCliente = async(req, res, next) => {
  const {nombre, apellido, telefono, email, direccion, password} = req.body;
  const {id} = req.params;
  executeQuery(`UPDATE cliente SET nombre = '${nombre}',
                                   apellido = '${apellido}',
                                   direccion = '${direccion}',
                                   telefono = '${telefono}',
                                   email = '${email}',
                                   password = '${password}'
                                   WHERE id_cliente = '${id}'`).then((response) => {
  console.log(response);
  res.json({message: response.affectedRows > 0 ? 'updated' : `No existe registro con id: ${req.params.id}`});
  }).catch((error) => {
    next(error);
  });
}

const agregarCliente = async (req, res, next) => {
  const {nombre, apellido, telefono, email, direccion, password} = req.body;
  try {
    const response = await executeQuery(`INSERT INTO cliente
      (
        id_cliente,
        nombre,
        apellido,
        direccion,
        telefono,
        email,
        password
      ) VALUES
      (
        NULL,
        '${nombre}',
        '${apellido}',
        '${direccion}',
        '${telefono}',
        '${email}',
        '${password}')`);
      res.status(201).json({
        message: 'created',
        id: response.insertId
      });
  }catch (error) {
    next(error);
  }
}

const eliminarCliente = async (req, res, next) => {
  executeQuery(`DELETE FROM cliente WHERE id_cliente = '${req.params.id}'`).then(
    (response) => {
      res.json({
      message: response.affectedRows > 0 ? `deleted`: 'No existe registro con id: ${req.params.id}'});
    }).catch((error) => {
      next(error)
    });
}

const registrarCliente = async (req, res, next) => {
    const {nombre, apellido, direccion, telefono, email, password} = req.body;
    const existCliente = await executeQuery(`SELECT * FROM cliente WHERE email = '${email}'`);
    if (existCliente.lenght > 0){
      res.send("Ya existe el cliente");
    }else{
      const response = await executeQuery(`INSERT INTO cliente
        (id_cliente, nombre, apellido, direccion, telefono,
          email, password ) VALUES
        (
          NULL, '${nombre}', '${apellido}', '${direccion}', '${telefono}',
          '${email}',   '${password}')`
        );
        res.status(201).json({
          message: 'Usuario Creado',
          id: response.insertId})
        }
}

const iniciarSesion = async (req, res, next) => {
 try {
   const {email, password} = req.body;
   const dataUser = await executeQuery(`SELECT * FROM cliente WHERE email = '${email}'`);
   if (dataUser.length > 0 ) {
     if(dataUser[0].password === password){
       jwt.sign(dataUser[0], 'Karen', (error, token) => {
         if (error){
           next(error);
         }else{
           res.json({
             user: {...dataUser[0], token},
             statuscode: 2})
         }
       })
     }else{
       res.json({
         message: "Contraseña incorrecta",
         statuscode: 1});
     }
   }else {
     res.json({
       message: "No existe usuario",
       statuscode: 0
     })
   }
 } catch (error) {
   next(error);
 }
}
export{
  eliminarCliente,
  agregarCliente,
  actualizarCliente,
  obtenerClienteId,
  obtenerClienteEmail,
  obtenerClientes,
  registrarCliente,
  iniciarSesion
}
