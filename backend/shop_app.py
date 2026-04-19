from fastapi import FastAPI, HTTPException, Depends, Response, status
from typing import List
from fastapi.middleware.cors import CORSMiddleware

from sqlmodel import Session

from shop_app_crud import create_catalogue
from shop_app_crud import create_db_and_tables
from shop_app_crud import (
    get_session,
    Item,
    db_get_items,
    db_update_item,
    db_create_item,
    db_delete_item,
    ItemOrder,
    db_get_item_orders,
    db_update_item_orders,
    db_create_item_order,
    db_delete_order
)

app = FastAPI()

# Define the origins that are allowed to talk to your server
origins = [
    "http://localhost:3000",  # Default React port
    "http://127.0.0.1:3000",
    "http://localhost:5173",  # Default Vite/React port
    "http://127.0.0.1:5173",
    "http://127.0.0.1:8000",
    "http://localhost:8000"
]

# Used for pre-built middleware classes (like CORS or GZip)
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allows all headers
)

# --- Endpoints ---

@app.on_event("startup")
def on_startup():
    create_db_and_tables()
    create_catalogue()
@app.get("/items", response_model=List[Item])
def get_all_items(
    skip: int = 0, limit: int = 100, db: Session = Depends(get_session)
):
    """Fetch the entire item list."""
    return db_get_items(db, skip=skip, limit=limit)


@app.post("/items", response_model=Item)
def create_item(item: Item, db: Session = Depends(get_session)):
    """Add a new task to the list."""
    db_item = db_create_item(db, item)
    db.commit()
    db.refresh(db_item)
    return db_item


@app.put("/items/{item_id}", response_model=Item)
def update_item(
    item_id: str, updated_object: Item, db: Session = Depends(get_session)
):
    """Update an existing task by its ID."""
    db_item = db_update_item(db, item_id, updated_object)
    if not db_item:
        raise HTTPException(status_code=404, detail="shop item not found")
    db.commit()
    db.refresh(db_item)
    return db_item

@app.delete("/items/{item_id}")
def delete_item(item_id: str, db: Session = Depends(get_session)):
    """Remove a task from the list."""
    db_item = db_delete_item(db, item_id)
    if not db_item:
        raise HTTPException(status_code=404, detail="shop item not found")
    db.commit()
    # This code indicates the action was successful, the resource is gone, and no body content needs to be returned.
    return Response(status_code=status.HTTP_204_NO_CONTENT)

#### ORDERS

@app.get("/items/orders", response_model=List[ItemOrder])
def get_all_item_orders(
    skip: int = 0, limit: int = 100, db: Session = Depends(get_session)
):
    """Fetch the entire order list."""
    return db_get_item_orders(db, skip=skip, limit=limit)


@app.post("/items/orders", response_model=ItemOrder)
def create_item_order(order: ItemOrder, db: Session = Depends(get_session)):
    """Add a new order to the list."""
    db_order = db_create_item_order(db, order)
    db.commit()
    db.refresh(db_order)
    return db_order


@app.put("/items/orders/{order_id}", response_model=ItemOrder)
def update_item_order(
    order_id: str, updated_object: ItemOrder, db: Session = Depends(get_session)
):
    """Update an existing order by its ID."""
    db_order = db_update_item_orders(db, order_id, updated_object)
    if not db_order:
        raise HTTPException(status_code=404, detail="shop order not found")
    db.commit()
    db.refresh(db_order)
    return db_order


@app.delete("/items/orders/{order_id}")
def delete_item_order(order_id: str, db: Session = Depends(get_session)):
    """Remove an order from the list."""
    db_order = db_delete_order(db, order_id)
    if not db_order:
        raise HTTPException(status_code=404, detail="shop order not found")
    db.commit()
    # This code indicates the action was successful, the resource is gone, and no body content needs to be returned.
    return Response(status_code=status.HTTP_204_NO_CONTENT)
