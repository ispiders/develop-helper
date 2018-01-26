import Component from '@ember/component';
import {computed, observer} from '@ember/object';
import { pluralize } from 'ember-inflector';
import Ember from 'ember';
import {filterPossibles} from 'restful-api/utils/restful-helper';

export default Component.extend({

    modelName: '',
    modelNameToUse: computed('modelName', function () {

        return this.get('modelName') || 'example';
    }),

    httpMethod: computed('model', function () {

        return this.get('model.method');
    }),

    urlFormat: computed('model', 'modelNameToUse', function () {

        let owner = Ember.getOwner(this);
        let adapter = owner.lookup('adapter:rest');
        let model = this.get('model');
        let hasID = model.conditions.indexOf('id') !== -1;

        let possibles = filterPossibles([]);

        possibles.forEach(function (item) {
            console.log(
                item.type,
                item.conditions.join(','),
                adapter.buildURL('example', (item.conditions.indexOf('id') !== -1) ? 'ID' : undefined, null, item.type, null) + (item.params ? item.params : '')
            );
        });

        let path = adapter.buildURL(this.get('modelNameToUse'), hasID ? 'ID' : undefined, null, model.type, null);

        if (model.params) {
            path = path + model.params;
        }

        // modelName, id, snapshot, requestType, query
        return path;
    }),

    requestBody: computed('model', 'modelNameToUse', function () {

        let body = this.get('model.request');
        let owner = Ember.getOwner(this);
        let serializer = owner.lookup('serializer:-rest');

        if (body) {

            let payloadKey = serializer.payloadKeyFromModelName(this.get('modelNameToUse'));

            return body.replace('MODELNAMEs', pluralize(payloadKey))
                    .replace('MODELNAME', payloadKey);
        }

        return '';
    }),

    responseBody: computed('model', 'modelNameToUse', function () {

        let body = this.get('model.response');
        let owner = Ember.getOwner(this);
        let serializer = owner.lookup('serializer:-rest');

        if (body) {

            let payloadKey = serializer.payloadKeyFromModelName(this.get('modelNameToUse'));

            return body.replace('MODELNAMEs', pluralize(payloadKey))
                    .replace('MODELNAME', payloadKey);
        }

        return '';
    }),
});
