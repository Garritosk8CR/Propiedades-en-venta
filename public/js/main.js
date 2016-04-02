(function(){
    //Module asignado a la variable del ng-app del html
    var nodeApp = angular.module('nodeApp', []);
    //Controller del module que se llama como el ng-controller del body
    nodeApp.controller('mainCtrl', function ($scope,$http) {
        $scope.formData = {};
        $scope.idupdate;

        $http.get('/propiedades')
            .success(function(data) {
                $scope.propiedades = data;
                console.log(data)
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });

        // Cuando se añade un nuevo propiedad, manda el texto a la API
        $scope.anadirPropiedad = function(isValid){
            if(isValid){
                $scope.formData={
                    "precio":$scope.propiedades.precio,
                    "moneda":$scope.propiedades.moneda,
                    "tamanno":$scope.propiedades.tamanno,
                    "provincia":$scope.propiedades.provincia,
                    "canton":$scope.propiedades.canton
                }
                $http.post('/propiedad', $scope.formData)
                .success(function(data) {
                    $scope.formData = {};
                    $scope.propiedades = data;
                    $scope.restartForm();
                })
                .error(function(data) {
                    console.log('Error:' + data);
                });
            }
        };

        // Borra un propiedad
        $scope.deletePropiedad = function(id) {
            $http.delete('/propiedad/' + id)
            .success(function(data) {
                $scope.propiedades = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error:' + data);
            });
        };

        // Muestra un propiedad determinado en el formulario
        $scope.showPropiedad = function(id) {
            $(".addUpt").text("Modificar");
            $http.get('/propiedad/' + id)
                .success(function(data) {
                    //Rellena los campos del formulario con el get del propiedad
                    $scope.propiedades.precio=data.precio;
                    $scope.propiedades.moneda=data.moneda;
                    $scope.propiedades.tamanno=data.tamanno;
                    $scope.propiedades.provincia=data.provincia;
                    $scope.propiedades.canton=data.canton;
                    /*$("#precio").val(data.precio);
                    $("#tamanno").val(data.tamanno);
                    $("#provincia").val(data.provincia);
                    $("#canton").val(data.canton);*/
                    //Se prepara para modificar
                    $scope.idupdate=id;
                    $(".btn-add").hide();
                    $(".btn-upd").show();
                });
        };

        // Modifica un propiedad
        $scope.updatePropiedad = function() {
            $scope.formData={
                "precio":$scope.propiedades.precio,
                "moneda":$scope.propiedades.moneda,
                "tamanno":$scope.propiedades.tamanno,
                "provincia":$scope.propiedades.provincia,
                "canton":$scope.propiedades.canton
            }
            $http.put('/propiedad/' + $scope.idupdate, $scope.formData)
            .success(function(data) {
                $scope.formData = {};
                $scope.propiedades = data;
                //Se configura para añadir el siguiente
                $(".addUpt").text("Añadir");
                $(".btn-add").show();
                $(".btn-upd").hide();
                $scope.restartForm();
            })
            .error(function(data) {
                console.log('Error:' + data);
            });
        };

        $scope.restartForm = function(){
            $("form input[type='text'], form input[type='number'], form select").val("");
        }
    });
})();