describe('GET /tasks', () => {
    beforeEach(function () {
        cy.fixture('tasks/get').then(function (tasks) {
            this.tasks = tasks
        })
    });
    it('get my task', function () {
        const { user, tasks } = this.tasks.list
        cy.task('removeTasksLike', 'Estud4r')
        cy.task('removeUser', user.email)
        cy.postUser(user)
        cy.postSession(user)
            .then(respUser => {
                tasks.forEach(function (taskNum) {
                    cy.postTask(taskNum, respUser.body.token)
                })
                cy.getTasks(respUser.body.token)
                    .then(response => {
                        expect(response.status).to.eq(200);
                        expect(response.body).to.be.an('array').and.have.length(tasks.length);
                    })
            })
    })
})

describe('GET /tasks/:id', () => {
    beforeEach(function () {
        cy.fixture('tasks/get').then(function (tasks) {
            this.tasks = tasks
        })
    });
    it('get unique task', function () {
        const { user, task } = this.tasks.unique
        cy.task('removeTask', task.name, user.email)
        cy.task('removeUser', user.email)
        cy.postUser(user)
        cy.postSession(user)
            .then(respUser => {
                cy.postTask(task, respUser.body.token)
                    .then(respTask => {
                        cy.getUniqueTask(respTask.body._id, respUser.body.token)
                            .then(response => {
                                expect(response.status).to.eq(200)
                            })
                    })
            })
    })
    it('task not found', function () {
        const { user, task } = this.tasks.not_found
        cy.task('removeTask', task.name, user.email)
        cy.task('removeUser', user.email)
        cy.postUser(user)
        cy.postSession(user)
            .then(respUser => {
                cy.postTask(task, respUser.body.token)
                    .then(respTask => {
                        cy.deleteTask(respTask.body._id, respUser.body.token)
                            .then(response => {
                                expect(response.status).to.eq(204)
                            })
                        cy.getUniqueTask(respTask.body._id, respUser.body.token)
                            .then(response => {
                                expect(response.status).to.eq(404)
                            })
                    })
            })
    })
})