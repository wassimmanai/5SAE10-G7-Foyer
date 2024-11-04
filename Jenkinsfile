pipeline {
    agent any

    stages {
        stage('Git') {
            steps {
                echo 'Recup Code de Git : ';
                git branch : 'wassimmanai-5SAE10-G7',
                url :'https://github.com/wassimmanai/5SAE10-G7-Foyer',
                credentialsId: '10';
            }
        }

        stage('Maven Clean') {
            steps {
                echo 'Nettoyage du Projet : ';
                sh 'mvn clean';
            }
        }

        stage('Maven Compile') {
            steps {
                echo 'Construction du Projet : ';
                sh 'mvn compile';
            }
        }

        stage('SonarQube') {
            steps {
                echo 'Analyse de la Qualité du Code : ';
                sh 'mvn sonar:sonar -Dsonar.login=admin -Dsonar.password=Sonarqubeagent47*';
            }
        }

        stage('Maven Package') {
            steps {
                echo 'Création du livrable : ';
                sh 'mvn package -DskipTests';
            }
        }

   stage ('nexus') {
            steps {
               sh 'mvn deploy -Dmaven.test.skip=true';
            }
        }

        stage('Image') {
            steps {
                echo 'Création Image : ';
                sh 'docker build -t wassimmanai/achat-image:1.0.9 .';
            }
        }

     
        stage('Dockerhub') {
            steps {
                echo 'Push Image to dockerhub : ';
                sh 'docker login -u wassimmanai -p 201JMT5633';
                sh 'docker push wassimmanai/achat-image:1.0.9';
            }
        }

        stage('Docker-Compose') {
            steps {
                echo 'Staet Backend + DB : ';
                sh 'docker compose down '
                sh 'docker compose up -d';
            }
        }

        stage('Grafana') {
                   steps {
                       echo 'Grafana is available at: http://192.168.33.11:3000'; // Replace with your actual Grafana URL
                   }
               }

    }
}