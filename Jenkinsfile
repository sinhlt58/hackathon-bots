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
                subject: "Success Pipeline: ${currentBuild.fullDisplayName}"
        }

        failure {
            mail to: 'khacdoi1995@gmail.com,sinhlt58@gmail.com',
                subject: "Failed Pipeline: ${currentBuild.fullDisplayName}",
                body: "Something is wrong with ${env.BUILD_URL}"
        }
    }
}
