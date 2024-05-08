# Для работы с преоктом необходимо установить Docker

```
https://www.docker.com
```

# Для запуска проекта, необходимо выполнить следующие шаги:

1. Склонировать репозиторий с api

   ```
   git@github.com:fra1m/TestLesson.git
   ```

2. Сбилдите контейнер
   ```
   docker-compose up --build
   ```
   или в фоновом режиме если не нужен логгер
   ```
   docker-compose up --build -d
   ```

# Тест через Postman

1. Откройте Postman
2. Вставьте ссылку из логера (если меня .development.env) и используйте CRUD операции
   ```
   http://localhost:8080
   ```

# REST API - CRUD операции

- `POST http://localhost:8080/user/registration` – Регистрация пользователя.
- `GET http://localhost:8080/user/auth` – Аутентификацию пользователя.
- `GET http://localhost:8080/user` - Получение всех пользователй (JWT).
- `GET http://localhost:8080/lessons/:id?` – Получение урока по айди (JWT).
- `POST http://localhost:8080/lessons` – Получения занятий с оценками пользователей (JWT).
- `GET http://localhost:8080/lessons/:id/evaluations` – Проставление оценки за занятие (JWT).

# Полная документация. Swagger:

- `http://localhost:3000/swagger`