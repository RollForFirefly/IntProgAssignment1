from sqlmodel import Session, select, or_
from models import Item
from db import engine

Soap = Item(name="Soap", price=12.99, description="Household soap, great at cleaning grime and dirt.", image_url="NO SOAP")
Cheese = Item(name="Cheese", price=8.50, description="Processed cheese, ready for crackers or sandwiches.", image_url="NO CHEESE")
Egg = Item(name="Egg", price=8.99, description="A chicken's egg. They go green when rotten.", image_url="NO EGG")
RAM = Item(name="UTS 4W3S0M3R4M-32 32GB (2x16GB) 6000MHz DDR5", price=1499.99, description="Computer RAM, incredibly overpriced due to OpenAI and other LLM companies.", image_url="NO RAM")
Cheese2 = Item(name="Fancy Cheese", price=24.99, description="Expensive but delicious cheese, perfect for charcuterie or by itself.", image_url="NO CHEESE2")
Car = Item(name="Cooper JCW 3DR", price=66882.00, description="An Electric model of Mini Cooper. New.", image_url="NO CAR")
Chair = Item(name="Chair", price=5.99, description="A chair. Wooden. Looks uncomfortable", image_url="NO CHAIR")
Towel = Item(name="Towel", price=13.49, description="A cotton towel. Wait are towels made of cotton?", image_url="NO TOWEL")
Beans = Item(name="Refried Beans", price=7.99, description="A can of refried beans. Great for protein and fibre.", image_url="NO BEANS")
Tape = Item(name="Scary Tape", price=6.66, description="It's haunted...", image_url="NO TAPE")
Die = Item(name="Twenty-sided Die", price=20.00, description="Also known as a D20. Seems to almost never roll a 20.", image_url="NO DIE")
Guillotine = Item(name="Guillotine", price=0.00, description="The revolution is upon us. Buy me. I hunger for the rich.", image_url="NO GUILLOTINE")
Happy = Item(name="Happiness, Distilled", price=999999.99, description="Can't be bought unless you're rich.", image_url="NO HAPPY")
Ryan = Item(name="Ryan Gosling", price=99.99, description="Are you buying a man or a standee? Yes.", image_url="NO RYAN")

def create_item(new_item: Item):
    with Session(engine) as session:
        session.add(new_item)
        session.commit()

def get_all_items() -> list[Item]:
    with Session(engine) as session:
        items = session.exec(select(Item)).all()
        return items

def get_item_by_id(item_id: int) -> Item | None:
    with Session(engine) as session:
        item = session.get(Item, item_id)
        return item

def get_item_by_id_and_name(item_id: int, item_name: str) -> Item | None:
    with Session(engine) as session:
        item = session.exec(
            select(Item).where(
                or_(Item.id == item_id, Item.name == item_name),
                len(Item.description) == 0
            )
        ).first()
        return item

def update_item(item_id: int, new_item: Item) -> Item | None:
    with Session(engine) as session:
        existing_item = session.get(Item, item_id)
        if existing_item:
            update_data = new_item.model_dump(exclude_unset=True)
            for key, value in update_data.items():
                setattr(existing_item, key, value)
                session.add(existing_item)
                session.commit()
                session.refresh(existing_item)
                return existing_item
        return None

def delete_item(item_id: int) -> bool:
    with Session(engine) as session:
        item = session.get(Item, item_id)
        if item:
            session.delete(item)
            session.commit()
            return True
        return False

## TODO: plonk all of them into a list/array and iteratively create
if __name__ == "__main__":
    create_item(Soap)
    create_item(Cheese)
    create_item(Egg)
    create_item(RAM)
    create_item(Cheese2)
    create_item(Car)
    create_item(Chair)
    create_item(Towel)
    create_item(Beans)
    create_item(Tape)
    create_item(Die)
    create_item(Guillotine)
    create_item(Happy)
    create_item(Ryan)




