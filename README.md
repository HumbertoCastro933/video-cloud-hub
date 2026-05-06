Requisitos Previos
Docker Desktop en running

docker-compose up --build

Importante: Si te sale un error de conexión a PostgreSQL la primera vez, es porque la base de datos aún se estaba configurando. Solo usa control + c y vuelve a ejecutar 

docker-compose up

en el caso de tener que detener y levantarlo desde 0 ejecutar 

docker-compose down -v

Para eliminar todo y volver a empezar con 

docker-compose up --build


Cómo usar la aplicación

Abrir el navegador: Ve a http://localhost:3000

Registrar un video: Usa el formulario para agregar un título y una URL de video (puedes usar un archivo .mp4 que metas en la carpeta /public o un link directo de internet).

Videos de ejemplos: 
En la carpeta Public se encuentra un video llamado Perro.mp4
se puede usar para registrar en el formulario

url video de prueba: 
https://vjs.zencdn.net/v/oceans.mp4
