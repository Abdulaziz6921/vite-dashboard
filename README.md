# Панель управления данными (Dashboard)

Это SPA-приложение на Vue.js для управления и анализа данных по доходам, заказам и остаткам товаров (stocks).

---

## Live Demo (Netlify)

[Смотреть Dashboard онлайн](https://vite-dashboard-abdulaziz.netlify.app/)

## Структура проекта

- **components/** – переиспользуемые компоненты:

  - `ChartCard.vue` – компонент для отображения графиков (pie, bar, line, doughnut) с ECharts.
  - `DataTable.vue` – компонент таблицы с сортировкой, форматированием чисел и дат.
  - `FiltersPanel.vue` – панель фильтров.
  - `Pagination.vue` – компонент пагинации.

- **composables/** – кастомные хуки для работы с API:

  - `useApi.js` – универсальный хук для работы с любым эндпоинтом (`incomes`, `orders`, `stocks`, `sales`).

- **services/** – API сервис:

  - `api.js` – Axios клиент с ключом API, базовым URL и методами для каждого эндпоинта.

  - **netlify/functions/** – серверные функции для Netlify (`proxy.js`):
  - Позволяет безопасно вызывать API через HTTPS, не раскрывая API-ключи на фронтенде.

- **views/** – страницы приложения:
  - `Incomes.vue` – страница доходов с графиком по складам, фильтрами и таблицей.
  - `Orders.vue` – страница заказов с графиком по общей сумме на складе, фильтрами и таблицей.
  - `Sales.vue` – страница продаж с графиком по ежемесячному количеству продаж и таблицей.
  - `Stocks.vue` – страница остатков товаров с графиком по складам и таблицей.

---

## Работа с API

- Базовый URL хранится в `.env` файле

- Методы API:
  - `getIncomes(params)`
  - `getOrders(params)`
  - `getSales(params)`
  - `getStocks(params)`

### Формирование параметров запроса (`buildParams`)

- Для **Incomes, Orders, Sales**: по умолчанию выбираются данные за последний месяц, если фильтры даты не заданы.
- Для **Stocks**: всегда выбираются данные за **текущую дату**, если фильтры даты не заданы.

## Установка

```
git clone https://github.com/Abdulaziz6921/vite-dashboard.git

cd vite-dashboar

npm install

```

## Запуск в режиме разработки

```
npm run dev
```
