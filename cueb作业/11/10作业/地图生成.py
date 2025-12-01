from pyecharts.charts import Map
from pyecharts import options as opts

# ===============================
# 这里填你的数据（已付款订单数量）
# ===============================
province_order_dict = {
    "上海": 3060,
    "广东省": 2022,
    "北京": 1853,
    "江苏省": 1845,
    "浙江省": 1822,
    "四川省": 1752,
    "山东省": 1484,
    "天津": 1031,
    "辽宁省": 1012,
    "湖南省": 935,
    "重庆": 896,
    "河北省": 885,
    "河南省": 792,
    "云南省": 667,
    "安徽省": 528,
    "陕西省": 441,
    "福建省": 425,
    "山西省": 395,
    "广西壮族自治区": 353,
    "吉林省": 336,
    "江西省": 331,
    "黑龙江省": 312,
    "贵州省": 286,
    "内蒙古自治区": 176,
    "海南省": 156,
    "甘肃省": 132,
    "湖北省": 57,
    "新疆维吾尔自治区": 43,
    "宁夏回族自治区": 40,
    "青海省": 18,
    "西藏自治区": 2
}

# 转成列表格式
data_list = [(k, int(v)) for k, v in province_order_dict.items()]

# ===============================
#   生成彩色中国地图
# ===============================
(
    Map()
    .add(
        series_name="已付款订单数",
        data_pair=data_list,
        maptype="china",
        is_map_symbol_show=False
    )
    .set_global_opts(
        title_opts=opts.TitleOpts(title="中国各省已付款订单数量"),
        visualmap_opts=opts.VisualMapOpts(
            max_=max(province_order_dict.values()),
            is_piecewise=False,      # 连续色阶 = 彩色
        )
    )
    .render("订单地图_彩色版.html")
)
