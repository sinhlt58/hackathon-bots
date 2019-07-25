pipeline {
    agent { docker { image 'python:3.6-slim' } }

    environment {
        APPLICATION_ENV = 'Testing'
    }

    stages {
        stage('Installation') {
            steps {
                sh 'python --version'
                sh 'pip --version'
                sh 'pip install flake8 black'
            }
        }

        stage('Check format') {
            steps {
                sh 'black --check _server'
                sh 'flake8 _server'
            }
        }
    }

    post {
        success {
            mail to: 'khacdoi1995@gmail.com,sinhlt58@gmail.com',
                from: 'jekins.botcuaban@gmail.com',
                subject: "Success Pipeline: ${currentBuild.fullDisplayName}",
                body: "${env.PROJECT_NAME} - Build # ${env.BUILD_NUMBER} - ${env.BUILD_STATUS}:\nBuiled successfully with ${env.BUILD_URL}"
        }

        failure {
            mail to: 'khacdoi1995@gmail.com,sinhlt58@gmail.com',
                from: 'jekins.botcuaban@gmail.com',
                subject: "Failed Pipeline: ${currentBuild.fullDisplayName}",
                body: "${env.PROJECT_NAME} - Build # ${env.BUILD_NUMBER} - ${env.BUILD_STATUS}:\nSomething is wrong with ${env.BUILD_URL}"
        }
    }
}
