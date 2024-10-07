import { useForm } from 'react-hook-form';
import { Box, Button, Input, FormLabel, FormControl } from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';

interface RoomFormInputs {
  number: string;
  type: string;
  status: string;
  price: number;
}

const AddRoom = () => {
  const { register, handleSubmit } = useForm<RoomFormInputs>();
  const router = useRouter();

  const onSubmit = async (data: RoomFormInputs) => {
    try {
      await axios.post('http://localhost:3000/api/rooms', data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      router.push('/admin/rooms');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormLabel>Número do Quarto</FormLabel>
          <Input {...register('number', { required: true })} />
        </FormControl>
        <FormControl>
          <FormLabel>Tipo</FormLabel>
          <Input {...register('type', { required: true })} />
        </FormControl>
        <FormControl>
          <FormLabel>Status</FormLabel>
          <Input {...register('status', { required: true })} />
        </FormControl>
        <FormControl>
          <FormLabel>Preço</FormLabel>
          <Input type="number" {...register('price', { required: true })} />
        </FormControl>
        <Button type="submit">Adicionar Quarto</Button>
      </form>
    </Box>
  );
};

export default AddRoom;
