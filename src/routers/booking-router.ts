import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { editBooking, getBooking, postBooking } from '@/controllers';
import { bookingSchema } from '@/schemas';

const bookingRouter = Router();

bookingRouter
  .all('/*', authenticateToken)
  .get('/', getBooking)
  .post('/', validateBody(bookingSchema), postBooking)
  .put('/:bookingId', validateBody(bookingSchema), editBooking);

export { bookingRouter };
