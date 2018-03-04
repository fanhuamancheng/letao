$(function () {
    var myChart = echarts.init(document.querySelector('.charts_1'));
    var myChart2 = echarts.init(document.querySelector('.charts_2'));


    var option = {
        title: {
            text: '2017年注册人数'
        },
        tooltip: {},
        legend: {
            data: ['人数']
        },
        xAxis: {
            data: ["一月", "二月", "三月", "四月", "五月", "六月"]
        },
        yAxis: {},
        series: [{
            name: '人数',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
    };

    var option2 = {
        title: {
            text: '热门品牌销售',
            subtext: '2017年6月',
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['耐克', '阿迪达斯', '新百伦', '纽巴伦', '李宁']
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [
                    {value: 335, name: '耐克'},
                    {value: 310, name: '阿迪达斯'},
                    {value: 234, name: '新百伦'},
                    {value: 135, name: '纽巴伦'},
                    {value: 1548, name: '李宁'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };


    myChart.setOption(option);
    myChart2.setOption(option2);


});