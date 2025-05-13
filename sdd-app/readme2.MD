# SDD (Simple dumb database)

We want to build a very simple Database! The main features of this database are:

- It stores its data on the disk. (for example a file called `data.json`).
- We should be able to store data in multiple `collections`.
- In each collection there are a number of `records`
- Each records should have a unique identifire in its collection.
- Based on an environment variable (`$SDD_STORE_TYPE`) the way it stores data should change. (The default should be json).
- It should at least support two types of storage: `JSON` and `Yaml`.
- Try to use useful design patterns if needed

## Technologies & Dependencies

- You are required to use [`Nest.js`](https://docs.nestjs.com/) + [`Typescript`](https://www.typescriptlang.org/).
- You are allowed to use third party dependencies for working with [`yaml`](https://en.wikipedia.org/wiki/YAML) format.
- Adding dependencies is OK but you should add them reasonably!

## App architecture

Build an API to interact with the database. The API should enable a user to:

- Create and delete a table
- Insert new records in a table
- Find a record in a table
- Delete a record in a table

Here is some example of the API:

```sh
POST localhost:3000/create
{
  tableName: "myTable"
}

GET localhost:3000/myTable

GET localhost:3000/myTable?limit=10&skip=0

GET localhost:3000/myTable/11

POST localhost:3000/myTable
{
  foo: true,
  bar: "Look at me! I'm very simple building a Database"
}

DELETE localhost:3000/myTable/123

PUT localhost:3000/myTable/1
{
  bar: "Hell Yeah! let's update this thing"
}
```

**NOTE: These are just some examples, you can architect your API however you think is the best**
**NOTE: The records are schema-less and must accept any arbitrary data just like a NoSQL database**

## Bonuses!

These are not required, but doing them is a huge bonus! the bonus' points are in order.

- Support binary format for data storage
- Build a CLI app for interacting with the DB. For example:
- Automated unit and/or E2E Tests
- A document explaining the main architecture of your application