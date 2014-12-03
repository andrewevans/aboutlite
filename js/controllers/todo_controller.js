Todos.TodoController = Ember.ObjectController.extend({
    actions: {
        clearCompleted: function() {
            var completed = this.filterBy('isCompleted', true);
            completed.invoke('deleteRecord');
            completed.invoke('save');
        },
        hasCompleted: function() {
            return this.get('completed') > 0;
        }.property('completed'),
        completed: function() {
            return this.filterBy('isCompleted', true).get('length');
        }.property('@each.isCompleted'),
        editTodo: function() {
            this.set('isEditing', true);
        },
        acceptChanges: function() {
            this.set('isEditing', false);

            if (Ember.isEmpty(this.get('model.title'))) {
                this.send('removeTodo');
            } else {
                this.get('model').save();
            }
        },
        removeTodo: function () {
            var todo = this.get('model');
            todo.deleteRecord();
            todo.save();
        }
    },
    isEditing: false,
    isCompleted: function(key, value){
        var model = this.get('model');

        if (value === undefined) {
            // property being used as a getter
            return model.get('isCompleted');
        } else {
            // property being used as a setter
            model.set('isCompleted', value);
            model.save();
            return value;
        }
    }.property('model.isCompleted')
});