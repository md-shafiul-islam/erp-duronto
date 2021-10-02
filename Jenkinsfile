pipeline {
    agent any

    

    stages {
        stage('Initializing') {
            steps {
                bat 'npm install'
            }
        }
        stage('Start') {
            steps {
                bat 'npm start'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}