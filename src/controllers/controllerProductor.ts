import executeQuery from "../services/mysql.service";
import jwt from 'jsonwebtoken';


const obtenerProductores= async(req,res,next) => {
    await executeQuery(`SELECT * FROM productor`).then(response => {
        const data = {
            message: `${response.length} datos encontrados`,
            data: response.length > 0 ? response : null
        };
        res.json(data);
    }).catch(error => {
        next(error);
    });

}
const obtenerProductor= async(req, res, next) => {
    const {id} = req.params;
    try{
        const response = await executeQuery(
          `SELECT * FROM productor WHERE id_productor = ${id}`);
        const data = {
            message: `${response.length} datos encontrados`,
            data: response.length > 0 ? response[0] : null
        };
        res.json(data);
    }catch(error){
        next(error);
    }

}

const agregarProductor= async (req, res, next) => {
    const {nombre, apellido, poblacion, direccion, telefono, email, password} = req.body;
    try{
        const response = await executeQuery(`INSERT INTO productor
          (
            nombre, apellido, poblacion, direccion,
            telefono, email, password
          ) VALUES
          (
            '${nombre}', '${apellido}', '${poblacion}', '${direccion}',
            '${telefono}', '${email}', '${password}'
          )`);
        res.status(201).json({ message: 'created', id: response.insertId});
    }catch(error){
        next(error);
    }

}
const actualizarProductor=(req, res, next)  => {
    const {nombre, apellido, poblacion, direccion, telefono, email, password} = req.body;
    const {id} = req.params;
    executeQuery(`UPDATE productor SET nombre = '${nombre}',
                                         apellido = '${apellido}',
                                         poblacion = '${poblacion}',
                                         direccion = '${direccion}',
                                         telefono = '${telefono}',
                                         email = '${email}',
                                         password = '${password}'
                                         WHERE id_productor = '${id}'`).then((response) =>{
        console.log(response);
        res.json({message: response.affectedRows > 0 ? 'updated' : `No existe registro con id: ${req.params.id}`});
    }).catch((error) => {
        next(error);
    });

}
const eliminarProductor = (req, res, next) => {
    executeQuery(`DELETE FROM productor WHERE id_productor = '${req.params.id}'`).then((response) => {
        res.json({message: response.affectedRows > 0 ? 'deleted' : `No existe registro con id: ${req.params.id}`});
    }).catch((error) => {
        next(error)
    });
}

const iniciarSesion = async(req, res, next) => {
  try {
    const {email, password} = req.body;
    const dataUser = await executeQuery(`SELECT * FROM productor WHERE email = '${email}'`);
    if (dataUser.length > 0 ) {
      if(dataUser[0].password === password){
        jwt.sign(dataUser[0], 'Marlith', (error, token) => {
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
  obtenerProductores,
  obtenerProductor,
  agregarProductor,
  actualizarProductor,
  eliminarProductor,
  iniciarSesion
}
