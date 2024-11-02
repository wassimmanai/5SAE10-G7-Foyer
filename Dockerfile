FROM openjdk:17-jdk
EXPOSE 8089
ADD target/*.jar achat-1.0.jar
ENTRYPOINT ["java","-jar","/achat-1.0.jar"]
