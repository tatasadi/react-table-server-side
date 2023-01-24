# react-table-serverside

A react application, that uses react-table with serverside pagination, filtering and sorting.

Data in `db.json` is generated via [Mockaroo](https://www.mockaroo.com/).

## Installation

```
npm install
npm install -g json-server
npm install -g concurrently
```

## run

```
npm run dev
```

## Paginate

`http://localhost:3000/people?_page=1&_limit=10`

## Filter

`http://localhost:3000/people?first_name_like=a`

## Sort

`http://localhost:3000/people?_page=1&_limit=10&_sort=first_name&_order=asc`
