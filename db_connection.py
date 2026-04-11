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

        create_catalogue_query = """
        CREATE TABLE IF NOT EXISTS item (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(8, 2) NOT NULL,
        description VARCHAR(255) NOT NULL,
        image VARCHAR(255)
        )
        """
        cursor.execute(create_catalogue_query)

        # inserting a new record
        catalogue_insert = "INSERT INTO catalogue (name, price, description, image) VALUES (%s, %s, %s, %s)"
        cursor.execute(catalogue_insert, ('soap', '19.99', 'It is soap.', 'BLANK'))
        cursor.execute(catalogue_insert, ('cheese', '6.99', 'Processed cheese.', 'BLANK'))

        # commit
        connection.commit()