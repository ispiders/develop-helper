const singleRecordRequest = `{
    "MODELNAME": {
        ...attrubutes
    }
}`;

const singleRecordResponse = `{
    "MODELNAME": {
        "id": "uniq-id",
        ...attrubutes
    }
}`;

const multiRecordResponse = `{
    "MODELNAMEs": [
        {
            "id": "uniq-id",
            ...attrubutes
        }
    ]
}`;

const emptyMultiRecordResponse = `{
    "MODELNAMEs": []
}`;

const TODO = 'TODO';

const POSSIBLES = [
    {
        "type": "createRecord",
        "conditions": ["create", "single"],
        "method": "POST",
        "request": singleRecordRequest,
        "response": singleRecordResponse
    },
    {
        "type": "query",
        "conditions": ["create", "multi"],
        "method": "POST",
        "params": "?params",
        "response": multiRecordResponse
    },
    {
        "type": "query",
        "conditions": ["delete", "multi"],
        "method": "DELETE",
        "params": '?ids[]=&params',
        "response": emptyMultiRecordResponse
    },
    {
        "type": "query",
        "conditions": ["edit", "multi"],
        "method": "PUT|PATCH",
        "params": "?ids[]=&params",
        "request": singleRecordRequest,
        "response": multiRecordResponse
    },
    {
        "type": "query",
        "conditions": ["get", "multi", "noid"],
        "method": "GET",
        "params": "?params",
        "response": multiRecordResponse
    },
    {
        "type": "queryRecord",
        "conditions": ["delete", "single", "noid"],
        "method": "DELETE",
        "params": "?params",
        "response": TODO
    },
    {
        "type": "queryRecord",
        "conditions": ["edit", "single", "noid"],
        "method": "PUT|PATCH",
        "params": "?params",
        "request": singleRecordRequest,
        "response": singleRecordResponse
    },
    {
        "type": "queryRecord",
        "conditions": ["get", "single", "noid"],
        "method": "GET",
        "params": "?params",
        "response": singleRecordResponse
    },
    {
        "type": "deleteRecord",
        "conditions": ["delete", "single", "id"],
        "method": "DELETE",
        "response": "204 no content"
    },
    {
        "type": "updateRecord",
        "conditions": ["edit", "single", "id"],
        "method": "PUT|PATCH",
        "request": singleRecordRequest,
        "response": singleRecordResponse
    },
    {
        "type": "findAll",
        "conditions": ["get", "all"],
        "method": "GET",
        "response": multiRecordResponse
    },
    {
        "type": "findMany",
        "conditions": ["get", "multi", "id"],
        "method": "GET",
        "params": "?ids[]=",
        "response": multiRecordResponse
    },
    {
        "type": "findRecord",
        "conditions": ["get", "single", "id"],
        "method": "GET",
        "response": singleRecordResponse
    }
];

export function getFlattedPossibles () {

    return POSSIBLES;
}

export function filterPossibles (conditions, possibles) {

    let conditionString = conditions.join('-');

    possibles = possibles || POSSIBLES;

    return possibles.filter(function (item) {

        return item.conditions.join('-').indexOf(conditionString) === 0;
    });
}
