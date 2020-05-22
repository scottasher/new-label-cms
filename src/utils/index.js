export function getMenuMap(array) {
    array.filter(function(o) {
        if(o.routes) {
            o.routes = o.routes.filter(s => s.menuRemove !== true);
        }
        if(o.menuRemove) {
            return false
        }
    });

    return array
};

export function parseQuery(queryString) {
    var query = {};
    var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
}

export function takeOutMenu(data) {
    return data.map(obj => {
        if(!obj.routes) {
            return {
                key: obj.key,
                path: obj.path,
                name: obj.name,
                title: obj.title,
                layout: obj.layout,
                component: obj.component
            }
        } 
        return {
            key: obj.path,
            path: obj.path,
            name: obj.name,
            title: obj.title,
            layout: obj.layout,
            component: obj.component || null,
            routes: obj.routes.map(ob => {
                return {
                    path: ob.path,
                    name: ob.name,
                    exact: ob.exact || false,
                    title: ob.title,
                    component: ob.component,        
                    layout: ob.layout,
                }
            })
        }
    })
}