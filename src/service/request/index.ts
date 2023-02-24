import axios from "axios";
import type { AxiosInstance } from "axios";
import type {
  BaseRequestInterceptors,
  BaseRequestConfig,
  IBaseResponse
} from "./type";
// import { useToast } from "primevue/usetoast";




import errorMessage from "./errorMessage";
import { userStore } from "@/store/userStore";
import { ToastService } from "@/components/toast";




axios.defaults.headers.post["Content-Type"] = "application/json";


const DEAFULT_LOADING = false;
const Toast = new ToastService();


class BaseRequest {
  instance: AxiosInstance;
  interceptors?: BaseRequestInterceptors;
  showLoading: boolean;
  loading?: any;

  constructor(config: BaseRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config);
    // this.instance.defaults.headers.post["Content-Type"] =
    //   "application/json;application/x-www-form-urlencoded";

    // 保存基本信息
    this.showLoading = config.showLoading ?? DEAFULT_LOADING;
    this.interceptors = config.interceptors;
    // this.loading = Toast;

    // 使用拦截器

    // 2.添加所有的实例都有的拦截器
    this.instance.interceptors.request.use(
      config => {
        if (userStore().$state.user.token) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          config.headers["Token"] = userStore().$state.user?.token;
        }
      
        return config;
      },
      err => {
        return err;
      }
    );

    this.instance.interceptors.response.use(
      res => {
        // 将loading移除
        this.loading?.clear();
        // Toast.hide()
        if (res.status === 200 && !res.data.success) {
          Toast.add({
            severity: "error",
            summary: "错误信息",
            detail: res.data.errDetail || res.data.tipText,
          });
          if (res.data.errCode === "401") {
            // router.push("/");
          }
        }

        return res.status === 200
          ? Promise.resolve(res.data)
          : Promise.reject(res);
      },
      err => {
        // 将loading移除
        // this.loading?.clear();
        // Toast.hide()
        if (err && err.response) {
          console.log(err);
         Toast.add({
            severity: "error",
            summary: "网络错误",
            detail: errorMessage[err.response.status],
          });
        } else {
          // 网络超时
         Toast.add({
            severity: "error",
            summary: "网络错误",
            detail: "网络连接超时，请稍后重试！",
          });
        }
        return Promise.reject(err);
      }
    );
  }

  request<T>(config: BaseRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 1.单个请求对请求config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }

      // 2.判断是否需要显示loading

      if (config.showLoading) {
        this.showLoading = config.showLoading;
      }

      this.instance
        .request<any, T>(config)
        .then(res => {
          // 1.单个请求对数据的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }
          // 2.将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = DEAFULT_LOADING;

          // 3.将结果resolve返回出去
          resolve(res);
        })
        .catch(err => {
          // 将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = DEAFULT_LOADING;
          reject(err);
          return err;
        });
    });
  }

  get<T = any>(config: BaseRequestConfig<T>): Promise<T> {
    return this.request<T>({
      // headers: {
      //   "Content-Type": "application/json",
      // },
      ...config,
      method: "GET"
    });
  }
  post<T = any>(config: BaseRequestConfig<T>): Promise<T> {
    return this.request<T>({
      headers: {
        "Content-Type": "application/json"
      },
      ...config,
      method: "POST"
    });
  }
  put<T = any>(config: BaseRequestConfig<T>): Promise<T> {
    return this.request<T>({
      // headers: {
      //   "Content-Type": "application/json",
      // },
      ...config,
      method: "PUT"
    });
  }
  delete<T = any>(config: BaseRequestConfig<T>): Promise<T> {
    return this.request<T>({
      // headers: {
      //   "Content-Type": "application/json",
      // },
      ...config,
      method: "DELETE"
    });
  }
  patch<T = any>(config: BaseRequestConfig<T>): Promise<T> {
    return this.request<T>({
      // headers: {
      //   "Content-Type": "application/json",
      // },
      ...config,
      method: "PATCH"
    });
  }
}

export default BaseRequest;
