# Aplicação (Front-end) de monitoramento de logs desenvolvida para o Desafio para Desenvolvedor Full-Stack P&D (Font-End) (PADO)

Este projeto utiliza React + Vite como tecnologia e fornece a visualização de logs de acesso a dispositivos de segurança.  

Os dados utilizados foram fornecidos pela Pado através do arquivo `data.json`, consumidos via fetch como se fosse uma API.

## Funcionalidades

- Visualização de logs por **Usuário** ou por **Dispositivo**
- Filtro dinâmico por nome, userId, MAC ou lockId

OBS: Tomei a liberdade para inserir Tailwindcss e Mui Material para facilitar a estilização.

## Passos para executar o código

### Clone o repositório

```bash
git clone https://github.com/GabrielMolinaa/padotec.coding.tests.git
```

### Entre na pasta do repositorio clonado e na pasta frontend
```bash
 cd repositorio_clonado
 cd frontend
 ```
### Digite o seguinte comando no terminal estando na pasta 'frontend' para construir a imagem Docker
```bash
docker build -t desafio-front-end .
 ```

### Digite o seguinte comando para rodar o container
```bash
docker run -d -p 8080:80 desafio-front-end
 ```

# A aplicação estará disponível em:
- http://localhost:8080