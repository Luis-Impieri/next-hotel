import { Box, Heading, Button, Table, Thead, Tbody, Tr, Th, Td, Input, FormControl, FormLabel } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface Room {
  id: number;
  number: number;
  type: string;
  status: string;
  price: number;
}

const Rooms = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [newRoom, setNewRoom] = useState<Partial<Room>>({});

  useEffect(() => {
    // Carregar a lista de quartos do backend
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewRoom((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'number' ? parseFloat(value) : value,
    }));
  };

  const addRoom = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/rooms', newRoom, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setRooms([...rooms, response.data]);
      setNewRoom({});
    } catch (error) {
      console.error(error);
    }
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
      <Heading>Gerenciar Quartos</Heading>
      <FormControl>
        <FormLabel>Número do Quarto</FormLabel>
        <Input name="number" value={newRoom.number || ''} onChange={handleInputChange} />
        <FormLabel>Tipo</FormLabel>
        <Input name="type" value={newRoom.type || ''} onChange={handleInputChange} />
        <FormLabel>Status</FormLabel>
        <Input name="status" value={newRoom.status || ''} onChange={handleInputChange} />
        <FormLabel>Preço</FormLabel>
        <Input name="price" value={newRoom.price || ''} onChange={handleInputChange} />
        <Button mt={2} onClick={addRoom}>Adicionar Quarto</Button>
      </FormControl>
      <Table mt={4}>
        <Thead>
          <Tr>
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
              <Td>{room.number}</Td>
              <Td>{room.type}</Td>
              <Td>{room.status}</Td>
              <Td>{room.price}</Td>
              <Td>
                <Button colorScheme="red" onClick={() => deleteRoom(room.id)}>Excluir</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Rooms;
