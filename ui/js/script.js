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
      const names = res.spans.map(obj => (obj.name).toUpperCase());
      console.log({ names });
      const startTimes = res.spans.map(obj => (moment(obj.start_time).unix())*1000);
      console.log({ startTimes });

      const chartData = res.spans.map((obj, i) => {
        return Object.assign({}, {
          x: (moment(obj.start_time).unix())*1000,
          x2: (moment(obj.start_time).unix())*1000 + obj.duration_ns,
          y: i
        });
      });

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
                enabled: true
            }
        }]
      });

    })
    .catch(error => console.log(error));
}

$('.submit-btn').on('click', fetchTrace);
