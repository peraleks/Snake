/**
 * Created by zdorovo on 05.06.16.
 */
(function (window, undefined) {

    var NS = "APP",
        app = window[NS] = window[NS] || {};

    /**
     * Get or create namespace for module
     * @param    ns        {String}    namespace
     * @param    origin    {Object}    initial object (optional)
     * @return             {Object}
     */
    app.namespace = app["namespace"] || function (ns, origin) {
            var i, obj = window[NS], nsParts = ns.split('.');
            for (i = (nsParts[0] === NS) ? 1 : 0; i < nsParts.length; i++) {
                obj[nsParts[i]] = obj[nsParts[i]] || (i === nsParts.length - 1 && origin) || {};
                obj = obj[nsParts[i]];
            }
            return obj;
        };

}(window));