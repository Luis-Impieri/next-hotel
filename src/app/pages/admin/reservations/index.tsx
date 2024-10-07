import { Box, Button, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface Reservation {
  id: number;
  roomNumber: number;
  guestName: string;
  checkInDate: string;
  checkOutDate: string;
  status: string;
}

const Reservations = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const router = useRouter();

  useEffect(() => {
    axios.get('http://localhost:3000/api/reservations', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then((response) => {
      setReservations(response.data);
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  return (
    <Box>
      <Button onClick={() => router.push('/admin/reservations/add')}>Adicionar Reserva</Button>
      <Table>
        <Thead>
          <Tr>
            <Th>Quarto</Th>
            <Th>Hóspede</Th>
            <Th>Check-in</Th>
            <Th>Check-out</Th>
            <Th>Status</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {reservations.map(reservation => (
            <Tr key={reservation.id}>
              <Td>{reservation.roomNumber}</Td>
              <Td>{reservation.guestName}</Td>
              <Td>{reservation.checkInDate}</Td>
              <Td>{reservation.checkOutDate}</Td>
              <Td>{reservation.status}</Td>
              <Td>
                <Button onClick={() => router.push(`/admin/reservations/edit/${reservation.id}`)}>Editar</Button>
                <Button onClick={() => router.push(`/admin/reservations/delete/${reservation.id}`)}>Excluir</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Reservations;
