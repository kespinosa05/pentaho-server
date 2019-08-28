drop database if exists quartz;
drop user if exists pentaho_user;

CREATE USER pentaho_user PASSWORD 'password';

CREATE DATABASE quartz  WITH OWNER = pentaho_user  ENCODING = 'UTF8' TABLESPACE = pg_default;

GRANT ALL ON DATABASE quartz to pentaho_user;

