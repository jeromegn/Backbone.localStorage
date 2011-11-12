/**
 * Backbone localStorage Adapter v1.1
 * https://github.com/jeromegn/Backbone.localStorage
 *
 * Date: Sun Aug 14 2011 09:53:55 -0400
 */

function S4(){return((1+Math.random())*65536|0).toString(16).substring(1)}function guid(){return S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4()}window.Store=function(a){this.name=a};
_.extend(Store.prototype,{save:function(){},create:function(a){if(!a.id)a.id=a.attributes.id=guid();localStorage.setItem(this.name+"-"+a.id,JSON.stringify(a));this.ids(this.ids().concat(a.id.toString()));this.save();return a},update:function(a){localStorage.setItem(this.name+"-"+a.id,JSON.stringify(a));_.include(this.ids(),a.id.toString())||this.ids(this.ids().concat(a.id.toString()));this.save();return a},find:function(a){return JSON.parse(localStorage.getItem(this.name+"-"+a.id))},findAll:function(){return _.map(this.ids(),
function(a){return JSON.parse(localStorage.getItem(this.name+"-"+a))},this)},destroy:function(a){localStorage.removeItem(this.name+"-"+a.id);this.ids(_.without(this.ids(),a.id.toString()));this.save();return a},ids:function(a){return a?(localStorage.setItem(this.name,a.join(",")),a):(a=localStorage.getItem(this.name))&&a.split(",")||[]}});
Backbone.sync=function(a,b,e,c){typeof e=="function"&&(e={success:e,error:c});var d,c=b.localStorage||b.collection.localStorage;switch(a){case "read":d=b.id?c.find(b):c.findAll();break;case "create":d=c.create(b);break;case "update":d=c.update(b);break;case "delete":d=c.destroy(b)}d?e.success(d):e.error("Record not found")};
