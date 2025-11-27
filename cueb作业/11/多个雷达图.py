import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from matplotlib.gridspec import GridSpec

# 构造示例数据（DataFrame 格式）
df = pd.DataFrame({
    'x': np.arange(10),
    'y': [1, 4, 2, 3, 3, 3, 4, 2, 5, 3]
})

sizes = [43.8, 18.8, 31.2, 6.2]
labels = ['D', 'B', 'C', 'A']
colors = ['b', 'm', 'y', 'g']
data_box = np.random.randn(100)
data_hist = np.random.randint(0, 130, 50)

# 创建 figure 并定义 GridSpec 布局
fig = plt.figure(figsize=(5, 5))
gs = GridSpec(4, 2, figure=fig, height_ratios=[1, 2, 2, 1])  # 4行高：上1 + 中2 + 下1
# 注意：中间的两行将合并为一块区域用于放饼图和箱线图

# 1️⃣ 上面折线图（占第一行）
ax1 = fig.add_subplot(gs[0, :])
df.plot(x='x', y='y', ax=ax1, legend=False)
ax1.set_title('')

# 2️⃣ 中间区域（占两行高）：左饼图 + 右箱线图
ax2 = fig.add_subplot(gs[1:3, 0])
ax2.pie(sizes, labels=labels, colors=colors, autopct='%1.1f%%')

ax3 = fig.add_subplot(gs[1:3, 1])
ax3.boxplot(data_box)

# 3️⃣ 最下面条形图（占最后一行）
ax4 = fig.add_subplot(gs[3, :])
ax4.hist(data_hist, bins=15)

plt.tight_layout()
plt.show()
