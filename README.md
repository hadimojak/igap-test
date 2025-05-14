# SDD (Simple Dumb Database)

This project consists of two main parts:

1. An **HTTP API** for performing CRUD operations on a simple file-based database with multiple collections and unique IDs per record.
2. A **CLI interface** to interact with the database from the command line.

You can switch between **JSON**, **YAML**, and **Binary** storage types using scripts defined in `package.json`. You can also switch between HTTP API and CLI interface using environment-based scripts.

---

## 📚 API Reference (HTTP)

### 🔧 Create Table

```http
POST {BASEURL}/sdd/create
```

#### Request Body (JSON)

| Parameter   | Type     | Description     |
|-------------|----------|-----------------|
| `tableName` | `string` | **Required**     |

---

### 📂 List All Collections

```http
GET {BASEURL}/sdd/collections
```

_No inputs required._

---

### ➕ Insert Record

```http
POST {BASEURL}/sdd/:tableName
```

#### Request Body (JSON)

| Key   | Value | Description           |
|-------|-------|-----------------------|
| any   | any   | **Required** record data (schema-less) |

---

### 📄 Get All Records

```http
GET {BASEURL}/sdd/:tableName
```

#### Parameters

| Parameter   | Description     |
|-------------|-----------------|
| `tableName` | **Required**     |

---

### 📄 Get Single Record

```http
GET {BASEURL}/sdd/:tableName/:id
```

#### Parameters

| Parameter   | Description     |
|-------------|-----------------|
| `tableName` | **Required**     |
| `id`        | **Required**     |

---

### ✏️ Update Record

```http
PUT {BASEURL}/sdd/:tableName/:id
```

#### Parameters

| Parameter   | Description     |
|-------------|-----------------|
| `tableName` | **Required**     |
| `id`        | **Required**     |

#### Request Body (JSON)

| Key   | Value | Description           |
|-------|-------|-----------------------|
| any   | any   | **Required** updated fields |

---

### ❌ Delete Record

```http
DELETE {BASEURL}/sdd/:tableName/:id
```

#### Parameters

| Parameter   | Description     |
|-------------|-----------------|
| `tableName` | **Required**     |
| `id`        | **Required**     |

---

### 🗑️ Delete Table

```http
DELETE {BASEURL}/sdd/:tableName
```

#### Parameters

| Parameter   | Description     |
|-------------|-----------------|
| `tableName` | **Required**     |

---

## ⚙️ Environment Variables

To run this project, you'll need one of the following `.env` files depending on the storage format you want to use:

### `.json.env`

```env
PORT=3000
SDD_STORE_TYPE=JSON
```

### `.yaml.env`

```env
PORT=3000
SDD_STORE_TYPE=YAML
```

### `.binary.env`

```env
PORT=3000
SDD_STORE_TYPE=BINARY
```

---

## 📌 Notes

- Records are **schema-less**, supporting any arbitrary key-value structure.
- You can interact with the database via HTTP or CLI.
- All data is persisted to disk in the selected format.
