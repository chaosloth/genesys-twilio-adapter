'use strict';

/*************************************
* Author: Christopher Connolly
* Date: November 2014
*
* Purpose:
* Inspect HTML pages
* Build GPE DSL File
**************************************/

angular.module('genesys')
.controller('InspectorCtrl', function ($scope, $log, $http, $location, $sce, $modal) {
	$scope.moduleName = 'inspector';
	$scope.inspectorOn = true;
	$scope.iframeLoaded = false;

	if($scope.targetSite != undefined && $scope.targetSite != '') {
		$scope.inspectorUrl = "/proxy?url=" + $scope.targetSite;
	} else {
		$location.path("/");
	}


	$scope.newSite = function() {
		$location.path("/");
	}

	$scope.reloadViewport = function() {
		$scope.inspectorUrl = "/proxy?url=" + $scope.targetSite;
		var iFrame = $('#myTargetIFrame');
    	iFrame.attr("src",$scope.inspectorUrl);
	}

	$scope.about = function() {
		$modal.open({
	      scope: $scope,
	      templateUrl: 'modules/overlays/about-overlay-modal.html',
	      controller: 'AboutOverlayCtrl'
	    });
	}

	$scope.help = function() {
		$modal.open({
	      scope: $scope,
	      templateUrl: 'modules/overlays/help-overlay-modal.html',
	      controller: 'HelpOverlayCtrl'
	    });
	}


	$scope.genBoxElem = $('<div id="genBox" style="z-index:45646546465; position:absolute; border: 2px solid red;">HI YA</div>');

	$scope.genBoxElemLeft = $('<div id="genBoxLeft" class="genBox" style="z-index:45646546465; position:absolute; border: 1px solid red;"></div>');
	$scope.genBoxElemTop = $('<div id="genBoxTop" class="genBox" style="z-index:45646546465; position:absolute; border: 1px solid red;"></div>');
	$scope.genBoxElemBottom = $('<div id="genBoxBottom" class="genBox" style="z-index:45646546465; position:absolute; border: 1px solid red;"></div>');
	$scope.genBoxElemRight = $('<div id="genBoxRight" class="genBox" style="z-index:45646546465; position:absolute; border: 1px solid red;"></div>');

	var $iframe = $('#myTargetIFrame');


	var cssPath = function(el) {
		var path = [];
		do {
		    var nn = el.nodeName;

		    path.unshift(nn.replace(":","\\:"));

		    //path.unshift(el.nodeName + (el.className ? " class='" + el.className + "'" : ''));
		} while ((el.nodeName.toLowerCase() != 'html') && (el = el.parentNode));

		return path.join(" > ");
	}

	var getPath = function (elem) {
        var pathes = [];

        elem.each(function(index, element) {
            var path, node = jQuery(element);

            while (node.length) {
                var realNode = node[0], name = realNode.localName;
                if (!name) break;
                name = name.toLowerCase();

                name = name.replace(":","\\:");

                var parent = node.parent();

                var sameTagSiblings = parent.children(name);
                if (sameTagSiblings.length > 1) {
                    var allSiblings = parent.children();
                    var index = allSiblings.index(realNode) + 1;
                    if (index > 1) {
                        name += ':nth-child(' + index + ')';
                    }
                }

                path = name + (path ? ' > ' + path : '');
                node = parent;
            }
            pathes.push(path);
        });

        return pathes.join(',');
    };

    var moveGenBox = function(position, width, height) {
		$($scope.genBoxElem).css(position);
		$($scope.genBoxElem).width(width);
		$($scope.genBoxElem).height(height);

		// Box
		$($scope.genBoxElemLeft).css(position);
		$($scope.genBoxElemLeft).css('height', height);

		$($scope.genBoxElemRight).css(position);
		$($scope.genBoxElemRight).css('left', position.left + width);
		$($scope.genBoxElemRight).css('height', height);

		$($scope.genBoxElemTop).css(position);
		$($scope.genBoxElemTop).css('top', position.top);
		$($scope.genBoxElemTop).css('width', width);

		$($scope.genBoxElemBottom).css(position);
		$($scope.genBoxElemBottom).css('top', position.top + height);
		$($scope.genBoxElemBottom).css('width', width);
    };


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

	var prev;
	var highlightHandler = function(event) {
		if (event.target === document.body || (prev && prev === event.target) || event.target.id == "genBox") {
			return;
		}

		event.stopPropagation();
		
		if (prev) {
			//prev.className = prev.className.replace(/\bgeninspecthighlight\b/, '');
			prev = undefined;
			$scope.currentElement = "";
			$scope.currentElementPath = "";
		}
		if (event.target) {

			var target = $(event.target);
			prev = event.target;
			
			// Create or move highlight box
			var position = $(target).offset();
			var width = $(target).width();
			var height = $(target).height();

			moveGenBox(position, width, height);

			// Create element for visual display
			var elem = {};
			elem.type = target[0].nodeName;
			elem.text = $(target[0]).text();
			elem.className = labelTypeForElement(elem.type);

			if(elem.text.length > 60) {
				elem.text = elem.text.substring(0,60) + "...";
			} else if (elem.text.length < 1) {
				elem.text = "[blank]";
			}

			var path = getPath(target); //** Broken on some pages
			// var path = cssPath(event.target);

			$log.debug("Element path",path);

			$scope.currentElementPath = path;
			$scope.currentElement =elem;
			$scope.$apply();
		}
	}

	
    $iframe.load(function() {
    	$log.debug("Target IFrame is ready. Injecting genbox");
    	//$iframe.contents().find("body").append($scope.genBoxElem);

    	$iframe.contents().find("body").append($scope.genBoxElemLeft);
    	$iframe.contents().find("body").append($scope.genBoxElemTop);
    	$iframe.contents().find("body").append($scope.genBoxElemBottom);
    	$iframe.contents().find("body").append($scope.genBoxElemRight);
    });

    // Wait until the IFrame is loaded
	var iframe = document.getElementById("myTargetIFrame");

	iframe.addEventListener("load", function(){
		$log.debug("Iframe == load");

		// Attach to the document
		var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

		// Hook iframe unload
		$(iframe.contentWindow).on('unload', function(event) {
			$log.debug("Iframe == unload");
			$scope.iframeLoaded = false;
			$scope.$apply();
		});			

		// Hook iframe beforceunload
		$(iframe.contentWindow).on('mouseover', function(event) {
			iframeDoc.body.addEventListener('mouseover', highlightHandler, false);
		});

		// Hook iframe mouse over
		$(iframe.contentWindow).on('beforeunload', function(event) {
			$log.debug("Iframe == beforeunload, last link ==" + $scope.iframeTargetHref);

			var tmpTargetUrl =  ($scope.iframeTargetHrefModified || $scope.iframeTargetHref);
			if(tmpTargetUrl.substring(0, window.location.origin.length) === window.location.origin) {
				$log.debug("Iframe == beforeunload, within inspector");
			} else {
				$log.debug("Iframe == beforeunload, OUTSIDE of inspector");
				return "Moving to this page will take you outside the inspector";
			}
		});

		// Hook iframe click events
		$(iframeDoc).on('click', function(event){

			$log.debug("Inspector click handler",event);

			// Modify URL
			if(event.target.href) {
				$scope.iframeTargetHref = event.target.href;
				if($scope.iframeTargetHref.substring(0, window.location.origin.length) === window.location.origin) {
					// Link is within inspector
					$scope.iframeTargetHrefModified = $scope.iframeTargetHref;
				} else {
					// Link is outside of inspector
					$scope.iframeTargetHrefModified = window.location.origin + "/proxy?url=" + $scope.iframeTargetHref;
				}
				$scope.iframeTargetHrefModified;
			} else {
				$scope.iframeTargetHrefModified = null;
			}

			// Handle click
			if($scope.inspectorOn) {
				event.preventDefault();
				$log.debug("Inspector ON - preventing click on element",event);

				$modal.open({
			      scope: $scope,
			      templateUrl: 'modules/overlays/action-overlay-modal.html',
			      controller: 'ActionOverlayCtrl'
			    });

			} else {
				$log.debug("Inspector OFF - allowing click on element, modified url = ",$scope.iframeTargetHrefModified);
				event.preventDefault();
				$scope.inspectorUrl = $scope.iframeTargetHrefModified;
			}

			$scope.$apply();
		});

		$scope.iframeLoaded = true;
		$scope.$apply();
	});

});