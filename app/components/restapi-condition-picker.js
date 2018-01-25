import Component from '@ember/component';
import {computed, observer} from '@ember/object';
import {getFlattedPossibles, filterPossibles} from 'restful-api/utils/restful-helper';

const POSSIBLEs = getFlattedPossibles();

export default Component.extend({

    possibleConditions: computed('selectedConditions.[]', 'possibles.[]', function () {

        let level = this.get('selectedConditions.length');

        return this.get('possibles').reduce(function (ret, item) {

            let condition = item.conditions[level];

            if (ret.indexOf(condition) === -1 && condition) {
                ret.push(condition);
            }

            return ret;
        }, []);
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

    done: function (target) {

        console.log(target)
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
