# Тестовое задание на позицию frontend разработчика

Репозиторий с выполнением тестового задания от компании Фьюче

## Чтобы не деплоить

Чтобы не деплоить, настроен [CI на gh-pages](./.github/workflows/deploy.yml). [Ссылка на результат](https://skavem.github.io/test-task-Future/)

## Деплой

Добавить в .env ключ от Api Google Books в REACT_APP_BOOKS_API_KEY

```
docker build -t google-books-api .

docker run -dp 8789:80 google-books-api
```
