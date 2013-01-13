/**
 * Backbone localStorage Adapter
 * https://github.com/jeromegn/Backbone.localStorage
 */(function(){function c(){return((1+Math.random())*65536|0).toString(16).substring(1)}function d(){return c()+c()+"-"+c()+"-"+c()+"-"+c()+"-"+c()+c()+c()}var a=this._,b=this.Backbone;b.LocalStorage=window.Store=function(a){this.name=a;var b=this.localStorage().getItem(this.name);this.records=b&&b.split(",")||[]},a.extend(b.LocalStorage.prototype,{save:function(){this.localStorage().setItem(this.name,this.records.join(","))},create:function(a){return a.id||(a.id=d(),a.set(a.idAttribute,a.id)),this.localStorage().setItem(this.name+"-"+a.id,JSON.stringify(a)),this.records.push(a.id.toString()),this.save(),a.toJSON()},update:function(b){return this.localStorage().setItem(this.name+"-"+b.id,JSON.stringify(b)),a.include(this.records,b.id.toString())||this.records.push(b.id.toString()),this.save(),b.toJSON()},find:function(a){return JSON.parse(this.localStorage().getItem(this.name+"-"+a.id))},findAll:function(){return a(this.records).chain().map(function(a){return JSON.parse(this.localStorage().getItem(this.name+"-"+a))},this).compact().value()},destroy:function(b){return this.localStorage().removeItem(this.name+"-"+b.id),this.records=a.reject(this.records,function(a){return a==b.id.toString()}),this.save(),b},localStorage:function(){return localStorage}}),b.LocalStorage.sync=window.Store.sync=b.localSync=function(a,c,d,e){var f=c.localStorage||c.collection.localStorage;typeof d=="function"&&(d={success:d,error:e});var g,h=$.Deferred&&$.Deferred();switch(a){case"read":g=c.id!=undefined?f.find(c):f.findAll(),g&&g instanceof Array&&g.length>=1&&c instanceof b.Model&&(g=g[0]);break;case"create":g=f.create(c);break;case"update":g=f.update(c);break;case"delete":g=f.destroy(c)}return g?(d.success(g),h&&h.resolve()):(d.error("Record not found"),h&&h.reject()),h&&h.promise()},b.ajaxSync=b.sync,b.getSyncMethod=function(a){return a.localStorage||a.collection&&a.collection.localStorage?b.LocalStorage.sync:b.ajaxSync},b.sync=function(a,c,d,e){return b.getSyncMethod(c).apply(this,[a,c,d,e])}})();