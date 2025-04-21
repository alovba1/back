pipeline {
    agent any

    stages {

        stage('Check Environment') {
            steps {
                bat 'echo $PATH'
                bat 'node --version'
                bat 'npm --version'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                bat 'npm test'
            }
        }

        stage('Build') {
            steps {
                bat 'docker build -t backend-image .'
                bat 'docker run -d -p 3000:3000 --name backend-container backend-image'
            }
        }
    }

    post {
        success {
            echo 'Backend pipeline completed successfully!'
        }
        failure {
            echo 'Backend pipeline failed.'
        }
    }
}
