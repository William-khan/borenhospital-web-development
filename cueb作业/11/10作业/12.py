import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.lines import Line2D
from matplotlib import font_manager


# ----------------- 中文字体自动检测 -----------------
zh_fonts = ["SimHei", "Microsoft YaHei", "STSong",
            "WenQuanYi Zen Hei", "Noto Sans CJK SC"]
found_font = None
for fpath in font_manager.findSystemFonts(fontpaths=None, fontext='ttf'):
    for z in zh_fonts:
        if z.lower() in fpath.lower():
            found_font = z
            break
    if found_font:
        break
if found_font:
    plt.rcParams['font.family'] = found_font
plt.rcParams['axes.unicode_minus'] = False

# ----------------- 数据 -----------------
data = {
    '学院': ['华侨学院']*6,
    '学号': [2023091, 2023092, 2023093, 2023094, 2023095, 2023096],
    '专业系': ['信管','工管','信管','信管','工管','信管'],
    '性别': ['男','女','女','女','男','女'],
    '成绩': [70,75,80,85,90,95],
    '年级': [1,3,2,4,2,3]
}
df = pd.DataFrame(data)
global_min_score = df['成绩'].min()
global_max_score = df['成绩'].max()

# ----------------- 绘图函数 -----------------
def draw_one(ax, df_sub, min_sz=40, max_sz=260):
    sizes = ((df_sub['成绩'] - global_min_score) /
             (global_max_score - global_min_score)) * (max_sz - min_sz) + min_sz
    ax.set_xlabel("成绩")
    ax.set_ylabel("年级")
    ax.set_xlim(68, 97)
    ax.set_xticks([70,75,80,85,90,95])
    ax.set_ylim(0.9, 4.1)
    ax.set_yticks([1,2,3,4])
    ax.grid(True, linestyle='-', linewidth=0.6, alpha=0.6)
    ax.scatter(df_sub['成绩'], df_sub['年级'], s=sizes,
               marker='o', facecolor='black', edgecolor='black', linewidth=0.6)

# --------------------------------------------------
# ① 第一张图：单图 + 右侧图例上下紧挨（零缝隙）
# --------------------------------------------------
fig1 = plt.figure(figsize=(8.5,5))
ax_main = fig1.add_axes([0.06, 0.10, 0.66, 0.82])   # 主图
draw_one(ax_main, df)

# 预先生成图例需要的"手柄"
score_list = [70,75,80,85,90,95]
score_sizes = ((np.array(score_list)-global_min_score)/
               (global_max_score-global_min_score))*(260-40)+40

gender_handles = [Line2D([0],[0], marker='o', color='black',
                         markerfacecolor='black', linestyle='None'),
                  Line2D([0],[0], marker='o', color='black',
                         markerfacecolor='black', linestyle='None')]
gender_labels = ['女', '男']

score_handles = [Line2D([0],[0], marker='o', color='black',
                        markerfacecolor='black',
                        markersize=np.sqrt(s)/3, linestyle='None')
                for s in score_sizes]

# 关键：用 **同一个** legend_ax 画两个 legend，并手动控制位置
legend_ax = fig1.add_axes([0.75, 0.10, 0.20, 0.82])
legend_ax.axis('off')

# 先画"性别"
lg1 = legend_ax.legend(handles=gender_handles, labels=gender_labels,
                       title="性别", loc='upper left', bbox_to_anchor=(0, 1.0),
                       frameon=False)
legend_ax.add_artist(lg1)          # 锁定第一个 legend

# 再画"成绩"，通过 bbox_to_anchor 的 y 值让上下紧挨
# 1.0 - 0.12 ≈ 紧贴在性别图例下方
lg2 = legend_ax.legend(handles=score_handles, labels=[str(x) for x in score_list],
                       title="成绩", loc='upper left', bbox_to_anchor=(0, 1.0-0.12),
                       frameon=False)
legend_ax.add_artist(lg2)

plt.show()

# --------------------------------------------------
# ② 第二张图：左右两子图 + 图外右侧上下紧挨图例
# --------------------------------------------------
# 方案1：使用 add_axes 精确控制图例位置（推荐）
fig2 = plt.figure(figsize=(13, 5))

# 调整子图位置，为右侧图例留出空间
ax1 = fig2.add_axes([0.08, 0.12, 0.38, 0.78])   # 左边图
ax2 = fig2.add_axes([0.52, 0.12, 0.38, 0.78])   # 右边图
legend_ax2 = fig2.add_axes([0.92, 0.12, 0.06, 0.78])  # 右侧图例区域

df_left  = df[df['专业系'] == "工管"]
df_right = df[df['专业系'] == "信管"]

draw_one(ax1, df_left)
ax1.set_title("专业系 = 工管")
draw_one(ax2, df_right)
ax2.set_title("专业系 = 信管")

# 在专门的图例区域绘制图例
legend_ax2.axis('off')
lg1 = legend_ax2.legend(handles=gender_handles, labels=gender_labels,
                       title="性别", loc='upper left', bbox_to_anchor=(0, 1.0),
                       frameon=False)
legend_ax2.add_artist(lg1)
lg2 = legend_ax2.legend(handles=score_handles, labels=[str(x) for x in score_list],
                       title="成绩", loc='upper left', bbox_to_anchor=(0, 1.0-0.12),
                       frameon=False)
legend_ax2.add_artist(lg2)

plt.show()

# 方案2：使用 subplots_adjust 调整布局（备选）
fig3, axes = plt.subplots(1, 2, figsize=(13, 5))

df_left  = df[df['专业系'] == "工管"]
df_right = df[df['专业系'] == "信管"]

draw_one(axes[0], df_left)
axes[0].set_title("专业系 = 工管")
draw_one(axes[1], df_right)
axes[1].set_title("专业系 = 信管")

# 调整子图位置，为图例腾出空间
plt.subplots_adjust(right=0.85)  # 为右侧图例留出15%的空间

# 将图例放在右侧空白区域
fig3.legend(handles=gender_handles, labels=gender_labels,
           title="性别", loc='center right',
           bbox_to_anchor=(0.98, 0.72), frameon=False)
fig3.legend(handles=score_handles, labels=[str(x) for x in score_list],
           title="成绩", loc='center right',
           bbox_to_anchor=(0.98, 0.35), frameon=False)

plt.show()