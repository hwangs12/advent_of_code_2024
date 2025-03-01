def astar(g: dict, start_node: tuple[int, int], goal_node: tuple[int, int]) -> list | None:

    open_set = [(0, start_node)]
    came_from = {}
    cost_so_far = {start_node: 0}

    # A commonly used heuristic for maze-solving is the Manhattan distance
    def heuristic(node: tuple[int, int], goal: tuple[int, int]):
        return abs(node[0] - goal[0]) + abs(node[1] - goal[1])

    def rebuild_path(n):
        p = [n]
        while n in came_from:
            n = came_from[n]
            p.append(n)
        return p

    while len(open_set) > 0:
        curr_cost, curr_node = heappop(open_set)
        if curr_node == goal_node:
            goal_path = rebuild_path(goal_node)
            return goal_path

        for neighbor in g[curr_node]:
            new_cost = cost_so_far.get(curr_node) + 1
            if neighbor not in cost_so_far or new_cost < cost_so_far[neighbor]:
                cost_so_far[neighbor] = new_cost
                priority = new_cost + heuristic(neighbor, goal_node)
                heappush(open_set, (priority, neighbor))
                came_from[neighbor] = curr_node

    return None