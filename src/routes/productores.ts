import { Router } from "express"
import { actualizarProductor, agregarProductor, eliminarProductor,
         obtenerProductor, obtenerProductores, iniciarSesion } from "../controllers/controllerProductor";
/*import isAdmin from "../middlewares/admin";*/

const productoresRoutes=(app)=>{
    const router=Router();
      app.use('/', router);
      router.get('/obtenerProductores', /*isAdmin,*/ obtenerProductores);
      router.get('/obtenerProductor/:id',obtenerProductor);
      router.post('/agregarProductor',agregarProductor);
      router.put('/actualizarProductor/:id',actualizarProductor);
      router.delete('/eliminarProductor/:id',eliminarProductor);
      router.post('/iniciarSesionProductor', iniciarSesion);

}
// uso export para que pueda exportar y luego en .appts se pueda importar
export default productoresRoutes
