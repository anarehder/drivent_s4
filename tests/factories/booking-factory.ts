import { Booking, Room } from '@prisma/client';
import { prisma } from '@/config';

export async function createBooking(userId: number, roomId: number) {
  return prisma.booking.create({
    data: {
      userId: userId,
      roomId: roomId,
    },
  });
}

export function getBookingResponse(userId: number) {
  const booking: Booking & { Room: Room } = {
    id: 1,
    userId: userId,
    roomId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    Room: {
      id: 1,
      name: '2 hospedes',
      capacity: 2,
      hotelId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  };
  return booking;
}
