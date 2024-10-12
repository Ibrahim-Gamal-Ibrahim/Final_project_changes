# Start with the official PostgreSQL image
FROM postgres:latest

# Environment variables to set the database user, password, and authentication method
ENV POSTGRES_USER=abdullahelsharkawi
ENV POSTGRES_PASSWORD=postgres

COPY dbScript.sql /docker-entrypoint-initdb.d/

# Expose the default PostgreSQL port
EXPOSE 5432

# The default command to run PostgreSQL

CMD  [ "postgres" ]

