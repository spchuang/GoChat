

'use strict';

var _nodePolyglot = require('node-polyglot');

var _nodePolyglot2 = _interopRequireDefault(_nodePolyglot);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _TranslationConstants = require('./TranslationConstants');

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Translator = new _nodePolyglot2.default();

var translations = {};

function loadTranslator() {
  translations = JSON.parse(_fs2.default.readFileSync(_TranslationConstants.TRANSLATION_FILE, 'utf8'));

  var translationsByLanguage = {};
  for (var lang in _TranslationConstants.LANGUAGE_TO_NAME_MAP) {
    translationsByLanguage[lang] = {};
  }

  translations.forEach(function (phraseObj) {
    var data = phraseObj.data;
    var name = phraseObj.name;
    var namespace = phraseObj.namespace;


    for (var _lang in translationsByLanguage) {
      (0, _invariant2.default)(_lang in data, namespace + '.' + name + ' should be translated in ' + _lang);
      Object.keys(data).forEach(function (lang) {
        if (namespace === 'normal') {
          translationsByLanguage[lang][name] = data[lang];
        } else {
          translationsByLanguage[lang][namespace + '.' + name] = data[lang];
        }
      });
    }
  });

  for (var _lang2 in translationsByLanguage) {
    Translator.extend(translationsByLanguage[_lang2], _lang2);
  }
}

loadTranslator();

// helper to concatenate
function got(name, language, params) {
  return Translator.t(language + '.' + name, params);
}

function getTranslations() {
  return translations;
}

module.exports = {
  got: got,
  getTranslations: getTranslations,
  loadTranslator: loadTranslator
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cmFuc2xhdGlvbnMvVHJhbnNsYXRvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7O0FBRUEsSUFBSSxhQUFhLDRCQUFqQjs7QUFFQSxJQUFJLGVBQWUsRUFBbkI7O0FBRUEsU0FBUyxjQUFULEdBQWdDO0FBQzlCLGlCQUFlLEtBQUssS0FBTCxDQUFXLGFBQUcsWUFBSCx5Q0FBa0MsTUFBbEMsQ0FBWCxDQUFmOztBQUVBLE1BQU0seUJBQXlCLEVBQS9CO0FBQ0EsT0FBSSxJQUFNLElBQVYsZ0RBQXdDO0FBQ3RDLDJCQUF1QixJQUF2QixJQUErQixFQUEvQjtBQUNEOztBQUVELGVBQWEsT0FBYixDQUFxQixxQkFBYTtBQUFBLFFBQ3pCLElBRHlCLEdBQ0EsU0FEQSxDQUN6QixJQUR5QjtBQUFBLFFBQ25CLElBRG1CLEdBQ0EsU0FEQSxDQUNuQixJQURtQjtBQUFBLFFBQ2IsU0FEYSxHQUNBLFNBREEsQ0FDYixTQURhOzs7QUFHaEMsU0FBSSxJQUFNLEtBQVYsSUFBa0Isc0JBQWxCLEVBQTBDO0FBQ3hDLCtCQUFVLFNBQVEsSUFBbEIsRUFBMkIsU0FBM0IsU0FBd0MsSUFBeEMsaUNBQXdFLEtBQXhFO0FBQ0EsYUFBTyxJQUFQLENBQVksSUFBWixFQUFrQixPQUFsQixDQUEwQixnQkFBUTtBQUNoQyxZQUFJLGNBQWMsUUFBbEIsRUFBNEI7QUFDMUIsaUNBQXVCLElBQXZCLEVBQTZCLElBQTdCLElBQXFDLEtBQUssSUFBTCxDQUFyQztBQUNELFNBRkQsTUFFTztBQUNMLGlDQUF1QixJQUF2QixFQUE2QixZQUFZLEdBQVosR0FBa0IsSUFBL0MsSUFBdUQsS0FBSyxJQUFMLENBQXZEO0FBQ0Q7QUFDRixPQU5EO0FBT0Q7QUFDRixHQWJEOztBQWVBLE9BQUksSUFBTSxNQUFWLElBQWtCLHNCQUFsQixFQUEwQztBQUN4QyxlQUFXLE1BQVgsQ0FBa0IsdUJBQXVCLE1BQXZCLENBQWxCLEVBQWdELE1BQWhEO0FBQ0Q7QUFDRjs7QUFFRDs7O0FBR0EsU0FBUyxHQUFULENBQWEsSUFBYixFQUFvQyxRQUFwQyxFQUFzRCxNQUF0RCxFQUErRTtBQUM3RSxTQUFPLFdBQVcsQ0FBWCxDQUFhLFdBQVcsR0FBWCxHQUFpQixJQUE5QixFQUFvQyxNQUFwQyxDQUFQO0FBQ0Q7O0FBRUQsU0FBUyxlQUFULEdBQW1DO0FBQ2pDLFNBQU8sWUFBUDtBQUNEOztBQUVELE9BQU8sT0FBUCxHQUFpQjtBQUNmLFVBRGU7QUFFZixrQ0FGZTtBQUdmO0FBSGUsQ0FBakIiLCJmaWxlIjoiVHJhbnNsYXRvci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEBmbG93XG5cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFBvbHlnbG90IGZyb20gJ25vZGUtcG9seWdsb3QnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCB7TEFOR1VBR0VfVE9fTkFNRV9NQVAsIFRSQU5TTEFUSU9OX0ZJTEV9IGZyb20gJy4vVHJhbnNsYXRpb25Db25zdGFudHMnO1xuaW1wb3J0IGludmFyaWFudCBmcm9tICdpbnZhcmlhbnQnO1xuXG52YXIgVHJhbnNsYXRvciA9IG5ldyBQb2x5Z2xvdCgpO1xuXG5sZXQgdHJhbnNsYXRpb25zID0ge307XG5cbmZ1bmN0aW9uIGxvYWRUcmFuc2xhdG9yKCk6IHZvaWQge1xuICB0cmFuc2xhdGlvbnMgPSBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhUUkFOU0xBVElPTl9GSUxFLCAndXRmOCcpKTtcblxuICBjb25zdCB0cmFuc2xhdGlvbnNCeUxhbmd1YWdlID0ge307XG4gIGZvcihjb25zdCBsYW5nIGluIExBTkdVQUdFX1RPX05BTUVfTUFQKSB7XG4gICAgdHJhbnNsYXRpb25zQnlMYW5ndWFnZVtsYW5nXSA9IHt9O1xuICB9XG5cbiAgdHJhbnNsYXRpb25zLmZvckVhY2gocGhyYXNlT2JqID0+IHtcbiAgICBjb25zdCB7ZGF0YSwgbmFtZSwgbmFtZXNwYWNlfSA9IHBocmFzZU9iajtcblxuICAgIGZvcihjb25zdCBsYW5nIGluIHRyYW5zbGF0aW9uc0J5TGFuZ3VhZ2UpIHtcbiAgICAgIGludmFyaWFudChsYW5nIGluIGRhdGEsIGAke25hbWVzcGFjZX0uJHtuYW1lfSBzaG91bGQgYmUgdHJhbnNsYXRlZCBpbiAke2xhbmd9YCk7XG4gICAgICBPYmplY3Qua2V5cyhkYXRhKS5mb3JFYWNoKGxhbmcgPT4ge1xuICAgICAgICBpZiAobmFtZXNwYWNlID09PSAnbm9ybWFsJykge1xuICAgICAgICAgIHRyYW5zbGF0aW9uc0J5TGFuZ3VhZ2VbbGFuZ11bbmFtZV0gPSBkYXRhW2xhbmddO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRyYW5zbGF0aW9uc0J5TGFuZ3VhZ2VbbGFuZ11bbmFtZXNwYWNlICsgJy4nICsgbmFtZV0gPSBkYXRhW2xhbmddO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xuXG4gIGZvcihjb25zdCBsYW5nIGluIHRyYW5zbGF0aW9uc0J5TGFuZ3VhZ2UpIHtcbiAgICBUcmFuc2xhdG9yLmV4dGVuZCh0cmFuc2xhdGlvbnNCeUxhbmd1YWdlW2xhbmddLCBsYW5nKTtcbiAgfVxufVxuXG5sb2FkVHJhbnNsYXRvcigpO1xuXG4vLyBoZWxwZXIgdG8gY29uY2F0ZW5hdGVcbmZ1bmN0aW9uIGdvdChuYW1lOiBUcmFuc2xhdGlvbk5hbWUsIGxhbmd1YWdlOiBzdHJpbmcsIHBhcmFtczogP09iamVjdCk6IHN0cmluZyB7XG4gIHJldHVybiBUcmFuc2xhdG9yLnQobGFuZ3VhZ2UgKyAnLicgKyBuYW1lLCBwYXJhbXMpO1xufVxuXG5mdW5jdGlvbiBnZXRUcmFuc2xhdGlvbnMoKTogT2JqZWN0IHtcbiAgcmV0dXJuIHRyYW5zbGF0aW9ucztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGdvdCxcbiAgZ2V0VHJhbnNsYXRpb25zLFxuICBsb2FkVHJhbnNsYXRvcixcbn07XG4iXX0=