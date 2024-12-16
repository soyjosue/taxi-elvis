
# Taxi 24 - QIK

Taxi24 es una nueva startup que quiere revolucionar la industria del transporte proporcionando
unasolución de marca blanca

## Requisitos previos
Antes de comenzar, asegúrate de tener instalados los siguientes componentes:

* Node.js v16 o superior
* npm
* Nest CLI (opcional, pero recomendado):
    ```bash
    npm install -g @nestjs/cli
    ```
* Postgres DB
* Docker y Docker-Compose (si desea correr la BD en un contenedor)

## Base de Datos Migración
Si desea, puede ejecutar el docker-compose para tener una BD de postgres. Debe ir al archivo docker-compose.yaml y cambiar las variables de entorno.
```bash
POSTGRES_DB=<database name>
POSTGRES_USER=<database use>
POSTGRES_PASSWORD=<database password>
PGADMIN_DEFAULT_EMAIL=<pgadmin user>
PGADMIN_DEFAULT_PASSWORD=<pgadmin password>
```

Luego ejecutar el siguiente comando para correr los contenedores:
```bash
docker-compose up -d
```
Para iniciar la BD puede tomar los scripts que se encuentra en la carpeta DBScripts o ejecutar el siguiente comando:
```bash
npm run typeorm:run-migrations
```

### Instalación
1. Clona este repositorio:
    ```bash
        git clone <URL-del-repositorio>
        cd <nombre-del-proyecto>
    ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura las variables de entorno creando un archivo `.env` basado en este ejemplo:
   ```bash
    DATABASE_HOST=<Database HOST>
    DATABASE_PORT=<Database PORT>
    DATABASE_USER=<Database USER>
    DATABASE_PASSWORD=<Database Password>
    DATABASE_NAME=<Database Name>
   ```

## Ejecución
Para iniciar la aplicación en modo de desarrollo:
```bash
npm run start:dev
```

# Documentación
Accede a la documentación Swagger en
```bash
    http://localhost:3000/docs
```
La documentación describe todos los endpoints disponible, los parámetros requeridos y las respuestas esperadas.

## Estructura del proyecto
```
src/
├── application/         # Casos de uso.
├── domain/              # Entidades y lógica de negocio pura.
│   ├── entities/        # Entidades principales.
│   ├── enums/           # Enums de la lógica de negocio.
│   ├── exceptions/      # Excepciones de la lógica de negocio.
│   ├── repositories/    # Interfaces de los repositorios.
├── infraestructure      # Implementación técnica y detalles de infraestructura.
│   ├── configs/         # Configuaciones.
│   |   ├── DB/          # Configuración de la base de datos.
│   ├── controllers/     # Controladores que manejan las solicitudes.
│   ├── entities/        # Entidades de TypeOrm.
│   ├── filters/         # Filtros customizados.
│   ├── repositories/    # Repositorios de las entidades.
│   ├── services/        # Servicios.
├── shared/              # Código compartido entre las diferentes capas.
test/                    # Testing
├── unit/                # Pruebas unitarias.
dbScripts /              # Scripts de base de datos
```

## Pruebas
Ejecutar las pruebas unitarias
```bash
npm run test
```
