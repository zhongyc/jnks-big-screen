// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core'
// 引入柱状图图表，图表后缀都为 Chart
import { BarChart, PieChart, LineChart } from 'echarts/charts'
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component

import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent,
    LegendComponent,
    GraphicComponent,
    ToolboxComponent
} from 'echarts/components'
// 标签自动布局、全局过渡动画等特性
import { ScatterChart } from 'echarts/charts'
import { LabelLayout, UniversalTransition } from 'echarts/features'
// 引入 echarts-gl 模块
import { SurfaceChart } from 'echarts-gl/charts'
import { Grid3DComponent } from 'echarts-gl/components'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'

// 注册必须的组件
echarts.use([
    SurfaceChart,
    Grid3DComponent,
    TitleComponent,
    LegendComponent,
    TooltipComponent,
    GridComponent,
    GraphicComponent,
    DatasetComponent,
    ToolboxComponent,
    TransformComponent,
    BarChart,
    PieChart,
    LineChart,
    LabelLayout,
    UniversalTransition,
    CanvasRenderer,
    ScatterChart
])
export default echarts
