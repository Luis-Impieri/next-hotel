import { Box, Heading, Button, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface Guest {
  id: number;
  name: string;
  cpf: string;
  roomNumber: string;
}

const Guests = () => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const router = useRouter();

  useEffect(() => {
    axios.get('http://localhost:3000/api/guests', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then((response) => {
      setGuests(response.data);
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  return (
    <Box>
      <Heading>Gerenciar Hóspedes</Heading>
      <Button onClick={() => router.push('/admin/guests/add')}>Adicionar Novo Hóspede</Button>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th>CPF</Th>
            <Th>Quarto</Th>
          </Tr>
        </Thead>
        <Tbody>
          {guests.map(guest => (
            <Tr key={guest.id}>
              <Td>{guest.name}</Td>
              <Td>{guest.cpf}</Td>
              <Td>{guest.roomNumber}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Guests;
