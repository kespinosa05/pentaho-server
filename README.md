# Pentaho Server Docker images 

[![Build Status](https://travis-ci.com/kespinosa05/pentaho-server.svg?branch=master)]

# Funcionalidades:

- Non-root
- Openshift compatible
- PostgresSQL 10

### Variables


| Variable | Detalle |
| ------ | ------ |
| TIMEZONE | Define la zona horaria a utilizar (America/Montevideo, America/El_salvador) |




## Database Config


```bash

docker-compose up -d postgres


```

### Run Scripts

```bash

docker-compose exec -u postgres postgres bash

psql < 1.sql && psql < 2.sql && psql < 3.sql && psql < 4.sql

```

## Start Pentaho

```bash

docker-compose up

```

## Access

```bash

http://localhost:8080

```



License
----

Martin vilche
