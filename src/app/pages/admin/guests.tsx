import { Box, Heading, Text, Button, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface Guest {
  id: number;
  name: string;
  cpf: string;
  roomNumber: string;
}

const GuestManagement = () => {
  const router = useRouter();
  const [guests, setGuests] = useState<Guest[]>([]);

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

  const addGuest = () => {
    router.push('/admin/guests/add');
  };

  const editGuest = (id: number) => {
    router.push(`/admin/guests/edit/${id}`);
  };

  const deleteGuest = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/api/guests/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setGuests(guests.filter(guest => guest.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
      <Heading>Gerenciamento de Hóspedes</Heading>
      <Button onClick={addGuest}>Adicionar Novo Hóspede</Button>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Nome</Th>
            <Th>CPF</Th>
            <Th>Quarto</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {guests.map(guest => (
            <Tr key={guest.id}>
              <Td>{guest.id}</Td>
              <Td>{guest.name}</Td>
              <Td>{guest.cpf}</Td>
              <Td>{guest.roomNumber}</Td>
              <Td>
                <Button onClick={() => editGuest(guest.id)}>Editar</Button>
                <Button onClick={() => deleteGuest(guest.id)}>Excluir</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default GuestManagement;
