import numpy as np
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

# ======== 原始数据 =========
df2 = pd.DataFrame({'Col':'OCC',
                   'ID':2023090+pd.Series([1,2,3,4,5,6]),
                   'Dep':pd.Categorical(['IT','BA','IT']*2),
                   'Gender':pd.Categorical(['M','F','F','F','M','F']),
                   'Grade':np.arange(70,100,5)})

# ======== 中文设置 =========
plt.rcParams['font.sans-serif']=['SimHei']
plt.rcParams['axes.unicode_minus']=False
sns.set_style("whitegrid")

# ======== 属性中文化 =========
idx = {'Col':'学院','ID':'学号','Dep':'专业系','Gender':'性别','Grade':'成绩'}
df = df2.copy()
df.columns = df.columns.map(idx)

# ======== 数据中文化 =========
dep_type={'IT':'信管','BA':'工管'}
sex_type={'F':'女','M':'男'}
col={'OCC':'华侨学院'}

df['专业系']=df['专业系'].map(dep_type)
df['性别']=df['性别'].map(sex_type)
df['学院']=df['学院'].map(col)
df['年级']=[1,3,2,4,2,3]

# ======== 直方图统一绿色（无循环）=========
sns.set_palette(['green'])

# ======== jointplot 主图 + 辅图（最简洁）=========
g = sns.jointplot(
    data=df,
    x="成绩",
    y="年级",
    kind="scatter",
    height=8,
    ratio=3,
    space=1,
    color='green'   # 散点黑色（避免被 palette 影响）
)

# 六边形散点（重新绘制）
g.ax_joint.scatter(df["成绩"], df["年级"], s=300, marker='h', color='black')

plt.show()
