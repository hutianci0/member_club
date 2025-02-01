# member_club
## 样式用绝对路径
## form validation
```js
router('/xxx', processInputs, handleValidationResults)
```
## login authentication
```js

```
## encrypt
```js
const User = sequelize.define('User', {

    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }

});

function generateHash(user) {
    if (user === null) {
        throw new Error('No found employee');
    }
    else if (!user.changed('password')) return user.password;
    else {
        let salt = bcrypt.genSaltSync();
        return user.password = bcrypt.hashSync(user.password, salt);
    }
}

User.beforeCreate(generateHash);

User.beforeUpdate(generateHash);
```
## sensitive info 
- 引入 import 'dotenv/config.js'
- 使用: process.env.xxx

## format dates 
- ejs 语法与react相似性
- new Date().toloacleString('en-GB', {y,m,d,hour,min, hour12,timezone })
```ejs
<li>
     Posted at:
     <span class="text-gray-500">
         <%= new Date(item.createdAt).toLocaleString('en-GB', 
         { year: 'numeric' ,
          month: 'long' ,
           day: 'numeric' , 
           hour: '2-digit' , 
           minute: '2-digit' }) %>
    </span>
</li>
```