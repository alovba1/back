  Proyecto: Back

## ▪  Estructura del Pipeline

Este pipeline está compuesto por las siguientes etapas:
Configuracion en la plataforma de Jenkins:
1. **Construcción (Build):**

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



2. **Pruebas (Testing):**

 stage('Run Tests') {
            steps {
                bat 'npm test'
            }
        }


3. **Despliegue (Deployment):**

 bat 'docker build -t backend-image .'

 bat 'docker tag backend-image backend-image:latest'

 bat 'docker run -d -p 3000:3000 --name backend-container backend-image'

4. **Monitoreo (Monitoring):**

**En el archivo Dokerfile:**

**asegurar de que el contenedor está funcionando correctamente**

HEALTHCHECK --interval=10s --timeout=5s --start-period=5s \

CMD curl -f http://localhost:3000/api/message || exit 1


> **¿ por qué fue diseñado así?**  
Fue diseñado para asegurar calidad desde etapas tempranas, reducir errores y facilitar el despliegue continuo.

## ▪ Cómo ejecutar localmente y probar el despliegue.

1. Clona el repositorio:
   bash
   git clone https://github.com/alovba1/back.git
   cd tu-repo
Construye el proyecto:

bash
Copiar
Editar
./gradlew build
Crea la imagen Docker:

bash
Copiar
Editar
docker build -t mi-aplicacion .
Despliega con Docker Compose:

bash
Copiar
Editar
docker-compose up
Accede a: http://localhost:8080

📈 Monitoreo y Métricas
Accede a Grafana:

URL: http://localhost:3000

Usuario: admin

Contraseña: admin

Paneles disponibles:

Uso de CPU y memoria

Latencia

Errores por segundo

Disponibilidad

🚀 Próximos Pasos
Integrar pruebas de seguridad

Despliegue en QA/Producción

Configurar rollback automático

Añadir alertas

Escalamiento automático

yaml
Copiar
Editar

---

### 💾 Paso 3: Guarda el archivo

- En tu editor, presiona **Ctrl + S** (o **Cmd + S** en Mac) para guardar.

---

### ✅ Paso 4: Verifica en GitHub (si aplica)

Si estás trabajando en un repositorio en GitHub:

1. Haz `commit` de los cambios:
   ```bash
   git add README.md
   git commit -m "Actualiza estructura del README"
   git push
Ve a tu repositorio en GitHub y verás el nuevo formato en la página principal.

