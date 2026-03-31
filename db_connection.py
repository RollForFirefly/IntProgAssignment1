import pymysql

with pymysql.connect(
    host="localhost",
    user="root",
    password="root",
    database="ass1db",
) as connection:
    with connection.cursor() as cursor:
        # queries go here
        create_table_query = """
        CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
        )
        """
        cursor.execute(create_table_query)

        # inserting a new record
        sql_insert = "INSERT INTO users (email, password) VALUES (%s, %s)"
        cursor.execute(sql_insert, ('webmaster@python.org', 'very-secret'))

        # commit
        connection.commit()
        print("Record insert and committed.")