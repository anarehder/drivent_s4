import { notFoundError } from '@/errors';
import { bookingError } from '@/errors/booking-error';
import bookingRepository from '@/repositories/booking-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsRepository from '@/repositories/tickets-repository';

async function verifyTicketAndEnrollment(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw bookingError();
  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) throw bookingError();
  if (ticket.status !== 'PAID') throw bookingError();
  if (ticket.TicketType.isRemote === true) throw bookingError();
  if (ticket.TicketType.includesHotel === false) throw bookingError();
}

async function verifyCapacity(roomId: number) {
  const room = await bookingRepository.findRoomsById(roomId);
  if (!room) throw notFoundError();
  const bookedRooms = await bookingRepository.findBookingsByRoomId(roomId);
  if (bookedRooms.length >= room.capacity) throw bookingError();
}

async function getBookingService(userId: number) {
  const booking = await bookingRepository.getBookingByUserIdDB(userId);
  if (!booking) throw notFoundError();
  return booking;
}

async function postBookingService(userId: number, roomId: number) {
  await verifyTicketAndEnrollment(userId);
  await verifyCapacity(roomId);
  const booking = await bookingRepository.postBookingDB(userId, roomId);
  return booking;
}

async function editBookingService(userId: number, roomId: number, bookingId: number) {
  await verifyCapacity(roomId);
  const bookingExists = await bookingRepository.getBookingByUserIdDB(userId);
  if (!bookingExists) throw bookingError();
  const editedBooking = await bookingRepository.editBookingDB(bookingId, roomId);
  return editedBooking;
}

export default {
  getBookingService,
  postBookingService,
  editBookingService,
};
