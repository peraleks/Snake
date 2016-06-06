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
// /**
//  * Объект приложения, внутри которого будут определяться неймспейсы
//  * */
// var Namespace = (function () {
//
//     /**
//      * Создает экземпляр
//      * @constructor
//      */
//     function Namespace() {
//     }
//
//     /**
//      * Возвращает блок пространства имен
//      * @param {object|function} unit Блок
//      * @returns {*}
//      */
//     function getUnit(unit) {
//
//         var types = {
//             'function': function () {
//                 return new unit();
//             },
//             'object': function () {
//                 return unit;
//             }
//         }, type = typeof unit;
//
//         return types[type] ? types[type]() : undefined;
//     }
//
//     /**
//      * Метод, который создает неймспейс
//      * @param target {object} объект приложения, в котором создается неймспейс
//      * @param hash {string} строка неймспейса
//      * @param unit {(object|function)} модуль приложения
//      * */
//     Namespace.prototype.create = function (target, hash, unit) {
//         var parts = hash.split('.'),
//             length = parts.length,
//             i = 0,
//             current = target;
//
//         for (; i < length; i++) {
//             current[parts[i]] = current[parts[i]] || ( i === length - 1 && getUnit(unit)) || {};
//             current = current[parts[i]];
//         }
//
//         return current;
//     };
//
//     return new Namespace();
// })();