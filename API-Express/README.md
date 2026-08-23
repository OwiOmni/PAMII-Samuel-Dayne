# API RESTful de Produtos (Express)

CRUD completo do recurso **produto**, seguindo os princípios REST/RESTful.
Todos os endpoints terminam em `/product` (ou `/product/:id`); o que muda é o **verbo HTTP**.

## Como rodar

```bash
npm install
npm start
```

A API sobe em `http://localhost:3000`.

## Modelo do recurso

```json
{
  "id": 1,
  "name": "Teclado Mecânico",
  "price": 349.9,
  "stock": 12
}
```

## Endpoints

| Verbo    | Rota            | Ação                              | Status de sucesso | Outros status possíveis |
|----------|-----------------|------------------------------------|--------------------|--------------------------|
| GET      | `/product`      | Lista todos os produtos            | `200 OK`           | -                        |
| GET      | `/product/:id`  | Busca um produto pelo id           | `200 OK`           | `404 Not Found`          |
| POST     | `/product`      | Cria um novo produto               | `201 Created`      | `400 Bad Request`        |
| PUT      | `/product/:id`  | Substitui o produto por completo   | `200 OK`           | `400`, `404`             |
| PATCH    | `/product/:id`  | Atualiza parcialmente o produto    | `200 OK`           | `400`, `404`             |
| DELETE   | `/product/:id`  | Remove o produto                   | `204 No Content`   | `404 Not Found`          |

### Por que esses status codes?

- **200 OK**: requisição bem-sucedida com corpo de resposta (GET, PUT, PATCH).
- **201 Created**: recurso criado com sucesso (POST); a resposta inclui o produto criado e o header `Location` apontando para `/product/:id`.
- **204 No Content**: sucesso, mas sem corpo de resposta (DELETE).
- **400 Bad Request**: dados inválidos ou ausentes no corpo da requisição.
- **404 Not Found**: o `id` informado não existe.
- **500 Internal Server Error**: erro inesperado no servidor.

### Diferença entre PUT e PATCH

- **PUT** exige o objeto completo (`name`, `price`, `stock`); ele **substitui** o produto inteiro.
- **PATCH** aceita apenas os campos que você quer alterar; ele faz uma atualização **parcial**.

## Exemplos com curl

```bash
# Listar todos
curl -i http://localhost:3000/product

# Buscar um
curl -i http://localhost:3000/product/1

# Criar
curl -i -X POST http://localhost:3000/product \
  -H "Content-Type: application/json" \
  -d '{"name":"Headset","price":199.9,"stock":8}'

# Atualizar por completo (PUT)
curl -i -X PUT http://localhost:3000/product/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Teclado Mecânico RGB","price":399.9,"stock":10}'

# Atualizar parcialmente (PATCH)
curl -i -X PATCH http://localhost:3000/product/1 \
  -H "Content-Type: application/json" \
  -d '{"price":379.9}'

# Remover
curl -i -X DELETE http://localhost:3000/product/1
```

## Estrutura do projeto

```
produtos-api/
├── server.js
├── package.json
└── src/
    ├── routes/product.routes.js       # define as rotas e os verbos
    ├── controllers/product.controller.js  # regra de negócio + status codes
    └── data/products.js               # "banco" em memória
```