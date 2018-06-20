const fetchTrace = (e) => {
  e.preventDefault();
  const id = $('.search-input').val();

  return fetch(`/api/trace/${id}`)
    .then(res => {
      if (res.status !== 200) {
        console.log(res);
      }
      return res;
    })
    .then(res => res.json())
    .then(res => {

      const chartData = res.spans.map((obj, i) => {
        const duration = obj.duration_ns / 1000000;

        return Object.assign({}, {
          x: moment(obj.start_time).valueOf(),
          x2: moment(obj.start_time).valueOf() + duration,
          y: i
        });
      });

      console.log({ chartData})

      Highcharts.chart('container', {
        chart: {
          type: 'xrange'
        },
        title: {
          text: 'Sample Trace Visualization',
          style: {
            'color': '#175456',
          }
        },
        xAxis: {
          type: 'datetime'
        },
        yAxis: {
          title: {
            text: ''
          },
          categories: res.spans.map(obj => (obj.name).toUpperCase()),
          reversed: true
        },
        plotOptions: {
          series: {
            turboThreshold: 2000,
          }
        },
        series: [{
            name: 'Timeline',
            // pointPadding: 0,
            // groupPadding: 0,
            borderColor: 'gray',
            pointWidth: 20,
            data: chartData,
            dataLabels: {
                enabled: false
            }
        }]
      });

    })
    .catch(error => console.log(error));
}

$('.submit-btn').on('click', fetchTrace);
