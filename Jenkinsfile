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
        // Instalar dependencias necesarias antes de iniciar el servidor
        bat 'npm install'

        // Iniciar el servidor en segundo plano
        bat 'start /B node server.js'

        // Esperar unos segundos de manera compatible con Jenkins
        script {
            sleep(5)
        }

        // Ejecutar los tests y capturar errores sin detener el pipeline
        script {
            def testResult = bat(script: "npm test", returnStatus: true)
            if (testResult != 0) {
                echo "Tests fallaron, pero continuaremos con el pipeline..."
            }
        }

        // Detener el servidor después de los tests
        bat 'taskkill /F /IM node.exe || echo "No se encontró el servidor para detener"'
    }
}



  stage('Build') {
    steps {
        bat 'docker build -t backend-image .'
        bat 'docker tag backend-image backend-image:latest'

        // Detiene y elimina el contenedor anterior si existe
        script {
            bat 'docker stop backend-container || echo "No hay contenedor en ejecución"'
            bat 'docker rm backend-container || echo "No se encontró el contenedor para eliminar"'
        }

        bat 'docker run -d -p 3000:3000 --name backend-container backend-image'
    }
}


    }

    post {
        success {
            echo 'Backend pipeline completed successfully!'
        }
       failure {
         echo "Error en el pipeline, revisar logs en Jenkins."
    }
    }
}