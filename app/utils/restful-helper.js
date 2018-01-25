const POSSIBLES = [
    {
        type: 'createRecord',
        conditions: [
            ['create', 'single']
        ]
    },
    {
        type: 'query',
        conditions: [
            ['create', 'multi'],
            ['delete', 'multi'],
            ['edit', 'multi'],
            ['get', 'multi', 'noid']
        ]
    },
    {
        type: 'queryRecord',
        conditions: [
            ['delete', 'single', 'noid'],
            ['edit', 'single', 'noid'],
            ['get', 'single', 'noid']
        ]
    },
    {
        type: 'deleteRecord',
        conditions: [
            ['delete', 'single', 'id']
        ]
    },
    {
        type: 'updateRecord',
        conditions: [
            ['edit', 'single', 'id']
        ]
    },
    {
        type: 'findAll',
        conditions: [
            ['get', 'all']
        ]
    },
    {
        type: 'findMany',
        conditions: [
            ['get', 'multi', 'id']
        ]
    },
    {
        type: 'findRecord',
        conditions: [
            ['get', 'single', 'id']
        ]
    }
];

export function getFlattedPossibles () {

    let ret = [];

    POSSIBLES.forEach(function (item) {

        item.conditions.forEach(function (conditions) {

            ret.push({
                type: item.type,
                conditions: conditions
            });
        });
    });

    return ret;
}

export function filterPossibles (conditions, possibles) {

    let conditionString = conditions.join('-');

    possibles = possibles || getFlattedPossibles();

    return possibles.filter(function (item) {

        return item.conditions.join('-').indexOf(conditionString) === 0;
    });
}
