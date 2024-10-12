# Stage 1: Build
FROM maven:3.8.4-openjdk-17 AS build
WORKDIR /app
COPY . .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn package -DskipTests

# Stage 2: Run
FROM openjdk:17-jdk-alpine
COPY --from=build /app/target/*.jar /app.jar
CMD ["java", "-Xmx512m", "-Xms256m", "-XX:+UseParallelGC", "-jar", "/app.jar"]
