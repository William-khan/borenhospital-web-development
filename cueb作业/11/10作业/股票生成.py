from pyecharts import options as opts
from pyecharts.charts import Kline
import numpy as np
import datetime
import json
import os

STOCK_NAMES = ["银杏科技","苍穹能源","风火通信","蓝海医疗","晨曦新能源"]

def generate_ohlc_days(num_days=365, start_price=50, seed=None):
    rng = np.random.RandomState(seed)
    dates, ohlc = [], []
    price = start_price
    today = datetime.date.today()
    for i in range(num_days):
        d = today - datetime.timedelta(days=(num_days-1-i))
        open_p = price + rng.randn()*1.5
        close_p = open_p + rng.randn()*2
        low_p = min(open_p, close_p) - abs(rng.randn()*1)
        high_p = max(open_p, close_p) + abs(rng.randn()*1)
        open_p, close_p, low_p, high_p = map(lambda x: round(x,2), [open_p, close_p, low_p, high_p])
        ohlc.append([open_p, close_p, low_p, high_p])
        dates.append(d.strftime("%Y-%m-%d"))
        price = close_p
    return dates, ohlc

def aggregate_ohlc(dates, ohlc, period="week"):
    new_dates, new_ohlc, temp, temp_dates = [], [], [], []
    for i, (d, o) in enumerate(zip(dates, ohlc)):
        temp.append(o)
        temp_dates.append(d)
        if period=="week" and (i+1)%5==0 or period=="month" and (i+1)%20==0:
            o_open, o_close = temp[0][0], temp[-1][1]
            o_low, o_high = min([x[2] for x in temp]), max([x[3] for x in temp])
            new_dates.append(temp_dates[-1])
            new_ohlc.append([o_open,o_close,o_low,o_high])
            temp, temp_dates = [], []
    return new_dates, new_ohlc

# 生成数据
STOCK_DATA = {}
for idx, name in enumerate(STOCK_NAMES):
    dates, ohlc = generate_ohlc_days(365, start_price=50+idx*10, seed=100+idx)
    dates_w, ohlc_w = aggregate_ohlc(dates,ohlc,"week")
    dates_m, ohlc_m = aggregate_ohlc(dates,ohlc,"month")
    STOCK_DATA[name] = {"日K":{"dates":dates,"ohlc":ohlc},
                        "周K":{"dates":dates_w,"ohlc":ohlc_w},
                        "月K":{"dates":dates_m,"ohlc":ohlc_m}}

# 创建 K 线图 HTML
charts_html = {}
for name in STOCK_NAMES:
    for period in ["日K","周K","月K"]:
        kline = Kline().add_xaxis(STOCK_DATA[name][period]["dates"])\
                       .add_yaxis(f"{name}-{period}", STOCK_DATA[name][period]["ohlc"])\
                       .set_global_opts(
                           title_opts=opts.TitleOpts(title=f"{name}-{period}"),
                           tooltip_opts=opts.TooltipOpts(trigger="axis", axis_pointer_type="cross"),
                           datazoom_opts=[opts.DataZoomOpts(type_="slider"), opts.DataZoomOpts(type_="inside")],
                           xaxis_opts=opts.AxisOpts(type_="category", boundary_gap=True),
                           yaxis_opts=opts.AxisOpts(splitarea_opts=opts.SplitAreaOpts(is_show=True))
                       )
        charts_html[f"{name}-{period}"] = kline.render_embed()

# HTML 模板
stock_options = "\n".join([f'<option value="{n}">{n}</option>' for n in STOCK_NAMES])
period_options = "\n".join([f'<option value="{p}">{p}</option>' for p in ["日K","周K","月K"]])

divs_html = "\n".join([f'<div id="{k}" style="display:none">{v}</div>' for k,v in charts_html.items()])

html_template = f"""
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>股票 K 线图演示</title>
<script src="https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js"></script>
</head>
<body>
<div id="controls" style="position:fixed;top:10px;left:10px;z-index:9999;background:#fff;padding:6px 10px;border-radius:6px;">
股票: <select id="stock-select">{stock_options}</select>
周期: <select id="period-select">{period_options}</select>
</div>
<div id="stats" style="position:fixed;top:60px;right:10px;width:200px;height:300px;background:#fff;padding:6px 10px;border-radius:6px;overflow:auto;">
<h4>统计信息</h4><pre id="stats-content"></pre></div>
{divs_html}

<script>
var charts = {json.dumps(list(charts_html.keys()))};
function showChart(stock, period){{
    charts.forEach(function(k){{
        document.getElementById(k).style.display="none";
    }});
    var key = stock+"-"+period;
    document.getElementById(key).style.display="block";
    var chartObj = echarts.getInstanceByDom(document.querySelector("#"+key+" svg").parentNode);
    if(chartObj){{
        var data = chartObj.getOption().series[0].data;
        var first = data[0], last = data[data.length-1];
        var change = last[1]-first[0];
        var percent = ((change/first[0])*100).toFixed(2);
        var high = Math.max(...data.map(d=>d[3])).toFixed(2);
        var low = Math.min(...data.map(d=>d[2])).toFixed(2);
        document.getElementById("stats-content").textContent = 
            "开盘:"+first[0]+"\\n收盘:"+last[1]+"\\n涨跌:"+change.toFixed(2)+"\\n涨幅:"+percent+"%\\n最高:"+high+"\\n最低:"+low;
    }}
}}
document.addEventListener("DOMContentLoaded", function(){{
    showChart("{STOCK_NAMES[0]}","日K");
    document.getElementById("stock-select").addEventListener("change", function(e){{
        showChart(e.target.value, document.getElementById("period-select").value);
    }});
    document.getElementById("period-select").addEventListener("change", function(e){{
        showChart(document.getElementById("stock-select").value, e.target.value);
    }});
}});
</script>
</body>
</html>
"""

with open("stocks_kline_demo.html","w",encoding="utf-8") as f:
    f.write(html_template)

print("生成完成: stocks_kline_demo.html")
