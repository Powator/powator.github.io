
    let color = 'rgb(252, 103, 250)', color1 = 'rgba(78, 84, 200)', color2 = 'rgba(143, 148, 251)';
    let postsOption = {
        title: {
            text: '文章发布时间统计图',
            x: 'center',
            textStyle: {
                color: color
            }
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            name: '日期',
            type: 'category',
            boundaryGap: false,
            nameTextStyle: {
                color: color
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: true,
              color: color
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: color
              }
            },
            data: ["2020-06","2020-07","2020-08","2020-09","2020-10","2020-11","2020-12","2021-01","2021-02","2021-03","2021-04","2021-05","2021-06","2021-07","2021-08","2021-09","2021-10","2021-11","2021-12","2022-01","2022-02","2022-03","2022-04","2022-05","2022-06","2022-07","2022-08","2022-09","2022-10","2022-11","2022-12","2023-01","2023-02","2023-03","2023-04","2023-05","2023-06","2023-07","2023-08","2023-09","2023-10","2023-11","2023-12","2024-01","2024-02","2024-03","2024-04","2024-05","2024-06"]
          },
        yAxis: {
            name: '文章数量',
            type: 'value',
            nameTextStyle: {
              color: color
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: true,
              color: color
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: color
              }
            }
        },
        series: [
            {
                name: '文章数量',
                type: 'line',
                smooth: true,
                lineStyle: {
                    width: 0
                },
                showSymbol: false,
                color: ['#6772e5'],
                data: [1,22,20,10,0,0,0,0,1,1,3,6,0,10,14,2,6,1,0,0,0,0,2,8,0,0,1,0,1,1,0,0,0,0,0,0,0,0,0,3,3,4,0,1,3,5,8,8,3],
                markLine: {
                    data: [{
                      name: '平均值',
                      type: 'average',
                      label: {
                        color: color
                      }
                    }],
                    itemStyle: {color: [color]}
                },
                itemStyle: {
                    opacity: 1,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: color1
                    },
                    {
                      offset: 1,
                      color: color2
                    }])
                },
                areaStyle: {
                    opacity: 1,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: color1
                    }, {
                        offset: 1,
                        color: color2
                    }])
                }
            }
        ]
    };
    
    let tagsOption = {
        title: {
          text: 'Top 10 标签统计图',
          x: 'center',
          textStyle: {
            color: color
          }
        },
        tooltip: {},
        xAxis: {
          name: '标签',
          type: 'category',
          nameTextStyle: {
            color: color
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: true,
            color: color,
            interval: 0
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: color
            }
          },
          data: ["Python","WordPress","Linux","神经网络","Web前端","JavaScript","计网","Hexo","Docker","PHP"]
        },
        yAxis: {
          name: '文章数量',
          type: 'value',
          splitLine: {
            show: false
          },
          nameTextStyle: {
            color: color
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: true,
            color: color
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: color
            }
          }
        },
        series: [{
          name: '文章数量',
          type: 'bar',
          data: [33,21,20,16,14,11,11,11,10,9],
          itemStyle: {
            borderRadius: [5, 5, 0, 0],
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: color1
            },
            {
              offset: 1,
              color: color2
            }])
          },
          emphasis: {
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: color1
              },
              {
                offset: 1,
                color: color2
              }])
            }
          },
          markLine: {
            data: [{
              name: '平均值',
              type: 'average',
              label: {
                color: color
              },
              itemStyle: {color: [color]}
            }]
          }
        }]
      };
    
      let categoryParentFlag = false
      let categoriesOption = {
        title: {
          text: '文章分类统计图',
          x: 'center',
          textStyle: {
            color: color
          }
        },
        legend: {
          top: 'bottom',
          data: ["瞎捣鼓经历","博客相关","Debug","机器学习","学习笔记","CTF题解","Hexo魔改","杂趣"],
          textStyle: {
            color: color
          }
        },
        tooltip: {
          trigger: 'item'
        },
        series: []
      };
      categoriesOption.series.push(
        categoryParentFlag ? 
        {
          nodeClick :false,
          name: '文章篇数',
          type: 'sunburst',
          radius: ['15%', '90%'],
          center: ['50%', '55%'],
          sort: 'desc',
          data: [{"name":"瞎捣鼓经历","value":47,"path":"categories/瞎捣鼓经历/","id":"clxv689ln0008xsn81tmbdn8k","parentId":"0"},{"name":"博客相关","value":39,"path":"categories/博客相关/","id":"clxv689mc001bxsn844q1cysi","parentId":"0"},{"name":"Debug","value":19,"path":"categories/debug/","id":"clxv689lu000gxsn86gc68ueb","parentId":"0"},{"name":"机器学习","value":19,"path":"categories/机器学习/","id":"clxv689nd003lxsn84lz2277p","parentId":"0"},{"name":"学习笔记","value":15,"path":"categories/学习笔记/","id":"clxv689m4000vxsn88zpr5kgq","parentId":"0"},{"name":"CTF题解","value":11,"path":"categories/ctf题解/","id":"clxv689pb008wxsn83fdk8ebk","parentId":"0"},{"name":"Hexo魔改","value":8,"path":"categories/hexo魔改/","id":"clxv689qi00cmxsn8da053uq7","parentId":"0"},{"name":"杂趣","value":2,"path":"categories/杂趣/","id":"clxv689q800btxsn848yac8wn","parentId":"0"}],
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 2,
            emphasis: {
              focus: 'ancestor',
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(255, 255, 255, 0.5)'
            }
          }
        }
        :
        {
          name: '文章篇数',
          type: 'pie',
          radius: [30, 80],
          roseType: 'area',
          label: {
            color: color,
            formatter: '{b} : {c} ({d}%)'
          },
          data: [{"name":"瞎捣鼓经历","value":47,"path":"categories/瞎捣鼓经历/","id":"clxv689ln0008xsn81tmbdn8k","parentId":"0"},{"name":"博客相关","value":39,"path":"categories/博客相关/","id":"clxv689mc001bxsn844q1cysi","parentId":"0"},{"name":"Debug","value":19,"path":"categories/debug/","id":"clxv689lu000gxsn86gc68ueb","parentId":"0"},{"name":"机器学习","value":19,"path":"categories/机器学习/","id":"clxv689nd003lxsn84lz2277p","parentId":"0"},{"name":"学习笔记","value":15,"path":"categories/学习笔记/","id":"clxv689m4000vxsn88zpr5kgq","parentId":"0"},{"name":"CTF题解","value":11,"path":"categories/ctf题解/","id":"clxv689pb008wxsn83fdk8ebk","parentId":"0"},{"name":"Hexo魔改","value":8,"path":"categories/hexo魔改/","id":"clxv689qi00cmxsn8da053uq7","parentId":"0"},{"name":"杂趣","value":2,"path":"categories/杂趣/","id":"clxv689q800btxsn848yac8wn","parentId":"0"}],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(255, 255, 255, 0.5)'
            }
          }
        }
      )
      