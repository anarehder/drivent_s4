import { Booking } from '@prisma/client';
import { prisma } from '@/config';

async function getBookingByUserIdDB(userId: number) {
  return prisma.booking.findFirst({
    where: {
      userId,
    },
    include: {
      Room: true,
    },
  });
}

async function getBookingByIdDB(bookingId: number) {
  return prisma.booking.findFirst({
    where: {
      id: bookingId,
    },
    include: {
      Room: true,
    },
  });
}

async function getBookingByRoomDB(roomId: number) {
  return prisma.booking.findFirst({
    where: {
      roomId,
    },
    include: {
      Room: true,
    },
  });
}

async function findRoomsById(roomId: number) {
  return prisma.room.findFirst({
    where: {
      id: roomId,
    },
  });
}

async function findBookingsByRoomId(roomId: number): Promise<Booking[]> {
  return prisma.booking.findMany({
    where: {
      roomId,
    },
  });
}

async function postBookingDB(userId: number, roomId: number): Promise<Booking> {
  return prisma.booking.create({
    data: {
      userId,
      roomId,
    },
  });
}

async function editBookingDB(roomId: number, bookingId: number): Promise<Booking> {
  return prisma.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      roomId,
    },
  });
}

const bookingRepository = {
  getBookingByUserIdDB,
  getBookingByIdDB,
  getBookingByRoomDB,
  findRoomsById,
  findBookingsByRoomId,
  postBookingDB,
  editBookingDB,
};

export default bookingRepository;
