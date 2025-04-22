pipeline {
    agent any

    stages {
      

        stage('Setup Node.js Environment') {
            steps {
                withEnv(["PATH=C:\\Program Files\\nodejs;${env.PATH}"]) {
                    bat 'node --version'
                    bat 'npm --version'
                }
            }
        }

        stage('Check Environment') {
            steps {
                bat 'echo %PATH%'
                bat 'node --version'
                bat 'npm --version'
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
        bat 'docker tag backend-image backend-image:latest'
        bat 'docker run -d -p 3000:3000 --name backend-container backend-image'

        script {
            def result = bat(script: "docker ps | findstr backend-container", returnStatus: true)
            if (result != 0) {
                echo "Error detectado, realizando rollback..."
                bat "docker stop backend-container"
                bat "docker run -d -p 3000:3000 --name backend-container backend-image:previous"
            }
        }
    }
}
    }

    post {
        success {
            echo 'Backend pipeline completed successfully!'
        }
       failure {
        mail to: 'curribifine@gmail.com',
             subject: 'Error en el Pipeline de Jenkins!',
             body: 'Hubo un error en el despliegue de Docker. Revisa los logs en Jenkins.'
    }
    }
}
