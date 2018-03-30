(function () {
    "use strict";

    angular.module(AppName).component("appConfigManager", {
        bindings: {},
        templateUrl: "/scripts/components/views/appConfigManagerView.html",

        controller: function (requestService, $scope, $window) {
            var vm = this;
            vm.$onInit = _init;
            vm.appConfigItems = [];
            vm.appConfigModel = {};
            vm.editValue = _editValue;
            vm.showDiv = _showDiv;

            function _init() {
                requestService.ApiRequestService("get", "/api/Apiconfigs")
                    .then(function (response) {
                        vm.appConfigItems = response.items;
                        for (var i = 0; i < vm.appConfigItems.length; i++) {
                            vm.appConfigItems[i].show = true;
                            vm.appConfigItems[i].hide = true;
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    })

            }

            function _editValue(appItem) {
                delete appItem.show;
                delete appItem.hide;
                requestService.ApiRequestService("put", "/api/Apiconfigs/" + appItem.id, appItem)
                    .then(function (response) {
                        _init();
                    })
                    .catch(function (err) {
                        console.log(err);
                    })
            }

            function _showDiv(appItem) {
                var index = vm.appConfigItems.indexOf(appItem);
                if (appItem && vm.appConfigItems[index].show == true && vm.appConfigItems[index].hide == true) {
                    vm.appConfigItems[index].show = false;
                    vm.appConfigItems[index].hide = false;
                } else if (appItem && vm.appConfigItems[index].show == false && vm.appConfigItems[index].hide == false){
                    _init();
                }
            }
        }
    })
})();
