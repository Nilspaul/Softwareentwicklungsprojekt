relevant for ppl who cloned: 
(Wenn du kein nodeJS installiert hast, erst runterladen. Dann "choco install meteor "--> chocolatey ist ein packagemanager und bei nodeJS Installation dabei.)
1. meteor --version
2. meteor npm install --> install all deps in package/-lock .json

//--save @babel/runtime vue vue-router vuetify vue-meteor-tracker gsap
--------------------------------------------------------
meteor create myApp --vue // create project
plugin folder in imports/ui with all plugins (tracker,vuetify,router...)
import in client/main.js

Wenn man alle deps installiert hat: meteor --settings settings.json



