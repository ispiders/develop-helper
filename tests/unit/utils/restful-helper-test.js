import {test, module} from 'qunit';
import {getFlattedPossibles, filterPossibles} from 'restful-api/utils/restful-helper';

module('restful-helper');

test('getFlattedPossibles', function (assert) {

    assert.equal(getFlattedPossibles().length, 13);
});

test('filterPossibles', function (assert) {

    assert.equal(filterPossibles(['get', 'single', 'id', 'error']).length, 0);
    assert.equal(filterPossibles(['get', 'single', 'id']).length, 1);
    assert.equal(filterPossibles([]).length, 13);
});

test('queryRecord', function (assert) {

    assert.equal(filterPossibles(['get', 'single', 'noid'])[0].type, 'queryRecord');
    assert.equal(filterPossibles(['delete', 'single', 'noid'])[0].type, 'queryRecord');
    assert.equal(filterPossibles(['edit', 'single', 'noid'])[0].type, 'queryRecord');
});

test('findRecord', function (assert) {

    assert.equal(filterPossibles(['get', 'single', 'id'])[0].type, 'findRecord');
});

test('findAll', function (assert) {

    assert.equal(filterPossibles(['get', 'all'])[0].type, 'findAll');
});

test('deleteRecord', function (assert) {

    assert.equal(filterPossibles(['delete', 'single', 'id'])[0].type, 'deleteRecord');
});

test('updateRecord', function (assert) {

    assert.equal(filterPossibles(['edit', 'single', 'id'])[0].type, 'updateRecord');
});

test('findMany', function (assert) {

    assert.equal(filterPossibles(['get', 'multi', 'id'])[0].type, 'findMany');
});

test('query', function (assert) {

    assert.equal(filterPossibles(['get', 'multi', 'noid'])[0].type, 'query');
});

test('createRecord', function (assert) {

    assert.equal(filterPossibles(['create', 'single'])[0].type, 'createRecord');
});
