import pandas as pd

# 读取CSV文件
df = pd.read_csv('tmall_order_report.csv')

# 筛选出已付款的订单（订单付款时间不为空）
df_paid = df[df['订单付款时间'].notna()]

print("=" * 60)
print("各省已付款订单数量统计（付款时间不为空）")
print("=" * 60)

# 统计各省的已付款订单数量
province_paid_count = df_paid['收货地址'].value_counts().reset_index()
province_paid_count.columns = ['省份', '已付款订单数量']

# 按订单数量降序排序
province_paid_count = province_paid_count.sort_values(by='已付款订单数量', ascending=False)

# 显示所有省份的结果
pd.set_option('display.max_rows', None)
print(province_paid_count.to_string(index=False))

# 显示总计
print("\n" + "=" * 60)
print(f"总订单数: {len(df)}")
print(f"已付款订单数: {len(df_paid)}")
print(f"未付款订单数: {len(df) - len(df_paid)}")
print(f"付款率: {len(df_paid)/len(df)*100:.2f}%")
print(f"涉及省份总数: {len(province_paid_count)}")
print("=" * 60)

# 验证上海的订单数
shanghai_paid = province_paid_count[province_paid_count['省份'] == '上海']['已付款订单数量']
if not shanghai_paid.empty:
    print(f"\n上海已付款订单数: {shanghai_paid.values[0]}")
else:
    print("\n上海数据未找到")