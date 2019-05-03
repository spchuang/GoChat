// @flow

'use strict';
import 'babel-polyfill';

// Create the base class definition (getter/setter) for sequelize models
const models = require('../class/schema');
const esformatter = require('esformatter');
const fs = require('fs')
const crypto = require('crypto');
const invariant = require('invariant');
const path = require('path');

esformatter.register(require('esformatter-flow'));

const MODEL_PATH = __dirname + '/../../src/class';

delete models['sequelize'];
delete models['Sequelize'];

for (const key in models) {
  const model = models[key];
  console.log(`[INFO] Generating files for ${model.name}`);
  // basic validation
  invariant(model.name[0] === model.name[0].toUpperCase(), 'model name needs to be capitalized');

  //console.dir(model.rawAttributes);
  //console.log(JSON.stringify(model.rawAttributes));
  const signature = crypto.createHash('md5').update(JSON.stringify(model.tableAttributes)).digest('hex');
  autoGenBaseModel(models[key], signature);
}
console.log("[INFO] finish generating files");

function autoGenBaseModel(model: Object, signature: string): void {
  const raw = _autoGenBaseModel(model, signature);
  const source = esformatter.format(raw);
  fs.writeFileSync(`${MODEL_PATH}/base/${model.name}Base.js`, source, 'utf-8');
}

function _autoGenBaseModel(model: Object, signature: string): string {
  return `// auto-generated-signature<${signature}>
    // @flow
    'use strict';

    import models from '../schema';
    import type {SequelizeModel} from '../schema';
    import invariant from 'invariant';

    export type ${model.name}Attributes = {
      ${Object.keys(model.tableAttributes)
              .filter(key => key !== 'id')
              .map(key => `${key}?: ${translateAttributeType(model.tableAttributes[key])},`)
              .join('\n')}
    };

    class ${model.name}Base {
      _model: SequelizeModel;
      constructor(model: SequelizeModel): void {
        invariant(model, 'model has to be defined');
        this._model = model;
      }

      getID(): number {
        return this._model.get('id');
      }
      ${Object.keys(model.tableAttributes)
              .filter(key => key !== 'id')
              .map(key => getGetterSetter(key, model.tableAttributes[key]))
              .join('')}
      genSave(): Promise<void> {
        return this._model.save();
      }
      genDelete(): Promise<void> {
        return this._model.destroy();
      }

      // base helper
      getData(): ${model.name}Attributes {
        return {
          ${Object.keys(model.tableAttributes)
            .map(key => `${key}: this.get${getKeyName(key, model.tableAttributes[key])}(),`)
            .join('\n')}
        };
      }

      static async _genAllBy(query: Object): Promise<Array<this>> {
        return models.${model.name}.findAll(query)
          .then((models: Array<SequelizeModel>) => {
            return models.map((m) => new this(m));
          }).catch((err) => {
            error(\`Error loading ${model.name} with query \${JSON.stringify(query, null, 2)}\`, err);
          });
      }

      static async genEnforce(id: number): Promise<this> {
        const t = await this.genNullable(id);
        invariant(t, \`${model.name} is null for id \${id\}\`);
        return t;
      }

      static async genNullable(id: number): Promise<?this> {
        return await this._genBy({
          where: {id},
        });
      }

      static async _genBy(query: Object): Promise<?this> {
        return models.${model.name}.findOne(query).then((model: ?SequelizeModel) => {
          return model
            ? new this(model)
            : null;
        }).catch((err) => {
          error(\`Error loading ${model.name} with query \${JSON.stringify(query, null, 2)}\`, err);
        });
      }
      /*
      static async genCreate(params: ${model.name}Attributes): Promise<?this> {0
        return models.${model.name}.create(params).then((model: SequelizeModel) => {
          return new this(model);
        });
      }
      */
    }
    module.exports = ${model.name}Base;
  `;
}

function translateAttributeType(attribute: Object): string {
  let type = null;

  // allow setting custom enum types
  if (attribute.customType) {
    type = attribute.customType.flowType;
  } else {
    switch(attribute.type.constructor.name) {
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

function getGetterSetter(key, attribute: Object): string {
  let type = translateAttributeType(attribute);

  if (attribute.customType && attribute.customType.type === 'JSON') {
    return `
      get${getKeyName(key, attribute)}(): ${type} {
        return JSON.parse(this._model.get('${key}'));
      }

      set${getKeyName(key, attribute)}(val: ?${type}): this {
        this._model.${key} = JSON.stringify(val);
        return this;
      }
    `
  }

  return `
    get${getKeyName(key, attribute)}(): ${type} {
      return this._model.get('${key}');
    }

    set${getKeyName(key, attribute)}(val: ?${type}): this {
      this._model.${key} = val;
      return this;
    }
  `
}

function getKeyName(str: string, attribute: Object): string {
  if (str === 'id') {
    return 'ID';
  }

  if (attribute.customName) {
    return attribute.customName;
  }

  // cap first letter
  return str.charAt(0).toUpperCase() + str.slice(1);
}
