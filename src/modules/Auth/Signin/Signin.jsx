import React from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";

import { Navigate, useSearchParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { signin } from "../../../slices/userSlice";

//Định nghĩa các xác thực cho từng input
const schema = yup.object({
  // Phải là chuỗi và không được để trống
  taiKhoan: yup.string().required("Tài khoản không được để trống"),
  matKhau: yup
    .string()
    .required("Mật khẩu không được để trống")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      "Mật khẩu phải có ít nhất 8 kí tự, phải có 1 chữ hoa, 1 chữ thường và 1 số"
    ),
});

function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    //Khai báo các giá trị khởi tạo cho các input
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
    },
    //kích hoạt validation ngay khi tab xuống dòng (mặc định là onSubmit)
    mode: "onTouched",
    //Khai báo schema validation bằng yup
    resolver: yupResolver(schema),
  });
  const { user, isLoading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  // console.log(searchParams.get("redirectUrl "));

  const onSubmit = (values) => {
    // console.log(values);
    dispatch(signin(values));
  };
  const onError = (errors) => {
    console.log(errors);
  };
  //   Kiểm tra nếu có thông tin user => đã đăng nhập  => điều hướng về trang home
  if (user) {
    const url = searchParams.get("redirectUrl") || "/"; //nếu có vế trc thì lấy vế trước, nếu không thì điều hướng về trang home
    return <Navigate to={url} />;
  }

  return (
    <div>
      <h1>Signin</h1>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div>
          <input
            type="text"
            placeholder="user"
            // {...register("taiKhoan", {
            //   required: {
            //     value: true, //yêu cầu nó kiểm tra, false: không cần kiểm tra
            //     message: "(*) Tài khoản không được để trống",
            //   },
            // })}
            {...register("taiKhoan")}
          />
          {errors.taiKhoan && <p>{errors.taiKhoan.message}</p>}
        </div>
        <div>
          <input
            type="password"
            placeholder="password"
            // {...register("matKhau", {
            //   required: {
            //     value: true,
            //     message: "(*) Mật khẩu không được để trống",
            //   },
            //   pattern: {
            //     value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
            //     message:
            //       "Mật khẩu phải có ít nhất 8 kí tự, phải có 1 chữ hoa, 1 chữ thường và 1 số",
            //   },
            // })}
            {...register("matKhau")}
          />
          {errors.matKhau && <p>{errors.matKhau.message}</p>}
        </div>
        {/* Hiển thị lỗi server trả về. VD: trường hợp sai tài khoản hoặc mật khẩu */}
        {error && console.log(error)}

        <button disabled={isLoading}>Log in</button>
      </form>
    </div>
  );
}

export default Signin;
