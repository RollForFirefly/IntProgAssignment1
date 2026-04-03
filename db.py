from sqlalchemy import create_engine

username = "root"
password = "root"
database_name = "ass1db"

DATABASE_URL = f"mysql+pymysql://{username}:{password}@localhost:3306/{database_name}"

engine = create_engine(DATABASE_URL, echo=True)

SQLModel.metadata.create_all(engine)