// 用Vue開發
import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.45/vue.esm-browser.min.js";

const url = "https://vue3-course-api.hexschool.io/v2/";
const path = "masaki";

const app = {
  // 1. 產生資料
  data() {
    return {
      products: [],
      tempProduct: {},
    };
  },
  //*方法集
  methods: {
    //先確認是否登入正確
    checkLogin() {
      axios
        .post(`${url}api/user/check`)
        .then((res) => {
          this.getProducts();
        })
        .catch((err) => {
          alert(err.data.message);
          window.location = "index.html";
        });
    },
    //再取得帳號內的產品資料
    getProducts() {
      axios
        .get(`${url}api/${path}/admin/products`)
        .then((res) => {
          //   console.log(res.data.products);
          this.products = res.data.products;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    // 查看細項
    getProduct(item) {
      this.tempProduct = item;
    },
  },
  //*生命週期 初始化
  mounted() {
    // 取出 Token
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)loginToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    // defaults 每次都會帶入
    axios.defaults.headers.common.Authorization = token;
    this.checkLogin();
  },
};

createApp(app) // 2. 生成Vue應用程式
  .mount("#app"); // 3. 渲染到畫面上
