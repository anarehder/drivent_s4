import { getBookingResponse } from '../factories/booking-factory';
import bookingRepository from '@/repositories/booking-repository';
import bookingService from '@/services/booking-service';

describe('getBooking function', () => {
  it('should return the booking for the given user id', async () => {
    const userId = 1;
    const booking = getBookingResponse(userId);

    jest.spyOn(bookingRepository, 'getBookingByUserIdDB').mockResolvedValueOnce(booking);
    const result = await bookingService.getBookingService(userId);

    expect(result).toEqual(booking);
  });

  it('should return notFoundError when the given user id does not has a booking', async () => {
    const userId = 1;

    jest.spyOn(bookingRepository, 'getBookingByUserIdDB').mockRejectedValueOnce({
      name: 'NotFoundError',
      message: 'No result for this search!',
    });

    await expect(bookingService.getBookingService(userId)).rejects.toEqual({
      name: 'NotFoundError',
      message: 'No result for this search!',
    });
  });
});
