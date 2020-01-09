import Ajax from './ajax';

const Request = {
    Dashboard: {
        index() {
            return Ajax.get('/dashboard');
        }
    },
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
    Link: {
        List(param) {
            return Ajax.get('/link', param);
        },
        Create(param) {
            return Ajax.postJson('/link', param);
        },
        Edit(param) {
            return Ajax.get('/link/' + param.id);
        },
        Update(param) {
            return Ajax.putJson('/link/' + param.id, param);
        },
        Delete(param) {
            return Ajax.delete('/link/' + param.id, param);
        }
    },
    AdFrom: {
        List(param) {
            return Ajax.get('/ad_from', param);
        },
        Create(param) {
            return Ajax.postJson('/ad_from', param);
        },
        Edit(param) {
            return Ajax.get('/ad_from/' + param.id);
        },
        Number(param) {
            return Ajax.get('/ad_from/' + param.id + '/number');
        },
        Update(param) {
            return Ajax.putJson('/ad_from/' + param.id, param);
        },
        Delete(param) {
            return Ajax.delete('/ad_from/' + param.id, param);
        }
    },
    CourseComment: {
        List(param) {
            return Ajax.get('/course_comment', param);
        },
        Delete(param) {
            return Ajax.delete('/course_comment/' + param.id, param);
        }
    },
    VideoComment: {
        List(param) {
            return Ajax.get('/video_comment', param);
        },
        Delete(param) {
            return Ajax.delete('/video_comment/' + param.id, param);
        }
    },
    Order: {
        List(param) {
            return Ajax.get('/order', param);
        },
        Finish(param) {
            return Ajax.get('/order/' + param.id + '/finish', param);
        },
    },
    Member: {
        List(param) {
            return Ajax.get('/member', param);
        },
        Create(param) {
            return Ajax.postJson('/member', param);
        },
    },
    Course: {
        List(param) {
            return Ajax.get('/course', param);
        },
        Create(param) {
            return Ajax.postJson('/course', param);
        },
        Edit(param) {
            return Ajax.get('/course/' + param.id);
        },
        Update(param) {
            return Ajax.putJson('/course/' + param.id, param);
        },
        Delete(param) {
            return Ajax.delete('/course/' + param.id, param);
        }
    },
    Video: {
        List(param) {
            return Ajax.get('/video', param);
        },
        CreateParams() {
            return Ajax.get('/video/create/params');
        },
        Create(param) {
            return Ajax.postJson('/video', param);
        },
        Edit(param) {
            return Ajax.get('/video/' + param.id);
        },
        Update(param) {
            return Ajax.putJson('/video/' + param.id, param);
        },
        Delete(param) {
            return Ajax.delete('/video/' + param.id, param);
        }
    },
    CourseChapter: {
        List(param) {
            return Ajax.get('/course_chapter/' + param.course_id, param);
        },
        Create(param) {
            return Ajax.postJson('/course_chapter/' + param.course_id, param);
        },
        Edit(param) {
            return Ajax.get('/course_chapter/' + param.course_id + '/' + param.id);
        },
        Update(param) {
            return Ajax.putJson('/course_chapter/' + param.course_id + '/' + param.id, param);
        },
        Delete(param) {
            return Ajax.delete('/course_chapter/' + param.course_id + '/' + param.id);
        }
    },
    Setting: {
        Get() {
            return Ajax.get('/setting');
        },
        Save(param) {
            return Ajax.postJson('/setting', param);
        }
    },
    Administrator: {
        List(param) {
            return Ajax.get('/administrator', param);
        },
        Create(param) {
            return Ajax.postJson('/administrator', param);
        },
        Edit(param) {
            return Ajax.get('/administrator/' + param.id);
        },
        Update(param) {
            return Ajax.putJson('/administrator/' + param.id, param);
        },
        Delete(param) {
            return Ajax.delete('/administrator/' + param.id, param);
        },
        ChangePassword(param) {
            return Ajax.putJson('/administrator/password', param);
        }
    },
    AdministratorRole: {
        List(param) {
            return Ajax.get('/administrator_role', param);
        },
        Create(param) {
            return Ajax.postJson('/administrator_role', param);
        },
        Edit(param) {
            return Ajax.get('/administrator_role/' + param.id);
        },
        Update(param) {
            return Ajax.putJson('/administrator_role/' + param.id, param);
        },
        Delete(param) {
            return Ajax.delete('/administrator_role/' + param.id, param);
        }
    },
    AdministratorPermission: {
        List(param) {
            return Ajax.get('/administrator_permission', param);
        },
        Create(param) {
            return Ajax.postJson('/administrator_permission', param);
        },
        Edit(param) {
            return Ajax.get('/administrator_permission/' + param.id);
        },
        Update(param) {
            return Ajax.putJson('/administrator_permission/' + param.id, param);
        },
        Delete(param) {
            return Ajax.delete('/administrator_permission/' + param.id, param);
        }
    },
    Nav: {
        List(param) {
            return Ajax.get('/nav', param);
        },
        Create(param) {
            return Ajax.postJson('/nav', param);
        },
        Edit(param) {
            return Ajax.get('/nav/' + param.id);
        },
        Update(param) {
            return Ajax.putJson('/nav/' + param.id, param);
        },
        Delete(param) {
            return Ajax.delete('/nav/' + param.id, param);
        }
    },
    PromoCode: {
        List(param) {
            return Ajax.get('/promoCode', param);
        },
        Create(param) {
            return Ajax.postJson('/promoCode', param);
        },
        Edit(param) {
            return Ajax.get('/promoCode/' + param.id);
        },
        Update(param) {
            return Ajax.putJson('/promoCode/' + param.id, param);
        },
        Delete(param) {
            return Ajax.delete('/promoCode/' + param.id, param);
        }
    },
    VideoUpload: {
        AliyunAuthTokenRefresh(param) {
            return Ajax.postJson('/video/token/aliyun/refresh', param);
        },
        AliyunAuthTokenCreate(param) {
            return Ajax.postJson('/video/token/aliyun/create', param);
        },
        TencentAuthToken(param) {
            return Ajax.postJson('/video/token/tencent', param);
        }
    }
};

export default Request;