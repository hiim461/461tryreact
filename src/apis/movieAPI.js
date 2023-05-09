import axiosClient from "./axiosClient";

export const apiGetMovies = async () => {
  const { data } = await axiosClient.get("/QuanLyPhim/LayDanhSachPhim", {
    params: {
      maNhom: "GP01",
    },
    headers: {
      Authorization: JSON.parse(localStorage.getItem("user"))?.accessToken,
    },
  });
  return data;
};

export const apiGetBanners = async () => {
  const { data } = await axiosClient.get("/QuanLyPhim/LayDanhSachBanner");
  return data;
};

export const apiGetMovieDetails = async (movieId) => {
  const { data } = await axiosClient.get("/QuanLyPhim/LayThongTinPhim", {
    params: {
      MaPhim: movieId,
    },
  });
  return data;
};

export const apiCreateMovie = async (movie) => {
  const formData = new FormData();
  // formData.append("tenPhim", "Lat Mat 6");
  for (let key in movie) {
    formData.append(key, movie[key]);
  }
  formData.append("maNhom", "GP01");

  return axiosClient.post("/QuanLyPhim/ThemPhimUploadHinh", formData);
};
