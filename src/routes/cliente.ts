import { Router } from 'express';
import {actualizarCliente, agregarCliente,
        eliminarCliente, obtenerClienteId, obtenerClienteEmail,
        obtenerClientes, iniciarSesion} from "../controllers/controllerCliente";
/*import isAdmin from "../middlewares/admin";*/

const clienteRoutes=(app)=>{
    const router=Router();
      app.use('/', router);
      router.get('/obtenerClientes',/*isAdmin,*/ obtenerClientes);
      router.get('/obtenerClienteId/:id',obtenerClienteId);
      router.get('/obtenerClienteEmail/:email',obtenerClienteEmail);
      router.post('/agregarCliente',agregarCliente);
      router.put('/actualizarCliente/:id',actualizarCliente);
      router.delete('/eliminarCliente/:id',eliminarCliente);
      router.post('/iniciarSesionCliente', iniciarSesion);

}
export default clienteRoutes
