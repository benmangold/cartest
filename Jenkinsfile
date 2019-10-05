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
                    sh 'npm i -g npx'
                    sh 'npm run client-ci'
                }
            }
        }
        stage('e2e') {
            steps {
                nodejs(nodeJSInstallationName: 'NodeJS 10.16.0') {
                    sh 'curl 127.0.0.1:81/api/version'
                    sh 'curl 127.0.0.1:81/index.html'
                    sh 'curl 127.0.0.1:3000'
                    sh 'curl 127.0.0.1:27017'

                }
            }
        }
    }
    post { 
        failure {
            sh 'docker logs mongo'
            sh 'docker logs nodejs'
            sh 'docker logs nginx'
        }
        always { 
            nodejs(nodeJSInstallationName: 'NodeJS 10.16.0') {
                // sh 'npm run cleanup'
            }
        }
    }
}
