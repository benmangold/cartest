pipeline {
    agent any
 
    stages {
        stage('run db container') {
            steps {
                nodejs(nodeJSInstallationName: 'NodeJS 10.16.0') {
                    sh 'npm run db'
                }
            }
        }
        stage('run nodeJS container') {
            steps {
                nodejs(nodeJSInstallationName: 'NodeJS 10.16.0') {
                    sh 'npm run server'
                }
            }
        }
        stage('run nginx container') {
            steps {
                nodejs(nodeJSInstallationName: 'NodeJS 10.16.0') {
                    sh 'npm run client'
                }
            }
        } 
    }
    post { 
        always { 
            echo 'I will always say Hello again!'
        }
    }
}
