import { fileURLToPath, URL } from 'node:url'
import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteCompression from 'vite-plugin-compression'
const timeStamp = new Date().getTime()
export default defineConfig(({ mode }) => {
    // 获取各种环境下的对应的变量
    const env = loadEnv(mode, process.cwd())
    return {
        base: env.VITE_BASE_PUBLICPATH,
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        },
        plugins: [
            vue(),
            viteCompression({
                verbose: true, // 默认即可
                disable: false, //开启压缩(不禁用)，默认即可
                deleteOriginFile: false, //删除源文件
                threshold: 10240, //压缩前最小文件大小
                algorithm: 'gzip', //压缩算法
                ext: '.gz' //文件类型
            })
        ],
        css: {
            preprocessorOptions: {
                scss: {
                    api: 'modern-compiler', // or "modern"
                    // javascriptEnabled: true,
                    additionalData: `@import "${path.resolve(__dirname, 'src/styles/variables.scss').replace(/\\/g, '/')}";`
                }
            }
        },
        server: {
            https: false,
            host: true,
            proxy: {
                // '/oriApi': {
                //     ws: false,
                //     target: loadEnv(mode, process.cwd()).VITE_ESTIMATE_LANDURL,
                //     changeOrigin: true,
                //     secure: false,
                //     rewrite: path => path.replace(/^\/oriApi/, '')
                // }
            }
        },
        // build打包构建配置
        build: {
            // 输出目录，默认是 dist 打包文件的输出目录
            outDir: 'dist',
            assetsDir: 'static',
            brotliSize: false, // 关闭打包过程中计算包的大小
            cssCodeSplit: true, //启用/禁用 CSS 代码拆分
            assetsInlineLimit: 4096, // 图片转base64编码的阈值
            sourcemap: false, //构建后是否生成 source map 文件
            minify: 'terser', // terser 构建后文件体积更小
            rollupOptions: {
                output: {
                    entryFileNames: `static/js/[name].${timeStamp}.js`,
                    chunkFileNames: `static/js/[name]-${timeStamp}.js`,
                    assetFileNames: `static/[ext]/name-${timeStamp}.[ext]`
                }
            },
            terserOptions: {
                compress: {
                    drop_console: true, // 生产环境去掉控制台 console
                    drop_debugger: true, // 生产环境去掉控制台 debugger 默认就是true
                    dead_code: true // 删除无法访问的代码 默认就是true
                }
            }
        }
    }
})
