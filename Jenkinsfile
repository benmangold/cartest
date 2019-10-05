pipeline {
    agent any
 
    stages {
        stage('run db container') {
            steps {
                nodejs(nodeJSInstallationName: 'NodeJS 10.16.0') {
                    sh 'npm run db'
                    sh 'docker stop mongo'
                }
            }
        }
        stage('run nodeJS container') {
            steps {
                nodejs(nodeJSInstallationName: 'NodeJS 10.16.0') {
                    sh 'npm run server'
                    sh 'docker stop nodejs'
                }
            }
        }
        stage('run nginx container') {
            steps {
                nodejs(nodeJSInstallationName: 'NodeJS 10.16.0') {
                    sh 'npm run client'
                    sh 'docker stop nginx'
                }
            }
        }
    }
}
