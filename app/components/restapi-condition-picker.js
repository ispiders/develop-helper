import Component from '@ember/component';
import {computed, observer} from '@ember/object';
import {filterPossibles} from 'restful-api/utils/restful-helper';

const tips = {
    '0': '首先请判断接口的操作类型',
    '1': '接口可能影响多条记录还是只会影响单条记录',
    '2': '能明确的提供所要操作的记录iD吗'
};

export default Component.extend({

    possibleConditions: computed('selectedConditions.[]', 'possibles.[]', function () {

        let level = this.get('level');

        return this.get('possibles').reduce(function (ret, item) {

            let condition = item.conditions[level];

            if (ret.indexOf(condition) === -1 && condition) {
                ret.push(condition);
            }

            return ret;
        }, []);
    }),

    level: computed.readOnly('selectedConditions.length'),

    levelTips: computed('level', 'result', function () {

        if (!this.get('result')) {
            return tips[this.get('level')];
        }
        else {
            return '以下是根据你提供的信息给出的接口规范';
        }
    }),

    selectedConditions: computed(function () {

        return [];
    }),

    possibles: computed('selectedConditions.[]', function () {

        return filterPossibles(this.get('selectedConditions'));
    }),

    possiblesObserver: observer('possibles.[]', function () {

        let possibles = this.get('possibles');

        if (possibles.length === 1) {

            this.done(possibles[0]);
        }
    }),

    restAdapterMethodDoc: computed('result.type', function () {

        return 'http://devdocs.io/ember/classes/ds.restadapter/methods#' + this.get('result.type');
    }),

    done: function (target) {

        this.set('result', target);
    },

    actions: {

        selectCondition: function (condition) {

            this.get('selectedConditions').addObject(condition);
        },

        reset: function () {

            this.set('selectedConditions', []);
            this.set('result', null);
        }
    }
});
