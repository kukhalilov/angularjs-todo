const app = angular.module('app', ['ngRoute']);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'pages/home.html',
      controller: 'HomeController',
    })
    .when('/tasks/:id', {
      templateUrl: 'pages/edit.html',
      controller: 'EditController',
    })
    .otherwise({
      template: '<h2>404</h2>',
    });
});

app.run(function ($rootScope) {
  $rootScope.tasks = [
    { id: 1, name: 'Task 1', done: false },
    { id: 2, name: 'Task 2', done: false },
    { id: 3, name: 'Task 3', done: false },
    { id: 4, name: 'Task 4', done: false },
    { id: 5, name: 'Task 5', done: false },
    { id: 6, name: 'Task 6', done: false },
  ];
});

app.controller('HomeController', function ($scope, $rootScope, $location) {
  $scope.error = false;
  $scope.checkError = function () {
    if ($scope.newTask) {
      $scope.error = false;
    } else {
      $scope.error = true;
    }
  };
  $scope.addTask = function () {
    if (!$scope.newTask) {
      $scope.error = true;
      return;
    } else {
      $scope.error = false;
      $rootScope.tasks.push({
        id: $rootScope.tasks.length
          ? Math.max(...$rootScope.tasks.map((task) => task.id)) + 1
          : 1,
        name: $scope.newTask,
        done: false,
      });
      $scope.newTask = '';
    }
  };
  $scope.deleteTask = function (id) {
    $rootScope.tasks = $rootScope.tasks.filter(function (task) {
      return task.id !== id;
    });
  };
  $scope.editTask = function () {
    $location.path('/tasks/' + this.task.id);
  };
});

app.controller(
  'EditController',
  function ($scope, $rootScope, $routeParams, $location) {
    $scope.error = false;
    $scope.checkError = function () {
      if ($scope.task.name) {
        $scope.error = false;
      } else {
        $scope.error = true;
      }
    };

    $scope.task = $rootScope.tasks.find(function (task) {
      return task.id === parseInt($routeParams.id);
    });

    $scope.saveTask = function () {
      if (!$scope.task.name) {
        $scope.error = true;
        return;
      } else {
        $scope.error = false;
      }
      $rootScope.tasks = $rootScope.tasks.map(function (task) {
        if (task.id === $scope.task.id) {
          return $scope.task;
        }
        return task;
      });
      $location.path('/');
    };
  }
);
