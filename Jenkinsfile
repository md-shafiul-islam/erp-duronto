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
                        sh 'npm install'
                    }else {
                        bat 'npm install'
                    }
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    if (isUnix()) sh 'CI=false npm run build'
                    else bat 'CI=false npm run build'
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
