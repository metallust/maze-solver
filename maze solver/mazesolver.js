let visited = [];
let route = [];
let path = [];
let shortestPath = [];

function nextMove(current) {
    if (current == grid[grid.length - 1]) return current;
    visited.push(current);
    nbrs = CheckOption(current);
    for (let i = 0; i < nbrs.length; i++) {
        let found = 0;
        for (let j = 0; j < visited.length; j++)
            if (visited[j] == nbrs[i]) found = 1;
        if (!found) route.push(nbrs[i]);
    }
    result = route.pop();
    path.push(result);
    return result;
}

function displayPath() {
    next = path[path.length - 1];

    for (let i = path.length - 2; i >= 0; i--) {
        nbrs = CheckOption(next);

        let found = isinArray(nbrs, path[i]);

        if (found) {
            shortestPath.push(path[i]);
            next = path[i];
        }
    }
}

function isinArray(nbrs, element) {
    for (let i = 0; i < nbrs.length; i++) {
        if (nbrs[i] == element) {
            return true;
        }
    }
    return false;
}
