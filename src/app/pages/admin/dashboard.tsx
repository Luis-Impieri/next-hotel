import { Box, Heading, Text, Button, SimpleGrid } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getAuthHeaders } from '../../utils/auth';

interface DashboardData {
  occupiedRooms: number;
  availableRooms: number;
  maintenanceRooms: number;
}

const AdminDashboard = () => {
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  useEffect(() => {
    
    axios.get('http://localhost:3000/api/admin/dashboard', getAuthHeaders())
      .then((response) => {
        setDashboardData(response.data);
      }).catch((error) => {
        console.error(error);
      });
  }, []);

  if (!dashboardData) {
    return <Text>Carregando...</Text>;
  }

  return (
    <Box>
      <Heading>Dashboard do Administrador</Heading>
      <SimpleGrid columns={3} spacing={10}>
        <Box>
          <Heading as="h3" size="md">Quartos Ocupados</Heading>
          <Text>{dashboardData.occupiedRooms}</Text>
        </Box>
        <Box>
          <Heading as="h3" size="md">Quartos Disponíveis</Heading>
          <Text>{dashboardData.availableRooms}</Text>
        </Box>
        <Box>
          <Heading as="h3" size="md">Quartos em Manutenção</Heading>
          <Text>{dashboardData.maintenanceRooms}</Text>
        </Box>
      </SimpleGrid>
      <Button onClick={() => router.push('/admin/rooms')}>Gerenciar Quartos</Button>
      <Button onClick={() => router.push('/admin/guests')}>Gerenciar Hóspedes</Button>
      <Button onClick={() => router.push('/admin/reservations')}>Gerenciar Reservas</Button>
    </Box>
  );
};

export default AdminDashboard;
