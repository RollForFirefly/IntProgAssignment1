from sqlmodel import Field, SQLModel, create_engine

class Product(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    price: float
    description: str | None = None
