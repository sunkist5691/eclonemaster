// 이 파일은 user table 의 모델을 만드는 장소
// 몽구스는 이것을 table 대신에 collection 이라고 부른다

const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema; // ObjectId 는 default primary key 인 _id 를 unique 한 숫자로 자동 생성해준다

const userSchema = new mongoose.Schema( // knex.schema.createTable('users', tbl => {..} 와 같은 역할을 한다
  {
    name: String,
    email: {
      type: String,
      required: true, // notNullable() 과 같은 역할
      index: true, // knex.schema 에 있는 .increments() 기능이다. 즉, 새로운 user 가 추가 될때마다 자동으로 index 가 주어진다
    },
    role: {
      type: String,
      default: "subscriber", // any user login, created by database, the user will get a role as 'subscriber' by default
    },
    cart: {
      type: Array, // type 은 Array 인데, 아무것도 없을 경우, 빈 [] 로 default 한다.
      default: [],
    },
    address: String,
    // wishlist: [{ type: ObjectId, ref: "Product" }], // .reference('id').inTable('Product') 과 같은 역할, 쉽게 말해 primary key 인 _id 를 Product model 에 reference 하겠다는 의미
  },
  { timestamps: true } // anytime when create user, it will auto populate date in database
);

module.exports = mongoose.model("User", userSchema);
// 나중에 새로운 user 를 새로 데이터 베이스에 등록할때,
// 이러한 형태로 만들어진다.
/* 
   { 
      index: '',
      name: '',
      email: '',
      role: '',
      cart: [],
      address: '',
      wishlist: [],
      timestamps: '',
   }
*/
