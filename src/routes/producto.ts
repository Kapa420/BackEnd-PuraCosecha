import { Router } from 'express';
import {actualizarProductoAdmins, agregarProductoAdmins, eliminarProducto, obtenerProductoAdmins, obtenerProductosAdmins} from "../controllers/controllerProducto";
/*import isAdmin from "../middlewares/admin";*/

const productoRoutes=(app)=>{
    const router=Router();
      app.use('/', router);
      router.get('/obtenerProductosAdmins', /*isAdmin,*/ obtenerProductosAdmins);
      router.get('/obtenerProductoAdmins/:id',obtenerProductoAdmins);
      router.post('/agregarProductoAdmins',agregarProductoAdmins);
      router.put('/actualizarProductoAdmins/:id',actualizarProductoAdmins);
      router.delete('/eliminarProducto/:id',eliminarProducto);

}
// uso export para que pueda exportar y luego en .appts se pueda importar
export default productoRoutes
