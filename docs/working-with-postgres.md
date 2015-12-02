
# Working with PostgreSQL

Install Postgres and then optionally pgAdmin

Add user
```
CREATE USER app WITH PASSWORD 'pass';
```

Create database
```
CREATE DATABASE baseapp;
```

Grant privilege
```
GRANT ALL PRIVILEGES ON DATABASE baseapp TO app;
```

Privileges options
SELECT, INSERT, UPDATE, DELETE, RULE, REFERENCES, TRIGGER, CREATE, TEMPORARY, EXECUTE, and USAGE.

Grant read privilege
```
GRANT SELECT ON DATABASE baseapp TO app;
```

Revoke privilege
```
REVOKE ALL PRIVILEGES ON DATABASE baseapp FROM app;
```

Drop user
```
DROP USER app;
```

Grant to tables
```
psql baseapp
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO app;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO app;
```

Create session table
```
CREATE TABLE "session" (
    "sid" varchar NOT NULL COLLATE "default",
    "sess" json NOT NULL,
    "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;
```

Create sample table
```

```