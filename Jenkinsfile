pipeline {
    agent any

    tools {
        nodejs 'node-v14.18.0'
    }

    stages {
        stage('Initializing') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npm rm package-lock.json'
                        sh 'npm cache clean --force'                        
                        sh 'npm install'
                        sh 'npm audit fix'
                    }else {
                        sh 'npm rm package-lock.json'
                        bat 'npm npm cache clean --force'
                        bat 'npm install'
                        bat 'npm audit fix'
                    }
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    if (isUnix()) sh 'npm run build'
                    else bat 'npm run build'
                }
            }
        }

        stage('Start Or Deploye') {
            steps {
                script {
                    if (isUnix()) sh 'npm strat'
                    else bat 'npm strat'
                }
            }
        }
    }
}
