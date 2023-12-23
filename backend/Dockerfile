FROM maven:latest as stage1
WORKDIR /server
COPY pom.xml /server
RUN mvn dependency:resolve
COPY . /server
RUN mvn clean
RUN mvn package -DskipTests

FROM openjdk:17 as final
COPY --from=stage1 /server/target/*jar app.jar
EXPOSE 3002
CMD ["java", "-jar", "app.jar"]