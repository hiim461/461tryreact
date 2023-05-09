import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

//Component làm nhiệm vụ khi truy cập vào 1 route nào đó  cần yêu cầu đăng nhập mới có thể truy cập được cái route đó

//Sử dụng: <ProtectedRoute> <Booking/> </ProtectedRoute>
function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.user);
  const { pathname } = useLocation();

  //Trường hợp chưa đăng nhập, điều hướng về  trang đăng nhập
  if (!user) {
    return <Navigate to={`/signin?redirectUrl=${pathname}`} replace />;
    //đối với 1 props như replace nếu đặt giá trị là true thì chỉ cần gọi tên ra, nhưng nếu muốn đặt giá trị là false thì phải ghi rõ replace={false}
    //replace: không lưu lại lịch sử của trình duyệt mà nó thay thế cho url cũ
    //nghĩa là nếu chưa đăng nhập thì sẽ tới thẳng trang signin và trang signin sẽ thay thế trang bookin, và xóa lịch sử trang booking trc khi điều hướng về signin
  }

  //Trường hợp đã đắng nhấp=> cho phép truy cập
  return children;
}

export default ProtectedRoute;
