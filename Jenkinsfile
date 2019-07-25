pipeline {
    agent { docker { image 'python:3.6-slim' } }
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
}
