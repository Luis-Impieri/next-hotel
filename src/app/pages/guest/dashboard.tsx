import { Box, Heading, Text, Button } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { getAuthHeaders } from '../../utils/auth';

interface GuestInfo {
  name: string;
  cpf: string;
  roomNumber: string;
  roomStatus: string;
}

const GuestDashboard = () => {
  const [guestInfo, setGuestInfo] = useState<GuestInfo | null>(null);

  useEffect(() => {
    
    axios.get('http://localhost:3000/api/guests/me', getAuthHeaders())
      .then((response) => {
        setGuestInfo(response.data);
      }).catch((error) => {
        console.error(error);
      });
  }, []);

  const requestService = async (serviceType: string) => {
    try {
      await axios.post('http://localhost:3000/api/service-requests', { serviceType }, getAuthHeaders());
      alert('Serviço solicitado com sucesso!');
    } catch (error) {
      console.error(error);
    }
  };

  if (!guestInfo) {
    return <Text>Carregando...</Text>;
  }

  return (
    <Box>
      <Heading>Bem-vindo, {guestInfo.name}</Heading>
      <Text>CPF: {guestInfo.cpf}</Text>
      <Text>Quarto: {guestInfo.roomNumber}</Text>
      <Text>Status do Quarto: {guestInfo.roomStatus}</Text>
      <Button onClick={() => requestService('Café da Manhã')}>Solicitar Café da Manhã</Button>
      <Button onClick={() => requestService('Limpeza do Quarto')}>Solicitar Limpeza do Quarto</Button>
    </Box>
  );
};

export default GuestDashboard;
