/**
 * Created by KH9143 on 27-12-2015.
 */
angular.module('toolbarDemo1', ['ngMaterial','ngRoute'])
    .controller('AppCtrl', function($scope,$timeout, $mdSidenav, $log,$http,$q) {
        console.log("loaded");
        $scope.ctc = " ";
        $scope.jobDescription = " ";
        $scope.driveProcess = " ";
        $scope.companyDescription = " ";
        $scope.cutoff_cgpa = 0;

        $scope.send = function()
        {
            console.log("----------------------");
            console.log(new_tabs);
            console.log("----------------------");
        };
        
        $scope.get_list = function()
        {
            var drive_data = {
                companyName : $scope.companyName,
                ctc :  parseInt($scope.ctc , 10),
                dateOfPlacementDrive : $scope.dateOfPlacementDrive,
                companyType : $scope.companyType,
                jobRole : $scope.jobRole,
                jobDescription: $scope.jobDescription,
                driveProcess: $scope.driveProcess,
                venue: $scope.venue,
                reportingTime: $scope.reportingTime,
                companyDescription : $scope.companyDescription,
                branchNames: $scope.branchNames,
                cutoff_cgpa: $scope.cutoff_cgpa
            };
            console.log(drive_data);
            $http({
                method: 'GET',
                url: 'http://localhost:3000/adminlogin/companies',
                json: true,
                headers: {
                    "content-type": "application/json",
                },
                data : drive_data
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                console.log("OUTSIDE LOOP.........");
                console.log(response.data.result);
                new_tabs = [
                    { title: 'CSE', students:[]  },
                    { title: 'IT', students:[]  },
                    { title: 'MECH', students:[]  },
                    { title: 'EEE', students:[]  },
                    { title: 'CIVIL', students:[]  },
                    { title: 'ECE', students:[]  }
                    ];
                for(i in response.data.result)
                {
                    console.log("IN LOOP.........");
                    console.log(response.data.result[i].branch);
                    console.log(new_tabs);
                    switch (response.data.result[i].branch)
                    {
                        case 'CSE':
                            index = 0;
                            break;
                        case 'IT':
                            index = 1;
                            break;
                        case 'MECH':
                            index = 2;
                            break;
                        case 'EEE':
                            index = 3;
                            break;
                        case 'CIVIL':
                            index = 4;
                            break;
                        case 'ECE':
                            index = 5;
                            break;
                    }

                    console.log(new_tabs[index].students.push({name:response.data.result[i]['last name'],eligible:true}));//['students'].push({name:response.data.result[i].lastName,eligible:true});
                }
                $scope.branches = new_tabs;

            }, function errorCallback(response) {
                console.log("HTTP:ERROR CALLBACK");
            });


        };


        $scope.toggleLeft = buildToggler('left');
        $scope.isOpenLeft = function(){
            return $mdSidenav('left').isOpen();
        };

        $scope.pr = function(student)
        {
            console.log(student);
            console.log($scope.branches);
        };

        // Lists of fruit names and Vegetable objects
        $scope.fruitNames = ['CSE', 'IT', 'MECH','EEE','ECE',];
        $scope.branchNames = angular.copy($scope.fruitNames);
        $scope.tags = [];
        $scope.vegObjs = [
            {
                'name' : 'Broccoli',
                'type' : 'Brassica'
            },
            {
                'name' : 'Cabbage',
                'type' : 'Brassica'
            },
            {
                'name' : 'Carrot',
                'type' : 'Umbelliferous'
            }
        ];

        $scope.getSelectedChipIndex = function(event) {
            console.log("event..................");
            var selectedChip = angular.element(event.currentTarget).controller('mdChips').selectedChip;

        };

        $scope.newVeg = function(chip) {
            return {
                name: chip,
                type: 'unknown'
            };
        };

        /**
         * Supplies a function that will continue to operate until the
         * time is up.
         */
        function debounce(func, wait, context) {
            var timer;
            return function debounced() {
                var context = $scope,
                    args = Array.prototype.slice.call(arguments);
                $timeout.cancel(timer);
                timer = $timeout(function() {
                    timer = undefined;
                    func.apply(context, args);
                }, wait || 10);
            };
        }
        /**
         * Build handler to open/close a SideNav; when animation finishes
         * report completion in console
         */
        function buildDelayedToggler(navID) {
            return debounce(function() {
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug("toggle " + navID + " is done");
                    });
            }, 200);
        }
        function buildToggler(navID) {
            return function() {
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug("toggle " + navID + " is done");
                    });
            }
        }

        $scope.getData = function(){
            $http.post('http://localhost:3000/login/companies').success(function(response){
                //$scope.signupResponse = response.success;
                console.log(response);
                $scope.x = response;
                console.log(response,"success");

            });
            console.log(new Date());

        };

        $scope.intervalFunction = function(){
            $timeout(function() {
                $scope.getData();
                //$scope.intervalFunction();
            }, 1000)
        };

        // Kick off the interval
        $scope.intervalFunction();
        console.log("hi");


    })
    .config(function($mdThemingProvider,$routeProvider) {
        $routeProvider

        // route for the home page
            .when('/', {

                templateUrl : '/admin_default.html',
                controller  : 'AppCtrl'
            })
            .when('/admin_attendance', {

                templateUrl : '/admin_attendance.html',
                controller  : 'admin_attendance_AppCtrl'
            })
            .when('/approvals',{

                templateUrl : '/approvals.html',
                controller : 'approvals_AppCtrl'
            });

        // Configure a dark theme with primary foreground yellow

        $mdThemingProvider.theme('docs-dark', 'default')
            .primaryPalette('yellow')
            .dark();

    })
    .controller('AppCtrlp', function($scope) {
        // create a message to display in our view
        $scope.message = 'Everyone come and see how good I look!';
    })

    .controller('admin_attendance_AppCtrl', function($scope) {
        // create a message to display in our view
        $scope.message = 'Everyone come and see how good I look!';
        $scope.go = function(){
            console.log("go is hit()");
        };
        $scope.drives = ('TECH_M-AMAZON-NTT').split('-').sort().map(function(drives) {
            return {abbrev: drives};
        })
    })
    .controller('approvals_AppCtrl', function($scope) {
        // create a message to display in our view
        var tabs = [
            { title: '10th class', content: "Tabs will become paginated if there isn't enough room for them."},
            { title: '12th class', content: "You can swipe left and right on a mobile device to change tabs."},
            { title: '1st Sem', content: "Tabs will become paginated if there isn't enough room for them."},
            { title: '2nd Sem', content: "You can swipe left and right on a mobile device to change tabs."},
            { title: '3rd Sem', content: "You can bind the selected tab via the selected attribute on the md-tabs element."},
            { title: '4th Sem', content: "If you set the selected tab binding to -1, it will leave no tab selected."},
            { title: '5th Sem', content: "If you remove a tab, it will try to select a new one."},
            { title: '6th Sem', content: "There's an ink bar that follows the selected tab, you can turn it off if you want."},
            { title: '7th Sem', content: "If you set ng-disabled on a tab, it becomes unselectable. If the currently selected tab becomes disabled, it will try to select the next tab."},
            { title: '8th Sem', content: "If you look at the source, you're using tabs to look at a demo for tabs. Recursion!"}
        ];

        $scope.tabs = tabs;
        $scope.mobileNumber = "hi";
        $scope.go = function()
        {
            $scope.mobileNumber = $scope.mobileNumber;
            console.log($scope.mobileNumber);
        };
    })

    .controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
        $scope.close = function () {
            $mdSidenav('left').close()
                .then(function () {
                    $log.debug("close LEFT is done");
                    console.log("close LEFT is done");

                });
        };
    });