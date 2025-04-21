pipeline {
    agent any

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build') {
            steps {
                sh 'docker build -t backend-image .'
                sh 'docker run -d -p 3000:3000 --name backend-container backend-image'
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
