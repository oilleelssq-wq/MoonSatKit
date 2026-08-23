# MoonSatKit 项目申报书

## 基本信息
- 项目名称：MoonSatKit（MoonBit 卫星轨道与过境预测工具包）
- 项目标识：`oillee/moonsatkit`
- 申报人/主要开发者：oillee
- GitHub：[github.com/oilleelssq-wq/MoonSatKit](https://github.com/oilleelssq-wq/MoonSatKit)
- GitLink：[gitlink.org.cn/oillee/moonsatkit](https://gitlink.org.cn/oillee/moonsatkit)
- 项目性质：原创 MoonBit 开源项目；参考公开标准、论文和测试向量实现
- 开源许可证：Apache-2.0

## 项目简介
MoonSatKit 是使用纯 MoonBit 实现的卫星轨道计算工具包，面向航天教学、业余卫星通信、遥感任务规划和 Web 轨迹可视化场景。用户输入卫星 TLE、地面站位置和预测时间范围后，可获得卫星位置、地理坐标、方位角、仰角、距离及过境事件，并可导出 JSON、CSV 和 GeoJSON 数据。

## 建设内容
- TLE 两行轨道数据解析、字段校验、校验和验证与结构化错误报告。
- UTC、儒略日、恒星时、WGS-84，以及 TEME/ECI/ECEF/ENU 坐标转换。
- 纯 MoonBit SGP4 轨道传播，优先完成近地轨道分支，再扩展深空轨道。
- 地面站观测、AOS/TCA/LOS 过境搜索、事件插值、地球阴影与可见性判断。
- CLI、轨迹数据导出和浏览器 WASM 可视化示例。

## 当前基础与实施计划
项目已完成 MoonBit 工程初始化、公共数据类型、UTC 解析、儒略日与恒星时计算、TLE 解析和校验、TLE 数值根数解码、两体 Kepler 预览传播、GMST、ECI/ECEF 状态转换、WGS-84 地理坐标转换、地面站 ENU 观测、近地轨道 SGP4 核心传播、基于两体模型和 SGP4 模型的 AOS/TCA/LOS 过境搜索、JSON/CSV/GeoJSON 结果导出、CLI（TLE 校验、SGP4 传播、过境预测和 GeoJSON 轨迹导出）、Vallado 00005 公开验证样例及自动化测试。当前测试共 32 项，已在 Native、JavaScript、Wasm 和 Wasm-GC 四个后端通过。SGP4 目前明确支持近地轨道，深空轨道返回 UnsupportedOrbit，后续继续补齐 SDP4、官方全轨道测试向量、浏览器可视化演示和性能基准。

## 预期成果与项目亮点
预期形成约 4000～7000 行有效 MoonBit 代码、可发布的 Mooncakes 包、完整 API 文档、测试向量、命令行工具和 WASM 演示。项目融合航天动力学、地理信息与数值计算，当前 MoonBit 生态中同类工具稀缺，可体现 MoonBit 多后端复用和数值计算能力，并为卫星轨迹应用提供可复用基础库。

## 风险与合规说明
主要风险是 SGP4 数值正确性和跨后端浮点一致性。项目将采用公开规范及权威测试向量、明确误差阈值并记录算法来源；第三方资料、测试数据和参考实现均在文档中注明来源与许可证。项目定位为教学和软件开发工具，MVP 不用于真实航天器安全决策。
