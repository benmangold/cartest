pipeline {
    agent any
    environment {
        CI_ENV    = 'jenkins'
    }
    stages {
        stage('mongo') {
          steps {
              nodejs(nodeJSInstallationName: 'NodeJS 10.16.0') {
                  sh 'npm run db'
              }
            }
        }
        stage('nodejs') {

        steps {
              nodejs(nodeJSInstallationName: 'NodeJS 10.16.0') {
                withCredentials([usernamePassword(credentialsId: 'cartest-s3-dev', passwordVariable: 'AWS_ACCESS_KEY', usernameVariable: 'AWS_SECRET_KEY')]) {
                  sh 'npm run server-ci'
                }
              }
            }
        }
        stage('nginx') {
            steps {
              nodejs(nodeJSInstallationName: 'NodeJS 10.16.0') {
                  sh 'npm run client-ci'
              }
            }
        }
        stage('e2e') {
          steps {
              nodejs(nodeJSInstallationName: 'NodeJS 10.16.0') {
                  sh 'curl 127.0.0.1:81'
              }
            }
        }
    }
    post { 
        always { 
            nodejs(nodeJSInstallationName: 'NodeJS 10.16.0') {
                sh 'docker ps -a'
                sh 'docker logs mongo'
                sh 'docker logs nginx'
                sh 'docker logs nodejs'
                sh 'npm run cleanup'
            }
        }
    }
}
