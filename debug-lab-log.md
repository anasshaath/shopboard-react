# Debug lab log

I manually tested the hosted debug lab with guided assistance. I viewed its
React Components tree and Console, then read its hints. I did not inspect or
modify the lab source, and I did not verify any fixes.

## 1. CategoryChips: missing list key

- **Observation:** After reloading with the Console open, I saw: "Each child in
  a list should have a unique key prop." The warning named `CategoryChips`.
- **Component:** `CategoryChips`.
- **Investigation:** I reloaded the hosted lab while the Console was open and
  read the warning. I then read the lab hints. I did not inspect the source.
- **Likely cause (inferred from the behavior and hints):** The mapped category
  items do not have a stable unique key.
- **Proposed fix (not applied):** Give each mapped category a stable unique key
  from its data.

## 2. Unexpected zero

- **Observation:** I saw a standalone `0` on sold-out product cards and inside
  the empty cart.
- **Component:** `StockNote` and `CartPanel`.
- **Investigation:** I viewed the unexpected zero values in the hosted lab and
  read the hints. I did not inspect the exact source locations.
- **Likely cause (inferred from the behavior and hints):** A numeric `0` is on
  the left side of `&&`, so JSX renders it.
- **Proposed fix (not applied):** Use explicit Boolean conditions such as
  `stock > 0` and `items.length > 0`.

## 3. Favorite moved after sorting

- **Observation:** I saved Leather Tote Bag, then sorted by ascending price.
  The filled heart stayed in the first position and appeared on Wool Scarf.
- **Component:** `ProductCard` in the product list.
- **Investigation:** I reproduced the behavior in the hosted lab. The React
  Components tree showed numeric positional `ProductCard` keys. I also read
  the hints; I did not inspect the source.
- **Likely cause (inferred from the behavior and hints):** Positional keys make
  local component state follow the position instead of the product.
- **Proposed fix (not applied):** Use `product.id` as the `ProductCard` key.

## 4. Featured order did not return

- **Observation:** After sorting by price, I selected Featured. The original
  order did not return.
- **Component:** `ProductList`.
- **Investigation:** I reproduced the behavior in the hosted lab and read the
  hint. I did not inspect the source.
- **Likely cause (inferred from the behavior and hints):** `ProductList`
  mutates its `products` prop by sorting it in place, changing the original
  array.
- **Proposed fix (not applied):** Sort a copy and preserve the original
  featured order.

## 5. Delayed quantity

- **Observation:** Clicking `+` did not immediately update the displayed
  quantity or total. Adding another product revealed the accumulated
  increments; during my exploration the backpack quantity reached 10.
- **Component:** `CartRow` and the cart state owner.
- **Investigation:** I reproduced the delayed display in the hosted lab and
  read the hints. I did not inspect the exact handler.
- **Likely cause (inferred from the behavior and hints):** The cart state is
  mutated and then reused with the same state reference.
- **Proposed fix (not applied):** Use a functional state update with a new
  array and a new object for the changed item.
