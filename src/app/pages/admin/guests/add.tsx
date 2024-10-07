import { useForm } from 'react-hook-form';
import { Box, Button, Input, FormLabel, FormControl } from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';

interface GuestFormInputs {
  name: string;
  cpf: string;
  email: string;
  roomNumber: number;
}

const AddGuest = () => {
  const { register, handleSubmit } = useForm<GuestFormInputs>();
  const router = useRouter();

  const onSubmit = async (data: GuestFormInputs) => {
    try {
      await axios.post('http://localhost:3000/api/guests', data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert('Hóspede adicionado com sucesso!');
      router.push('/admin/guests');
    } catch (error) {
      console.error(error);
      alert('Erro ao adicionar hóspede.');
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormLabel>Nome</FormLabel>
          <Input {...register('name', { required: true })} />
        </FormControl>
        <FormControl>
          <FormLabel>CPF</FormLabel>
          <Input {...register('cpf', { required: true })} />
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input type="email" {...register('email', { required: true })} />
        </FormControl>
        <FormControl>
          <FormLabel>Número do Quarto</FormLabel>
          <Input type="number" {...register('roomNumber', { required: true })} />
        </FormControl>
        <Button type="submit">Adicionar Hóspede</Button>
      </form>
    </Box>
  );
};

export default AddGuest;
