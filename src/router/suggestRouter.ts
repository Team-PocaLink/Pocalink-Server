import { Router } from 'express';

import { suggestController } from '../controller';
import { auth } from '../middlewares';

const router: Router = Router();

router.get('/:suggestId/shippingInfo', suggestController.getShippingInfo);

router.delete('/:suggestId', auth, suggestController.deleteSuggest);

router.patch('/:suggestId/price', auth, suggestController.raisePrice);
export default router;
