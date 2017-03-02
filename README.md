# angularCroppie

Image Cropper using [Croppie](https://github.com/Foliotek/Croppie)


## Install

Bower: `bower install angular-croppie`

Npm: `npm install angular-croppie`


## Usage

Add the dependency: `angular.module('myApp', ['angularCroppie'])`.
Use the Angular 1.5 component:

```
<croppie src="cropped.source" ng-model="cropped.image"></croppie>
```

or with [Croppie options](http://foliotek.github.io/Croppie/#documentation): 

```
<croppie src="cropped.source" ng-model="cropped.image" options="{ viewport: { width: 400, height: 280 } }"></croppie>
```

Simple Example: [plnkr](https://plnkr.co/edit/tKTdhsUBr57coqlZBRgF?p=preview)


## Documentation
[Documentation](http://foliotek.github.io/Croppie#documentation)

