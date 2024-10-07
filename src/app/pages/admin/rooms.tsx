import { Box, Heading, Text, Button, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface Room {
  id: number;
  number: string;
  type: string;
  status: string;
  price: number;
}

const RoomManagement = () => {
  const router = useRouter();
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/rooms', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then((response) => {
      setRooms(response.data);
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  const addRoom = () => {
    router.push('/admin/rooms/add');
  };

  const editRoom = (id: number) => {
    router.push(`/admin/rooms/edit/${id}`);
  };

  const deleteRoom = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/api/rooms/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setRooms(rooms.filter(room => room.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
      <Heading>Gerenciamento de Quartos</Heading>
      <Button onClick={addRoom}>Adicionar Novo Quarto</Button>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Número</Th>
            <Th>Tipo</Th>
            <Th>Status</Th>
            <Th>Preço</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {rooms.map(room => (
            <Tr key={room.id}>
              <Td>{room.id}</Td>
              <Td>{room.number}</Td>
              <Td>{room.type}</Td>
              <Td>{room.status}</Td>
              <Td>{room.price}</Td>
              <Td>
                <Button onClick={() => editRoom(room.id)}>Editar</Button>
                <Button onClick={() => deleteRoom(room.id)}>Excluir</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default RoomManagement;
