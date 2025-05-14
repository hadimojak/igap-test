
# sdd


This project consists of two different parts, the first part of which is use http request fot do crud oprations on sample data base on disk with mutiple collections and unique ids for each record.

switch between json yaml and binary data bases can be possible with scripts from package.json 
and also can switch from hhtp request to cli command line with scripts.

## API Reference for http request

## createTable

```http
  POST {BASEURL}/sdd/create 
```
- body(json):
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `tableName` | `string` | **Required** |

## listCollections(no inputs)

```http
  GET {BASEURL}/sdd/collections
```
## insertRecord

```http
  POST {BASEURL}/sdd/:tableName
```
- body(json):
| Key | Value     | Description                |
| :-------- | :------- | :------------------------- |
| `key` | `any` | **Required** |

## getAllRecords

```http
  GET {BASEURL}/sdd/:tableName
```
- params:
| Parameter   | Description                |
| :--------  | :------------------------- |
| `tableName` | **Required** |

## getRecord

```http
  GET {BASEURL}/sdd/:tableName/:id
```
- params:
| Parameter |  Description                |
| :-------- |  :------------------------- |
| `tableName` |  **Required** |
| `id` |  **Required** |

## updateRecord

```http
  PUT {BASEURL}/sdd/:tableName/:id
```
- params:
| Parameter  | Description                |
| :--------  | :------------------------- |
| `tableName`  | **Required** |
| `id`  | **Required** |

- body(json):
| Key | Value     | Description                |
| :-------- | :------- | :------------------------- |
| `key` | `any` | **Required** |

## deleteRecord

```http
  DELETE {BASEURL}/sdd/:tableName/:id
```
- params:
| Parameter  | Description                |
| :--------  | :------------------------- |
| `tableName`  | **Required** |
| `id`  | **Required** |

## deleteTable

```http
  DELETE {BASEURL}/sdd/:tableName
```
- params:
| Parameter  | Description                |
| :--------  | :------------------------- |
| `tableName`  | **Required** |


## Environment Variables

To run this project, you will need to add the following environment variables to 3 kibnd of .env file


- .json.env:
`PORT=3000`
`SDD_STORE_TYPE=JSON`

- .yaml.env:
`PORT=3000`
`SDD_STORE_TYPE=YAML`

- .binary.env:
`PORT=3000`
`SDD_STORE_TYPE=BINARY`