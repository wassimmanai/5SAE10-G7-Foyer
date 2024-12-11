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

        stage('Run Unit Tests') {
                                    steps {
                                        echo 'Running Unit Tests: '

                                            sh 'mvn test -X'

                                    }
                                }

        stage('Publish Test Results') {
                                            steps {
                                                echo 'Publishing Test Results: '
                                                junit '**/target/surefire-reports/*.xml'
                                            }
                                        }


        stage('SonarQube') {
            steps {
                echo 'Analyse de la Qualité du Code : ';
                sh 'mvn sonar:sonar -Dsonar.login=admin -Dsonar.password=Sonarqubeagent47*';
            }
        }
      /*   stage("Quality Gate") {
                                   steps {
                                       timeout(time: 5, unit: 'MINUTES') {
                                           waitForQualityGate abortPipeline: true
                                       }
                                   }
                               } */

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
                sh 'docker compose up --build -d';
            }
        }

        stage('Grafana') {
                   steps {
                       echo 'Grafana is available at: http://192.168.33.11:3000'; // Replace with your actual Grafana URL
                   }
               }

        stage('Test Metrics') {
                    steps {
                        echo 'Testing if metrics are available in Grafana...'
                        // You can use curl to hit your metrics endpoint
                        echo 'curl -f http://192.168.33.11:8089/tpfoyer/actuator/prometheus'
                           }
                               }





    }
 post {
        always {
            echo 'Pipeline execution completed!'
        }
        success {
            mail to: 'wassim.manai@esprit.tn',
                subject: "Succès du Build: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """
                Salut wassim manai,

                Le build du projet '${env.JOB_NAME}' s'est terminé avec succès.

                Détails :
                - Numéro du Build : ${env.BUILD_NUMBER}
                - Statut du Build : SUCCESS
                - Durée du Build : ${currentBuild.durationString}

                Vous pouvez consulter la sortie complète de la console ici :
                ${env.BUILD_URL}console

                Cordialement,
                Jenkins CI/CD
                """
        }
        failure {
            mail to: 'wassim.manai@esprit.tn',
                subject: "Échec du Build: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """
                Salut wassim manai,

                Le build du projet '${env.JOB_NAME}' s'est terminé avec le statut : FAILURE.

                Détails :
                - Numéro du Build : ${env.BUILD_NUMBER}
                - Statut du Build : FAILURE
                - Durée du Build : ${currentBuild.durationString}

                Vous pouvez consulter la sortie complète de la console ici :
                ${env.BUILD_URL}console

                Cordialement,
                Jenkins CI/CD
                """
        }
    }
}