import { useForm } from 'react-hook-form';
import { Box, Button, Input, FormLabel, FormControl } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { login } from '../utils/auth';

interface LoginFormInputs {
  cpf: string;
  roomNumber: string;
}

const Login = () => {
  const { register, handleSubmit } = useForm<LoginFormInputs>();
  const router = useRouter();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await login(data.cpf, data.roomNumber);
      if (response.access_token) {
        
        const decodedToken: any = {}; 
        if (decodedToken.role === 'admin') {
          router.push('/admin/dashboard');
        } else {
          router.push('/guest/dashboard');
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormLabel>CPF</FormLabel>
          <Input {...register('cpf', { required: true })} />
        </FormControl>
        <FormControl>
          <FormLabel>Número do Quarto</FormLabel>
          <Input {...register('roomNumber', { required: true })} />
        </FormControl>
        <Button type="submit">Login</Button>
      </form>
    </Box>
  );
};

export default Login;

