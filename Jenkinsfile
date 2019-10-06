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
                        // sh 'rm ./client/src/config.js'
                        // sh "echo export default '$API_IP:81' >> ./client/src/config.js"
                        sh 'npm i -g npx'
                        sh 'npm run client-ci'
                    }
                }
            }
        }
        stage('live check') {
            steps {
              echo 'App running on port 81 for live check'
            }
            input {
                message "App running on port 81. Continue?"
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
