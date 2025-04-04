

const formatarData = (timestamp) => {
  const data = new Date(timestamp);
  return data.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
};

const ListaLog = ({ logs, mode }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        Logs ({mode === 'usuario' ? 'por Usuário' : 'por Dispositivo'})
      </h2>
      <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
        <div className="flex items-center gap-1">
          <span className="inline-block w-4 h-4 bg-green-200 rounded"></span> 
          Abertura
        </div>
        <div className="flex items-center gap-1">
          <span className="inline-block w-4 h-4 bg-red-200 rounded"></span>
          Travamento
        </div>
      </div>
      <table className="w-full border border-gray-300 text-left">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border border-gray-300">
              {mode === 'usuario' ? 'lockId' : 'userId'}
            </th>
            <th className="p-2 border border-gray-300">Log</th>
            <th className="p-2 border border-gray-300">Data</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => {
            const nome = log.payload.userName;
            const tipo = log.payload.type === 1 ? 'abriu' : 'trancou';
            const metodo = log.payload.method === 3 ? 'Cartão de Acesso 💳' : 'Aplicativo 📱';
            const dataFormatada = formatarData(log.payload.timestamp);
            const estadoFinal = log.payload.isLocked ? '🔒 Trancado' : '🔓 Destrancado';

            const bgColor = log.payload.type === 1 ? 'bg-green-50' : 'bg-red-50';

            return (
              <tr key={log.payload.logId} className={`${bgColor} hover:bg-gray-100`}>
                <td className="p-2 border border-gray-300">
                  {mode === 'usuario' ? log.lockId : log.payload.userId}
                </td>
                <td className="p-2 border border-gray-300">
                  <div className="flex flex-col text-sm">
                    <span className="font-medium text-gray-800">
                      {nome} <span className='font-bold'>{tipo}</span> essa porta às {dataFormatada.split(', ')[1]} por <span className='font-bold'>{metodo}</span>
                    </span>
                    <span className="text-xs text-gray-600">
                      logId: {log.payload.logId} • Estado: {estadoFinal}
                    </span>
                    <span className="text-xs text-gray-600">
                      MAC: {log.mac} • lockId: {log.lockId}
                    </span>
                  </div>
                </td>
                <td className="p-2 border border-gray-300 text-sm">{dataFormatada}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ListaLog;
