/**
 * General CRUD Controller
 * @module controllers/CRUD
 */
import Sequelize from 'sequelize';
import * as errors from '../components/errors';
import url from 'url'
import lodash from 'lodash'

import debug from 'debug';

const log = debug('controllers:CRUD');

class CRUD {

    constructor(model, resourceName) {
        this.Model = model;
        this.resourceName = resourceName;

        // Bind this to methods
        this.list = this.list.bind(this);
        this.search = this.search.bind(this)
        this.retrieve = this.retrieve.bind(this);
        this.destroy = this.destroy.bind(this);
        this.update = this.update.bind(this);
        this.create = this.create.bind(this);
    }

    /**
     * list - List all objects in the database
     *
     * @function list
     * @memberof  module:controllers/CRUD
     * @param  {Object} req  Express request object
     * @param  {Object} res  Express response object
     * @param  {Function} next Express next middleware function
     */
    list(req, res, next) {
        this.Model.findAll()
        .then(res.json.bind(res))
        .catch(next);
    }

    /**
     * search - search all objects in the database
     *
     * @function search
     * @memberof  module:controllers/CRUD
     * @param  {Object} req  Express request object
     * @param  {Object} res  Express response object
     * @param  {Function} next Express next middleware function
     */
    search(req, res, next) {

      const createSql = (describeData) => {
        log('describeData type: ' + typeof describeData);
        log(describeData);
        log(describeData)
        if(Array.isArray(describeData)) {
          log('describeData is object of lenth' + describeData.lenth)
          describeData = describeData[0]
        }
        const { query } = url.parse(req.url, true);
        const validFields = Object.keys(describeData) ;
        log('validFields ' + validFields);
        const queryKeys = Object.keys(query)
        const allFields = lodash.flatMap(queryKeys, key => key.split('|'))
        log('allFields ' + allFields);
        const unknownFields = allFields.filter(name => !validFields.includes(name))
        if(unknownFields.length > 0) {
          return res.status(400).json({error:`Unkown field(s): ${unknownFields}`, validFields: validFields});
        }

        const andKeys = queryKeys.filter(key => !key.includes('|'))
        const orKeys = queryKeys.filter(key => key.includes('|'))

        const andClauses = andKeys.reduce((initalValue, key) => {
          return Object.assign(initalValue, createFieldStatement(describeData, query, key))
        }, {});

        const orClauses = orKeys.reduce((initalValue, key) => {
          return Object.assign(initalValue, createOr(describeData, query, key))
        }, {});

        const whereClause =  { where: Object.assign({}, andClauses, orClauses), limit: 10 }

        this.Model.findAll(whereClause)
        .then(res.json.bind(res))
        .catch(next);
      }

      this.Model.describe()
       .then(createSql)
       .catch(next);

    }

    /**
     * retrieve - Retrieves a single item by ID.
     *
     * @function retrieve
     * @memberof module:controllers/CRUD
     * @param  {Object} req  Express request object
     * @param  {Object} res  Express response object
     * @param  {Function} next Express next middleware function
     */
    retrieve(req, res, next) {
        this.Model.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(item => {
            if (!item) throw new errors.ResourceNotFoundError(this.resourceName);
            res.json(item);
        })
        .catch(next);
    }

    /**
     * update - Updates a single item given ID and that it exists.
     *
     * @function update
     * @memberof module:controllers/CRUD
     * @param  {Object} req  Express request object
     * @param  {Object} res  Express response object
     * @param  {Function} next Express next middleware function
     */
    update(req, res, next) {
        this.Model.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(item => {
            if (!item) throw new errors.ResourceNotFoundError(this.resourceName);
            return this.Model.update(req.body, {
                where: {
                    id: req.params.id
                }
            });
        })
        .then(() => res.sendStatus(204))
        .catch(Sequelize.ValidationError, err => {
            throw new errors.ValidationError(err);
        })
        .catch(Sequelize.DatabaseError, err => {
            throw new errors.DatabaseError(err);
        })
        .catch(next);
    }

    /**
     * create - creates a new entity.
     *
     * @function create
     * @memberof module:controllers/CRUD
     * @param  {Object} req  Express request object
     * @param  {Object} res  Express response object
     * @param  {Function} next Express next middleware function
     */
    create(req, res, next) {
        this.Model.create(req.body)
        .then(item => res.status(201).json(item))
        .catch(Sequelize.ValidationError, err => {
            throw new errors.ValidationError(err);
        })
        .catch(next);
    }

    /**
     * destroy - Deletes an item given id and that the item exists
     *
     * @function destroy
     * @memberof module:controllers/crudController
     * @param  {Object} req  Express request object
     * @param  {Object} res  Express response object
     * @param  {Function} next Express next middleware function
     */
    destroy(req, res, next) {
        this.Model.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(count => {
            if (!count) throw new errors.ResourceNotFoundError(this.resourceName);
            res.sendStatus(204);
        })
        .catch(next);
    }
}

export default CRUD;

function createOr(describeData, query, key) {
  const orKeys = key.split('|');
  const orQuery = orKeys.map(key => createFieldStatement(describeData, query, key))
  return { $or: orQuery }
}


function createFieldStatement(describeData, query, key) {
  if(describeData[key].type == "INTEGER") {
    return { [key]: query[key] }
  } else {
    // assume text field
    return {
      [key]: {
        $iLike : `%${query[key]}%`
      }
    }
  }
}
