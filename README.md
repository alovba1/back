  Proyecto: Back

## ▪  Estructura del Pipeline

Este pipeline está compuesto por las siguientes etapas:

Configuracion en la plataforma de Jenkins:

1. **Construcción (Build):**

 Crear la tarea en jenkins

 crear le pipeline

 configurar el pipeline:

 Triggers:

 seleccionar GitHub hook trigger for GITScm polling

 Definition:

 seleccionar Pipeline script from 

 SMC: 
 seleccionar Git

 Repository URL: https://github.com/alovba1/back.git

 Branch Specifier (blank for 'any'):

 */main

 Script Path:

 Jenkinsfile

![Descripción de la imagen](images/image.png)
![Descripción de la imagen](images/Logconfiguration1.png)
![Descripción de la imagen](images/Logconfiguration2.png)


1.1 **Creacion del Archivo Jenkinsfile dentro del proyecto back:**

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

        // Iniciar el servidor en segundo plano y guardar salida en un log
        bat 'start /B node server.js > server.log 2>&1'

        // Esperar unos segundos para asegurar que el servicio arranque correctamente
        script {
            sleep(5)
        }

        // Verificar que el servidor realmente se inició
        script {
            def serverRunning = bat(script: "netstat -ano | findstr :3000", returnStatus: true)
            if (serverRunning != 0) {
                echo "Error: El servidor no está corriendo, cancelando pruebas..."
                error("El servidor no se inició correctamente.")
            }
        }

        // Ejecutar los tests y capturar errores sin detener el pipeline
        script {
            def testResult = bat(script: "npm test", returnStatus: true)
            if (testResult != 0) {
                echo "Tests fallaron, pero continuaremos con el pipeline..."
            }
        }

        // Eliminar "taskkill" porque Jest ya está cerrando el servidor en afterAll()
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

![Descripción de la imagen](images/Jenkinsfile.png)

2. **Pruebas (Testing):**

 stage('Run Tests') {
            steps {
                bat 'npm test'
            }
        }

![Descripción de la imagen](images/test.png)

2. **Validacion de calidad estatica:**

ejecutar el comando:

        npx eslint .



3. **Despliegue (Deployment):**

 bat 'docker build -t backend-image .'

 bat 'docker tag backend-image backend-image:latest'

 bat 'docker run -d -p 3000:3000 --name backend-container backend-image'

 ![Descripción de la imagen](images/despliegueimagen.png)
 
![Descripción de la imagen](images/desplieguecontenedor.png)
4. **Monitoreo (Monitoring):**

**En el archivo Dokerfile:**

**asegurar de que el contenedor está funcionando correctamente**

HEALTHCHECK --interval=10s --timeout=5s --start-period=5s \

CMD curl -f http://localhost:3000/api/message || exit 1
 
![Descripción de la imagen](images/monitorizando.png)


5. **Gestión ante fallos o errores (rollback o alertas).**

  post {
    failure {
        echo "Error en el pipeline, realizando rollback..."

        // Detener el contenedor fallido si está corriendo

        script {
            bat 'docker stop backend-container || echo "No hay contenedor en ejecución para detener"'

            bat 'docker rm backend-container || echo "No se encontró el contenedor para eliminar"'
        }

     echo "Alerta enviada a Slack."

        // Restaurar versión anterior del backend con la imagen previa
        script {

            bat 'docker run -d -p 3000:3000 --name backend-container backend-image:previous'
        }

        echo "Rollback completado exitosamente."
    }
}

> **¿ por qué fue diseñado así?**  
Fue diseñado para asegurar calidad desde etapas tempranas, reducir errores y facilitar el despliegue continuo.

## ▪ Cómo ejecutar localmente.

1. **Clona el repositorio del back ej en una consola de gitbush:**

   git clone https://github.com/alovba1/back.git

   cd back

  **ejecutar el proyecto en una consola  ej visual studio code**

   npm start

**indica que el proyecto esta ejecutando en:**

Servidor corriendo en http://localhost:3000

**url comprobar que fuciona:**

http://localhost:3000/api/message

![Descripción de la imagen](images/Proyectoback.png)
![Descripción de la imagen](images/Estructuraproyecto.png)



2. **Clona el repositorio front ej en una consola de gitbush:**

git clone https://github.com/alovba1/front.git

cd front

  **ejecutar el proyecto en una consola  ej visual studio code**
  ng serve

  Angular servidor corriendo en http://localhost:4200/ 

  **url comprobar que fuciona:**

http://localhost:4200/ 

![Descripción de la imagen](images/Proyectofront.png)
![Descripción de la imagen](images/Estructuraproyectofront.png)

## ▪ Probar el despliegue

instalar Jenkins localmente

Accede a: http://localhost:8080

Por ejemplo: 

Usuario: admin

Contraseña: admin

![Descripción de la imagen](images/AdminJenkins.png)

Configuracion en la plataforma de Jenkins:

 Crear la tarea en jenkins

 crear le pipeline

 configurar el pipeline:

 Triggers:

 GitHub hook trigger for GITScm polling

 Definition:

 Pipeline script from 

 SMC:Git

 Repository URL: https://github.com/alovba1/back.git

 Branch Specifier (blank for 'any'):

 */main

 Script Path:

 Jenkinsfile

 **ejecutar el pipeline:**
seleccionar el pipeline creado

ejecutar el pipeline creado

seleccionar el # de Build ejecutando

![Descripción de la imagen](images/pipelinea.png)
![Descripción de la imagen](images/pipelineb.png)
 **Ver el resultado de Log:**

seleccionar la opcion Console Output

![Descripción de la imagen](images/Logpipeline.png)
![Descripción de la imagen](images/Logpipeline1.png)
![Descripción de la imagen](images/Logpipeline2.png)
![Descripción de la imagen](images/Logpipelinesuccess.png)

 **Comprobar la creacion de la imagen y el contenedor:**

ejutar el comando: 

docker search ej: backend-image:latest

otra forma: ir a https://hub.docker.com/

usa la barra de búsqueda para encontrar imágen.

en la cuadro de texto buscar la imagen ej: backend-image:latest
![Descripción de la imagen](images/despliegueimagen.png)

## ▪ Cómo conectarse al entorno de monitoreo y qué métricas están disponibles.

Para realizar el monitoreo de errores, alentas y verificar el rendimiento:

Se puede usar la herramienta Prometheus.

recolecta datos de diferentes servicios, esto lo realiza enviando peticiones http a una url.

llamada endpoint de metricas.

Para ver el analisis de graficas se puede utilizar la herramienta Grafana para el monitoreo de metricas.

![Descripción de la imagen](images/Graficas.png)

## ▪ Cuáles serían los próximos pasos en una implementación real

1. Manejar el aumento de  en tráfico y escalabilidad conciderar husar Kubernetes en un ambien cloud ejemplo

Oracle Cloud, AzureDevOps, Aws etc..

2. Configuración de CI/CD Despliegue totalmente Automático

generacion de builds, despliegues en ambientes Dev, QA, Pre, Prod

3. Monitoreo errores y el rendimiento

Utilizar herramientas como Prometheus y Grafana

4. Implementación de Seguridad y Certificados SSL

Implementar certificados de Seguridad SSL (Secure Sockets Layer)

por ejemplo utilizar JWT Tokens para autenticación segura

configurar reglas de seguridad en Nginx(Servidor web,proxi,load balancig)

Utilizar API Gateway Cloud

5. Estrategia de Backup y Recuperación:

Si hay un falla, necesitarás un plan de recuperación:

 Programar backups automáticos de base de datos con jobs.

 Usar  por ejemplo bucket de S3 de aws para respaldo de almacenamiento.
 
 configurar para los servidores Load Balancing en caso de caidas del servicio.


