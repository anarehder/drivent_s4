import httpStatus from 'http-status';
import { Response } from 'express';
import { AuthenticatedRequest } from '@/middlewares';
import bookingService from '@/services/booking-service';
import { notFoundError } from '@/errors';

export async function getBooking(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const booking = await bookingService.getBookingService(userId);
    if (!booking.id) throw notFoundError();
    const response = { id: booking.id, Room: booking.Room };
    return res.status(httpStatus.OK).send(response);
  } catch (error) {
    if (error.name === 'NotFoundError') return res.sendStatus(httpStatus.NOT_FOUND);
    if (error.name === 'BookingError') return res.sendStatus(httpStatus.FORBIDDEN);
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function postBooking(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const roomId = Number(req.body.roomId);
    const booking = await bookingService.postBookingService(userId, roomId);
    const response = { bookingId: booking.id };
    return res.status(httpStatus.OK).send(response);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === 'NotFoundError') return res.sendStatus(httpStatus.NOT_FOUND);
    if (error.name === 'BookingError') return res.sendStatus(httpStatus.FORBIDDEN);
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function editBooking(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const bookingId = Number(req.params.bookingId);
    if (!bookingId) return res.sendStatus(httpStatus.BAD_REQUEST);
    const roomId = Number(req.body.roomId);
    const booking = await bookingService.editBookingService(userId, roomId, bookingId);
    const response = { bookingId: booking.id };
    return res.status(httpStatus.OK).send(response);
  } catch (error) {
    if (error.name === 'NotFoundError') return res.sendStatus(httpStatus.NOT_FOUND);
    if (error.name === 'BookingError') return res.sendStatus(httpStatus.FORBIDDEN);
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
