pipeline {
    agent any
    environment {
        CI_ENV    = 'jenkins'
    }
    stages {
        stage('start mongo') {
            steps {
                nodejs(nodeJSInstallationName: 'NodeJS 10.16.0') {
                    sh 'npm run db'
                }
            }
        }
        stage('start nodejs') {
            steps {
                nodejs(nodeJSInstallationName: 'NodeJS 10.16.0') {
                    withCredentials([usernamePassword(credentialsId: 'cartest-s3-dev', passwordVariable: 'AWS_SECRET_KEY', usernameVariable: 'AWS_ACCESS_KEY')]) {
                        sh 'npm run server-ci'
                    }
                }
            }
        }
        stage('start nginx') {
            steps {
                nodejs(nodeJSInstallationName: 'NodeJS 10.16.0') {
                    withCredentials([string(credentialsId: 'jenkins-ip', variable: 'API_IP')]) {
                        sh 'rm ./client/src/config.js'
                        sh 'echo export default \\"$API_IP:81\\" >> ./client/src/config.js'
                        sh 'npm run client-ci'
                    }
                }
            }
        }
        stage('testing') {
            steps {
                sh 'curl 127.0.0.1:81/api/version'
                sh 'curl 127.0.0.1:81/index.html'
                sh 'curl 127.0.0.1:3000'
                sh 'curl 127.0.0.1:27017'
            }
            input {
                message "App running on 81. Continue?"
                ok "Yes, stop the app."
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
                sh 'npm run cleanup'
            }
        }
    }
}
