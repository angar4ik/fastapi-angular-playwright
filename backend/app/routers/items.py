from fastapi import APIRouter, HTTPException

from app.models import Item, CreateItemRequest

router = APIRouter(prefix="/api/items", tags=["items"])

# In-memory "database"
_items: dict[int, Item] = {
    1: Item(id=1, name="Widget", description="A simple widget", price=9.99, in_stock=True),
    2: Item(id=2, name="Gadget", description="A fancy gadget", price=24.99, in_stock=True),
    3: Item(id=3, name="Doodad", description="What even is this?", price=4.99, in_stock=False),
}
_next_id = 4


@router.get("", response_model=list[Item])
async def list_items():
    return list(_items.values())


@router.get("/{item_id}", response_model=Item)
async def get_item(item_id: int):
    if item_id not in _items:
        raise HTTPException(status_code=404, detail="Item not found")
    return _items[item_id]


@router.post("", response_model=Item, status_code=201)
async def create_item(body: CreateItemRequest):
    global _next_id
    item = Item(id=_next_id, **body.model_dump())
    _items[_next_id] = item
    _next_id += 1
    return item


@router.delete("/{item_id}", status_code=204)
async def delete_item(item_id: int):
    if item_id not in _items:
        raise HTTPException(status_code=404, detail="Item not found")
    del _items[item_id]
