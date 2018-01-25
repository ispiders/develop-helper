import Route from '@ember/routing/route';

export default Route.extend({

    actions: {

        didTransition: function () {

            this.replaceWith('restful');

            return true;
        }
    }
});
