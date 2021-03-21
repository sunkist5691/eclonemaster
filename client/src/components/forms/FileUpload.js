import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from "react-redux";
import { Avatar, Badge } from "antd";

const FileUpload = ({ values, setValues, setLoading }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const fileUploadAndResize = (e) => {
    // console.log(e.target.files);
    // resize the image (using `npm i react-image-file-resizer`)
    // resizing into `base64` in frontend and send it to cloudinary and server will save a lot of time
    // to upload images (it's really fast and efficient)
    let files = e.target.files; // depends how many files you selected
    let allUploadedFiles = values.images; // values.images 는 현재 [ ] 빈 array 이다.

    if (files) {
      setLoading(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          300,
          300,
          "JPEG",
          100,
          0,
          (uri) => {
            // resize 된 각 이미지를 (uri) backend /uploadimages API 에 보낸다
            // 이때 보낼때 req.headers 에 유저가 존재한다면 유저 토큰을 authentication 을 위해 같이 보낸다
            axios
              .post(
                `${process.env.REACT_APP_API}/uploadimages`,
                {
                  image: uri,
                },
                {
                  headers: {
                    authtoken: user ? user.token : "",
                  },
                }
              )
              .then((res) => {
                console.log("IMAGE UPLOAD RES DATA", res);
                setLoading(false);
                allUploadedFiles.push(res.data);
                setValues({ ...values, images: allUploadedFiles });
              })
              .catch((err) => {
                setLoading(false);
                console.log("CLOUDINARY UPLOAD ERROR", err);
              });
          },
          "base64"
        );
      }
    }
    // send back to server to upload to cloudinary
    // set url to images[] in the parent component --> `ProductCreate.js'
  };

  const handleImageRemove = (public_id) => {
    setLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_API}/removeimage`,
        { public_id },
        { headers: { authtoken: user ? user.token : "" } }
      )
      .then((res) => {
        setLoading(false);
        const { images } = values;
        let filteredImages = images.filter((item) => {
          return item.public_id !== public_id;
        });
        setValues({ ...values, images: filteredImages });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <>
      <div className='row'>
        {values.images &&
          values.images.map((image) => (
            <Badge
              count='X'
              key={image.public_id}
              onClick={() => handleImageRemove(image.public_id)}
              style={{ cursor: "pointer" }}
            >
              <Avatar
                src={image.url}
                size={100}
                shape='square'
                className='ml-3'
              />
            </Badge>
          ))}
      </div>
      <div className='row'>
        {/* `label` wraps `input` and `input` use `hidden` property to hide a `input` on website,
       instead the functionality still works, it just not showing up on browser */}
        <label className='btn btn-primary btn-raised mt-3'>
          Choose File
          {/* `multiple` let you upload multiple images, 
         `accept='images/*'` let you accept to upload any form of images (jpeg, png, etc.) 
         if the file name starting with 'images/' */}
          <input
            type='file'
            multiple
            hidden
            accept='images/*'
            onChange={fileUploadAndResize}
          />
        </label>
      </div>
    </>
  );
};

export default FileUpload;
