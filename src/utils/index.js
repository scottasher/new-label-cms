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

export function parseQuery(queryString) {
    var query = {};
    var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    // console.log('[PARSE QUERY RESULTS]', query)
    return query;
}