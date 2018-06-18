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
      const names = res.spans.map(obj => obj.name);
      console.log({ names });

      const startTimes = res.spans.map(obj => (moment(obj.start_time).unix())*1000);
      console.log({ startTimes });

      return res;
    })
    .catch(error => console.log(error));
}

$('.submit-btn').on('click', fetchTrace);

// {
//   "spans": [
//     {
//       "trace": "1234",
//       "id": "1",
//       "name": "nginx",
//       "start_time": "2011-08-30T09:30:16.768-04:00",
//       "duration_ns": 58000000000
//     },
//     {
//       "trace": "1234",
//       "id": "2",
//       "name": "gateway",
//       "start_time": "2011-08-30T09:31:16.768-04:00",
//       "duration_ns": 10000000000
//     },
//     {
//       "trace": "1234",
//       "id": "3",
//       "name": "kafka",
//       "start_time": "2011-08-30T09:31:50.768-04:00",
//       "duration_ns": 2000000000
//     },
//     {
//       "trace": "1234",
//       "id": "4",
//       "name": "etcd",
//       "start_time": "2011-08-30T09:32:00.768-04:00",
//       "duration_ns": 5563463456
//     }
//   ],
//   "relations": [
//     {
//       "trace": "1234",
//       "parent_id": "1",
//       "id": "2"
//     },
//     {
//       "trace": "1234",
//       "parent_id": "2",
//       "id": "3"
//     },
//     {
//       "trace": "1234",
//       "parent_id": "1",
//       "id": "4"
//     }
//   ]
// }





// Highcharts.chart('container', {
//   chart: {
//     type: 'xrange'
//   },
//   title: {
//     text: 'Highcharts Trace Visualization',
//     style: {
//       'color': '#175456',
//     }
//   },
//   xAxis: {
//     type: 'datetime'
//   },
//   yAxis: {
//     title: {
//       text: ''
//     },
//     categories: ['Prototyping', 'Development', 'Testing'],
//     reversed: true
//   },
//   plotOptions: {
//     series: {
//       turboThreshold: 2000,
//     }
//   },
//   series: [{
//       name: 'Project 1',
//       // pointPadding: 0,
//       // groupPadding: 0,
//       borderColor: 'gray',
//       pointWidth: 20,
//       data: [{
//           x: Date.UTC(2014, 10, 21),
//           x2: Date.UTC(2014, 11, 2),
//           y: 0,
//           partialFill: 0.25
//       }, {
//           x: Date.UTC(2014, 11, 2),
//           x2: Date.UTC(2014, 11, 5),
//           y: 1
//       }, {
//           x: Date.UTC(2014, 11, 8),
//           x2: Date.UTC(2014, 11, 9),
//           y: 2
//       }, {
//           x: Date.UTC(2014, 11, 9),
//           x2: Date.UTC(2014, 11, 19),
//           y: 1
//       }, {
//           x: Date.UTC(2014, 11, 10),
//           x2: Date.UTC(2014, 11, 23),
//           y: 2
//       }],
//       dataLabels: {
//           enabled: true
//       }
//   }]
// });
