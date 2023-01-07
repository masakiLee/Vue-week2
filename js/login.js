// 用Vue開發
import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.45/vue.esm-browser.min.js";

createApp({
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  //方法集
  methods: {
    login() {
      const api = "https://vue3-course-api.hexschool.io/v2/admin/signin";
      axios
        .post(api, this.user)
        .then((res) => {
          const { token, expired } = res.data;
          //  token 加入 cookie expires 設置 cookie 有效時間
          document.cookie = `loginToken=${token}; expires=${new Date(
            expired
          )}; path=/`;
          window.location = "/product.html";
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
  //生命週期 元件開始的時候
  mounted() {
    console.log(`這是初始化`);
  },
}).mount("#app");
