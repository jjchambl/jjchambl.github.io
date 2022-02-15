# Jacob Chambliss' Resume, 2016
This is a Resume I coded using HTML and CSS, styled with Twitter Bootstrap and compiled with LESS. This Resume serves to highlight my 
training at Depot/U that began in February 2016, as well as some projects that I have been working on.
Feel free to contact me using the provided information in the html document (clicking on Resume.html
opens the document in your default web browser). For a larger photo, click the one in the navbar.

Webpack 5 Boilerplate with Pug

===========

    A minimal webpack 5 boilerplate with only Pug,s Babel, SASS and lodash (optional) on board

Requirements

You only need node.js >=10.13.0 pre-installed and you’re good to go.

If you don’t want to work with lodash, just remove it from the node packages.
Usage

Download to target directory or use this repository as a template

$ curl -L -o master.zip https://github.com/cvgellhorn/webpack-boilerplate/archive/master.zip && unzip master.zip && rm master.zip && mv ./webpack-boilerplate-master/{.,}* ./ && rm -r ./webpack-boilerplate-master

Setup

Install dependencies

$ npm install

Development

Build the app in dev mode and run webpack serve with livereload and autocompile on http://0.0.0.0:8080/

$ npm run dev

Production

Build the app in production mode

$ npm run build

webpack

If you're not familiar with webpack, webpack serve will serve the static files in your build folder and watch your source files for changes. When changes are made the bundle will be recompiled. This modified bundle is served from memory at the relative path specified in publicPath.
