import { useForm } from 'react-hook-form';
import { Box, Button, Input, FormLabel, FormControl } from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface GuestFormInputs {
  name: string;
  cpf: string;
  email: string;
  roomNumber: number;
}

const EditGuest = () => {
  const { register, handleSubmit, setValue } = useForm<GuestFormInputs>();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3000/api/guests/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }).then((response) => {
        const guest = response.data;
        setValue('name', guest.name);
        setValue('cpf', guest.cpf);
        setValue('email', guest.email);
        setValue('roomNumber', guest.roomNumber);
      }).catch((error) => {
        console.error(error);
      });
    }
  }, [id]);

  const onSubmit = async (data: GuestFormInputs) => {
    try {
      await axios.put(`http://localhost:3000/api/guests/${id}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      router.push('/admin/guests');
    } catch (error) {
      console.error(error);
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
          <Input {...register('email', { required: true })} />
        </FormControl>
        <FormControl>
          <FormLabel>Número do Quarto</FormLabel>
          <Input type="number" {...register('roomNumber', { required: true })} />
        </FormControl>
        <Button type="submit">Salvar Alterações</Button>
      </form>
    </Box>
  );
};

export default EditGuest;
