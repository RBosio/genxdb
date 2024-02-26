<div align="center">

<h1>GenXDB - The cli tool to generate models on different orms.</h1>

<p>
  <br>
  <img src="https://raw.githubusercontent.com/RBosio/genxdb/main/src/public/logo.png" alt="GenXDB logo" width="240px" height="240px"/>
  <br><br>
  <em>GenXDB is a command-line interface tool that is used to design and generate models easily and quickly<br> using the json format based on different orms such as TypeORM</em>
  <br>
</p>

</div>

<hr>

## Development Setup

### Prerequisites

- Install [Node.js](https://nodejs.org/en) which includes [Node Package Manager][npm]

### Setting Up a Project

- Create a file in the project root dir named **genxdb.json**.

- Install GenXDB globally:

```
npm install -g genxdb
```

- Run the application:

```
genxdb
```

## Source file example

```json
{
  "database": [
    {
      "name": "user",
      "columns": [
        {
          "name": "id",
          "type": "number"
        },
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "surname",
          "type": "string",
          "nullable": true
        },
        {
          "name": "status",
          "type": "boolean",
          "default": true
        },
        {
          "name": "email",
          "type": "string",
          "unique": true
        },
        {
          "name": "password",
          "type": "string"
        },
        {
          "name": "created_at",
          "type": "Date",
          "default": "CURRENT_TIMESTAMP"
        }
      ],
      "primary": "id",
      "relations": [
        {
          "table": "task",
          "relation": "1-N"
        }
      ]
    },
    {
      "name": "task",
      "columns": [
        {
          "name": "id",
          "type": "number"
        },
        {
          "name": "name",
          "type": "string",
          "length": 150
        }
      ],
      "primary": "id",
      "relations": [
        {
          "table": "user",
          "relation": "N-1"
        }
      ]
    },
    {
      "name": "role",
      "columns": [
        {
          "name": "id",
          "type": "number"
        },
        {
          "name": "name",
          "type": "string"
        }
      ],
      "primary": "id",
      "relations": [
        {
          "table": "user",
          "relation": "N-M"
        }
      ]
    }
  ]
}
```

## Output files example

### user.entity.ts

<img src="https://raw.githubusercontent.com/RBosio/genxdb/main/src/public/user.png" alt="User entity" />

### task.entity.ts

<img src="https://raw.githubusercontent.com/RBosio/genxdb/main/src/public/task.png" alt="Task entity" />

### role.entity.ts

<img src="https://raw.githubusercontent.com/RBosio/genxdb/main/src/public/role.png" alt="Role entity" />

<div align="center">

## Relations

|     Name     | Type |
| :----------: | :--: |
|  One to one  | 1-1  |
| One to many  | 1-N  |
| Many to one  | N-1  |
| Many to many | N-M  |

</div>

## Author

👤**Rocco Bosio**

- Github: [@RBosio](https://github.com/RBosio)

## Contributing

Contributions, issues and feature requests are welcome!

Feel free to check [issues page](https://github.com/RBosio/genXDB/issues).

## Show your support

Give a ⭐️ if this project helped you!

## License

Copyright © 2024 [Rocco Bosio](https://github.com/RBosio).

This project is [MIT](https://github.com/RBosio/GenXDB/blob/main/LICENSE) licensed.
