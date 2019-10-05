pipeline {
    agent any
 
    stages {
        stage('Build') {
            steps {
                nodejs(nodeJSInstallationName: 'NodeJS 10.16.0') {
                    sh 'npm run init'
                }
            }
        }
    }
}
