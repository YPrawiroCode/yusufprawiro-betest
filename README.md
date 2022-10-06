# YusufPrawiro-BETest

API Service Run in below url

> https://ms-yusufprawiro-betest.cyclic.app/

Below is result CRUD endpoint API

Create User

> POST /api/user/create/

![alt text](https://github.com/yprawirocode/yusufprawiro-betest/blob/master/pic/Create_User_Success.png?raw=true)

![alt text](https://github.com/yprawirocode/yusufprawiro-betest/blob/master/pic/Create_User_Without_Auth.png?raw=true)

Read User By Id

> GET /api/user/read/:id

![alt text](https://github.com/yprawirocode/yusufprawiro-betest/blob/master/pic/Read_User_By_Id_Success.png?raw=true)

Update User

> PUT /api/product/update/:id

![alt text](https://github.com/yprawirocode/yusufprawiro-betest/blob/master/pic/Update_User_Invalid_JWT_Token.png?raw=true)

![alt text](https://github.com/yprawirocode/yusufprawiro-betest/blob/master/pic/Update_User_Success.png?raw=true)

Delete User

> DELETE /api/product/del/:id

![alt text](https://github.com/yprawirocode/yusufprawiro-betest/blob/master/pic/Delete_User_Success.png?raw=true)

Below user data Before and After chaced Redis

before it take time 2 second

![alt text](https://github.com/yprawirocode/yusufprawiro-betest/blob/develop/pic/Before_Chached.png?raw=true)

After that around 800 Milisecond

![alt text](https://github.com/yprawirocode/yusufprawiro-betest/blob/develop/pic/After_chaced.png?raw=true)
