import pandas as pd
import matplotlib.pyplot as plt
from pandas.plotting import table as pd_table
import numpy as np


df = pd.DataFrame({
    'Col'   : ['OCC'] * 6,
    'ID'    : [2023091, 2023092, 2023093, 2023094, 2023095, 2023096],
    'Dep'   : ['IT','BA','IT','IT','BA','IT'],
    'Gender': ['M','F','F','F','M','F'],
    'Grade' : [70,75,80,85,90,95]
})

# 设置 index 为 0..5，并确保 index.name 是 None（不要用 ""）
df.index = range(len(df))   # 0,1,2,3,4,5
df.index.name = None        # 关键：None 而不是 ""，避免绘图时出现空白表头格

fig, ax = plt.subplots(figsize=(8, 2.4))
ax.axis('off')

# 用 pandas/matplotlib 的 table 绘制：cellText 用 df.values，colLabels 用 df.columns，rowLabels 用 df.index
tbl = ax.table(
    cellText=df.values,
    colLabels=df.columns,
    rowLabels=df.index,
    loc='center',
    cellLoc='center'
)

tbl.auto_set_font_size(False)
tbl.set_fontsize(12)
tbl.scale(1, 1.35)

plt.tight_layout()
plt.show()

# ==============================================================
# 图 2 —— 只画横线；完全没有竖线（左右两条也不能有）
# ==============================================================

df2 = df.copy()
df2.index.name = 'index'
df2r = df2.reset_index()

nrows = len(df2r)
ncols = len(df2r.columns)
col_names = list(df2r.columns)

fig, ax = plt.subplots(figsize=(8, 3))
ax.axis('off')

# 表格区域
left = 0.05
right = 0.95
top = 0.9
bottom = 0.1

table_width = right - left
table_height = top - bottom
row_h = table_height / (nrows + 1)

# ---- 横线（顶横线、底横线、中间每一行） ----
y_positions = [top - i * row_h for i in range(nrows + 2)]
for y in y_positions:
    ax.hlines(y, left, right, linewidth=1.2, color='black')

# ---- 关键修改：完全不画竖线（包括左右边界） ----
# 你的代码里原本有 ax.vlines(left...) 和 ax.vlines(right...) → 已移除

# ---- 自动等宽列（你原本写了比例，但可保持） ----
col_widths = np.linspace(left, right, ncols + 1)

# ---- 表头 ----
for j, cname in enumerate(col_names):
    cx = (col_widths[j] + col_widths[j+1]) / 2
    cy = top - row_h/2
    ax.text(cx, cy, str(cname), ha='center', va='center', fontsize=12)

# ---- 内容 ----
for i in range(nrows):
    for j in range(ncols):
        cx = (col_widths[j] + col_widths[j+1]) / 2
        cy = top - (i + 1.5) * row_h
        ax.text(cx, cy, str(df2r.iloc[i, j]), ha='center', va='center', fontsize=12)

plt.show()
