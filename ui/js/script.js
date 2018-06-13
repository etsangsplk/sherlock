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
    .then(res => console.log({ res }))
    .catch(error => console.log(error));
}

$('.submit-btn').on('click', fetchTrace);

Highcharts.chart('container', {
      chart: {
        type: 'xrange'
      },
      title: {
        text: 'Highcharts Trace Visualization',
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
        categories: ['Prototyping', 'Development', 'Testing'],
        reversed: true
      },
      plotOptions: {
        series: {
          turboThreshold: 2000,
        }
      },
      series: [{
          name: 'Project 1',
          // pointPadding: 0,
          // groupPadding: 0,
          borderColor: 'gray',
          pointWidth: 20,
          data: [{
              x: Date.UTC(2014, 10, 21),
              x2: Date.UTC(2014, 11, 2),
              y: 0,
              partialFill: 0.25
          }, {
              x: Date.UTC(2014, 11, 2),
              x2: Date.UTC(2014, 11, 5),
              y: 1
          }, {
              x: Date.UTC(2014, 11, 8),
              x2: Date.UTC(2014, 11, 9),
              y: 2
          }, {
              x: Date.UTC(2014, 11, 9),
              x2: Date.UTC(2014, 11, 19),
              y: 1
          }, {
              x: Date.UTC(2014, 11, 10),
              x2: Date.UTC(2014, 11, 23),
              y: 2
          }],
          dataLabels: {
              enabled: true
          }
      }]
    });
