export function getMenuMap(array) {
    array.filter(function(o) {
        if(o.routes) {
            o.routes = o.routes.filter(s => s.menuRemove != true);
        }
        if(o.menuRemove) {
            return false
        }
    });

    return array
};
