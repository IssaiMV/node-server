# Editors Connection API

Aplicación API de Editors Connection

## Requisitos previos

Asegúrate de tener instalado lo siguiente:

- Node.js (versión 18.15.0)
- npm (versión 9.5.X)

## Instalación

1. Clona este repositorio: `git clone git@github.com:IssaiMV/node-server.git`
2. Navega al directorio del proyecto: `cd node-server`
3. Instala las dependencias: `npm install`

## Configuración

1. Crea un archivo `.env` en la raíz del proyecto basado en el archivo `.env.example` proporcionado.
2. Asegúrate de configurar correctamente las variables de entorno, incluida la conexión a la base de datos PostgreSQL.

## Configuración de la Base de Datos

Si no tienes una instancia de PostgreSQL configurada, puedes utilizar Docker para instalarla y configurarla fácilmente. Sigue los pasos a continuación:

### Instalación de PostgreSQL con Docker

1. Asegúrate de tener Docker instalado en tu máquina.
2. Abre una terminal o línea de comandos y ejecuta el siguiente comando para descargar la imagen de PostgreSQL desde Docker Hub:

```shell
docker pull postgres
```

Esto descargará la imagen oficial de PostgreSQL desde Docker Hub y la almacenará localmente en tu máquina.

### Creación de la instancia de PostgreSQL

3. Ejecuta el siguiente comando para crear un contenedor de PostgreSQL con la configuración necesaria:

```shell
docker run -d -p 5432:5432 --name ec-postgres -e POSTGRES_USER=sa -e POSTGRES_PASSWORD=123qwe321 -e POSTGRES_DB=ec-database postgres
```

Esto creará un contenedor Docker con PostgreSQL en ejecución. Utiliza los siguientes valores para la configuración:

- Usuario: `sa`
- Contraseña: `123qwe321`
- Nombre de la base de datos: `ec-database`

Asegúrate de ajustar estos valores según tu archivo `env`.

4. La base de datos estará disponible en el puerto 5432 de tu máquina local.

## Base de Datos

La aplicación utiliza PostgreSQL como base de datos. Asegúrate de tener un servidor de PostgreSQL en ejecución y actualiza las variables de entorno correspondientes en el archivo `.env`.

### Migraciones

Para ejecutar las migraciones de la base de datos, utiliza el siguiente comando:

```shell
npm run migrate
```

### Crear una nueva migración

Puedes crear un nuevo archivo de migración utilizando el siguiente comando:

```shell
npm run migrate:create <nombre-de-la-migracion>
```

Esto creará un archivo nuevo en el directorio `migrations` que puedes editar con las instrucciones de la migración.

### Ejecutar los seed

Si necesitas cargar datos de prueba en la base de datos, puedes ejecutar los seed con el siguiente comando:

```shell
npm run seed
```

Esto ejecutará los archivos de seed ubicados en el directorio seeds.

## Uso

Asegúrate de haber configurado correctamente las variables de entorno en el archivo .env antes de iniciar la aplicación.

### Desarrollo

Para iniciar la aplicación en modo de desarrollo, utiliza el siguiente comando:

```shell
npm run dev
```

Esto iniciará el servidor utilizando `ts-node-dev` para reiniciar automáticamente cuando detecte cambios en los archivos.

### Producción

Para compilar y ejecutar la aplicación en modo de producción, utiliza los siguientes comandos:

```shell
npm start
```

Esto compilará los archivos TypeScript en JavaScript en el directorio build y luego iniciará el servidor.

## Licencia

Este proyecto está licenciado bajo la [Licencia MIT](LICENSE).
