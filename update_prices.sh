#!/bin/bash

# Update all prices from dollars to pounds and fix British English terms
# Update the "Grass-Fed Beef Carpaccio" item
sed -i 's/price: "\$16",/price: "£14",/' client/src/pages/Menu.tsx
sed -i 's/Thinly sliced raw beef from local pastures, drizzled with cold-pressed olive oil, fresh lemon juice, topped with wild capers and 24-month aged Parmesan/Thinly sliced raw beef from local pastures, drizzled with cold-pressed olive oil, fresh lemon juice, topped with wild capers and 24-month aged Parmesan/' client/src/pages/Menu.tsx

# Update the "Heritage Caprese" item
sed -i 's/price: "\$13",/price: "£11",/' client/src/pages/Menu.tsx
sed -i 's/heirloom tomatoes/heritage tomatoes/g' client/src/pages/Menu.tsx

# Update the "Cedar-Planked Salmon" item
sed -i 's/price: "\$28",/price: "£24",/' client/src/pages/Menu.tsx

# Update the "12-Hour Braised Short Ribs" item
sed -i 's/price: "\$32",/price: "£28",/' client/src/pages/Menu.tsx
sed -i 's/heirloom carrots/heritage carrots/g' client/src/pages/Menu.tsx

# Update the "Foraged Mushroom Risotto" item
sed -i 's/price: "\$24",/price: "£20",/' client/src/pages/Menu.tsx

# Update the "Heritage Herb-Roasted Chicken" item
sed -i 's/price: "\$26",/price: "£22",/' client/src/pages/Menu.tsx
sed -i 's/mashed potatoes/mashed potatoes/g' client/src/pages/Menu.tsx

# Update the "Classic Tiramisu" item
sed -i 's/price: "\$10",/price: "£8",/' client/src/pages/Menu.tsx

# Update the "Dark Chocolate Lava Cake" item
sed -i 's/price: "\$12",/price: "£10",/' client/src/pages/Menu.tsx

# Update the "Rustic Old Fashioned" item
sed -i 's/price: "\$14",/price: "£12",/' client/src/pages/Menu.tsx
sed -i 's/bourbon/whisky/g' client/src/pages/Menu.tsx

# Update the "Garden Elderflower Spritz" item
sed -i 's/price: "\$13",/price: "£11",/' client/src/pages/Menu.tsx

# Replace any American terms with British equivalents
sed -i 's/arugula/rocket/g' client/src/pages/Menu.tsx
