const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true, // trim the whitespace when we made a mistake to add another space after the words
      required: "Name is required", // message 를 써놓으면 true 인 동시에 mongoose db 에서 알려준다
      minlength: [3, "Too short"], // minimum length is 3 character, if is less than 3 character, 'Too short' 출력
      maxlength: [32, "Too long"], // maximum length is 32 character, if is more than 32 character, 'Too long' 출력
    },
    slug: {
      type: String,
      trim: true,
      unique: true, // 중복 방지
      lowercase: true, // lowercase 로만 가능
      index: true, // index number 자동등록, query 할때 도움됨
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
