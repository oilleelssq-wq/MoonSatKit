# MoonSatKit 验收基线

本文档定义当前版本可以重复执行的验收范围。项目定位为教学、研究和
Web 可视化工具，不用于真实航天器安全决策。

## 功能验收

- TLE 两行数据解析、字段解码和校验和检查。
- UTC 时间解析、闰年处理、儒略日和整数秒推进。
- 近地轨道 SGP4 传播，输出 ECI/TEME 风格位置和速度。
- ECI/ECEF、WGS-84 地理坐标和地面站 ENU 观测。
- 地面站 AOS、TCA、LOS 和最大仰角预测。
- JSON、CSV 和 GeoJSON 结果导出。
- 两行/三行 TLE 目录解析、多卫星过境预测和过境持续时间输出。
- 太阳位置估算，以及 Sunlit、Penumbra、Umbra 三态地影判断。
- Native、JavaScript、Wasm、Wasm-GC 四个后端一致通过核心测试。
- 浏览器适配层可以执行 TLE 校验、轨迹生成和过境预测；地影接口通过
  `moon_sat_eclipse_json` 暴露给 Web 调用方；目录过境接口通过
  `moon_sat_catalog_passes_json` 暴露。

## 数值验收

- Vallado 00005 参考状态的位置误差小于 `0.01 km`。
- Vallado 00005 参考状态的速度误差小于 `0.00001 km/s`。
- 坐标转换往返误差由测试中的明确容差约束。
- 过境窗口满足 `AOS <= TCA <= LOS`，且最大仰角不低于筛选阈值。
- 过境持续时间等于 `LOS - AOS`，多卫星结果包含名称、NORAD 编号并可序列化。
- 太阳位置距离处于合理的日地距离范围，赤经和赤纬处于 J2000 参考范围。
- 人工构造的太阳侧、地影轴线和半影边界状态分别得到三种预期分类。

## 可重复命令

在仓库根目录执行：

```console
moon fmt --check
moon check --deny-warn
moon test -p oilleelssq-wq/moonsatkit --target all --deny-warn
moon check web/wasm --target wasm --deny-warn
moon build web/wasm --target js --release
node --check web/app.js
git diff --check
```

运行 CLI 地影报告：

```console
moon run cmd/main -- eclipse "<line1>" "<line2>" --at 2026-08-23T12:00:00
```

输出包含 `illumination`、太阳赤经/赤纬、日地距离和 SGP4 轨道状态。

## 已知边界

- 当前 SGP4 只实现近地轨道分支；深空 TLE 返回 `UnsupportedOrbit`。
- 太阳位置使用低精度解析模型，适合地影分类和可视化，不等价于高精度
  星历或地球定向服务。
- 地影模型使用球形地球和圆锥形本影/半影近似。
- 尚未承诺闰秒、UT1 地球定向参数和航天器任务安全级精度。
- TLE 目录接口要求输入记录使用两行或标准三行格式，当前不负责网络下载和自动刷新 TLE。
