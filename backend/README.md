
# API desenvolvida para o Desafio para Desenvolvedor Full-Stack P&D (Back-end) (PADO)

Este projeto é uma API RESTful desenvolvida em Node.js com Express e MongoDB para cadastrar, listar e buscar dispositivos.

Endpoints:
- POST /registrar

### Schema Registro
```json
{
  "name": "nome do dispositivo",
  "mac": "endereço MAC do dispositivo",
  "email": "email",
  "timestamp": 1712133000
}
```

- GET /listar
- GET /listar/:deviceId

## Passos para executar o código:

### Clone o repositório
 ```bash
 git clone https://github.com/GabrielMolinaa/padotec.coding.tests.git
```
### Entre na pasta do repositorio clonado e na pasta backend
```bash
cd repositorio_clonado
cd backend
```

### Digite o seguinte comando no terminal estando na pasta 'backend' para subir os containers da API e do MongoDB 
```bash
docker-compose up --build
```

# A API estará disponível em:
 - http://localhost:3000
