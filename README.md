# API - Notion to Markdown

Esta API converte o conteúdo de um bloco do Notion para o formato Markdown. A chave de API do Notion deve ser enviada no cabeçalho da requisição para autenticação.

## Endpoints

### `GET /v1/notion-to-md/:blockId`

Converte um bloco do Notion para Markdown e retorna o conteúdo.

#### Parâmetros da URL

- `:blockId` (string): O ID do bloco do Notion que será convertido.

#### Cabeçalhos

- `notion-api-key` (string) **(obrigatório)**: A chave de API do Notion para autenticação.

#### Exemplo de Requisição

```bash
curl -X GET "http://localhost:3000/v1/notion-to-md/c8486c56bd5145888a4baf3566c2d585" \
     -H "notion-api-key: secret_abc123xyz456"
```

#### Exemplo de Resposta (200 OK)

```json
{
    "markdown": "# Título do Bloco\n\nEste é o conteúdo convertido do Notion para Markdown."
}
```

#### Erros Comuns

- **401 Unauthorized**: A chave de API do Notion não foi fornecida ou é inválida.
  ```json
  {
      "error": "A chave de API do Notion não foi fornecida."
  }
  ```

- **500 Internal Server Error**: Erro inesperado no servidor.
  ```json
  {
      "error": "Não foi possível converter o bloco do Notion para Markdown.",
      "details": "Detalhes do erro."
  }
  ```

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd nome-do-repositorio
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Crie um arquivo `.env` com a seguinte configuração:
   ```env
   PORT=3000
   ```

4. Inicie o servidor:
   ```bash
   npm start
   ```