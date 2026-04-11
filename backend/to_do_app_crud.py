from sqlmodel import Field, SQLModel, Session, create_engine, select
from typing import List, Optional
from decimal import Decimal

# Establish a db connection
username = "root"
password = "password"
database_name = "ass1db"
DATABASE_URL = f"mysql+pymysql://{username}:{password}@localhost:3306/{database_name}"
engine = create_engine(DATABASE_URL, echo=True)


# Create a database table "Items"
class Item(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(index=True, unique=True)
    price: Decimal = Field(default=0, max_digits=10, decimal_places=2)
    description: str = Field(index=False)
    image: str | None = Field(default=None)

class ItemOrder(SQLModel, table=True):
    id: str = Field(max_length=25, primary_key=True)
    item_id: int = Field(foreign_key="item.id")
    amount: int = Field(default=1, index=True)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def create_catalogue():
    Soap = Item(name="Soap", price=12.99, description="Household soap, great at cleaning grime and dirt.", image="soap.jpg")
    Cheese = Item(name="Cheese", price=8.50, description="Processed cheese, ready for crackers or sandwiches.", image="cheese.jpg")
    Egg = Item(name="Egg", price=8.99, description="A chicken's egg. They go green when rotten.", image="egg.jpg")
    RAM = Item(name="UTS 4W3S0M3R4M-32 32GB (2x16GB) 6000MHz DDR5", price=1499.99, description="Computer RAM, incredibly overpriced due to OpenAI and other LLM companies.", image="ram.jpg")
    Cheese2 = Item(name="Fancy Cheese", price=24.99, description="Expensive but delicious cheese, perfect for charcuterie or by itself.", image="cheese2.jpg")
    Car = Item(name="Cooper JCW 3DR", price=66882.00, description="An Electric model of Mini Cooper. New.", image="car.jpg")
    Chair = Item(name="Chair", price=5.99, description="A chair. Wooden. Looks uncomfortable", image="chair.jpg")
    Towel = Item(name="Towel", price=13.49, description="A cotton towel. Wait are towels made of cotton?", image="towel.jpg")
    Beans = Item(name="Refried Beans", price=7.99, description="A can of refried beans. Great for protein and fibre.", image="beans.jpg")
    Tape = Item(name="Scary Tape", price=6.66, description="It's haunted...", image="NO TAPE")
    Die = Item(name="Twenty-sided Die", price=20.00, description="Also known as a D20. Seems to almost never roll a 20.", image="die.jpg")
    Guillotine = Item(name="Guillotine", price=0.00, description="The revolution is upon us. Buy me. I hunger for the rich.", image="revolution.jpg")
    Ryan = Item(name="Ryan Gosling", price=99.99, description="Are you buying a man or a standee? Yes.", image="ryan.jpg")


    with Session(engine) as session:
        existing = session.exec(select(Item)).all()
        if existing:
            return

        session.add(Soap)
        session.add(Cheese)
        session.add(Egg)
        session.add(RAM)
        session.add(Cheese2)
        session.add(Car)
        session.add(Chair)
        session.add(Towel)
        session.add(Beans)
        session.add(Tape)
        session.add(Die)
        session.add(Guillotine)
        session.add(Ryan)

        session.commit()


def get_session():
    """Yields a SQLModel Session instance."""
    with Session(engine) as session:
        yield session

# CRUD operations for Items


def db_create_item(session: Session, item_create: Item) -> Item:
    new_item = Item.model_validate(item_create)
    session.add(new_item)
    return new_item


def db_get_item(session: Session, item_id: int) -> Optional[Item]:
    return session.get(Item, item_id)


def db_get_items(session: Session, skip: int = 0, limit: int = 100) -> List[Item]:
    statement = select(Item).offset(skip).limit(limit)
    return session.exec(statement).all()


def db_update_item(
    session: Session, item_id: int, item_update: Item
) -> Optional[Item]:
    item = db_get_item(session, item_id)
    if not item:
        return None
    update_data = item_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(item, key, value)
    session.add(item)
    return item


def db_delete_item(session: Session, todo_id: int) -> bool:
    todo = db_get_item(session, todo_id)
    if not todo:
        return False
    session.delete(todo)
    return True





####### OUR ORDER STUFF

def db_create_item_order(session: Session, order_create: ItemOrder) -> ItemOrder:
    new_order = ItemOrder.model_validate(order_create)
    session.add(new_order)
    return new_order

def db_get_item_order(session: Session, order_id: int) -> Optional[ItemOrder]:
    return session.get(ItemOrder, order_id)


def db_get_item_orders(session: Session, skip: int = 0, limit: int = 100) -> List[ItemOrder]:
    statement = select(ItemOrder).offset(skip).limit(limit)
    return session.exec(statement).all()

def db_update_item_orders(
    session: Session, order_id: int, order_update: ItemOrder
) -> Optional[ItemOrder]:
    order = db_get_item_order(session, order_id)
    if not order:
        return None
    update_data = order_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(order, key, value)
    session.add(order)
    return order

def db_delete_order(session: Session, order_id: int) -> bool:
    order = db_get_item_order(session, order_id)
    if not order:
        return False
    session.delete(order)
    return True






