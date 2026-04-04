from sqlmodel import Field, SQLModel, create_engine
from decimal import Decimal

class Item(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    price: Decimal = Field(default=0, max_digits=6, decimal_places=2)
    description: str = Field(index=False)
    image_url: str | None = Field(default=None)