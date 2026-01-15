pipeline {
  agent any

  options {
    // keep logs compact, fail fast on first failed stage
    timestamps()
  }

  tools {
    nodejs 'node-lts'  // define 'node-lts' in Jenkins (Manage Jenkins → Global Tool Configuration)
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Lint') {
      steps {
        sh 'npm run lint'
      }
    }

    stage('Test') {
      steps {
        sh 'npm run test:cov'
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'coverage/**', fingerprint: true, onlyIfSuccessful: true
    }
  }
}