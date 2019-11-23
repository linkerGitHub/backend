import Ajax from './ajax';

const Request = {
    User: {
        info() {
            return Ajax.get('/user');
        }
    },
    Login: {
        login(param) {
            return Ajax.postJson('/login', param);
        }
    },
    Announcement: {
        List(param) {
            return Ajax.get('/announcement', param);
        },
        Create(param) {
            return Ajax.postJson('/announcement', param);
        },
        Edit(param) {
            return Ajax.get('/announcement/' + param.id);
        },
        Update(param) {
            return Ajax.putJson('/announcement/' + param.id, param);
        },
        Delete(param) {
            return Ajax.delete('/announcement/' + param.id, param);
        }
    },
    Role: {
        List(param) {
            return Ajax.get('/role', param);
        },
        Create(param) {
            return Ajax.postJson('/role', param);
        },
        Edit(param) {
            return Ajax.get('/role/' + param.id);
        },
        Update(param) {
            return Ajax.putJson('/role/' + param.id, param);
        },
        Delete(param) {
            return Ajax.delete('/role/' + param.id, param);
        }
    },
};

export default Request;