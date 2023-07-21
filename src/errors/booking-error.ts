import { ApplicationError } from '@/protocols';

export function bookingError(): ApplicationError {
  return {
    name: 'BookingError',
    message: 'Overcapacity or forbidden',
  };
}
