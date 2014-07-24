define(function(require, exports, module) {
    var marionette = require('marionette');
    var Tasks = require('app/collections/tasks').Tasks;
    var ListLayout = require('app/views/list-layout').ListLayout;
    var SpecHelpers = require('spec-helpers');
    var eventHelpers = SpecHelpers.Events;
    var KeyCodes = SpecHelpers.KeyCodes;

    describe('my list layout', function() {
        var region;

        beforeEach(function() {
            loadFixtures('template.html');
            region = new marionette.Region({el: '.container'});
        });

        it('initializes', function() {
            var listLayout = new ListLayout({
                collection: new Tasks({
                    ignoreLocalStorage: true
                })
            });
            expect(listLayout).toBeDefined();
            region.show(listLayout);
        });

        it('creates partitions properly', function() {
            var masterCollection = new Tasks([
                {title: '1'},
                {title: '2', isActive: true},
                {title: '3', isActive: false}
            ],
            {
                ignoreLocalStorage: true
            });

            expect(masterCollection.length).toEqual(3);

            var listLayout = new ListLayout({
                collection: masterCollection
            });
            region.show(listLayout);

            var partitions = listLayout.partitions;
            expect(partitions).toBeDefined();

            expect(partitions['*'].collection.length).toEqual(3);
            expect(partitions['active'].collection.length).toEqual(2);
            expect(partitions['completed'].collection.length).toEqual(1);
        });

        it('shows the correct number of active tasks', function() {
            var masterCollection = new Tasks([
                {title: '1'},
                {title: '2', isActive: true},
                {title: '3', isActive: false}
            ],
            {
                ignoreLocalStorage: true
            });
            var listLayout = new ListLayout({
                collection: masterCollection
            });
            region.show(listLayout);
            expect(listLayout.numActive).toEqual(2);

            var layoutCollection = listLayout.collection;
            layoutCollection.remove(layoutCollection.at(0));
            expect(listLayout.numActive).toEqual(1);
        });

        it('switches between collection views', function() {
            var masterCollection = new Tasks([
                {title: '1'},
                {title: '2', isActive: true},
                {title: '3', isActive: false}
            ],
            {
                ignoreLocalStorage: true
            });
            var listLayout = new ListLayout({
                collection: masterCollection
            });
            region.show(listLayout);
            var partitions = listLayout.partitions;

            expect(listLayout.currentCollectionView).toEqual(partitions['*']);

            listLayout.showCollection(partitions['active'])
            expect(listLayout.currentCollectionView).toEqual(partitions['active']);

            listLayout.showCollection(partitions['completed'])
            expect(listLayout.currentCollectionView).toEqual(partitions['completed']);

        });

        it('clears all completed tasks', function() {
            var masterCollection = new Tasks([
                {title: '1', isActive: false},
                {title: '2', isActive: false},
                {title: '3', isActive: false}
            ],
            {
                ignoreLocalStorage: true
            });
            var listLayout = new ListLayout({
                collection: masterCollection
            });
            region.show(listLayout);

            //eventHelpers.simulateMouseDown(listLayout.ui.clearCompleted);
            // Modify tests so it presses the clear completed button.
            listLayout.wantsClearCompleted();
            expect(listLayout.collection.length).toEqual(0);
        });

        it
    });

})
