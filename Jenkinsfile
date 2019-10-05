pipeline {
    agent any
    environment {
        CI_ENV    = 'jenkins'
    }
    stages {
        stage('e2e') {
            nodejs(nodeJSInstallationName: 'NodeJS 10.16.0') {
                sh 'npm run ci'
                sh 'curl 127.0.0.1:81'
            }
        }
    }
    post { 
        always { 
            nodejs(nodeJSInstallationName: 'NodeJS 10.16.0') {
                sh 'npm run cleanup'
            }
        }
    }
}
