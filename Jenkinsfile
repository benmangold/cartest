pipeline {
    agent any
    environment {
        CI_ENV    = 'jenkins'
    }
    stages {
        stage('creds') {
            steps {
                nodejs(nodeJSInstallationName: 'NodeJS 10.16.0') {
                    withCredentials([string(credentialsId: 'jenkins-ip', variable: 'API_IP')]) {
                        sh 'rm ./client/src/config.js'
                        sh 'echo export default \\"$API_IP:81\\" >> ./client/src/config.js'
                    }
                }
            }
        }
        stage('build') {
            steps {
                nodejs(nodeJSInstallationName: 'NodeJS 10.16.0') {
                    sh 'npm run build'
                }
            }
        }
        stage('start nginx') {
            steps {
                nodejs(nodeJSInstallationName: 'NodeJS 10.16.0') {
                    withCredentials([usernamePassword(credentialsId: 'cartest-s3-dev', passwordVariable: 'AWS_SECRET_KEY', usernameVariable: 'AWS_ACCESS_KEY')]) {
                        sh 'npm run ci'
                    }
                }
            }
        }
        stage('testing') {
            steps {
                sh 'curl 127.0.0.1:81/api/version'
                sh 'curl 127.0.0.1:81/api/audioLinks'
            }
            // input {
            //     message "App running on 81. Continue?"
            //     ok "Yes, stop the app."
            // }  
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
