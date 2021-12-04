import { Router } from 'express';
import { obtenerFactura, obtenerFacturas} from "../controllers/controllerFactura"
import { eliminarFactura, agregarFactura} from "../controllers/controllerFactura"
import { actualizarFactura} from "../controllers/controllerFactura"
/*import isAdmin from "../middlewares/admin";*/

const facturaRoutes=(app)=>{
    const router=Router();
      app.use('/', router);
      router.get('/obtenerFacturas', /*isAdmin,*/ obtenerFacturas);
      router.get('/obtenerFactura/:id',obtenerFactura);
      router.delete('/eliminarFactura/:id',eliminarFactura);
      router.post('/agregarFactura',agregarFactura);
      router.put('/actualizarFactura/:id',actualizarFactura);

}
export default facturaRoutes
