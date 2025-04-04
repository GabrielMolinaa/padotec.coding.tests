import { useEffect, useState } from 'react';
import ListaLog from '../components/ListaLogs';

const Home = () => {

  // Estados
  const [logs, setLogs] = useState([]);
  const [modoVisualizacao, setmodoVisualizacao] = useState('usuario');
  const [filtro, setFiltro] = useState('');

  // Simulando a chamada (fetch) para uma API utilizando o arquivo json
  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => {
        const ordenado = data.sort((a, b) => b.payload.logId - a.payload.logId);
        setLogs(ordenado);
      });
  }, []);

  //Handlers
  const handleFiltro = (e) => setFiltro(e.target.value);
  
  const handleAlteracaoView = (e) => {
    setmodoVisualizacao(e.target.value);
    setFiltro('');
  };


  // Lógica do Filtro
  const logsFiltrados = logs.filter((log) => {
    const textoFiltro = filtro.trim().toLowerCase();
    if (modoVisualizacao === 'usuario') {
      return (
        log.payload.userName.toLowerCase().includes(textoFiltro) ||
        log.payload.userId.toLowerCase().includes(textoFiltro)
      );
    } else {
      return (
        log.mac.toLowerCase().includes(textoFiltro) ||
        log.lockId.toLowerCase().includes(textoFiltro)
      );
    }
  });

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center gap-4 bg-white border border-gray-300 rounded-md p-4 mb-4 shadow-sm">
        <div className="flex items-center gap-2">
          <label className="font-medium text-gray-700">Visualizar por:</label>
          <select value={modoVisualizacao} onChange={handleAlteracaoView} 
          className="bg-white border border-gray-300 text-gray-800 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="usuario">Usuário</option>
            <option value="dispositivo">Dispositivo</option>
          </select>
        </div>

        <input
          type="text"
          placeholder={
            modoVisualizacao === 'usuario' ? 'Filtrar por nome ou usuarioId' : 'Filtrar por MAC ou lockId'
          }
          value={filtro}
          onChange={handleFiltro}
          className="flex-1 bg-white border border-gray-300 text-gray-800 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {/* Renderiza a lista de logs com base no filtro e modo de visualização */}
      <ListaLog logs={logsFiltrados} mode={modoVisualizacao} />
    </div>
  );
};

export default Home;
