CREATE DATABASE IF NOT EXISTS cbgames_db;
CREATE USER 'cbgames_user'@'%' IDENTIFIED BY 'devtest123';
GRANT ALL PRIVILEGES ON cbgames_db.* TO 'cbgames_user'@'%';
FLUSH PRIVILEGES;