const formatarData = (timestamp) => {
    const data = new Date(timestamp);
    return data.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
  };
  
  const ListaLog = ({ logs, mode }) => {
    return (
      <div>
        <h2>Logs ({mode === 'user' ? 'por Usuário' : 'por Dispositivo'})</h2>
        <table border="1" cellPadding={8} style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>{mode === 'user' ? 'lockId' : 'userId'}</th>
              <th>Log</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => {
              const nome = log.payload.userName;
              const tipo = log.payload.type === 1 ? 'abriu' : 'trancou';
              const metodo = log.payload.method === 3 ? 'Cartão de Acesso' : 'Aplicativo';
              const dataFormatada = formatarData(log.payload.timestamp);
  
              return (
                <tr key={log.payload.logId}>
                  <td>{mode === 'user' ? log.lockId : log.payload.userId}</td>
                  <td>
                    {nome} {tipo} essa porta às {dataFormatada.split(' ')[1]} por {metodo}
                  </td>
                  <td>{dataFormatada}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default ListaLog;
  