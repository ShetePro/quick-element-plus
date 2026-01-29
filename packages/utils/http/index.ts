import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import type { RequestOptions, Result } from './types'

// 创建 axios 实例
const axiosInstance: AxiosInstance = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
})

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 这里可以添加 token 等
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error) => {
    const { response } = error
    if (response) {
      const { data, status } = response
      const errorMessage = data?.message || `请求错误: ${status}`
      ElMessage.error(errorMessage)
    } else {
      ElMessage.error('网络错误，请检查网络连接')
    }
    return Promise.reject(error)
  }
)

class HttpRequest {
  private apiUrl: string = ''

  /**
   * 设置 API 基础 URL
   */
  setApiUrl(url: string) {
    this.apiUrl = url
  }

  /**
   * 获取 API 基础 URL
   */
  getApiUrl(): string {
    return this.apiUrl
  }

  /**
   * 处理请求配置
   */
  private handleConfig(config: AxiosRequestConfig): AxiosRequestConfig {
    return {
      ...config,
      url: config.url?.startsWith('http') ? config.url : `${this.apiUrl}${config.url}`,
    }
  }

  /**
   * 处理请求结果
   */
  private handleResponse<T>(response: AxiosResponse<Result<T>>, options?: RequestOptions): Result<T> {
    const { data } = response
    
    if (options?.isTransformRequestResult !== false) {
      const { code, message, data: resultData } = data
      const hasSuccess = data && code === 200
      
      if (hasSuccess) {
        if (options?.successMessage && options?.isShowSuccessMessage) {
          ElMessage.success(options.successMessage)
        }
        return { ...data, data: resultData, success: true }
      }
      
      const errorMessage = message || '操作失败'
      if (options?.isShowErrorMessage !== false) {
        ElMessage.error(errorMessage)
      }
      throw new Error(errorMessage)
    }
    
    return data
  }

  /**
   * 通用请求方法
   */
  request<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<Result<T>> {
    const mergedConfig = this.handleConfig(config)
    
    return new Promise((resolve, reject) => {
      axiosInstance
        .request<Result<T>>(mergedConfig)
        .then((response) => {
          try {
            const result = this.handleResponse<T>(response, options)
            resolve(result)
          } catch (error) {
            reject(error)
          }
        })
        .catch((error) => {
          if (options?.isShowErrorMessage !== false) {
            const message = error?.message || '请求失败'
            ElMessage.error(message)
          }
          reject(error)
        })
    })
  }

  /**
   * GET 请求
   */
  get<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<Result<T>> {
    return this.request({ ...config, method: 'GET' }, options)
  }

  /**
   * POST 请求
   */
  post<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<Result<T>> {
    return this.request({ ...config, method: 'POST' }, options)
  }

  /**
   * PUT 请求
   */
  put<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<Result<T>> {
    return this.request({ ...config, method: 'PUT' }, options)
  }

  /**
   * DELETE 请求
   */
  delete<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<Result<T>> {
    return this.request({ ...config, method: 'DELETE' }, options)
  }
}

export const request = new HttpRequest()
export * from './types'
