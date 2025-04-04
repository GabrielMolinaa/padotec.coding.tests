import { useEffect, useState } from 'react';
import ListaLog from '../components/listaLogs';

const Home = () => {
  const [logs, setLogs] = useState([]);
  const [viewMode, setViewMode] = useState('user'); // 'user' ou 'device'
  const [filtro, setFiltro] = useState('');

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => {
        const ordenado = data.sort((a, b) => b.payload.logId - a.payload.logId);
        setLogs(ordenado);
      });
  }, []);

  const handleFiltro = (e) => setFiltro(e.target.value);
  const handleViewChange = (e) => {
    setViewMode(e.target.value);
    setFiltro('');
  };

  // Filtro dinâmico
  const logsFiltrados = logs.filter((log) => {
    if (viewMode === 'user') {
      return (
        log.payload.userName.toLowerCase().includes(filtro.toLowerCase()) ||
        log.payload.userId.toLowerCase().includes(filtro.toLowerCase())
      );
    } else {
      return (
        log.mac.toLowerCase().includes(filtro.toLowerCase()) ||
        log.lockId.toLowerCase().includes(filtro.toLowerCase())
      );
    }
  });

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <label>Visualizar por: </label>
        <select value={viewMode} onChange={handleViewChange}>
          <option value="user">Usuário</option>
          <option value="device">Dispositivo</option>
        </select>

        <input
          type="text"
          placeholder={
            viewMode === 'user' ? 'Filtrar por nome ou userId' : 'Filtrar por MAC ou lockId'
          }
          value={filtro}
          onChange={handleFiltro}
          style={{ marginLeft: '1rem' }}
        />
      </div>

      <ListaLog logs={logsFiltrados} mode={viewMode} />
    </div>
  );
};

export default Home;
