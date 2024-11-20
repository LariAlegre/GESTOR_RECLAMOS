# Gestor de reclamos API

Trabajo Práctico integrador final - Grupo 19

### Integrantes

- Lara Alegre
- Lucas Ruiz
- Giovanni Percara
- Annoni Julian


## Levantar el proyecto localmente

- Clonar el repositorio

```bash
  git clone https://github.com/LariAlegre/GESTOR_RECLAMOS
```

- Situarse en la carpeta raíz del proyecto e instalar las dependencias

```bash
  cd gestor-reclamos
```

```bash
  npm install
```

### Base de datos

- Para levantar la base de datos vas a necesitar tener instalado [Docker](https://docs.docker.com/engine/install/)

- Luego de instalar Docker necesitamos agregar en la carpeta raíz de nuestro proyecto un archivo .env con las siguientes variables de entorno

```
# Server
PORT=

# Database
DB_HOST=
DB_PORT=
DB_USER=
DB_NAME=
DB_PASSWORD=
DB_ROOT_PASSWORD=

# Json Web Token
JWT_SECRET=

# Email Service
EMAIL_APP_PASS=
EMAIL_FROM=
```

- Ahora podemos levantar nuestro contenedor con la base de datos Mysql con el siguiente comando

```bash
  docker compose up -d
```

- Una vez que nuestra base de datos esté levantada, debemos ejecutar el script SQL (situado en data/script) para generar las tablas necesarias para el proyecto. 

- Luego de esto podremos levantar nuestra API con el siguiente comando

```bash
  npm run start
```

- Finalmente, para probar que todo salió bien, te dejo el siguiente endpoint de ejemplo para que puedas hacer una solicitud de tipo `GET` y ver una lista de usuarios

```bash
  http://localhost:3000/usuario
```

- Para detener y cerrar el contenedor con la base de datos debemos ejecutar el siguiente comando

```bash
  docker compose down
```
