

'use strict';

require('babel-polyfill');

// Create the base class definition (getter/setter) for sequelize models
var models = require('../class/schema');
var esformatter = require('esformatter');
var fs = require('fs');
var crypto = require('crypto');
var invariant = require('invariant');
var path = require('path');

esformatter.register(require('esformatter-flow'));

var MODEL_PATH = __dirname + '/../../src/class';

delete models['sequelize'];
delete models['Sequelize'];

for (var key in models) {
  var model = models[key];
  console.log('[INFO] Generating files for ' + model.name);
  // basic validation
  invariant(model.name[0] === model.name[0].toUpperCase(), 'model name needs to be capitalized');

  //console.dir(model.rawAttributes);
  //console.log(JSON.stringify(model.rawAttributes));
  var signature = crypto.createHash('md5').update(JSON.stringify(model.tableAttributes)).digest('hex');
  autoGenBaseModel(models[key], signature);
}
console.log("[INFO] finish generating files");

function autoGenBaseModel(model, signature) {
  var raw = _autoGenBaseModel(model, signature);
  var source = esformatter.format(raw);
  fs.writeFileSync(MODEL_PATH + '/base/' + model.name + 'Base.js', source, 'utf-8');
}

function _autoGenBaseModel(model, signature) {
  return '// auto-generated-signature<' + signature + '>\n    // @flow\n    \'use strict\';\n\n    import models from \'../schema\';\n    import type {SequelizeModel} from \'../schema\';\n    import invariant from \'invariant\';\n\n    export type ' + model.name + 'Attributes = {\n      ' + Object.keys(model.tableAttributes).filter(function (key) {
    return key !== 'id';
  }).map(function (key) {
    return key + '?: ' + translateAttributeType(model.tableAttributes[key]) + ',';
  }).join('\n') + '\n    };\n\n    class ' + model.name + 'Base {\n      _model: SequelizeModel;\n      constructor(model: SequelizeModel): void {\n        invariant(model, \'model has to be defined\');\n        this._model = model;\n      }\n\n      getID(): number {\n        return this._model.get(\'id\');\n      }\n      ' + Object.keys(model.tableAttributes).filter(function (key) {
    return key !== 'id';
  }).map(function (key) {
    return getGetterSetter(key, model.tableAttributes[key]);
  }).join('') + '\n      genSave(): Promise<void> {\n        return this._model.save();\n      }\n      genDelete(): Promise<void> {\n        return this._model.destroy();\n      }\n\n      // base helper\n      getData(): ' + model.name + 'Attributes {\n        return {\n          ' + Object.keys(model.tableAttributes).map(function (key) {
    return key + ': this.get' + getKeyName(key, model.tableAttributes[key]) + '(),';
  }).join('\n') + '\n        };\n      }\n\n      static async _genAllBy(query: Object): Promise<Array<this>> {\n        return models.' + model.name + '.findAll(query)\n          .then((models: Array<SequelizeModel>) => {\n            return models.map((m) => new this(m));\n          }).catch((err) => {\n            error(`Error loading ' + model.name + ' with query ${JSON.stringify(query, null, 2)}`, err);\n          });\n      }\n\n      static async genEnforce(id: number): Promise<this> {\n        const t = await this.genNullable(id);\n        invariant(t, `' + model.name + ' is null for id ${id}`);\n        return t;\n      }\n\n      static async genNullable(id: number): Promise<?this> {\n        return await this._genBy({\n          where: {id},\n        });\n      }\n\n      static async _genBy(query: Object): Promise<?this> {\n        return models.' + model.name + '.findOne(query).then((model: ?SequelizeModel) => {\n          return model\n            ? new this(model)\n            : null;\n        }).catch((err) => {\n          error(`Error loading ' + model.name + ' with query ${JSON.stringify(query, null, 2)}`, err);\n        });\n      }\n      /*\n      static async genCreate(params: ' + model.name + 'Attributes): Promise<?this> {0\n        return models.' + model.name + '.create(params).then((model: SequelizeModel) => {\n          return new this(model);\n        });\n      }\n      */\n    }\n    module.exports = ' + model.name + 'Base;\n  ';
}

function translateAttributeType(attribute) {
  var type = null;

  // allow setting custom enum types
  if (attribute.customType) {
    type = attribute.customType.flowType;
  } else {
    switch (attribute.type.constructor.name) {
      case 'INTEGER':
      case 'DECIMAL':
        type = 'number';
        break;
      case 'STRING':
      case 'TEXT':
        type = 'string';
        break;
      case 'DATE':
        type = 'Date';
        break;
      case 'BOOLEAN':
        type = 'boolean';
        break;
    }
  }

  invariant(!!type, 'Type is undefined ' + attribute.type.constructor.name);

  return type;
  //return attribute.allowNull ? `?${type}` : type;
}

function getGetterSetter(key, attribute) {
  var type = translateAttributeType(attribute);

  if (attribute.customType && attribute.customType.type === 'JSON') {
    return '\n      get' + getKeyName(key, attribute) + '(): ' + type + ' {\n        return JSON.parse(this._model.get(\'' + key + '\'));\n      }\n\n      set' + getKeyName(key, attribute) + '(val: ?' + type + '): this {\n        this._model.' + key + ' = JSON.stringify(val);\n        return this;\n      }\n    ';
  }

  return '\n    get' + getKeyName(key, attribute) + '(): ' + type + ' {\n      return this._model.get(\'' + key + '\');\n    }\n\n    set' + getKeyName(key, attribute) + '(val: ?' + type + '): this {\n      this._model.' + key + ' = val;\n      return this;\n    }\n  ';
}

function getKeyName(str, attribute) {
  if (str === 'id') {
    return 'ID';
  }

  if (attribute.customName) {
    return attribute.customName;
  }

  // cap first letter
  return str.charAt(0).toUpperCase() + str.slice(1);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY3JpcHRzL2F1dG8tZ2VuLW1vZGVsLWNsYXNzZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQTs7QUFDQTs7O0FBR0EsSUFBTSxTQUFTLFFBQVEsaUJBQVIsQ0FBZjtBQUNBLElBQU0sY0FBYyxRQUFRLGFBQVIsQ0FBcEI7QUFDQSxJQUFNLEtBQUssUUFBUSxJQUFSLENBQVg7QUFDQSxJQUFNLFNBQVMsUUFBUSxRQUFSLENBQWY7QUFDQSxJQUFNLFlBQVksUUFBUSxXQUFSLENBQWxCO0FBQ0EsSUFBTSxPQUFPLFFBQVEsTUFBUixDQUFiOztBQUVBLFlBQVksUUFBWixDQUFxQixRQUFRLGtCQUFSLENBQXJCOztBQUVBLElBQU0sYUFBYSxZQUFZLGtCQUEvQjs7QUFFQSxPQUFPLE9BQU8sV0FBUCxDQUFQO0FBQ0EsT0FBTyxPQUFPLFdBQVAsQ0FBUDs7QUFFQSxLQUFLLElBQU0sR0FBWCxJQUFrQixNQUFsQixFQUEwQjtBQUN4QixNQUFNLFFBQVEsT0FBTyxHQUFQLENBQWQ7QUFDQSxVQUFRLEdBQVIsa0NBQTJDLE1BQU0sSUFBakQ7O0FBRUEsWUFBVSxNQUFNLElBQU4sQ0FBVyxDQUFYLE1BQWtCLE1BQU0sSUFBTixDQUFXLENBQVgsRUFBYyxXQUFkLEVBQTVCLEVBQXlELG9DQUF6RDs7OztBQUlBLE1BQU0sWUFBWSxPQUFPLFVBQVAsQ0FBa0IsS0FBbEIsRUFBeUIsTUFBekIsQ0FBZ0MsS0FBSyxTQUFMLENBQWUsTUFBTSxlQUFyQixDQUFoQyxFQUF1RSxNQUF2RSxDQUE4RSxLQUE5RSxDQUFsQjtBQUNBLG1CQUFpQixPQUFPLEdBQVAsQ0FBakIsRUFBOEIsU0FBOUI7QUFDRDtBQUNELFFBQVEsR0FBUixDQUFZLGdDQUFaOztBQUVBLFNBQVMsZ0JBQVQsQ0FBMEIsS0FBMUIsRUFBeUMsU0FBekMsRUFBa0U7QUFDaEUsTUFBTSxNQUFNLGtCQUFrQixLQUFsQixFQUF5QixTQUF6QixDQUFaO0FBQ0EsTUFBTSxTQUFTLFlB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QWlDLFNBQWpDLEVBQTREO0FBQzFELE1BQUksUUFBUSxJQUFaLEVBQWtCO0FBQ2hCLFdBQU8sSUFBUDtBQUNEOztBQUVELE1BQUksVUFBVSxVQUFkLEVBQTBCO0FBQ3hCLFdBQU8sVUFBVSxVQUFqQjtBQUNEOzs7QUFHRCxTQUFPLElBQUksTUFBSixDQUFXLENBQVgsRUFBYyxXQUFkLEtBQThCLElBQUksS0FBSixDQUFVLENBQVYsQ0FBckM7QUFDRCIsImZpbGUiOiJhdXRvLWdlbi1tb2RlbC1jbGFzc2VzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQGZsb3dcblxuJ3VzZSBzdHJpY3QnO1xuaW1wb3J0ICdiYWJlbC1wb2x5ZmlsbCc7XG5cbi8vIENyZWF0ZSB0aGUgYmFzZSBjbGFzcyBkZWZpbml0aW9uIChnZXR0ZXIvc2V0dGVyKSBmb3Igc2VxdWVsaXplIG1vZGVsc1xuY29uc3QgbW9kZWxzID0gcmVxdWlyZSgnLi4vY2xhc3Mvc2NoZW1hJyk7XG5jb25zdCBlc2Zvcm1hdHRlciA9IHJlcXVpcmUoJ2VzZm9ybWF0dGVyJyk7XG5jb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJylcbmNvbnN0IGNyeXB0byA9IHJlcXVpcmUoJ2NyeXB0bycpO1xuY29uc3QgaW52YXJpYW50ID0gcmVxdWlyZSgnaW52YXJpYW50Jyk7XG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuXG5lc2Zvcm1hdHRlci5yZWdpc3RlcihyZXF1aXJlKCdlc2Zvcm1hdHRlci1mbG93JykpO1xuXG5jb25zdCBNT0RFTF9QQVRIID0gX19kaXJuYW1lICsgJy8uLi8uLi9zcmMvY2xhc3MnO1xuXG5kZWxldGUgbW9kZWxzWydzZXF1ZWxpemUnXTtcbmRlbGV0ZSBtb2RlbHNbJ1NlcXVlbGl6ZSddO1xuXG5mb3IgKGNvbnN0IGtleSBpbiBtb2RlbHMpIHtcbiAgY29uc3QgbW9kZWwgPSBtb2RlbHNba2V5XTtcbiAgY29uc29sZS5sb2coYFtJTkZPXSBHZW5lcmF0aW5nIGZpbGVzIGZvciAke21vZGVsLm5hbWV9YCk7XG4gIC8vIGJhc2ljIHZhbGlkYXRpb25cbiAgaW52YXJpYW50KG1vZGVsLm5hbWVbMF0gPT09IG1vZGVsLm5hbWVbMF0udG9VcHBlckNhc2UoKSwgJ21vZGVsIG5hbWUgbmVlZHMgdG8gYmUgY2FwaXRhbGl6ZWQnKTtcblxuICAvL2NvbnNvbGUuZGlyKG1vZGVsLnJhd0F0dHJpYnV0ZXMpO1xuICAvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KG1vZGVsLnJhd0F0dHJpYnV0ZXMpKTtcbiAgY29uc3Qgc2lnbmF0dXJlID0gY3J5cHRvLmNyZWF0ZUhhc2goJ21kNScpLnVwZGF0ZShKU09OLnN0cmluZ2lmeShtb2RlbC50YWJsZUF0dHJpYnV0ZXMpKS5kaWdlc3QoJ2hleCcpO1xuICBhdXRvR2VuQmFzZU1vZGVsKG1vZGVsc1trZXldLCBzaWduYXR1cmUpO1xufVxuY29uc29sZS5sb2coXCJbSU5GT10gZmluaXNoIGdlbmVyYXRpbmcgZmlsZXNcIik7XG5cbmZ1bmN0aW9uIGF1dG9HZW5CYXNlTW9kZWwobW9kZWw6IE9iamVjdCwgc2lnbmF0dXJlOiBzdHJpbmcpOiB2b2lkIHtcbiAgY29uc3QgcmF3ID0gX2F1dG9HZW5CYXNlTW9kZWwobW9kZWwsIHNpZ25hdHVyZSk7XG4gIGNvbnN0IHNvdXJjZSA9IGVzZm9ybWF0dGVyLmZvcm1hdChyYXcpO1xuICBmcy53cml0ZUZpbGVTeW5jKGAke01PREVMX1BBVEh9L2Jhc2UvJHttb2RlbC5uYW1lfUJhc2UuanNgLCBzb3VyY2UsICd1dGYtOCcpO1xufVxuXG5mdW5jdGlvbiBfYXV0b0dlbkJhc2VNb2RlbChtb2RlbDogT2JqZWN0LCBzaWduYXR1cmU6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBgLy8gYXV0by1nZW5lcmF0ZWQtc2lnbmF0dXJlPCR7c2lnbmF0dXJlfT5cbiAgICAvLyBAZmxvd1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGltcG9ydCBtb2RlbHMgZnJvbSAnLi4vc2NoZW1hJztcbiAgICBpbXBvcnQgdHlwZSB7U2VxdWVsaXplTW9kZWx9IGZyb20gJy4uL3NjaGVtYSc7XG4gICAgaW1wb3J0IGludmFyaWFudCBmcm9tICdpbnZhcmlhbnQnO1xuXG4gICAgZXhwb3J0IHR5cGUgJHttb2RlbC5uYW1lfUF0dHJpYnV0ZXMgPSB7XG4gICAgICAke09iamVjdC5rZXlzKG1vZGVsLnRhYmxlQXR0cmlidXRlcylcbiAgICAgICAgICAgICAgLmZpbHRlcihrZXkgPT4ga2V5ICE9PSAnaWQnKVxuICAgICAgICAgICAgICAubWFwKGtleSA9PiBgJHtrZXl9PzogJHt0cmFuc2xhdGVBdHRyaWJ1dGVUeXBlKG1vZGVsLnRhYmxlQXR0cmlidXRlc1trZXldKX0sYClcbiAgICAgICAgICAgICAgLmpvaW4oJ1xcbicpfVxuICAgIH07XG5cbiAgICBjbGFzcyAke21vZGVsLm5hbWV9QmFzZSB7XG4gICAgICBfbW9kZWw6IFNlcXVlbGl6ZU1vZGVsO1xuICAgICAgY29uc3RydWN0b3IobW9kZWw6IFNlcXVlbGl6ZU1vZGVsKTogdm9pZCB7XG4gICAgICAgIGludmFyaWFudChtb2RlbCwgJ21vZGVsIGhhcyB0byBiZSBkZWZpbmVkJyk7XG4gICAgICAgIHRoaXMuX21vZGVsID0gbW9kZWw7XG4gICAgICB9XG5cbiAgICAgIGdldElEKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tb2RlbC5nZXQoJ2lkJyk7XG4gICAgICB9XG4gICAgICAke09iamVjdC5rZXlzKG1vZGVsLnRhYmxlQXR0cmlidXRlcylcbiAgICAgICAgICAgICAgLmZpbHRlcihrZXkgPT4ga2V5ICE9PSAnaWQnKVxuICAgICAgICAgICAgICAubWFwKGtleSA9PiBnZXRHZXR0ZXJTZXR0ZXIoa2V5LCBtb2RlbC50YWJsZUF0dHJpYnV0ZXNba2V5XSkpXG4gICAgICAgICAgICAgIC5qb2luKCcnKX1cbiAgICAgIGdlblNhdmUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tb2RlbC5zYXZlKCk7XG4gICAgICB9XG4gICAgICBnZW5EZWxldGUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tb2RlbC5kZXN0cm95KCk7XG4gICAgICB9XG5cbiAgICAgIC8vIGJhc2UgaGVscGVyXG4gICAgICBnZXREYXRhKCk6ICR7bW9kZWwubmFtZX1BdHRyaWJ1dGVzIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAke09iamVjdC5rZXlzKG1vZGVsLnRhYmxlQXR0cmlidXRlcylcbiAgICAgICAgICAgIC5tYXAoa2V5ID0+IGAke2tleX06IHRoaXMuZ2V0JHtnZXRLZXlOYW1lKGtleSwgbW9kZWwudGFibGVBdHRyaWJ1dGVzW2tleV0pfSgpLGApXG4gICAgICAgICAgICAuam9pbignXFxuJyl9XG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIHN0YXRpYyBhc3luYyBfZ2VuQWxsQnkocXVlcnk6IE9iamVjdCk6IFByb21pc2U8QXJyYXk8dGhpcz4+IHtcbiAgICAgICAgcmV0dXJuIG1vZGVscy4ke21vZGVsLm5hbWV9LmZpbmRBbGwocXVlcnkpXG4gICAgICAgICAgLnRoZW4oKG1vZGVsczogQXJyYXk8U2VxdWVsaXplTW9kZWw+KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gbW9kZWxzLm1hcCgobSkgPT4gbmV3IHRoaXMobSkpO1xuICAgICAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgIGVycm9yKFxcYEVycm9yIGxvYWRpbmcgJHttb2RlbC5uYW1lfSB3aXRoIHF1ZXJ5IFxcJHtKU09OLnN0cmluZ2lmeShxdWVyeSwgbnVsbCwgMil9XFxgLCBlcnIpO1xuICAgICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBzdGF0aWMgYXN5bmMgZ2VuRW5mb3JjZShpZDogbnVtYmVyKTogUHJvbWlzZTx0aGlzPiB7XG4gICAgICAgIGNvbnN0IHQgPSBhd2FpdCB0aGlzLmdlbk51bGxhYmxlKGlkKTtcbiAgICAgICAgaW52YXJpYW50KHQsIFxcYCR7bW9kZWwubmFtZX0gaXMgbnVsbCBmb3IgaWQgXFwke2lkXFx9XFxgKTtcbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgICB9XG5cbiAgICAgIHN0YXRpYyBhc3luYyBnZW5OdWxsYWJsZShpZDogbnVtYmVyKTogUHJvbWlzZTw/dGhpcz4ge1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5fZ2VuQnkoe1xuICAgICAgICAgIHdoZXJlOiB7aWR9LFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgc3RhdGljIGFzeW5jIF9nZW5CeShxdWVyeTogT2JqZWN0KTogUHJvbWlzZTw/dGhpcz4ge1xuICAgICAgICByZXR1cm4gbW9kZWxzLiR7bW9kZWwubmFtZX0uZmluZE9uZShxdWVyeSkudGhlbigobW9kZWw6ID9TZXF1ZWxpemVNb2RlbCkgPT4ge1xuICAgICAgICAgIHJldHVybiBtb2RlbFxuICAgICAgICAgICAgPyBuZXcgdGhpcyhtb2RlbClcbiAgICAgICAgICAgIDogbnVsbDtcbiAgICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgIGVycm9yKFxcYEVycm9yIGxvYWRpbmcgJHttb2RlbC5uYW1lfSB3aXRoIHF1ZXJ5IFxcJHtKU09OLnN0cmluZ2lmeShxdWVyeSwgbnVsbCwgMil9XFxgLCBlcnIpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIC8qXG4gICAgICBzdGF0aWMgYXN5bmMgZ2VuQ3JlYXRlKHBhcmFtczogJHttb2RlbC5uYW1lfUF0dHJpYnV0ZXMpOiBQcm9taXNlPD90aGlzPiB7MFxuICAgICAgICByZXR1cm4gbW9kZWxzLiR7bW9kZWwubmFtZX0uY3JlYXRlKHBhcmFtcykudGhlbigobW9kZWw6IFNlcXVlbGl6ZU1vZGVsKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIG5ldyB0aGlzKG1vZGVsKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICAqL1xuICAgIH1cbiAgICBtb2R1bGUuZXhwb3J0cyA9ICR7bW9kZWwubmFtZX1CYXNlO1xuICBgO1xufVxuXG5mdW5jdGlvbiB0cmFuc2xhdGVBdHRyaWJ1dGVUeXBlKGF0dHJpYnV0ZTogT2JqZWN0KTogc3RyaW5nIHtcbiAgbGV0IHR5cGUgPSBudWxsO1xuXG4gIC8vIGFsbG93IHNldHRpbmcgY3VzdG9tIGVudW0gdHlwZXNcbiAgaWYgKGF0dHJpYnV0ZS5jdXN0b21UeXBlKSB7XG4gICAgdHlwZSA9IGF0dHJpYnV0ZS5jdXN0b21UeXBlLmZsb3dUeXBlO1xuICB9IGVsc2Uge1xuICAgIHN3aXRjaChhdHRyaWJ1dGUudHlwZS5jb25zdHJ1Y3Rvci5uYW1lKSB7XG4gICAgICBjYXNlICdJTlRFR0VSJzpcbiAgICAgIGNhc2UgJ0RFQ0lNQUwnOlxuICAgICAgICB0eXBlID0gJ251bWJlcic7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnU1RSSU5HJzpcbiAgICAgIGNhc2UgJ1RFWFQnOlxuICAgICAgICB0eXBlID0gJ3N0cmluZyc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnREFURSc6XG4gICAgICAgIHR5cGUgPSAnRGF0ZSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnQk9PTEVBTic6XG4gICAgICAgIHR5cGUgPSAnYm9vbGVhbic7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGludmFyaWFudCghIXR5cGUsICdUeXBlIGlzIHVuZGVmaW5lZCAnICsgYXR0cmlidXRlLnR5cGUuY29uc3RydWN0b3IubmFtZSk7XG5cbiAgcmV0dXJuIHR5cGU7XG4gIC8vcmV0dXJuIGF0dHJpYnV0ZS5hbGxvd051bGwgPyBgPyR7dHlwZX1gIDogdHlwZTtcbn1cblxuZnVuY3Rpb24gZ2V0R2V0dGVyU2V0dGVyKGtleSwgYXR0cmlidXRlOiBPYmplY3QpOiBzdHJpbmcge1xuICBsZXQgdHlwZSA9IHRyYW5zbGF0ZUF0dHJpYnV0ZVR5cGUoYXR0cmlidXRlKTtcblxuICBpZiAoYXR0cmlidXRlLmN1c3RvbVR5cGUgJiYgYXR0cmlidXRlLmN1c3RvbVR5cGUudHlwZSA9PT0gJ0pTT04nKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIGdldCR7Z2V0S2V5TmFtZShrZXksIGF0dHJpYnV0ZSl9KCk6ICR7dHlwZX0ge1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZSh0aGlzLl9tb2RlbC5nZXQoJyR7a2V5fScpKTtcbiAgICAgIH1cblxuICAgICAgc2V0JHtnZXRLZXlOYW1lKGtleSwgYXR0cmlidXRlKX0odmFsOiA/JHt0eXBlfSk6IHRoaXMge1xuICAgICAgICB0aGlzLl9tb2RlbC4ke2tleX0gPSBKU09OLnN0cmluZ2lmeSh2YWwpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cbiAgICBgXG4gIH1cblxuICByZXR1cm4gYFxuICAgIGdldCR7Z2V0S2V5TmFtZShrZXksIGF0dHJpYnV0ZSl9KCk6ICR7dHlwZX0ge1xuICAgICAgcmV0dXJuIHRoaXMuX21vZGVsLmdldCgnJHtrZXl9Jyk7XG4gICAgfVxuXG4gICAgc2V0JHtnZXRLZXlOYW1lKGtleSwgYXR0cmlidXRlKX0odmFsOiA/JHt0eXBlfSk6IHRoaXMge1xuICAgICAgdGhpcy5fbW9kZWwuJHtrZXl9ID0gdmFsO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICBgXG59XG5cbmZ1bmN0aW9uIGdldEtleU5hbWUoc3RyOiBzdHJpbmcsIGF0dHJpYnV0ZTogT2JqZWN0KTogc3RyaW5nIHtcbiAgaWYgKHN0ciA9PT0gJ2lkJykge1xuICAgIHJldHVybiAnSUQnO1xuICB9XG5cbiAgaWYgKGF0dHJpYnV0ZS5jdXN0b21OYW1lKSB7XG4gICAgcmV0dXJuIGF0dHJpYnV0ZS5jdXN0b21OYW1lO1xuICB9XG5cbiAgLy8gY2FwIGZpcnN0IGxldHRlclxuICByZXR1cm4gc3RyLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyLnNsaWNlKDEpO1xufVxuIl19