# Wave-function-collapse

# Algorithm
1. Calculate tile adjacencies.
2. Generate a grid where each cell has the attribute collapse set to false.
3. Wave propagation:
    1. Choose a random cell with minimum entropy and collapse it.
    2. Recalculte the entropy of the rest of the grid.
    3. Repeat until all cells are collapsed.