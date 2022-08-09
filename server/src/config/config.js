require('dotenv').config()

const CONFIG = {
    firebase: {
        type: process.env.FIREBASE_TYPE,
        project_id:  process.env.FIREBASE_PROJECT_ID,
        private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
        private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        client_email: process.env.FIREBASE_CLIENTE_EMAIL,
        client_id: process.env.FIREBASE_CLIENT_ID,
        auth_uri: process.env.FIREBASE_AUTH_URI,
        token_uri: process.env.FIREBASE_TOKEN_URI,
        auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
        client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL
    },
    mongoDB: {
        mongoDB_URL: process.env.MONGODB_URL
    },
    db_mysql:{
        db_mysql_name: process.env.DB_SQL,
        db_mysql_user: process.env.DB_SQL_USER,
        db_mysql_pass: process.env.DB_SQL_PASSWORD,
        db_mysql_host: process.env.DB_SQL_HOST,
    }
}

module.exports =  CONFIG;