import pymysql

conn = pymysql.connect(
    host="localhost",
    user="root",
    password="root",
    database="ass1db"
)

cursor = conn.cursor()

cursor.execute('select * from catalogue;')

query = 'select * from catalogue;'

cursor.execute(query)

insert_query = 'INSERT INTO catalogue VALUES (8, "purple", 2.22, "he urple", "BLANK");'

cursor.execute(insert_query)

conn.commit()

cursor.close()

conn.close()