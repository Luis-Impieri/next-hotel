import { useForm } from 'react-hook-form';
import { Box, Button, Input, FormLabel, FormControl } from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';

interface ReservationFormInputs {
  roomId: number;
  guestId: number;
  checkInDate: string;
  checkOutDate: string;
  status: string;
}

const AddReservation = () => {
  const { register, handleSubmit } = useForm<ReservationFormInputs>();
  const router = useRouter();

  const onSubmit = async (data: ReservationFormInputs) => {
    try {
      await axios.post('http://localhost:3000/api/reservations', data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      router.push('/admin/reservations');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormLabel>ID do Quarto</FormLabel>
          <Input type="number" {...register('roomId', { required: true })} />
        </FormControl>
        <FormControl>
          <FormLabel>ID do Hóspede</FormLabel>
          <Input type="number" {...register('guestId', { required: true })} />
        </FormControl>
        <FormControl>
          <FormLabel>Data de Check-in</FormLabel>
          <Input type="date" {...register('checkInDate', { required: true })} />
        </FormControl>
        <FormControl>
          <FormLabel>Data de Check-out</FormLabel>
          <Input type="date" {...register('checkOutDate', { required: true })} />
        </FormControl>
        <FormControl>
          <FormLabel>Status</FormLabel>
          <Input {...register('status', { required: true })} />
        </FormControl>
        <Button type="submit">Adicionar Reserva</Button>
      </form>
    </Box>
  );
};

export default AddReservation;
