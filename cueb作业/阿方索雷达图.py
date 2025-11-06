import matplotlib.pyplot as plt
import numpy as np

# 设置中文字体
plt.rcParams['font.sans-serif'] = ['SimHei']  # 用黑体显示中文
plt.rcParams['axes.unicode_minus'] = False  # 正常显示负号

# 能力指标
categories = ['速度', '力量', '传球', '盘带', '射门', '防守']
values = [93, 76, 66, 77, 65, 74]

# 计算角度
angles = np.linspace(0, 2 * np.pi, len(categories), endpoint=False).tolist()
values += values[:1]  # 闭合图形
angles += angles[:1]  # 闭合图形

# 创建图形和极坐标子图
fig, ax = plt.subplots(figsize=(10, 10), subplot_kw=dict(projection='polar'))

# 绘制灰色正六边形网格
max_value = 100
grid_levels = [20, 40, 60, 80, 100]
for level in grid_levels:
    grid_values = [level] * (len(categories) + 1)
    ax.plot(angles, grid_values, color='lightgray', linewidth=0.5, alpha=0.7)

# 绘制能力值连线（藏蓝色加粗，无填充）
navy_blue = '#000080'  # 藏蓝色
ax.plot(angles, values, color=navy_blue, linewidth=3)
# 移除了填充部分

# 设置极坐标参数
ax.set_theta_offset(np.pi / 2)  # 从顶部开始
ax.set_theta_direction(-1)  # 顺时针方向

# 隐藏圆形网格和径向刻度
ax.grid(False)
ax.set_yticklabels([])  # 隐藏径向刻度标签
ax.set_xticklabels([])  # 隐藏角度刻度标签

# 移除圆形边框
ax.spines['polar'].set_visible(False)

# 添加能力指标标签
for i, (angle, category) in enumerate(zip(angles[:-1], categories)):
    # 计算标签位置（在六边形外侧）
    x = angle
    y = max(values) + 15  # 在最高值外侧

    # 添加标签（只添加一次）
    ax.text(x, y, category, ha='center', va='center', fontsize=12)

# 添加能力数值
for i, (angle, value) in enumerate(zip(angles[:-1], values[:-1])):
    # 计算数值位置（在六边形内侧）
    x = angle
    y = value + 5  # 在数据点上方

    # 添加数值
    ax.text(x, y, str(value), ha='center', va='center', fontsize=11)

# 添加综合能力值（标题往上移动）
plt.figtext(0.5, 0.98, '阿方索·戴维斯综合能力：77',
            ha='center', va='center', fontsize=16, fontweight='bold')

# 设置相同的径向范围，确保六边形规则
ax.set_ylim(0, max(values) + 20)

# 调整布局
plt.tight_layout()

# 显示图形
plt.show()