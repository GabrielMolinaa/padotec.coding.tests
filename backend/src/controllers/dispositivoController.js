const Dispositivo = require("../models/Dispositivo");

exports.registrarDispositivo = async (req, res) => {

  // Método para registrar um dispositivo
  // Retornos:
  // 400 -> Quando faltar um campo na requisição
  // 409 -> Quando tentar registrar um endereço MAC já registrado
  // 201 -> Sucesso, registra o dispositivo no banco de dados
  // 500 -> Quando ocorrer algum erro interno no servidor

  const { name, mac, email, timestamp } = req.body;

  if (!name || !mac || !email || !timestamp) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  try {

    const dispositivoExistente = await Dispositivo.findOne({ mac });

    if (dispositivoExistente) {
      return res.status(409).json({ error: "MAC já registrado." });
    }

    // Lógica para obter um ID:
    // Pega o último ID e soma 1, assim, os IDs ficam incrementais e únicos.
    const ultimoDispositivo = await Dispositivo.findOne().sort({ deviceId: -1 });
    const proximoIdDispositivo = ultimoDispositivo ? ultimoDispositivo.deviceId + 1 : 1;

    const novoDispositivo = new Dispositivo({
      deviceId: proximoIdDispositivo,
      name,
      mac,
      email,
      timestamp
    });

    await novoDispositivo.save();

    return res.status(201).json({ deviceId: proximoIdDispositivo, mac });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro interno ao registrar dispositivo." });
  }
};


exports.listarDispositivos = async (req, res) => {

  // Método para listar todos os dispositivos
  // Retornos:
  // 200 -> Sucesso, retorna a lista de dispositivos cadastrados
  // 500 -> Quando ocorrer algum erro interno no servidor

  try {

    const dispositivos = await Dispositivo.find();
    return res.status(200).json(dispositivos);

  } catch (err) {
    return res.status(500).json({ error: "Erro ao buscar dispositivos." });
  }
};

exports.listarDispositivoPorId = async (req, res) => {

  // Método para listar dispositivos passando o ID
  // Retornos:
  // 404 -> Quando dispositivo não for encontrado
  // 200 -> Sucesso, retorna o dispositivo com o ID solicitado
  // 500 -> Quando ocorrer algum erro interno no servidor

  const { deviceId } = req.params;

  try {

    const dispositivo = await Dispositivo.findOne({ deviceId });

    if (!dispositivo) {
      return res.status(404).json({ error: "Dispositivo não encontrado." });
    }
    return res.status(200).json(dispositivo);

  } catch (err) {
    return res.status(500).json({ error: "Erro ao buscar dispositivo." });
  }
};
