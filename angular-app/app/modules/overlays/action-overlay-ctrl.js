/*************************************
* Author: Christopher Connolly
* Date: November 2014
*
* Purpose:
* Inspect HTML pages
* Build GPE DSL File
**************************************/

angular.module('genesys')
.controller('ActionOverlayCtrl', function ($scope, $timeout, $rootScope, $modalInstance, $log, $http) {

	$scope.isSubmitted = false;

	$scope.form = {
		actionName: '',
		elementText: $scope.currentElement,
		elementPath: $scope.currentElementPath,
		action:'click',
		dslXml: ''
	};

	$log.debug("Action builder, form data", $scope.form);

	var labelTypeForElement = function(elementType) {
		switch(elementType) {
			case 'A': return "label-success";
			case 'DIV': return "label-default";
			case 'IMG': return "label-info";
			case 'INPUT': return "label-success";
			case 'P': return "label-danger";
			case 'SPAN': return "label-danger";
			default: return "label-danger";
		}
	}

	$scope.foundElements = [];

	$($scope.currentElementPath, $("#myTargetIFrame").contents()).each(function(index){
		var elem =$(this)[0];
		// $log.debug("Element",elem);

		var item = {};
		item.type = elem.tagName;
		item.text = $(elem).text();
		item.href = elem.href;
		item.className = labelTypeForElement(item.type);

		if(item.text.length > 60) {
			item.text = item.text.substring(0,60) + "...";
		} else if (item.text.length < 1) {
			item.text = "[blank]";
		}

		if(item.className && item.className != 'genBox') {
			// Skip Genbox
			$scope.foundElements.push(item);
		}

		$log.debug("Item",item);
	});
	
	$scope.dismiss = function() {
		$modalInstance.dismiss();
	};

	$scope.submit = function() {
		$modalInstance.dismiss();
	};

	$scope.elementSelected = function(idx) {
		var elem = $scope.foundElements[idx];
		$log.debug("Chosen element", elem);
	}
});