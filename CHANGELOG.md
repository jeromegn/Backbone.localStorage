# Changelog

## 1.1.6 - July 2, 2013

- Don't assume `require` is defined when `exports` is defined (#100)

## 1.1.5 - At some point...

- Can't remember...

## 1.1.4 - May 19, 2013

- #90 Check for localStorage (throw an error if not available)

## 1.1.3 - May 12, 2013

- #79 Added CommonJS support

## 1.1.2 - May 12, 2013

- #82 Upgraded Backbone to version 1.0 in test suite
- Fixed a few bugs after upgrading to 1.0... looks like Backbone is now triggering the events we were previously manually triggering.

## 1.1.1 - May 11, 2013

- #87 Fixes Lodash v1.0.0-rc.1 removal of _#chain
- #86 Fix for when developer has specified in backbone which jQuery version to use by setting Backbone.$

## 1.1.0 - prior to May 11, 2013

- localStorage adapter for Backbone.js